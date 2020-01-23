import { browser, ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { NestedEnClaveModel } from '../pageObjects/nestedTemplates.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { AssetManager } from '../pageObjects/assetManager.Po';


describe('Creaing Encalve Model With Nested Templates ', async function () {
  let originalTimeout;
  let EC = ExpectedConditions;
  let nestedEnClaveModel = new NestedEnClaveModel();
  let assetsManager = new AssetManager();
  let properties = require('../conf/properties');
  let attributeTag = new AttributeTag();
  let assetName = properties.enclaveModelData.modelName + nestedEnClaveModel.getRandomNum(1, 1000);
  let desc = properties.enclaveModelData.modelDescription;
  let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
  let attributeTagdescription = properties.attributeTagData.attributeDescription1;
  let baseSurface = properties.SurfaceData.surfaceName;
  let attitibuteTag = [attributeTagName];
  let modelId;
  let nestedTemplateName = ['AWSAccountVPCLzKmsKey.json', 'AWSAccountVPCLzRole.json', 'AWSAccountVPCLzSecurityGroup.json', 'LandingZoneS3BucketCore.json'];

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
  });

  it('Step 1: Create Attribute Tag', async function (): Promise<any> {
    // Creating Attribute Tag
    await attributeTag.createAttributeTag(baseSurface, attributeTagName, attributeTagdescription);
    await attributeTag.searchAttribute(baseSurface, attributeTagName, 'Description');
    await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
  });

  it('Step 2: Create New Enclave Model', async function (): Promise<any> {
    // Creating Enclave Model
    await nestedEnClaveModel.createNestedEnclaveModel('PUBLISHED', assetName, desc, attitibuteTag, 'roottemplate.json', nestedTemplateName, 'E2E Admin');
    await ExpectHelper.isListElementExists(nestedEnClaveModel.list, assetName);
    modelId = await nestedEnClaveModel.getId();
    await console.log('Enclave Model name is', assetName);
    await console.log('Enclave Model id is', modelId);
  });

  it('Step 3: Edit Enclave Model', async function (): Promise<any> {
    // Editing Created Enclave Model
    await nestedEnClaveModel.editNestedEnclaveModel(assetName, desc);
    await assetsManager.searchAssetManager(baseSurface, assetName + '  Updated');
    await ExpectHelper.isListElementExists(assetsManager.assetList, modelId);
  });

  it('Step 4: Delete Enclave Model', async function (): Promise<any> {
    // Deleting Enclave Model
    await nestedEnClaveModel.deleteNestedEnclaveModel(assetName);
    await ExpectHelper.expectDoesNotExists(assetsManager.enclaveModelElement(assetName));

  });

  it('Step 5: Verify Enclave Model Deleted Or Not', async function (): Promise<any> {
    // Verifying the Enclave Model is Deleted Or Not
    await nestedEnClaveModel.verifyNestedEnclaveModel(assetName);
    await ExpectHelper.expectDoesNotExists(assetsManager.enclaveModelElement(assetName));
  });

  it('Step 6: Clean Up', async function (): Promise<any> {
    // Clean Up
    await attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});