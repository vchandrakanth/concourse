import { browser } from 'protractor';
import { Risk } from '../pageObjects/risks.Po';
import { ExpectHelper } from '../utils/expectHelper';
import { PolicyGroup } from '../pageObjects/policyGroup.Po';
import { AssetManager } from '../pageObjects/assetManager.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';

describe('Update Policy Violation ', async function () {

    let originalTimeout;
    let risk = new Risk();
    let policyPage = new PolicyGroup();
    let attributeTag = new AttributeTag();
    let assetsManager = new AssetManager();
    let properties = require('../conf/properties');
    let policyGroupTemplatePage = new PolicyGroupTemplatePage();

    let attributeTagName = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
    let attributeTagDesc = properties.attributeTagData.violationAttributeTagDescription;
    let policyGroupTemplateName = properties.policyGroupTemplateData.policyGroupTemplateNameWithAWSProducts + policyGroupTemplatePage.getRandomNum(1, 1000);
    let policyGroupTemplateDesc = properties.policyGroupTemplateData.policyGroupTemplateDescWithAWSProducts;
    let policyGroupName = properties.policyGroupData.violationPolicyGroupName + policyPage.getRandomNum(1, 1000);
    let policyGroupDesc = properties.policyGroupData.violationPolicyGroupDescription;
    let assetName = properties.enclaveModelData.ec2ModelName + assetsManager.getRandomNum(1, 1000);
    let description = properties.enclaveModelData.ec2ModelDescription;
    let assetName1 = properties.enclaveModelData.s3ModelName + assetsManager.getRandomNum(1, 1000);
    let description1 = properties.enclaveModelData.s3ModelDescription;
    let attitibuteTag = [attributeTagName];
    let s3Service = ['AWS::S3'];
    let ec2Service = ['AWS::EC2'];
    let services = ['AWS::S3', 'AWS::EC2'];
    let ec2Modelid;
    let s3Modelid;
    let policyId;
    let ec2PolicyId;
    let s3PolicyId;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
    });

    it('Step 1: Create Attribute Tag', async function (): Promise<any> {
        // Attribute Tag Creation
        await attributeTag.createAttributeTag(attributeTagName, attributeTagDesc);
        await attributeTag.searchAttribute(attributeTagName, 'attributeTagDesc');
        await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
        await console.log('Attribute Tag name is', attributeTagName);
    });

    it('Step : Create Enclave Model With EC2 Template', async function (): Promise<any> {
        // Creating Enclave
        await assetsManager.createEnclaveModel('PUBLISHED', assetName, description, attitibuteTag, 'ec2template.json', 'E2E Admin');
        ec2Modelid = await assetsManager.getId();
        await console.log('Enclave Model name is', assetName);
        await console.log('Enclave Model id is', ec2Modelid);
        await assetsManager.searchAssetManager(assetName);
        await ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
    });

    it('Step 3: Create Enclave Model With S3 Template ', async function (): Promise<any> {
        // Creating Enclave Model
        await assetsManager.createEnclaveModel('PUBLISHED', assetName1, description1, attitibuteTag, 's3template.json', 'E2E Admin');
        s3Modelid = await assetsManager.getId();
        await console.log('Enclave Model name is', assetName1);
        await console.log('Enclave Model id is', s3Modelid);
        await assetsManager.searchAssetManager(assetName1);
        await ExpectHelper.isListElementExists(assetsManager.assetList, assetName1);
    });

    it('Step 4: Creating Policy Group Template with  Published', async function (): Promise<any> {
        // Creating Policy Group Template
        await policyGroupTemplatePage.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplateDesc, 'Allowed AWS Products in Assets');
        await policyGroupTemplatePage.searchPolicyGroupTemplate(policyGroupTemplateName);
        await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
    });

    it('Step 5: Creating Policy Group with EC2 and S3 ', async function (): Promise<any> {
        // Creating Policy Group
        await policyPage.createPolicyGroup(policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services);
        policyId = await policyPage.getId();
        await console.log('Policy Group name is', policyId);
        await console.log('Policy Group name is', policyGroupName);
        await policyPage.searchPolicyGroup(policyGroupName);
        await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
    });

    it('Step 6: Update Policy Group with all Products Except EC2', async function (): Promise<any> {
        // Updating Policy Group With EC2
        await policyPage.updatePolicyGroupWithEC2(policyGroupName, ec2Service);
        s3PolicyId = await policyPage.getId3();
        await console.log(' Published Policy Group id is', s3PolicyId);
        await console.log('Policy Group name is', policyGroupName);
        await policyPage.searchPolicyGroup(policyGroupName);
        await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
    });

    it('Step 7: Verify Risk', async function (): Promise<any> {
        // Verifying Risk
        await risk.openRisk(ec2Modelid);
        await ExpectHelper.isListElementExists(risk.risklist, ec2Modelid);
    });

    it('Step 8: Update Policy Group with all Products Except S3 Service', async function (): Promise<any> {
        // Update Policy Group With S3
        await policyPage.updatePolicyGroupWithS3(policyGroupName, s3Service);
        ec2PolicyId = await policyPage.getId4();
        await console.log(' Published Policy Group id is', ec2PolicyId);
        await console.log('Policy Group name is', policyGroupName);
        await policyPage.searchPolicyGroup(policyGroupName);
        await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
    });

    it('Step 9: Verify Risk', async function (): Promise<any> {
        // Verifying Risk
        await risk.openRisk(s3Modelid);
        await ExpectHelper.isListElementExists(risk.risklist, s3Modelid);
    });

    it('Step 10: CleanUp', async function (): Promise<any> {
        // Clean Up
        await policyPage.deletePolicyGroup(policyGroupName, 'false');
        await policyGroupTemplatePage.deletePolicyGroupTemplate(policyGroupTemplateName, 'false');
        await assetsManager.deleteEnclaveModel(assetName, 'false');
        await assetsManager.deleteEnclaveModel(assetName1, 'false');
        await attributeTag.deleteAttributeTag(attributeTagName, 'false');
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
