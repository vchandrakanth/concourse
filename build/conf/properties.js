module.exports = {
    adhoc: 'https://adhoc.concourse.company/',
    beta: 'https://beta.concourse.company/',
    prod: 'https://prod.concourselabs.io/',
    seleniumServerUrl: 'http://localhost:4444/wd/hub',
    // Login Data
    loginData: {
        adhocUserName: 'ramakrishna+e2etest@concourselabs.com',
        adhocPassWord: 'Concourse1!',
        betaUserName: 'ramakrishna+e2e@concourselabs.com',
        betaPassWord: 'Concourse1!',
        prodUserName: 'jian+e2e@concourselabs.com',
        prodPassWord: 'E2etest1!',
    },
    // policyGroupTemplate Data
    policyGroupTemplateData: {
        templateStatusDraftName1: 'Security Policy Group Template Draft AWS',
        templateStatusPublishedName1: 'E2E Test - Secure Perimeter Tag1 PGT',
        templateStatusDraftName: 'E2E Test - Whitelist PGT',
        policyGroupTemplateNameForViolation: 'Policy Group Template For Voilation',
        policyGroupTemplateDescForViolation: 'Policy Group Template For Voilation',
        policyGroupTemplateNameDraft: 'Policy Group Template With Draft',
        policyGroupTemplateDescDraft: 'Description of Policy Group Template With Draft',
        policyGroupTemplateNamePublish: 'Policy Group Template With Publish',
        policyGroupTemplateDescPublish: 'Description of Policy Group Template With Publish',
        requireApprovalPolicyGroupTemplateName: 'Require Approval PGT',
        requireApprovalPolicyGroupTemplateDesc: 'Require Approval PGT',
        policyGroupTemplateNameWithAWSProducts: 'AWS Products Policy Group Template',
        policyGroupTemplateDescWithAWSProducts: 'AWS Products Policy Group Template'
    },
    // policyGroup Data
    policyGroupData: {
        statusDraftName: 'Security Policy Group Draft AWS',
        statusPublishedName1: 'E2E Test - Secure Perimeter Tag1 PG',
        descriptionPolicyGroup1: 'E2E Test - Secure Perimeter Tag1 PG',
        statusPublishedName: 'Model Violation Policy Group',
        descriptionPolicyGroup: 'Model Violation Policy Group',
        violationPolicyGroupName: 'Policy Group For Violation',
        violationPolicyGroupDescription: 'Description Of Policy Group For Violation',
        editedStatusDraftName: 'Security Policy Group Draft AWS Demo',
        modelViolationPolicyGroupName: 'Policy Group Model Violation',
        modelViolationPolicyGroupDescription: 'Policy Group Model Violation',
        policyGroupNameDraft: 'Policy Group with Draft',
        policyGroupDescDraft: 'Description Of Test Policy Group with Draft',
        policyGroupNamePublish: 'Policy Group with Publish',
        policyGroupDescPublish: 'Description Of Test Policy Group with Publish',
        policyGroupName: 'Policy Group For Approval',
        policyGroupDesc: 'Description Of Policy Group For Approval'
    },
    // attribute Tag Data
    attributeTagData: {
        attributeName1: 'Test Attribute Tag',
        attributeDescription1: 'Test Attribute Tag For Testing Purpose',
        tagName: 'Test Attribute Tag',
        tagDescription: 'Test Attribute Tag For Testing Purpose',
        attributeName: 'EC2 - Attribute Tag',
        attributeDescription: 'EC2 - Attribute Tag For Violation',
        attributeName2: 'E2E Test - Restrict Ingress Tag',
        attributeDescription2: 'E2E Test - Restrict Ingress Tag',
        attributeName3: 'E2E Test - Restrict Egress Tag',
        attributeDescription3: 'E2E Test - Restrict Egress Tag',
        attributeName4: 'E2E Test - Whitelist Service Tag',
        attributeDescription4: 'E2E Test - Whitelist Service Tag',
        attributeName5: 'E2E Test - Approval Tag',
        attributeDescription5: 'E2E Test - Approval Tag',
        violationAttributeTagName: 'Attribute Tag For Violation',
        violationAttributeTagDescription: 'Attribute Tag For Violation',
        violationAttributeName1: 'Attribute Tag Model Violation',
        violationAttributeDescription1: 'Attribute Tag Model Violation'
    },
    // Enclave Model Data
    enclaveModelData: {
        enclaveModelName1: 'E2E Test - Secure Perimeter Tag1 Enclave Model',
        enclaveModelDescription1: 'E2E Test - Secure Perimeter Tag1 Enclave Model',
        enclaveModelName: 'EC2 Enclave Model',
        enclaveModelDescription: 'EC2 Enclave Model',
        descriptionPolicy: 'E2E Test - Secure Perimeter Tag1 Enclave Model',
        user: 'admin@concoursehub.com',
        ec2ModelName: 'EC2 Test - Enclave Model',
        ec2ModelDescription: 'EC2 Test - Enclave Model',
        s3ModelName: 'S3 Test - Enclave Model',
        s3ModelDescription: 'S3 Test - Enclave Model',
        deploymentModelName: 'Model For Violation',
        deploymentModelDescription: 'Model For Violation',
        violationModel: 'Enclave Model For Violation',
        ViolationDescription: 'Description Of Enclave Model For Violation',
        modelName: 'Test Enclave Model',
        modelDescription: 'Test Enclave Model'
    },
    // Group Data
    groupData: {
        groupName: 'E2E Test Group',
        groupDescription: 'Description Of E2E Test Group',
        // user: 'e2e Test <ramakrishna+e2etest@concourselabs.com>'
        user: 'e2e Test <ramakrishna+e2e@concourselabs.com>',
    },
    // Control Topology Data
    ControlTopologyData: {
        // Control Topology Data
        controlTopology: 'E2E Surface'
    },
    logicalDeploymentData: {
        deploymentName: 'E2E Test Deployment',
        stackName: 'E2E-TestStack-123',
        version: ' (v0.2)'
    },
    SurfaceData: {
        // Surface Data
        surfaceName: 'E2E Surface',
        surfaceLayer: 'Default Surface - Root Surface Layer',
        sampleSurfaceName: 'E2E Sample Surface',
        surfacedesc: 'Description For Surface',
        group: 'Root Admin',
        group1: 'TestGroup',
        defaultGroup: ' - Root Group',
        dataForAWSAccount: 'Aws Accounts',
        dataForAzureSubscription: 'Azure Subscriptions',
        dataForAzureAccount: 'Azure Account',
        dataForNetworkWhitelists: 'Network Whitelists',
        dataForInsightsUrls: 'Insights Urls',
        dataForPublicKeys: 'Insights Urls',
        accountKey: 'Account-123456789',
        accountValue: '123456789',
        whiteListValue: '10.10.10.1',
        azureSubscriptionKey: 'Account-123454321',
        azureSubscriptionValue: '123456978',
        UpdatedWhiteListValue: '10.10.10.2',
        value: '123',
    },
    ServicesData: {
        service1: 'AWS::S3',
        service: 'AWS::EC2'
    },
    UserPermissionData: {
        e2euser1: 'ramakrishna+e2e4@concourselabs.com',
        user1: 'ramakrishna+1@concourselabs.com',
        user2: 'ramakrishna+2@concourselabs.com',
        user3: 'ramakrishna+3@concourselabs.com',
        user4: 'ramakrishna+4@concourselabs.com',
        user5: 'ramakrishna+5@concourselabs.com',
        password: 'Concourse1!',
        module1: 'assets',
        module2: 'attribute-tags',
        module3: 'policy-group-templates',
        module4: 'policy-groups',
        module5: 'surfaces',
        module6: 'institutions/data',
        module7: 'user-management/groups',
        module8: 'user-management/users',
        e2eTestUser: 'ramakrishna+e2euser@concourselabs.com',
    },
    ApprovalsData: {
        policyGroupType: 'POLICY_GROUP',
        deploymentType: 'DEPLOYMENT',
        modelType: 'MODEL',
        cloudRoleType: 'CLOUD_ROLE'
    },
    CloudRolesData: {
        cloudRoleName: 'E2E-Cloud Role',
        cloudRoleDesc: 'Description For Cloud Role',
        amazonProvider: 'aws',
        azureProvider: 'azure',
        deleteUser: 'a4b:DeleteUser',
        disassociateDeviceFromRoom: 'a4b:DisassociateDeviceFromRoom',
        putConferencePreference: 'a4b:PutConferencePreference',
        createSkillGroup: 'a4b:CreateSkillGroup',
        associateDeviceWithRoom: 'a4b:AssociateDeviceWithRoom',
        putRoomSkillParameter: 'a4b:PutRoomSkillParameter',
    },
    BaseLineAssetData: {
        accountName: '0ecb99ea-ca1a-4be6-96cc-ceb57b7b63d4',
        subscription: '3263f5e2-3561-433c-97f2-e31b389e45ff',
        resourceGroup: 'TestConnection',
        product: 'Microsoft.Batch/batchAccounts',
        region: 'South India',
        key: 'creation_data:20200129',
        value: ''
    },
    InviteUserData: {
        mail: 'ramakrishna+'
    },
    CloudAccountData: {
        awsAccountName: 'e2e AWS Account',
        awsAccountDescription: 'Description For e2e AWS Account',
        awsAccountId: '123456987456'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25mL3Byb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUVmLEtBQUssRUFBRSxrQ0FBa0M7SUFDekMsSUFBSSxFQUFFLGlDQUFpQztJQUN2QyxJQUFJLEVBQUUsZ0NBQWdDO0lBQ3RDLGlCQUFpQixFQUFFLDhCQUE4QjtJQUVqRCxhQUFhO0lBQ2IsU0FBUyxFQUFFO1FBQ1QsYUFBYSxFQUFFLHVDQUF1QztRQUN0RCxhQUFhLEVBQUUsYUFBYTtRQUM1QixZQUFZLEVBQUUsbUNBQW1DO1FBQ2pELFlBQVksRUFBRSxhQUFhO1FBQzNCLFlBQVksRUFBRSw0QkFBNEI7UUFDMUMsWUFBWSxFQUFFLFdBQVc7S0FDMUI7SUFDRCwyQkFBMkI7SUFDM0IsdUJBQXVCLEVBQ3ZCO1FBQ0Usd0JBQXdCLEVBQUUsMENBQTBDO1FBQ3BFLDRCQUE0QixFQUFFLHNDQUFzQztRQUNwRSx1QkFBdUIsRUFBRSwwQkFBMEI7UUFDbkQsbUNBQW1DLEVBQUUscUNBQXFDO1FBQzFFLG1DQUFtQyxFQUFFLHFDQUFxQztRQUMxRSw0QkFBNEIsRUFBRSxrQ0FBa0M7UUFDaEUsNEJBQTRCLEVBQUUsaURBQWlEO1FBQy9FLDhCQUE4QixFQUFFLG9DQUFvQztRQUNwRSw4QkFBOEIsRUFBRSxtREFBbUQ7UUFDbkYsc0NBQXNDLEVBQUUsc0JBQXNCO1FBQzlELHNDQUFzQyxFQUFFLHNCQUFzQjtRQUM5RCxzQ0FBc0MsRUFBRSxvQ0FBb0M7UUFDNUUsc0NBQXNDLEVBQUUsb0NBQW9DO0tBQzdFO0lBQ0QsbUJBQW1CO0lBQ25CLGVBQWUsRUFDZjtRQUNFLGVBQWUsRUFBRSxpQ0FBaUM7UUFDbEQsb0JBQW9CLEVBQUUscUNBQXFDO1FBQzNELHVCQUF1QixFQUFFLHFDQUFxQztRQUM5RCxtQkFBbUIsRUFBRSw4QkFBOEI7UUFDbkQsc0JBQXNCLEVB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