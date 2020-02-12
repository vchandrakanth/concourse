import { ExpectedConditions, browser } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { BaseLineAsset } from '../pageObjects/baseLineAssets.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';


describe('Creating BaseLine Asset', async function () {
  let originalTimeout;
  let EC = ExpectedConditions;
  let baseLineAsset = new BaseLineAsset();
  let properties = require('../conf/properties');
  let attributeTag = new AttributeTag();
  let assetName = properties.enclaveModelData.modelName + baseLineAsset.getRandomNum(1, 1000);
  let desc = properties.enclaveModelData.modelDescription;
  let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
  let attributeTagdescription = properties.attributeTagData.attributeDescription1;
  let attitibuteTag = [attributeTagName];
  let baseSurface = properties.SurfaceData.surfaceName;
//   let account = properties.BaseLineData.accountName;
  let accountName = ['0ecb99ea-ca1a-4be6-96cc-ceb57b7b63d4'];
//   let subscriptionName = properties.BaseLineData.subscription;
  let subscription = ['3263f5e2-3561-433c-97f2-e31b389e45ff'];
//   let resourceGroupName = properties.BaseLineData.resourceGroup;
  let resourceGroup = ['TestConnection'];
//   let productType = properties.BaseLineData.product;
  let product = ['Microsoft.Batch/batchAccounts'];
//   let regionName = properties.BaseLineData.region;
  let region = ['South India'];
//   let tagKey = properties.BaseLineData.key;
  let key = ['creation_data:20200129'];
//   let tagValue =  properties.BaseLineData.value;
  let value = ['creation_data:20200129'];
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
    await baseLineAsset.createBaseLineAsset(baseSurface, 'PUBLISHED', assetName, desc, 'E2E Admin', accountName, subscription,
    resourceGroup, product, region, key, value, attitibuteTag);
    baseLineAssetId = await baseLineAsset.getId();
    await console.log('BaseLine Asset name is', assetName);
    await console.log('BaseLine Asset id is', baseLineAssetId);
  });
});