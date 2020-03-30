import { ExpectedConditions, browser } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { AssetManager } from '../pageObjects/assetManager.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';


describe('Creating Enclave Models ', async function () {
  let originalTimeout;
  let EC = ExpectedConditions;
  let assetsManager = new AssetManager();
  let properties = require('../conf/properties');
  let attributeTag = new AttributeTag();
  let assetName = properties.enclaveModelData.modelName + assetsManager.getRandomNum(1, 1000);
  let desc = properties.enclaveModelData.modelDescription;
  let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
  let attributeTagdescription = properties.attributeTagData.attributeDescription1;
  let attitibuteTag = [attributeTagName];
  let baseSurface = properties.SurfaceData.surfaceName;
  let modelId;

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
    await assetsManager.createEnclaveModel(baseSurface, 'PUBLISHED', assetName, desc, attitibuteTag, 'concourseInfra.json', 'E2E Admin');
    modelId = await assetsManager.getId();
    await console.log('Enclave Model name is', assetName);
    await console.log('Enclave Model id is', modelId);
    await assetsManager.searchAssetManager(baseSurface, assetName);
    await ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
  });

  it('Step 3: Edit Enclave Model', async function (): Promise<any> {
    // Editing Created Enclave Model
    await assetsManager.editEnclaveModel(baseSurface, assetName, desc);
    await assetsManager.searchAssetManager(baseSurface, assetName + '  Updated');
    await ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
  });

  it('Step 4: Delete Enclave Model', async function (): Promise<any> {
    // Deleting Enclave Model
    await assetsManager.deleteEnclaveModel(baseSurface, assetName);
    await ExpectHelper.expectDoesNotExists(assetsManager.enclaveModelElement(assetName));
  });

  it('Step 5: Verify Enclave Model Deleted Or Not', async function (): Promise<any> {
    // Verifying the Enclave Model is Deleted Or Not
    await assetsManager.verifyEnclaveModel(assetName);
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