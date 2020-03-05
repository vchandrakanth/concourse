module.exports = {
    //  qaUrl: 'https://adhoc.concourse.company/',
    qaUrl: 'https://beta.concourse.company/',
    // qaUrl: 'https://prod.concourselabs.io/',
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
        user: 'e2e Test <ramakrishna+e2etest@concourselabs.com>'
        // user: 'e2e Test <ramakrishna+e2e@concourselabs.com>',
        // user: 'Prod E2E Test <ramakrishna+e2e@concourselabs.com>'
        // user: 'e2e Test <ramakrishna+e2etestuser@concourselabs.com>'
        // user: 'E2E test <jian+e2e@concourselabs.com>'
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
        accountKey: 'Account-123456789',
        accountValue: '123456789',
        whiteListValue: '10.10.10.1',
        insightUrl: '//adhoc.concourse.company',
        updatedInsightUrl: 'http://adhoc.concourse.com',
        azureSubscriptionKey: 'Account-123454321',
        azureSubscriptionValue: '123456978',
        UpdatedWhiteListValue: '10.10.10.2',
        value: '123'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25mL3Byb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUVmLDhDQUE4QztJQUM5QyxLQUFLLEVBQUUsaUNBQWlDO0lBQ3hDLDJDQUEyQztJQUMzQyxpQkFBaUIsRUFBRSw4QkFBOEI7SUFFakQsYUFBYTtJQUNiLFNBQVMsRUFBRTtRQUNULGFBQWEsRUFBRSx1Q0FBdUM7UUFDdEQsYUFBYSxFQUFFLGFBQWE7UUFDNUIsWUFBWSxFQUFFLG1DQUFtQztRQUNqRCxZQUFZLEVBQUUsYUFBYTtRQUMzQixZQUFZLEVBQUUsNEJBQTRCO1FBQzFDLFlBQVksRUFBRSxXQUFXO0tBQzFCO0lBQ0QsMkJBQTJCO0lBQzNCLHVCQUF1QixFQUN2QjtRQUNFLHdCQUF3QixFQUFFLDBDQUEwQztRQUNwRSw0QkFBNEIsRUFBRSxzQ0FBc0M7UUFDcEUsdUJBQXVCLEVBQUUsMEJBQTBCO1FBQ25ELG1DQUFtQyxFQUFFLHFDQUFxQztRQUMxRSxtQ0FBbUMsRUFBRSxxQ0FBcUM7UUFDMUUsNEJBQTRCLEVBQUUsa0NBQWtDO1FBQ2hFLDRCQUE0QixFQUFFLGlEQUFpRDtRQUMvRSw4QkFBOEIsRUFBRSxvQ0FBb0M7UUFDcEUsOEJBQThCLEVBQUUsbURBQW1EO1FBQ25GLHNDQUFzQyxFQUFFLHNCQUFzQjtRQUM5RCxzQ0FBc0MsRUFBRSxzQkFBc0I7UUFDOUQsc0NBQXNDLEVBQUUsb0NBQW9DO1FBQzVFLHNDQUFzQyxFQUFFLG9DQUFvQztLQUM3RTtJQUNELG1CQUFtQjtJQUNuQixlQUFlLEVBQ2Y7UUFDRSxlQUFlLEVBQUUsaUNBQWlDO1FBQ2xELG9CQUFvQixFQUFFLHFDQUFxQztRQUMzRCx1QkFBdUIsRUFBRSxxQ0FBcUM7UUFDOUQsbUJBQW1CLEVBQUUsOEJBQThCO1FBQ25ELHNCQUFzQixFQUFFLDhCQUE4QjtRQUN0RCx3QkFB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