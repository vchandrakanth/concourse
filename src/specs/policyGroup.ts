// See README.md for important details.
import { ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';
import { PolicyGroup } from '../pageObjects/policyGroup.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';


describe('Creaing Policy Group Concourse ', async function () {
  let originalTimeout;
  let EC = ExpectedConditions;
  let attributeTag = new AttributeTag();
  let policyPage = new PolicyGroup();
  let properties = require('../conf/properties');
  let policyGroupTemplatePage = new PolicyGroupTemplatePage();
  let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
  let description = properties.attributeTagData.attributeDescription1;
  let policyGroupTemplateName = properties.policyGroupTemplateData.policyGroupTemplateNameWithAWSProducts + policyGroupTemplatePage.getRandomNum(1, 1000);
  let policyGroupTemplatedesc = properties.policyGroupTemplateData.policyGroupTemplateDescWithAWSProducts;
  let policyGroupNameDraft = properties.policyGroupData.policyGroupNameDraft + policyPage.getRandomNum(1, 1000);
  let policyGroupDescDraft = properties.policyGroupData.policyGroupDescDraft;
  let policyGroupNamePublish = properties.policyGroupData.policyGroupNamePublish + policyPage.getRandomNum(1, 1000);
  let policyGroupDescPublish = properties.policyGroupData.policyGroupDescPublish;
  let service = properties.ServicesData.service;
  let services = [service];

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
  });

  it('Step 1: Creating Attribute Tag', async function (): Promise<any> {
    // Creating Attribute Tag
    await attributeTag.createAttributeTag(attributeTagName, description);
    await attributeTag.searchAttribute(attributeTagName, 'Description');
    await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
  });

  // Creating policy group Tempalte
  it('Step 2: Creating Policy Group Template with  Published', async function (): Promise<any> {
    // Verify if the plolciy Template is created as Published
    await policyGroupTemplatePage.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products on Accounts');
    await policyGroupTemplatePage.searchPolicyGroupTemplate(policyGroupTemplateName);
    await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
  });

  it('Step 3: Creating Policy Group with  Draft', async function (): Promise<any> {
    // Creating Policy Group With Draft Status
    await policyPage.createPolicyGroup(policyGroupNameDraft, policyGroupDescDraft, 'E2E Admin', 'DRAFT', policyGroupTemplateName, attributeTagName, services);
    await policyPage.searchPolicyGroup(policyGroupNameDraft);
    await ExpectHelper.isListElementExists(policyPage.list, policyGroupNameDraft);
  });

  it('Step 4: Editing Policy Group with  Draft', async function (): Promise<any> {
    // Edit The Draft Policy Group
    await policyPage.editPolicyGroup(policyGroupNameDraft);
    await policyPage.searchPolicyGroup(policyGroupNameDraft + ' Updated');
    await ExpectHelper.isListElementExists(policyPage.list, policyGroupNameDraft + ' Updated');
  });

  it('Step 5: Deleting Policy Group with  Draft', async function (): Promise<any> {
    // Deleting Policy Group with Draft Status
    await policyPage.deletePolicyGroup(policyGroupNameDraft);
    // Policy Group Deleted
    await ExpectHelper.expectDoesNotExists(policyPage.searchPolicyGroupName(policyGroupNameDraft));
  });

  it('Step 6: Verify Policy Group With Draft Status Deleted or Not', async function (): Promise<any> {

    await policyPage.verifyPolicyGroup(policyGroupNameDraft);
    await policyPage.searchPolicyGroup(policyGroupNameDraft + ' Updated');
    await ExpectHelper.expectDoesNotExists(policyPage.searchPolicyGroupName(policyGroupNameDraft + ' Updated'));
  });

  it('Step 7: Creating Policy Group with  Published', async function (): Promise<any> {
    // Creating Policy Group with  Published
    await policyPage.createPolicyGroup(policyGroupNamePublish, policyGroupDescPublish, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services);
    await policyPage.searchPolicyGroup(policyGroupNamePublish);
    await ExpectHelper.isListElementExists(policyPage.list, policyGroupNamePublish);
  });

  it('Step 8: Edit Policies And Publish Policy Group', async function (): Promise<any> {
    // Edit Policies And Publish Policy Group
    await policyPage.editPoliciesandPublish(policyGroupNamePublish, 'AWS::S3');
    await policyPage.searchPolicyGroup(policyGroupNamePublish);
    await ExpectHelper.isListElementExists(policyPage.list, policyGroupNamePublish);
  });

  it('Step 9: Delete Published Policy Group', async function (): Promise<any> {
    // Edit Policies And Publish Policy Group
    await policyPage.deletePolicyGroup(policyGroupNamePublish, 'false');
  });

  it('Step 10: CleanUp', async function (): Promise<any> {
    // CleanUp
    await policyGroupTemplatePage.deletePolicyGroupTemplate(policyGroupTemplateName, 'false');
    await attributeTag.deleteAttributeTag(attributeTagName, 'false');
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});

