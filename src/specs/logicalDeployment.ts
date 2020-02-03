import { ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { AssetManager } from '../pageObjects/assetManager.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { LogicalDeployment } from '../pageObjects/logicalDeployment.Po';

describe('Creaing Logical Deployment', async function () {

  let originalTimeout;
  let EC = ExpectedConditions;
  let attributeTag = new AttributeTag();
  let assetManager = new AssetManager();
  let properties = require('../conf/properties');
  let logicalDeployment = new LogicalDeployment();

  let attributeTagName = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
  let attributeTagDescription = properties.attributeTagData.violationAttributeTagDescription;
  let attributeTagName1 = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
  let attributeTagDesc1 = properties.attributeTagData.violationAttributeTagDescription;
  let assetName = properties.enclaveModelData.modelName + assetManager.getRandomNum(1, 1000);
  let desc = properties.enclaveModelData.modelDescription;
  let deploymentName = properties.logicalDeploymentData.deploymentName + logicalDeployment.getRandomNum(1, 1000);
  let stackName = properties.logicalDeploymentData.stackName + logicalDeployment.getRandomNum(1, 1000);
  let attitibuteTag = [attributeTagName];
  let version = properties.logicalDeploymentData.version;
  let baseSurface = properties.SurfaceData.surfaceName;
  let deploymentId;

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

  it('Step 2: Create Another Attribute Tag', async function (): Promise<any> {
    // Attribute Creation
    await attributeTag.createAttributeTag(baseSurface, attributeTagName1, attributeTagDesc1);
    await attributeTag.searchAttribute(baseSurface, attributeTagName1, 'description');
    await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName1);
  });

  it('Step 3: Create New Enclave Model', async function (): Promise<any> {
    // Creating Enclave Model
    await assetManager.createEnclaveModel(baseSurface, 'PUBLISHED', assetName, desc, attitibuteTag, 'ec2template.json', 'E2E Admin');
    let modelid = await assetManager.getId();
    await console.log('Enclave Model id is', modelid);
    await assetManager.searchAssetManager(baseSurface, assetName);
    await ExpectHelper.isListElementExists(assetManager.assetList, assetName);
  });

  it('Step 5: Logical Deployement', async function (): Promise<any> {
    // Creating Logical Deployement
    await logicalDeployment.newlogicalDeployment(baseSurface, assetName, deploymentName, stackName, 'us-east-1', 'Default Surface - Root Surface Layer', 'Account-123456987456');
    await logicalDeployment.searchLogicalDeployment(baseSurface, deploymentName);
    await ExpectHelper.isListElementExists(logicalDeployment.logicalDeploymentList, deploymentName);
    deploymentId = await logicalDeployment.getId();
    await console.log('Logical Deployment Name is', deploymentName);
    await console.log('Logical Deployment id is', deploymentId);
  });

  it('Step 4: Update New Enclave Model', async function (): Promise<any> {
    // Updating Enclave Model
    await assetManager.updateEnclaveModel(baseSurface, assetName, attributeTagName1);
    let modelid = await assetManager.getId();
    await console.log('Enclave Model id is', modelid);
    await assetManager.searchAssetManager(baseSurface, assetName);
    await ExpectHelper.isListElementExists(assetManager.assetList, assetName);
  });

  it('Step 6: Update Logical Deployement', async function (): Promise<any> {
    // Updating Logical Deployement Version
    await logicalDeployment.updateLogicalDeployment(baseSurface, deploymentName, assetName, version);
    await logicalDeployment.searchLogicalDeployment(baseSurface, deploymentName);
    await ExpectHelper.isListElementExists(logicalDeployment.logicalDeploymentList, deploymentName);
    deploymentId = await logicalDeployment.getId();
    await console.log('Logical Deployment Name is', deploymentName);
    await console.log('Logical Deployment id is', deploymentId);
  });

  it('Step 7: Delete Logical Deployment', async function (): Promise<any> {
    // Delete Logical Deployement
    await logicalDeployment.deleteLogicalDeployement(baseSurface, deploymentName);
    await ExpectHelper.expectDoesNotExists(logicalDeployment.logicalDeployementElement(deploymentName));
  });

  it('Step 8: Clean Up', async function (): Promise<any> {
    // Clean Up
    await assetManager.deleteEnclaveModel(baseSurface, assetName, 'false');
    await assetManager.deleteEnclaveModel(baseSurface, assetName, 'false');
    await attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
    await attributeTag.deleteAttributeTag(baseSurface, attributeTagName1, 'false');
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

});