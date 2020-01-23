// import { ExpectedConditions } from 'protractor';
// import { ExpectHelper } from '../utils/expectHelper';
// import { CloudRoles } from '../pageObjects/cloudRoles.Po';
// import { getIdFromUrl } from '../utils/utils';
// import { Group } from '../pageObjects/groups.Po';
// describe('Creating Cloud Roles', async function () {
//     let originalTimeout;
//     let EC = ExpectedConditions;
//     let cloudRole = new CloudRoles();
//     let group = new Group();
//     let properties = require('../conf/properties');
//     let cloudRoleName = properties.CloudRolesData.cloudRoleName + cloudRole.getRandomNum(1, 1000);
//     let description = properties.CloudRolesData.cloudRoleDesc;
//     let provider = properties.CloudRolesData.amazonProvider;
//     let amazonAction = ['a4b:DisassociateDeviceFromRoom'];
//     let amazonNonAction = ['a4b:DeleteUser'];
//     let amazonEditAction = ['a4b:AssociateDeviceWithRoom'];
//     let baseSurface = properties.SurfaceData.surfaceName;
//     let groupName = properties.groupData.groupName + group.getRandomNum(1, 1000);
//     let groupDescription = properties.groupData.groupDescription;
//     let user = properties.groupData.user;
//     let cloudRoles = [cloudRoleName];
//     let roleId;
//     let groupId;
//     beforeEach(function () {
//         originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
//         jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
//     });
//     it('Step 1: Create New Cloud Role', async function (): Promise<any> {
//         await cloudRole.createCloudRole(baseSurface, cloudRoleName, description, provider, 'DRAFT', amazonAction, amazonNonAction);
//         await ExpectHelper.isListElementExists(cloudRole.list, cloudRoleName);
//         roleId = await getIdFromUrl();
//         await console.log('Cloud Role id is', roleId);
//     });
//     it('Step 2: Create New Group', async function (): Promise<any> {
//         await group.createGroup(baseSurface, groupName, groupDescription, 0);
//         await ExpectHelper.isListElementExists(group.groupList, groupName);
//         groupId = await group.getId();
//         await console.log('Group id is', groupId);
//     });
//     it('Step 3: Asign User For New Group', async function (): Promise<any> {
//         await group.assignUserForGroup(baseSurface, groupName, user, 0);
//         await ExpectHelper.isListElementExists(group.groupList, groupName);
//     });
//     it('Step 4: Add Cloud Role For Group', async function (): Promise<any> {
//         await group.assignCloudRoleForGroup(baseSurface, groupName, 0, cloudRoles);
//         await ExpectHelper.isListElementExists(group.groupList, groupName);
//     });
//     it('Step 5: Pubish the Draft Cloud Role', async function (): Promise<any> {
//         await cloudRole.publishDraftCloudRole(baseSurface, cloudRoleName);
//         await ExpectHelper.isListElementExists(cloudRole.list, cloudRoleName);
//     });
//     it('Step 6: Clean UP', async function (): Promise<any> {
//         await group.removeCloudRolesFromGroup(baseSurface, groupName, 1, cloudRoles);
//         await group.dissociateGroup(baseSurface, groupName, groupId);
//         await group.removeUserForGroup(baseSurface, groupName, user);
//         await group.deleteGroup(baseSurface, groupName);
//         await cloudRole.deleteCloudRole(baseSurface, cloudRoleName);
//     });
//     afterEach(function () {
//         jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
//     });
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlQ2xvdWRSb2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NwZWNzL3VwZGF0ZUNsb3VkUm9sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxtREFBbUQ7QUFDbkQsd0RBQXdEO0FBQ3hELDZEQUE2RDtBQUM3RCxpREFBaUQ7QUFDakQsb0RBQW9EO0FBR3BELHVEQUF1RDtBQUN2RCwyQkFBMkI7QUFDM0IsbUNBQW1DO0FBQ25DLHdDQUF3QztBQUN4QywrQkFBK0I7QUFDL0Isc0RBQXNEO0FBQ3RELHFHQUFxRztBQUNyRyxpRUFBaUU7QUFDakUsK0RBQStEO0FBQy9ELDZEQUE2RDtBQUM3RCxnREFBZ0Q7QUFDaEQsOERBQThEO0FBQzlELDREQUE0RDtBQUM1RCxvRkFBb0Y7QUFDcEYsb0VBQW9FO0FBQ3BFLDRDQUE0QztBQUM1Qyx3Q0FBd0M7QUFDeEMsa0JBQWtCO0FBQ2xCLG1CQUFtQjtBQUVuQiwrQkFBK0I7QUFDL0IsOERBQThEO0FBQzlELHFEQUFxRDtBQUNyRCxVQUFVO0FBRVYsNEVBQTRFO0FBQzVFLHNJQUFzSTtBQUN0SSxpRkFBaUY7QUFDakYseUNBQXlDO0FBQ3pDLHlEQUF5RDtBQUN6RCxVQUFVO0FBRVYsdUVBQXVFO0FBQ3ZFLGdGQUFnRjtBQUNoRiw4RUFBOEU7QUFDOUUseUNBQXlDO0FBQ3pDLHFEQUFxRDtBQUNyRCxVQUFVO0FBRVYsK0VBQStFO0FBQy9FLDJFQUEyRTtBQUMzRSw4RUFBOEU7QUFDOUUsVUFBVTtBQUVWLCtFQUErRTtBQUMvRSxzRkFBc0Y7QUFDdEYsOEVBQThFO0FBQzlFLFVBQVU7QUFFVixrRkFBa0Y7QUFDbEYsNkVBQTZFO0FBQzdFLGlGQUFpRjtBQUNqRixVQUFVO0FBRVYsK0RBQStEO0FBQy9ELHdGQUF3RjtBQUN4Rix3RUFBd0U7QUFDeEUsd0VBQXdFO0FBQ3hFLDJEQUEyRDtBQUMzRCx1RUFBdUU7QUFDdkUsVUFBVTtBQUVWLDhCQUE4QjtBQUM5Qiw4REFBOEQ7QUFDOUQsVUFBVTtBQUNWLE1BQU0ifQ==