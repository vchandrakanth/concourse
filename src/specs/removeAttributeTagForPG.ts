import { ExpectedConditions } from 'protractor';
import { AssetManager } from '../pageObjects/assetManager.Po';
import { LogicalDeployment } from '../pageObjects/logicalDeployment.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { PolicyGroup } from '../pageObjects/policyGroup.Po';
import { Risk } from '../pageObjects/risks.Po';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';
import { ExpectHelper } from '../utils/expectHelper';

describe('Login Concourse ', async function () {
    let originalTimeout;
    let EC = ExpectedConditions;
    let assetsManager = new AssetManager();
    let attributeTag = new AttributeTag();
    let logicalDeployment = new LogicalDeployment();
    let policyPage = new PolicyGroup();
    let risk = new Risk();
    let properties = require('../conf/properties');
    let policyGroupTemplatePage = new PolicyGroupTemplatePage();

    let attributeTagName = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
    let attributeTagDesc = properties.attributeTagData.violationAttributeTagDescription;
    let attributeTagName1 = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
    let attributeTagDesc1 = properties.attributeTagData.violationAttributeTagDescription;
    let policyGroupTemplateName = properties.policyGroupTemplateData.policyGroupTemplateNameWithAWSProducts + policyGroupTemplatePage.getRandomNum(1, 1000);
    let policyGroupTemplateDesc = properties.policyGroupTemplateData.policyGroupTemplateDescWithAWSProducts;
    let policyGroupName = properties.policyGroupData.violationPolicyGroupName + policyPage.getRandomNum(1, 1000);
    let policyGroupDesc = properties.policyGroupData.violationPolicyGroupDescription;
    let assetName = properties.enclaveModelData.ec2ModelName + assetsManager.getRandomNum(1, 1000);
    let description = properties.enclaveModelData.ec2ModelDescription;
    let service = ['AWS::S3'];
    let service1 = ['AWS::EC2'];
    let services = ['AWS::S3', 'AWS::EC2'];
    let attributeTags = [attributeTagName];
    let updatedPolicyID;
    let modelId;
    let policyId;
    let latestPolicyId;
    let attributeTagId;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
    });

    it('Step 1: Create Attribute Tag', async function (): Promise<any> {
        await attributeTag.createAttributeTag(attributeTagName, attributeTagDesc);
        await attributeTag.searchAttribute(attributeTagName, 'description');
        await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
        await console.log('Attribute Tag name is', attributeTagName);
    });

    it('Step 2: Create Another Attribute Tag', async function (): Promise<any> {
        await attributeTag.createAttributeTag(attributeTagName1, attributeTagDesc1);
        attributeTagId = await attributeTag.getId();
        await console.log('AttributeTag Name is', attributeTagName1);
        await console.log('AttributeTag id is', attributeTagId);
        await attributeTag.searchAttribute(attributeTagName1, 'description');
        await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName1);
        await console.log('Attribute Tag name is', attributeTagName1);
    });

    it('Step 3: Create Enclave Model With First Attribute Tag', async function (): Promise<any> {
        await assetsManager.createEnclaveModel('PUBLISHED', assetName, description, attributeTags, 'concourseInfra.json', 'E2E Admin');
        modelId = await assetsManager.getId();
        await console.log('Enclave Model id is', modelId);
        await console.log('Enclave Model name is', assetName);
        await assetsManager.searchAssetManager(assetName);
        await ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
    });

    it('Step 4: Create Policy Group Template with  Published', async function (): Promise<any> {
        await policyGroupTemplatePage.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplateDesc, 'Allowed AWS Products in Assets');
        await policyGroupTemplatePage.searchPolicyGroupTemplate(policyGroupTemplateName);
        await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
    });

    it('Step 5: Create Policy Group With Second Attribute Tag', async function (): Promise<any> {
        await policyPage.createPolicyGroup(policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName1, services);
        policyId = await policyPage.getId();
        await console.log('Policy Group  id is', policyId);
        await policyPage.searchPolicyGroup(policyGroupName);
        await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
    });

    it('Step 6: Add First Attribute Tag To Policy Group', async function (): Promise<any> {
        await policyPage.addAttributeTagForPG(policyGroupName, attributeTagName);
        updatedPolicyID = await policyPage.getId5();
        await console.log('Policy Group Violation Id', updatedPolicyID);
        await policyPage.searchPolicyGroup(policyGroupName);
        await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
    });

    it('Step 7: Verifying Risk ', async function (): Promise<any> {
        await risk.openRisk(modelId);
        await ExpectHelper.isListElementExists(risk.risklist, modelId);
        await console.log('Risk Happened For', modelId);
    });

    it('Step 8: Remove Existing Attribute Tag(Second One) ', async function (): Promise<any> {
        await policyPage.removeAttributeTagForPG(policyGroupName, attributeTagId);
        latestPolicyId = await policyPage.getId();
        await console.log('Policy Group  id Is', latestPolicyId);
    });

    it('Step 9: Verifying Risk ', async function (): Promise<any> {
        await risk.openRisk(modelId);
        await ExpectHelper.isListElementExists(risk.risklist, modelId);
        await console.log('Still Risk Showing For', modelId);
    });

    it('Step 10: Delete Policy Group', async function (): Promise<any> {
        await policyPage.deletePolicyGroup(policyGroupName, 'false');
        await policyPage.searchPolicyGroup(policyGroupName);
        await ExpectHelper.expectDoesNotExists(policyPage.searchPolicyGroupName(policyGroupName));
        await console.log(policyGroupName, 'Deleted');
    });

    it('Step 11: Verifying Risk After Deletion Of Policy Group', async function (): Promise<any> {
        await risk.openRisk(modelId);
        await ExpectHelper.expectDoesNotExists(risk.riskElement(modelId));
        await console.log('Risk Removed For', modelId);
    });

    it('Step 12: CleanUp ', async function (): Promise<any> {
        await policyGroupTemplatePage.deletePolicyGroupTemplate(policyGroupTemplateName, 'false');
        await console.log(policyGroupTemplateName, 'Deleted');
        await assetsManager.deleteEnclaveModel(assetName, 'false');
        await console.log(assetName, 'Deleted');
        await attributeTag.deleteAttributeTag(attributeTagName, 'false');
        await console.log(attributeTagName, 'Deleted');
        await attributeTag.deleteAttributeTag(attributeTagName1, 'false');
        await console.log(attributeTagName1, 'Deleted');
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});