import { Risk } from '../pageObjects/risks.Po';
import { ExpectHelper } from '../utils/expectHelper';
import { Approvals } from '../pageObjects/approvals.Po';
import { PolicyGroup } from '../pageObjects/policyGroup.Po';
import { element, by, ExpectedConditions } from 'protractor';
import { AssetManager } from '../pageObjects/assetManager.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { LogicalDeployment } from '../pageObjects/logicalDeployment.Po';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';
import { getIdFromUrl } from '../utils/utils';

describe('Remove Surface Layer For Policy Group and Verify Violation created ', async function () {
    let originalTimeout;
    let risk = new Risk();
    let EC = ExpectedConditions;
    let approvals = new Approvals();
    let policyPage = new PolicyGroup();
    let attributeTag = new AttributeTag();
    let assetsManager = new AssetManager();
    let properties = require('../conf/properties');
    let logicalDeployment = new LogicalDeployment();
    let policyGroupTemplatePage = new PolicyGroupTemplatePage();

    let attributeTagName = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
    let attributeTagDesc = properties.attributeTagData.violationAttributeTagDescription;
    let attributeTagName1 = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
    let attributeTagDesc1 = properties.attributeTagData.violationAttributeTagDescription;
    let assetName = properties.enclaveModelData.ec2ModelName + assetsManager.getRandomNum(1, 1000);
    let description = properties.enclaveModelData.ec2ModelDescription;
    let deploymentName = properties.logicalDeploymentData.deploymentName + logicalDeployment.getRandomNum(1, 1000);
    let stackName = properties.logicalDeploymentData.stackName + logicalDeployment.getRandomNum(1, 1000);
    let policyGroupTemplateName = properties.policyGroupTemplateData.policyGroupTemplateNameWithAWSProducts + policyGroupTemplatePage.getRandomNum(1, 1000);
    let policyGroupTemplatedesc = properties.policyGroupTemplateData.policyGroupTemplateDescWithAWSProducts;
    let policyGroupName = properties.policyGroupData.violationPolicyGroupName + policyPage.getRandomNum(1, 1000);
    let policyGroupDesc = properties.policyGroupData.violationPolicyGroupDescription;
    let SurfaceLayer = properties.SurfaceData.surfaceLayer;
    let s3Service = ['AWS::S3'];
    let ec2Service = ['AWS::EC2'];
    let services = ['AWS::S3', 'AWS::EC2'];
    let attitibuteTags = [attributeTagName];
    let updatedPolicyGroupId;
    let modelId;
    let policyId;
    let deploymentId;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    });

    it('Step 1: Create Attribute Tag', async function (): Promise<any> {
        // Attribute Tag Creation
        await attributeTag.createAttributeTag(attributeTagName, attributeTagDesc);
        await attributeTag.searchAttribute(attributeTagName, 'description');
        await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
        await console.log('Attribute Tag name is', attributeTagName);
    });

    it('Step 2: Create Another Attribute Tag', async function (): Promise<any> {
        // Creating Another Attribute Tag
        await attributeTag.createAttributeTag(attributeTagName1, attributeTagDesc1);
        await attributeTag.searchAttribute(attributeTagName1, 'description');
        await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName1);
        await console.log('Attribute Tag name is', attributeTagName1);
    });

    it('Step 3: Create Enclave Model With EC2 Template', async function (): Promise<any> {
        // Creating Enclave
        await assetsManager.createEnclaveModel('PUBLISHED', assetName, description, attitibuteTags, 'concourseInfra.json', 'E2E Admin');
        modelId = await assetsManager.getId();
        await console.log('Enclave Model name is', assetName);
        await console.log('Enclave Model id is', modelId);
        await assetsManager.searchAssetManager(assetName);
        await ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
    });

    it('Step 4: Logical Deployement', async function (): Promise<any> {
        // Creating Logical Deployement
        await logicalDeployment.newlogicalDeployment(assetName, deploymentName, stackName, 'us-east-1', 'Default Surface - Root Surface Layer', 'Account-792581741842');
        await logicalDeployment.searchLogicalDeployment(deploymentName);
        await ExpectHelper.isListElementExists(logicalDeployment.deploymentList, deploymentName);
        deploymentId = await logicalDeployment.getId();
        await console.log('Logical Deployment Name is', deploymentName);
        await console.log('Logical Deployment id is', deploymentId);
    });

    it('Step 5: Creating Policy Group Template with  Published', async function (): Promise<any> {
        // Creating Policy Group Template
        await policyGroupTemplatePage.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Assets');
        await policyGroupTemplatePage.searchPolicyGroupTemplate(policyGroupTemplateName);
        await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
    });

    it('Step 6: Creating Policy Group with EC2 and S3 ', async function (): Promise<any> {
        // Creating Policy Group
        await policyPage.createPolicyGroup(policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName1, services, 'Default Surface - Root Surface Layer');
        policyId = await getIdFromUrl();
        await console.log('Policy Group  id is', policyId);
        await policyPage.searchPolicyGroup(policyGroupName);
        await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
    });

    it('Step 7: Verify Risk', async function (): Promise<any> {
        // Verifying Risk
        await risk.openRisk(modelId);
        await ExpectHelper.isListElementExists(risk.risklist, modelId);
        await console.log('Risk Happend For', modelId);
    });

    it('Step 8: Remove Surface Layer From Policy Group', async function (): Promise<any> {
        // Adding New Attribute Tag For Policy Group
        await policyPage.removeSurfaceLayerForPG(policyGroupName, SurfaceLayer);
        updatedPolicyGroupId = await getIdFromUrl();
        await console.log('Updated Policy Group Id Is', updatedPolicyGroupId);
        await policyPage.searchPolicyGroup(policyGroupName);
        await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
    });

    it('Step 9:  Re-Verify Risk', async function (): Promise<any> {
        // Verifying Risk
        await risk.openRisk(modelId);
        await ExpectHelper.expectDoesNotExists(risk.riskElement(modelId));
        await console.log('Risk Removed For', modelId);
    });

    it('Step 10: CleanUp', async function (): Promise<any> {
        // Clean Up
        await policyPage.deletePolicyGroup(policyGroupName, 'false');
        await policyGroupTemplatePage.deletePolicyGroupTemplate(policyGroupTemplateName, 'false');
        await logicalDeployment.deleteLogicalDeployement(deploymentName);
        await assetsManager.deleteEnclaveModel(assetName, 'false');
        await attributeTag.deleteAttributeTag(attributeTagName, 'false');
        await attributeTag.deleteAttributeTag(attributeTagName1, 'false');
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});
