import { ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';

describe('Creaing Policy Group Template Concourse ', async function () {
  let originalTimeout;
  let EC = ExpectedConditions;
  let properties = require('../conf/properties');
  let policyGroupTemplatePage = new PolicyGroupTemplatePage();
  let templateNameDraft = properties.policyGroupTemplateData.policyGroupTemplateNameDraft + policyGroupTemplatePage.getRandomNum(1, 1000);
  let descDraft = properties.policyGroupTemplateData.policyGroupTemplateDescDraft;
  let templateNamePublish = properties.policyGroupTemplateData.policyGroupTemplateNamePublish + policyGroupTemplatePage.getRandomNum(1, 1000);
  let descPublish = properties.policyGroupTemplateData.policyGroupTemplateDescPublish;
  let baseSurface = properties.SurfaceData.surfaceName;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
  });

  it('Step 1: Create New Policy Group Template With Draft Status', async function (): Promise<any> {
    // Create a policy Template selecting status as DRAFT
    await policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'DRAFT', templateNameDraft, descDraft, 'Allowed AWS Products in Stacks');
    await policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, templateNameDraft);
    await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, templateNameDraft);
  });

  it('Step 2: Edit Policy Group Template With Draft Status', async function (): Promise<any> {
    // Create a policy Template selecting status as DRAFT
    await policyGroupTemplatePage.editPolicyGroupTemplate(baseSurface, templateNameDraft, descDraft);
    await policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, templateNameDraft + ' Updated');
    await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, templateNameDraft + ' Updated');
  });

  it('Step 3: Delete Policy Group Template With Draft Status', async function (): Promise<any> {
    // Create a policy Template selecting status as DRAFT
    await policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, templateNameDraft);
    await ExpectHelper.expectDoesNotExists(policyGroupTemplatePage.searchPolicyGroupTemplateName(templateNameDraft));
  });

  it('Step 4: Verify Policy Group Template With Draft Status Deleted or Not', async function (): Promise<any> {
    await policyGroupTemplatePage.verifyPolicyGroupTemplate(templateNameDraft);
    await policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, templateNameDraft + ' Updated');
    await ExpectHelper.expectDoesNotExists(policyGroupTemplatePage.searchPolicyGroupTemplateName(templateNameDraft + ' Updated'));
  });

  it('Step 5: Creating Policy Group Template with  Published', async function (): Promise<any> {
    // Verify if the plolciy Template is created as Published
    await policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', templateNamePublish, descPublish, 'Allowed AWS Products in Stacks');
    await policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, templateNamePublish);
    await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, templateNamePublish);
  });

  it('Step 6: CleanUp', async function (): Promise<any> {
    // Delete The Policy Group Template With Publish Status
    await policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, templateNamePublish, 'false');
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

});