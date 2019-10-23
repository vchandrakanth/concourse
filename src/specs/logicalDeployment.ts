import { ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { AssetManager } from '../pageObjects/assetManager.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { LogicalDeployment } from '../pageObjects/logicalDeployment.Po';
// let gsh = require('../utils/globalSpecHelper');

describe('Creaing Logical Deployment', async function () {

  let originalTimeout;
  let EC = ExpectedConditions;
  let attributeTag = new AttributeTag();
  let assetManager = new AssetManager();
  let properties = require('../conf/properties');
  let logicalDeployment = new LogicalDeployment();

  let attributeTagName = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
  let attributeTagDescription = properties.attributeTagData.violationAttributeTagDescription;
  let assetName = properties.enclaveModelData.modelName + assetManager.getRandomNum(1, 1000);
  let desc = properties.enclaveModelData.modelDescription;
  let deploymentName = properties.logicalDeploymentData.deploymentName + logicalDeployment.getRandomNum(1, 1000);
  let stackName = properties.logicalDeploymentData.stackName;
  let attitibuteTag = [attributeTagName];
  let deploymentId;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
  });

  it('Step 1: Create Attribute Tag', async function (): Promise<any> {
    // Attribute Creation
    await attributeTag.createAttributeTag(attributeTagName, attributeTagDescription);
    await attributeTag.searchAttribute(attributeTagName, 'description');
    await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
  });

  it('Step 2: Create New Enclave Model', async function (): Promise<any> {
    // Creating Enclave Model
    await assetManager.createEnclaveModel('PUBLISHED', assetName, desc, attitibuteTag, 'ec2template.json', 'E2E Admin');
    let modelid = await assetManager.getId();
    await console.log('Enclave Model id is', modelid);
    await assetManager.searchAssetManager(assetName);
    await ExpectHelper.isListElementExists(assetManager.assetList, assetName);
  });

  it('Step 3: Logical Deployement', async function (): Promise<any> {
    // Creating Logical Deployement
    await logicalDeployment.newlogicalDeployment(assetName, deploymentName, stackName, 'us-east-1', 'Default Surface - Root Surface Layer', 'Account-792581741842');
    await logicalDeployment.searchLogicalDeployment(deploymentName);
    await ExpectHelper.isListElementExists(logicalDeployment.deploymentList, deploymentName);
    deploymentId = await logicalDeployment.getId();
    await console.log('Logical Deployment Name is', deploymentName);
    await console.log('Logical Deployment id is', deploymentId);
  });

  it('Step 4: Delete Logical Deployment', async function (): Promise<any> {
    // Delete Logical Deployement
    await logicalDeployment.deleteLogicalDeployement(deploymentName);
    await ExpectHelper.expectDoesNotExists(logicalDeployment.logicalDeployementElement(deploymentName));
  });

  it('Step 5: Clean Up', async function (): Promise<any> {
    // Clean Up
    await assetManager.deleteEnclaveModel(assetName, 'false');
    await attributeTag.deleteAttributeTag(attributeTagName, 'false');
  });

  afterEach(function () {
    // console.log(gsh);
    // gsh.console.log(Text);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

});