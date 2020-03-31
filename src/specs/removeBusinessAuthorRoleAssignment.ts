import { ExpectedConditions, browser } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { Group } from '../pageObjects/groups.Po';
import { Surface } from '../pageObjects/surfaces.Po';
import { AssetManager } from '../pageObjects/assetManager.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { LogicalDeployment } from '../pageObjects/logicalDeployment.Po';

describe('Removing Business Author Role Assignments with Underlying LogicalDeployment on Model', async function () {
    let group = new Group();
    let surface = new Surface();
    let originalTimeout;
    let properties = require('../conf/properties');
    let businessAuthorRole = ['Business Author'];
    let responsibilities = ['Manage Attribute Tags', 'Manage Models', 'Manage Baselines', 'View Reports'];
    let rootSurfaceLayer = ['Default Surface - Root Surface Layer'];
    let attributeTag = new AttributeTag();
    let assetsManager = new AssetManager();
    let logicalDeployment = new LogicalDeployment();
    let groupName = properties.groupData.groupName + group.getRandomNum(1, 1000);
    let groupDescription = properties.groupData.groupDescription;
    let assetName = properties.enclaveModelData.modelName + assetsManager.getRandomNum(1, 1000);
    let desc = properties.enclaveModelData.modelDescription;
    let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
    let attributeTagdescription = properties.attributeTagData.attributeDescription1;
    let attitibuteTag = [attributeTagName];
    let baseSurface = properties.SurfaceData.surfaceName;
    let deploymentName = properties.logicalDeploymentData.deploymentName + logicalDeployment.getRandomNum(1, 1000);
    let stackName = properties.logicalDeploymentData.stackName + logicalDeployment.getRandomNum(1, 1000);
    let groupId;
    let modelId;
    let deploymentId;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    });

    it('Step 1: Create New Group', async function (): Promise<any> {
        // Creating New Group
        await group.createGroup(baseSurface, groupName, groupDescription, 0);
        // Verify if the Group is created
        await ExpectHelper.isListElementExists(group.groupList, groupName);
        groupId = await group.getId();
        await console.log('Group id is', groupId);
        await browser.refresh();
    });

    it('Step 2: Asign User For New Group', async function (): Promise<any> {
        // Assigning User For Newly Created Group
        await group.assignUserForGroup(baseSurface, groupName, browser.params.user, 0);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
    });

    it('Step 3: Add Role Assignment For Group', async function (): Promise<any> {
        // Assigning Roles For Group
        await group.addRoleToGroup(baseSurface, groupName, businessAuthorRole, responsibilities, rootSurfaceLayer);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
    });

    it('Step 4: Create Attribute Tag', async function (): Promise<any> {
        // Creating Attribute Tag
        await attributeTag.createAttributeTag(baseSurface, attributeTagName, attributeTagdescription);
        await attributeTag.searchAttribute(baseSurface, attributeTagName, 'Description');
        await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
    });

    it('Step 5: Create New Enclave Model', async function (): Promise<any> {
        // Creating Enclave Model
        await assetsManager.createEnclaveModel(baseSurface, 'PUBLISHED', assetName, desc, attitibuteTag, 'concourseInfra.json', groupName);
        modelId = await assetsManager.getId();
        await console.log('Enclave Model name is', assetName);
        await console.log('Enclave Model id is', modelId);
        await assetsManager.searchAssetManager(baseSurface, assetName);
        await ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
    });

    it('Step 6: Logical Deployement', async function (): Promise<any> {
        // Creating Logical Deployement
        await logicalDeployment.newlogicalDeployment(baseSurface, assetName, deploymentName, stackName, 'us-east-1', 'Default Surface - Root Surface Layer', 'Account-123456987456');
        await logicalDeployment.searchLogicalDeployment(baseSurface, deploymentName);
        await ExpectHelper.isListElementExists(logicalDeployment.logicalDeploymentList, deploymentName);
        deploymentId = await logicalDeployment.getId();
        await console.log('Logical Deployment Name is', deploymentName);
        await console.log('Logical Deployment id is', deploymentId);
    });

    it('Step 7: Remove Role Assignment From Group', async function (): Promise<any> {
        // Removing Role From Group
        await group.removeRolesFromGroup(baseSurface, groupName, businessAuthorRole);
        await ExpectHelper.verifyContainsText(group.alertWindow, 'alertWindow', `Cannot remove role because Group ${groupId} is discovery owning group of Enclave Model.`);
        // Cannot remove role because Logical Deployment to Surface Layer will no longer be covered by this Enclave Model owning group.
        await browser.refresh();
    });

    it('Step 8: Delete Logical Deployment', async function (): Promise<any> {
        // Delete Logical Deployement
        await logicalDeployment.deleteLogicalDeployement(baseSurface, deploymentName);
        await ExpectHelper.expectDoesNotExists(logicalDeployment.logicalDeployementElement(deploymentName));
    });

    it('Step 12: Delete Enclave Model', async function (): Promise<any> {
            // Deleting Enclave Model
            await assetsManager.deleteEnclaveModel(baseSurface, assetName, 'false');
            await ExpectHelper.expectDoesNotExists(assetsManager.enclaveModelElement(assetName));
        });

    it('Step 9: Remove Role Assignment From Group', async function (): Promise<any> {
        // Removing Role From Group
        await group.removeRolesFromGroup(baseSurface, groupName, businessAuthorRole);
        await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(businessAuthorRole));
    });

    it('Step 10: Verify Role Assignment Removed Or Not', async function (): Promise<any> {
        // Verifying the Role is Removed Or Not
        await group.verifyRolesInUI(baseSurface, groupName, businessAuthorRole);
        await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(businessAuthorRole));
    });

    it('Step 11: Add Role Assignment again For Group', async function (): Promise<any> {
        // Assigning Roles For Group
        await group.addRoleToGroup(baseSurface, groupName, businessAuthorRole, responsibilities, rootSurfaceLayer);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
    });

    // it('Step 12: Delete Enclave Model', async function (): Promise<any> {
    //     // Deleting Enclave Model
    //     await assetsManager.deleteEnclaveModel(baseSurface, assetName, 'false');
    //     await ExpectHelper.expectDoesNotExists(assetsManager.enclaveModelElement(assetName));
    // });

    it('Step 13: Delete Attribute Tag', async function (): Promise<any> {
        // Deleting Attribute Tag
        await attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
    });

    it('Step 14: Remove Role Assignment From Group', async function (): Promise<any> {
        // Removing Role From Group
        await group.removeRolesFromGroup(baseSurface, groupName, businessAuthorRole);
        await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(businessAuthorRole));
    });

    it('Step 15: Remove User From Group', async function (): Promise<any> {
        // Removing User From Group
        await group.removeUserForGroup(baseSurface, groupName, browser.params.user);
        await ExpectHelper.expectDoesNotExists(group.selectUserToDelete(groupName));
    });

    it('Step 16: Deassociate Group', async function (): Promise<any> {
        //  Deleting Group
        await group.dissociateGroup(baseSurface, groupName, groupId);
    });

    it('Step 17: Delete Group', async function (): Promise<any> {
        //  Deleting Group
        await group.deleteGroup(baseSurface, groupName);
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});