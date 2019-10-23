import { ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';

describe('Policy Group Concourse ', async function () {
  let originalTimeout;
  let EC = ExpectedConditions;
  let properties = require('../conf/properties');
  let policyGroupTemplatePage = new PolicyGroupTemplatePage();
  let templateNameDraft = properties.policyGroupTemplateData.policyGroupTemplateNameDraft + policyGroupTemplatePage.getRandomNum(1, 1000);
  let descDraft = properties.policyGroupTemplateData.policyGroupTemplateDescDraft;
  let templateNamePublish = properties.policyGroupTemplateData.policyGroupTemplateNamePublish + policyGroupTemplatePage.getRandomNum(1, 1000);
  let descPublish = properties.policyGroupTemplateData.policyGroupTemplateDescPublish;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
  });

  it('Step 1: Create New Policy Group Template With Draft Status', async function (): Promise<any> {
    // Create a policy Template selecting status as DRAFT
    await policyGroupTemplatePage.createPolicyGroupTemplate('DRAFT', templateNameDraft, descDraft, 'Allowed AWS Products on Accounts');
    await policyGroupTemplatePage.searchPolicyGroupTemplate(templateNameDraft);
    await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, templateNameDraft);
  });

  it('Step 2: Edit Policy Group Template With Draft Status', async function (): Promise<any> {
    // Create a policy Template selecting status as DRAFT
    await policyGroupTemplatePage.editPolicyGroupTemplate(templateNameDraft, descDraft);
    await policyGroupTemplatePage.searchPolicyGroupTemplate(templateNameDraft + ' Updated');
    await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, templateNameDraft + ' Updated');
  });

  it('Step 3: Delete Policy Group Template With Draft Status', async function (): Promise<any> {
    // Create a policy Template selecting status as DRAFT
    await policyGroupTemplatePage.deletePolicyGroupTemplate(templateNameDraft);
    await ExpectHelper.expectDoesNotExists(policyGroupTemplatePage.searchPolicyGroupTemplateName(templateNameDraft));
  });

  it('Step 4: Verify Policy Group Template With Draft Status Deleted or Not', async function (): Promise<any> {
    await policyGroupTemplatePage.verifyPolicyGroupTemplate(templateNameDraft);
    await policyGroupTemplatePage.searchPolicyGroupTemplate(templateNameDraft + ' Updated');
    await ExpectHelper.expectDoesNotExists(policyGroupTemplatePage.searchPolicyGroupTemplateName(templateNameDraft + ' Updated'));
  });

  it('Step 5: Creating Policy Group Template with  Published', async function (): Promise<any> {
    // Verify if the plolciy Template is created as Published
    await policyGroupTemplatePage.createPolicyGroupTemplate('PUBLISHED', templateNamePublish, descPublish, 'Allowed AWS Products on Accounts');
    await policyGroupTemplatePage.searchPolicyGroupTemplate(templateNamePublish);
    await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, templateNamePublish);
  });

  it('Step 6: CleanUp', async function (): Promise<any> {
    // Delete The Policy Group Template With Publish Status
    await policyGroupTemplatePage.deletePolicyGroupTemplate(templateNamePublish, 'false');
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

});