import { Risk } from '../pageObjects/risks.Po';
import { ExpectHelper } from '../utils/expectHelper';
import { PolicyGroup } from '../pageObjects/policyGroup.Po';
import { AssetManager } from '../pageObjects/assetManager.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';
import { browser, ExpectedConditions } from 'protractor';
import { getIdFromUrl } from '../utils/utils';


describe('Verifying Policy Violation', async function () {

    let originalTimeout;
    let risk = new Risk();
    let EC = ExpectedConditions;
    let policyPage = new PolicyGroup();
    let attributeTag = new AttributeTag();
    let assetsManager = new AssetManager();
    let properties = require('../conf/properties');
    let policyGroupTemplatePage = new PolicyGroupTemplatePage();

    let attributeTagName = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
    let attributeTagDesc = properties.attributeTagData.violationAttributeTagDescription;
    let policyGroupTemplateName = properties.policyGroupTemplateData.policyGroupTemplateNameWithAWSProducts + policyGroupTemplatePage.getRandomNum(1, 1000);
    let policyGroupTemplatedesc = properties.policyGroupTemplateData.policyGroupTemplateDescWithAWSProducts;
    let policyGroupName = properties.policyGroupData.violationPolicyGroupName + policyPage.getRandomNum(1, 1000);
    let policyGroupDescription = properties.policyGroupData.violationPolicyGroupDescription;
    let assetName = properties.enclaveModelData.violationModel + assetsManager.getRandomNum(1, 1000);
    let description = properties.enclaveModelData.ViolationDescription;
    let baseSurface = properties.SurfaceData.surfaceName;
    let attributeTags = [attributeTagName];
    let service = ['AWS::S3'];
    let modelId;

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

    it('Step 2: Create New Enclave Model With Above Created Attribute Tag', async function (): Promise<any> {
        // Creating Enclave Model
        await assetsManager.createEnclaveModel(baseSurface, 'PUBLISHED', assetName, description, attributeTags, 'ec2template.json', 'E2E Admin');
        modelId = await assetsManager.getId();
        await console.log('Enclave Model name is', assetName);
        await console.log('Enclave Model id is', modelId);
        await assetsManager.searchAssetManager(baseSurface, assetName);
        await ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
    });

    it('Step 3: Creating Policy Group Template with  Published', async function (): Promise<any> {
        // Creating Policy Group Template
        await policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Stacks');
        await policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, policyGroupTemplateName);
        await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
        await console.log('Policy Group Template name is', policyGroupTemplateName);
    });

    it('Step 4: Creating Policy Group with S3 ', async function (): Promise<any> {
        // Creating Policy Group
        await policyPage.createPolicyGroup(baseSurface, policyGroupName, policyGroupDescription, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, service);
        let policyId = await getIdFromUrl();
        await console.log('Policy Group Id is', policyId);
        await console.log('Policy Group name is', policyGroupName);
        await policyPage.searchPolicyGroup(baseSurface, policyGroupName);
        await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
    });

    it('Step 5: Verifying Risk ', async function (): Promise<any> {
        // Verifying Risk
        await risk.openRisk(modelId);
        await ExpectHelper.isListElementExists(risk.risklist, modelId);
        await console.log('Risk Happened For', modelId);
    });

    it('Step 6: CleanUp ', async function (): Promise<any> {
        // CleanUp
        await policyPage.deletePolicyGroup(baseSurface, policyGroupName, 'false');
        await policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, policyGroupTemplateName, 'false');
        await assetsManager.deleteEnclaveModel(baseSurface, assetName, 'false');
        await attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});
