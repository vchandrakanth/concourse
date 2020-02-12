import { browser } from 'protractor';
import { Risk } from '../pageObjects/risks.Po';
import { ExpectHelper } from '../utils/expectHelper';
import { PolicyGroup } from '../pageObjects/policyGroup.Po';
import { AssetManager } from '../pageObjects/assetManager.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';
import { getIdFromUrl } from '../utils/utils';

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
    let baseSurface = properties.SurfaceData.surfaceName;
    let attitibuteTag = [attributeTagName];
    let ec2Service = ['AWS::EC2'];
    let s3Service = ['AWS::S3'];
    let services = ['AWS::EC2', 'AWS::S3'];
    let removeEC2Service = ['×AWS::EC2'];
    let removeS3Service = ['×AWS::S3'];
    // let ec2Service = properties.ServicesData.service;
    // let s3Service = properties.ServicesData.service1;
    // let services = [ec2Service, s3Service];
    let ec2Modelid;
    let s3Modelid;
    let policyId;
    let ec2PolicyId;
    let s3PolicyId;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    });

    it('Step 1: Create Attribute Tag', async function (): Promise<any> {
        // Attribute Tag Creation
        await attributeTag.createAttributeTag(baseSurface, attributeTagName, attributeTagDesc);
        await attributeTag.searchAttribute(baseSurface, attributeTagName, 'attributeTagDesc');
        await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
        await console.log('Attribute Tag name is', attributeTagName);
    });

    it('Step : Create Enclave Model With EC2 Template', async function (): Promise<any> {
        // Creating Enclave
        await assetsManager.createEnclaveModel(baseSurface, 'PUBLISHED', assetName, description, attitibuteTag, 'ec2template.json', 'E2E Admin');
        ec2Modelid = await assetsManager.getId();
        await console.log('Enclave Model name is', assetName);
        await console.log('Enclave Model id is', ec2Modelid);
        await assetsManager.searchAssetManager(baseSurface, assetName);
        await ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
    });

    it('Step 3: Create Enclave Model With S3 Template ', async function (): Promise<any> {
        // Creating Enclave Model
        await assetsManager.createEnclaveModel(baseSurface, 'PUBLISHED', assetName1, description1, attitibuteTag, 's3template.json', 'E2E Admin');
        s3Modelid = await assetsManager.getId();
        await console.log('Enclave Model name is', assetName1);
        await console.log('Enclave Model id is', s3Modelid);
        await assetsManager.searchAssetManager(baseSurface, assetName1);
        await ExpectHelper.isListElementExists(assetsManager.assetList, assetName1);
    });

    it('Step 4: Creating Policy Group Template with  Published', async function (): Promise<any> {
        // Creating Policy Group Template
        await policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', policyGroupTemplateName, policyGroupTemplateDesc, 'Allowed AWS Products in Stacks');
        await policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, policyGroupTemplateName);
        await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
    });

    it('Step 5: Creating Policy Group with EC2 and S3 ', async function (): Promise<any> {
        // Creating Policy Group
        await policyPage.createPolicyGroup(baseSurface, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services);
        policyId = await getIdFromUrl();
        await console.log('Policy Group name is', policyId);
        await console.log('Policy Group name is', policyGroupName);
        await policyPage.searchPolicyGroup(baseSurface, policyGroupName);
        await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
    });

    it('Step 6: Update Policy Group with all Products Except EC2', async function (): Promise<any> {
        // Updating Policy Group With EC2
        await policyPage.updatePolicyGroupWithEC2(baseSurface, policyGroupName, ec2Service);
        ec2PolicyId = await getIdFromUrl();
        await console.log(' Published Policy Group id is', ec2PolicyId);
        await console.log('Policy Group name is', policyGroupName);
        await policyPage.searchPolicyGroup(baseSurface, policyGroupName);
        await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
    });

    it('Step 7: Verify Risk', async function (): Promise<any> {
        // Verifying Risk
        await risk.openRisk(ec2Modelid);
        await ExpectHelper.isListElementExists(risk.risklist, ec2Modelid);
    });

    it('Step 8: Update Policy Group with all Products Except S3 Service', async function (): Promise<any> {
        // Update Policy Group With S3
        await policyPage.updatePolicyGroupWithS3(baseSurface, policyGroupName, s3Service);
        s3PolicyId = await getIdFromUrl();
        await console.log(' Published Policy Group id is', s3PolicyId);
        await console.log('Policy Group name is', policyGroupName);
        await policyPage.searchPolicyGroup(baseSurface, policyGroupName);
        await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
    });

    it('Step 9: Verify Risk', async function (): Promise<any> {
        // Verifying Risk
        await risk.openRisk(s3Modelid);
        await ExpectHelper.isListElementExists(risk.risklist, s3Modelid);
    });

    it('Step 10: CleanUp', async function (): Promise<any> {
        // Clean Up
        await policyPage.deletePolicyGroup(baseSurface, policyGroupName, 'false');
        await policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, policyGroupTemplateName, 'false');
        await assetsManager.deleteEnclaveModel(baseSurface, assetName, 'false');
        await assetsManager.deleteEnclaveModel(baseSurface, assetName1, 'false');
        await attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});