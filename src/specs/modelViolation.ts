import { browser, ExpectedConditions } from 'protractor';
import { Risk } from '../pageObjects/risks.Po';
import { ExpectHelper } from '../utils/expectHelper';
import { PolicyGroup } from '../pageObjects/policyGroup.Po';
import { AssetManager } from '../pageObjects/assetManager.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';

describe('Creaing Model Violations ', async function () {
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
  let policyGroupName1 = properties.policyGroupData.modelViolationPolicyGroupName + policyPage.getRandomNum(1, 1000);
  let policyGroupDescription1 = properties.policyGroupData.modelViolationPolicyGroupDescription;
  let assetName = properties.enclaveModelData.violationModel + assetsManager.getRandomNum(1, 1000);
  let description = properties.enclaveModelData.ViolationDescription;
  let attributeTags = [attributeTagName, attributeTagName1];
  let entityType = properties.ApprovalsData.policyGroupType;
  let service = ['AWS::S3'];
  let service1 = ['AWS::EC2'];
  let ID;
  let riskId;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
  });

  it('Step 1: Create Attribute Tag', async function (): Promise<any> {
    // Creating Attribute Tag
    await attributeTag.createAttributeTag(attributeTagName, attributeTagDesc);
    await attributeTag.searchAttribute(attributeTagName, 'attributeTagDesc');
    await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
    await console.log('Attribute Tag name is', attributeTagName);
  });

  it('Step 2: Create Another Attribute Tag', async function (): Promise<any> {
    // Creating Another Attribute Tag
    await attributeTag.createAttributeTag(attributeTagName1, attributeTagDesc1);
    await attributeTag.searchAttribute(attributeTagName1, 'attributeTagDesc');
    await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName1);
    await console.log('Attribute Tag name is', attributeTagName1);
  });

  it('Step 3: Creating Policy Group Template with  Published', async function (): Promise<any> {
    // Creating Policy Group Template
    await policyGroupTemplatePage.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Assets');
    await policyGroupTemplatePage.searchPolicyGroupTemplate(policyGroupTemplateName);
    await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
    await console.log('Policy Group Template name is', policyGroupTemplateName);
  });

  it('Step 4: Creating Policy Group with S3 ', async function (): Promise<any> {
    // // Creating Policy Group
    await policyPage.createPolicyGroup(policyGroupName, policyGroupDescription, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, service);
    let policyId = await policyPage.getId();
    await console.log('Policy Group name is', policyId);
    await console.log('Policy Group name is', policyGroupName);
    await policyPage.searchPolicyGroup(policyGroupName);
    await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
  });

  it('Step 5: Creating Policy Group with EC2 ', async function (): Promise<any> {
    // // Creating Policy Group
    await policyPage.createPolicyGroup(policyGroupName1, policyGroupDescription1, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName1, service1);
    let policyId1 = await policyPage.getId();
    await console.log('Policy Group name is', policyId1);
    await console.log('Policy Group id is', policyId1);
    await policyPage.searchPolicyGroup(policyGroupName1);
    await ExpectHelper.isListElementExists(policyPage.list, policyGroupName1);
  });

  it('Step 6: Create New Enclave Model With Above Created Attribute Tags', async function (): Promise<any> {
    // Creating Enclave Model
    await assetsManager.createEnclaveModel('PUBLISHED', assetName, description, attributeTags, 'concourseInfra.json', 'E2E Admin');
    ID = await assetsManager.getId();
    await console.log('Enclave Model name is', assetName);
    await console.log('Enclave Model id is', ID);
    await assetsManager.searchAssetManager(assetName);
    await ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
  });

  it('Step 7: Verifying Risk ', async function (): Promise<any> {
    // Verifying Risk
    await risk.openRisk(ID);
    await ExpectHelper.isListElementExists(risk.risklist, ID);
    await console.log('Risk Happened For', ID);
  });

  it('Step 8: Delete Enclave Model', async function (): Promise<any> {
    // Deleting Enclave Model
    await assetsManager.deleteEnclaveModel(assetName, 'false');
    await ExpectHelper.expectDoesNotExists(assetsManager.enclaveModelElement(assetName));
  });

  it('Step 9: Verifying Risk After Deletion Of Enclave Model', async function (): Promise<any> {
    // verifying Risk After Deletion Of Enclave Model
    await risk.openRisk(ID);
    await ExpectHelper.expectDoesNotExists(risk.riskElement(ID));
    await console.log('Risk Removed For', ID);
  });

  it('Step 10: CleanUp', async function (): Promise<any> {
    // Clean Up
    await policyPage.deletePolicyGroup(policyGroupName, 'false');
    await policyPage.deletePolicyGroup(policyGroupName1, 'false');
    await policyGroupTemplatePage.deletePolicyGroupTemplate(policyGroupTemplateName, 'false');
    await attributeTag.deleteAttributeTag(attributeTagName1, 'false');
    await attributeTag.deleteAttributeTag(attributeTagName, 'false');
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});