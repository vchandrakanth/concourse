import { Risk } from '../pageObjects/risks.Po';
import { ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { PolicyGroup } from '../pageObjects/policyGroup.Po';
import { AssetManager } from '../pageObjects/assetManager.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { LogicalDeployment } from '../pageObjects/logicalDeployment.Po';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';
import { getIdFromUrl } from '../utils/utils';

describe('Creaing Logical Deployment Violations', async function () {

  let originalTimeout;
  let risk = new Risk();
  let EC = ExpectedConditions;
  let policyPage = new PolicyGroup();
  let attributeTag = new AttributeTag();
  let assetsManager = new AssetManager();
  let properties = require('../conf/properties');
  let logicalDeployment = new LogicalDeployment();
  let policyGroupTemplatePage = new PolicyGroupTemplatePage();

  let attributeTagName = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
  let attributeTagDescription = properties.attributeTagData.violationAttributeTagDescription;
  let policyGroupTemplateName = properties.policyGroupTemplateData.policyGroupTemplateNameWithAWSProducts + policyGroupTemplatePage.getRandomNum(1, 1000);
  let policyGroupTemplatedesc = properties.policyGroupTemplateData.policyGroupTemplateDescWithAWSProducts;
  let policyGroupName = properties.policyGroupData.policyGroupNamePublish + policyPage.getRandomNum(1, 1000);
  let policyGroupDesc = properties.policyGroupData.policyGroupDescPublish;
  let assetName = properties.enclaveModelData.modelName + assetsManager.getRandomNum(1, 1000);
  let desc = properties.enclaveModelData.modelDescription;
  let deploymentName = properties.logicalDeploymentData.deploymentName + logicalDeployment.getRandomNum(1, 1000);
  let stackName = properties.logicalDeploymentData.stackName + logicalDeployment.getRandomNum(1, 1000);
  let baseSurface = properties.SurfaceData.surfaceName;
  let attitibuteTag = [attributeTagName];
  let services = ['AWS::EC2'];
  let modelid;
  let riskId;
  let logicalDeploymentId;
  let policyId;


  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
  });

  it('Step 1: Create Attribute Tag', async function (): Promise<any> {
    // Attribute Creation
    await attributeTag.createAttributeTag(baseSurface, attributeTagName, attributeTagDescription);
    await attributeTag.searchAttribute(baseSurface, attributeTagName, 'description');
    await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
  });

  it('Step 2: Create New Enclave Model', async function (): Promise<any> {
    // Creating Enclave Model
    await assetsManager.createEnclaveModel(baseSurface, 'PUBLISHED', assetName, desc, attitibuteTag, 'ec2template.json', 'E2E Admin');
    modelid = await assetsManager.getId();
    await console.log('Enclave Model name is', assetName);
    await console.log('Enclave Model id is', modelid);
    await assetsManager.searchAssetManager(baseSurface, assetName);
    await ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
  });

  it('Step 3: Creating Policy Group Template with  Published', async function (): Promise<any> {
    // plolciy Template is Creation as Published
    await policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Stacks');
    await policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, policyGroupTemplateName);
    await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
  });

  it('Step 4: Creating Policy Group with  Published', async function (): Promise<any> {
    // Creating Policy Group with  Published
    await policyPage.createPolicyGroup(baseSurface, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services);
    policyId = await getIdFromUrl();
    await console.log('Policy Group name is', policyId);
    await console.log('Policy Group name is', policyGroupName);
    await policyPage.searchPolicyGroup(baseSurface, policyGroupName);
    await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
  });

  it('Step 5: Logical Deployement', async function (): Promise<any> {
    // Creating Logical Deployement
    await logicalDeployment.newlogicalDeployment(baseSurface, assetName, deploymentName, stackName, 'us-east-1', 'Default Surface - Root Surface Layer', 'Account-123456987456');
    await logicalDeployment.searchLogicalDeployment(baseSurface, deploymentName);
    await ExpectHelper.isListElementExists(logicalDeployment.logicalDeploymentList, deploymentName);
    logicalDeploymentId = await logicalDeployment.getId();
    await console.log('Logical Deployment Name is', deploymentName);
    await console.log('Logical Deployment id is', logicalDeploymentId);
  });

  it('Step 6: Verify Risk', async function (): Promise<any> {
    // Verifying Risk For Deployement
    await risk.openRisk(logicalDeploymentId);
    ExpectHelper.isListElementExists(risk.deploymentRiskDetail, logicalDeploymentId);
    await console.log('Risk Happened For', logicalDeploymentId);
  });

  it('Step 7: Delete Logical Deployment', async function (): Promise<any> {
    // Delete Logical Deployement
    await logicalDeployment.deleteLogicalDeployement(baseSurface, deploymentName);
    await ExpectHelper.expectDoesNotExists(logicalDeployment.logicalDeployementElement(deploymentName));
  });

  it('Step 8: Re verifying Risk', async function (): Promise<any> {
    // Reverifying Risk For Deployement
    await risk.verifyRisk(logicalDeploymentId);
    await ExpectHelper.expectDoesNotExists(risk.riskElement(logicalDeploymentId));
    await console.log('Risk Removed For', logicalDeploymentId);
  });

  it('Step 9: Clean Up', async function (): Promise<any> {
    // CleanUp
    await assetsManager.deleteEnclaveModel(baseSurface, assetName, 'false');
    await policyPage.deletePolicyGroup(baseSurface, policyGroupName, 'false');
    await policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, policyGroupTemplateName, 'false');
    await attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

});