// import { browser, element, by, By, $, $$, ExpectedConditions, Browser } from 'protractor';
// import { AssetManager } from '../pageObjects/assetManager.Po';
// import { LogicalDeployment } from '../pageObjects/logicalDeployment.Po';
// import { AttributeTag } from '../pageObjects/attributeTags.Po';
// import { PolicyGroup } from '../pageObjects/policyGroup.Po';
// import { Approvals } from '../pageObjects/approvals.Po';
// import { Risk } from '../pageObjects/risks.Po';
// import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';
// describe('Login Concourse ', async function () {
//     let originalTimeout;
//     let EC = ExpectedConditions;
//     let assetsManager = new AssetManager();
//     let attributeTag = new AttributeTag();
//     let logicalDeployment = new LogicalDeployment();
//     let policyPage = new PolicyGroup();
//     let approvals = new Approvals();
//     let risk = new Risk();
//     let properties = require('../conf/properties');
//     // let updateAttribute = new updateAttributeTagForPG();
//     let policyGroupTemplatePage = new PolicyGroupTemplatePage();
//     beforeEach(function () {
//         originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
//         jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
//     });
//     it('Step 1: Remove Existing Organaization For Policy Group', async function (): Promise<any> {
//         // Creating Attribute Tag
//         let attributeName = properties.attributeTagData.violationAttributeName;
//         let attributeDescription = properties.attributeTagData.violationAttributeDescription;
//         await attributeTag.createAttributeTag(attributeName, attributeDescription);
//         // Creating Enclave Model
//         let assetname = properties.enclaveModelData.deploymentModelName;
//         let description = properties.enclaveModelData.deploymentModelDescription;
//         await assetsManager.createEnclaveModel('PUBLISHED', assetname, description, attributeName, 'concourse-infrastructure.json');
//         let modelid = await assetsManager.getId();
//         await console.log('Enclave Model id is', modelid);
//         // Creating Logical Deployement
//         // await logicalDeployment.newlogicalDeployment();
//         let deploymentId = await assetsManager.getId();
//         await console.log('Enclave Model id is', deploymentId);
//         // Creating Policy Group Template
//         await policyGroupTemplatePage.createpolicyGroupTemplate('PUBLISHED');
//         // Creating Policy Group
//         // await policyPage.createPolicyGroup('policyName', 'policyDescription', 'PUBLISHED', attributeName, 'EC2');
//         let policyId = await policyPage.getId();
//         await console.log('Policy Group  id Is', policyId);
//         // Remove Organization For Policy Group
// await policyPage.removeOrganizationForPG();
//     });
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlT3JnYW5pemF0aW9uRm9yIFBHLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NwZWNzL3JlbW92ZU9yZ2FuaXphdGlvbkZvciBQRy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2RkFBNkY7QUFDN0YsaUVBQWlFO0FBQ2pFLDJFQUEyRTtBQUMzRSxrRUFBa0U7QUFDbEUsK0RBQStEO0FBQy9ELDJEQUEyRDtBQUMzRCxrREFBa0Q7QUFDbEQsbUZBQW1GO0FBRW5GLG1EQUFtRDtBQUNuRCwyQkFBMkI7QUFDM0IsbUNBQW1DO0FBQ25DLDhDQUE4QztBQUM5Qyw2Q0FBNkM7QUFDN0MsdURBQXVEO0FBQ3ZELDBDQUEwQztBQUMxQyx1Q0FBdUM7QUFDdkMsNkJBQTZCO0FBQzdCLHNEQUFzRDtBQUN0RCw4REFBOEQ7QUFDOUQsbUVBQW1FO0FBRW5FLCtCQUErQjtBQUUvQiw4REFBOEQ7QUFDOUQscURBQXFEO0FBQ3JELFVBQVU7QUFFVixxR0FBcUc7QUFFckcsb0NBQW9DO0FBQ3BDLGtGQUFrRjtBQUNsRixnR0FBZ0c7QUFDaEcsc0ZBQXNGO0FBRXRGLG9DQUFvQztBQUNwQywyRUFBMkU7QUFDM0Usb0ZBQW9GO0FBQ3BGLHVJQUF1STtBQUN2SSxxREFBcUQ7QUFDckQsNkRBQTZEO0FBRTdELDBDQUEwQztBQUMxQyw2REFBNkQ7QUFDN0QsMERBQTBEO0FBQzFELGtFQUFrRTtBQUVsRSw0Q0FBNEM7QUFDNUMsZ0ZBQWdGO0FBRWhGLG1DQUFtQztBQUNuQyx1SEFBdUg7QUFDdkgsbURBQW1EO0FBQ25ELDhEQUE4RDtBQUU5RCxrREFBa0Q7QUFDMUMsOENBQThDO0FBRXRELFVBQVU7QUFDVixNQUFNIn0=