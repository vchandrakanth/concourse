import { browser, ExpectedConditions } from 'protractor';
import { Risk } from '../pageObjects/risks.Po';
import { ExpectHelper } from '../utils/expectHelper';
import { PolicyGroup } from '../pageObjects/policyGroup.Po';
import { AssetManager } from '../pageObjects/assetManager.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';
import { getIdFromUrl } from '../utils/utils';

describe('Verifying Violations ', async function () {
  let EC = ExpectedConditions;
  let risk = new Risk();
  let originalTimeout;
  let policyPage = new PolicyGroup();
  let attributeTag = new AttributeTag();
  let assetsManager = new AssetManager();
  let properties = require('../conf/properties');
  let policyGroupTemplatePage = new PolicyGroupTemplatePage();
  let attributeTagName = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
  let attributeTagDesc = properties.attributeTagData.violationAttributeTagDescription;
  let attributeTagName1 = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
  let attributeTagDesc1 = properties.attributeTagData.violationAttributeTagDescription;
  let policyGroupTemplateName = properties.policyGroupTemplateData.policyGroupTemplateNameWithAWSProducts + policyGroupTemplatePage.getRandomNum(1, 1000);
  let policyGroupTemplatedesc = properties.policyGroupTemplateData.policyGroupTemplateDescWithAWSProducts;
  let policyGroupName = properties.policyGroupData.modelViolationPolicyGroupName + policyPage.getRandomNum(1, 1000);
  let policyGroupDescription = properties.policyGroupData.modelViolationPolicyGroupDescription;
  let assetName = properties.enclaveModelData.violationModel + assetsManager.getRandomNum(1, 1000);
  let description = properties.enclaveModelData.ViolationDescription;
  let attitibuteTag = [attributeTagName1];
  let attitibuteTag1 = [attributeTagName1];
  let entityType = properties.ApprovalsData.policyGroupType;
  let baseSurface = properties.SurfaceData.surfaceName;
  let service = ['AWS::S3'];
  let modelId;
  let riskId;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
  });

  it('Step 1: Create Attribute Tag', async function (): Promise<any> {
    // Creating Attribute Tag
    await attributeTag.createAttributeTag(baseSurface, attributeTagName, attributeTagDesc);
    await attributeTag.searchAttribute(baseSurface, attributeTagName, 'attributeTagDesc');
    await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
    await console.log('Attribute Tag name is', attributeTagName);
  });

  it('Step 2: Create Another Attribute Tag', async function (): Promise<any> {
    // Creating Another Attribute Tag
    await attributeTag.createAttributeTag(baseSurface, attributeTagName1, attributeTagDesc1);
    await attributeTag.searchAttribute(baseSurface, attributeTagName1, 'attributeTagDesc');
    await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName1);
    await console.log('Attribute Tag name is', attributeTagName1);
  });

  it('Step 3: Creating Policy Group Template with  Published', async function (): Promise<any> {
    // Creating Policy Group Template
    await policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Stacks');
    await policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, policyGroupTemplateName);
    await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
    await console.log('Policy Group Template name is', policyGroupTemplateName);
  });

  it('Step 4: Creating Policy Group with S3 ', async function (): Promise<any> {
    // // Creating Policy Group
    await policyPage.createPolicyGroup(baseSurface, policyGroupName, policyGroupDescription, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, service,  ' ', ' ', ' ', 'Allowed AWS Products in Stacks 1');
    let s3PolicyGroupId = await getIdFromUrl();
    await console.log('Policy Group name is', s3PolicyGroupId);
    await console.log('Policy Group name is', policyGroupName);
    await policyPage.searchPolicyGroup(baseSurface, policyGroupName);
    await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
  });

  it('Step 2: Create New Enclave Model', async function (): Promise<any> {
    // Creating Enclave Model
    await assetsManager.createEnclaveModel(baseSurface, 'PUBLISHED', assetName, description, attitibuteTag, 's3template.json', 'E2E Admin');
    modelId = await assetsManager.getId();
    await console.log('Enclave Model name is', assetName);
    await console.log('Enclave Model id is', modelId);
    await assetsManager.searchAssetManager(baseSurface, assetName);
    await ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
    await browser.sleep(3000);
  });

  it('Step 4: Update New Enclave Model', async function (): Promise<any> {
    // Updating Enclave Model
    await assetsManager.updateEnclaveModel(baseSurface, assetName, attributeTagName);
    let modelid = await assetsManager.getId();
    await console.log('Enclave Model id is', modelid);
    await assetsManager.searchAssetManager(baseSurface, assetName);
    await ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
  });


  it('Step 7: Verifying Risk ', async function (): Promise<any> {
    // Verifying Risk
    await risk.openRisk(modelId);
    await ExpectHelper.isListElementExists(risk.riskdetail, modelId);
    await console.log('Risk Happened For', modelId);
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});