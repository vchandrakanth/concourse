import { ExpectedConditions, browser } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { BaseLineAsset } from '../pageObjects/baseLineAssets.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';


describe('Creating BaseLine Asset', async function () {
  let originalTimeout;
  let baseLineAsset = new BaseLineAsset();
  let properties = require('../conf/properties');
  let attributeTag = new AttributeTag();
  let baselineAssetName = properties.enclaveModelData.modelName + baseLineAsset.getRandomNum(1, 1000);
  let desc = properties.enclaveModelData.modelDescription;
  let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
  let attributeTagdescription = properties.attributeTagData.attributeDescription1;
  let attitibuteTag = [attributeTagName];
  let baseSurface = properties.SurfaceData.surfaceName;

  let accountName = ['0ecb99ea-ca1a-4be6-96cc-ceb57b7b63d4'];
  let subscription = ['3263f5e2-3561-433c-97f2-e31b389e45ff'];
  let resourceGroup = ['TestConnection'];
  let product = ['Microsoft.Batch/batchAccounts'];
  let region = ['South India'];
  let key = ['service'];
  let value = ['istio-system/istio-ingressgateway'];
  let baseLineAssetId;

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

  it('Step 2: Create New BaseLine Asset', async function (): Promise<any> {
    // Creating BaseLine Asset
    await baseLineAsset.createBaseLineAsset(baseSurface, 'DRAFT', baselineAssetName, desc, 'E2E Admin', accountName, subscription,
      resourceGroup, product, region, key, value, attitibuteTag);
    baseLineAssetId = await baseLineAsset.getId();
    await console.log('BaseLine Asset name is', baselineAssetName);
    await console.log('BaseLine Asset id is', baseLineAssetId);
  });
});