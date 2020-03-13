import { ExpectedConditions } from 'protractor';
import { AssetManager } from '../pageObjects/assetManager.Po';
import { LogicalDeployment } from '../pageObjects/logicalDeployment.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { PolicyGroup } from '../pageObjects/policyGroup.Po';
import { Risk } from '../pageObjects/risks.Po';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';
import { ExpectHelper } from '../utils/expectHelper';
import { getIdFromUrl } from '../utils/utils';

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
    let baseSurface = properties.SurfaceData.surfaceName;
    let service = ['AWS::S3'];
    let service1 = ['AWS::EC2'];
    let services = ['AWS::S3', 'AWS::EC2'];
    let attributeTags = [attributeTagName];
    let updatedPolicyID;
    let modelId;
    let policyId;
    let latestPolicyId;
    let attributeTagId;
    let riskId;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    });

    it('Step 1: Create Attribute Tag', async function (): Promise<any> {
        await attributeTag.createAttributeTag(baseSurface, attributeTagName, attributeTagDesc);
        await attributeTag.searchAttribute(baseSurface, attributeTagName, 'description');
        await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
        await console.log('Attribute Tag name is', attributeTagName);
    });

    it('Step 2: Create Another Attribute Tag', async function (): Promise<any> {
        await attributeTag.createAttributeTag(baseSurface, attributeTagName1, attributeTagDesc1);
        attributeTagId = await attributeTag.getId();
        await console.log('AttributeTag Name is', attributeTagName1);
        await console.log('AttributeTag id is', attributeTagId);
        await attributeTag.searchAttribute(baseSurface, attributeTagName1, 'description');
        await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName1);
        await console.log('Attribute Tag name is', attributeTagName1);
    });

    it('Step 3: Create Enclave Model With First Attribute Tag', async function (): Promise<any> {
        await assetsManager.createEnclaveModel(baseSurface, 'PUBLISHED', assetName, description, attributeTags, 'concourseInfra.json', 'E2E Admin');
        modelId = await assetsManager.getId();
        await console.log('Enclave Model id is', modelId);
        await console.log('Enclave Model name is', assetName);
        await assetsManager.searchAssetManager(baseSurface, assetName);
        await ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
    });

    it('Step 4: Create Policy Group Template with  Published', async function (): Promise<any> {
        await policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', policyGroupTemplateName, policyGroupTemplateDesc, 'Allowed AWS Products in Stacks');
        await policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, policyGroupTemplateName);
        await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
    });

    it('Step 5: Create Policy Group With Second Attribute Tag', async function (): Promise<any> {
        await policyPage.createPolicyGroup(baseSurface, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName1, services,  ' ', ' ', ' ', 'Allowed AWS Products in Stacks 1');
        policyId = await getIdFromUrl();
        await console.log('Policy Group  id is', policyId);
        await policyPage.searchPolicyGroup(baseSurface, policyGroupName);
        await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
    });

    it('Step 6: Add First Attribute Tag To Policy Group', async function (): Promise<any> {
        await policyPage.addAttributeTagForPG(baseSurface, policyGroupName, attributeTagName);
        updatedPolicyID = await getIdFromUrl();
        await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
    });

    it('Step 7: Verifying Risk ', async function (): Promise<any> {
        await risk.openRisk(modelId);
        await console.log('Risk Happened For', modelId);
        riskId = await risk.getId();
        await console.log('Violation id is', riskId);
        await ExpectHelper.isListElementExists(risk.risklist, riskId);
    });

    it('Step 8: Remove Existing Attribute Tag(Second One) ', async function (): Promise<any> {
        await policyPage.removeAttributeTagForPG(baseSurface, policyGroupName, attributeTagId);
        latestPolicyId = await getIdFromUrl();
        await console.log('Policy Group  id Is', latestPolicyId);
    });

    it('Step 9: Verifying Risk ', async function (): Promise<any> {
        await risk.openRisk(modelId);
        await console.log('Still Risk Showing For', modelId);
        riskId = await risk.getId();
        await console.log('Violation id is', riskId);
        await ExpectHelper.isListElementExists(risk.risklist, riskId);
    });

    it('Step 10: Delete Policy Group', async function (): Promise<any> {
        await policyPage.deletePolicyGroup(baseSurface, policyGroupName, 'false');
        await policyPage.searchPolicyGroup(baseSurface, policyGroupName);
        await ExpectHelper.expectDoesNotExists(policyPage.searchPolicyGroupName(policyGroupName));
        await console.log(policyGroupName, 'Deleted');
    });

    it('Step 11: Verifying Risk After Deletion Of Policy Group', async function (): Promise<any> {
        await risk.verifyRisk(modelId);
        await ExpectHelper.expectDoesNotExists(risk.riskElement(modelId));
        await console.log('Risk Removed For', modelId);
    });

    it('Step 12: CleanUp ', async function (): Promise<any> {
        await policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, policyGroupTemplateName, 'false');
        await console.log(policyGroupTemplateName, 'Deleted');
        await assetsManager.deleteEnclaveModel(baseSurface, assetName, 'false');
        await console.log(assetName, 'Deleted');
        await attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
        await console.log(attributeTagName, 'Deleted');
        await attributeTag.deleteAttributeTag(baseSurface, attributeTagName1, 'false');
        await console.log(attributeTagName1, 'Deleted');
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});