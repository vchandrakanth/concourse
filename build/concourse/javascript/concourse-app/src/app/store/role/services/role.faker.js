"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@concourse/core/models");
const roles = [
    {
        id: 1001,
        name: 'Institution Admin',
        description: 'Institution Admin',
        responsibilities: [
            {
                id: 2001,
                name: 'Manage Institutions',
                description: 'Responsibility to manage Institution data and registry',
                permissions: [
                    'MANAGE_INSTITUTIONS'
                ],
                authority: 'MANAGE_INSTITUTIONS'
            },
            {
                id: 2002,
                name: 'Manage SurfaceLayers',
                description: 'Responsibility to create, update, and delete SurfaceLayers',
                permissions: [
                    'MANAGE_SURFACE_LAYERS'
                ],
                authority: 'MANAGE_SURFACE_LAYERS'
            }
        ]
    },
    {
        id: 1002,
        name: 'Identity Admin',
        description: 'Identity Admin',
        responsibilities: [
            {
                id: 2011,
                name: 'Manage Groups',
                description: 'Responsibility to read, create, update, and delete Groups and Role Assignments',
                permissions: [
                    'MANAGE_GROUPS',
                    'MANAGE_ROLES'
                ],
                authority: 'MANAGE_GROUPS,MANAGE_ROLES'
            },
            {
                id: 2012,
                name: 'Manage Users',
                description: 'Responsibility to read, invite, and delete Users',
                permissions: [
                    'MANAGE_USERS'
                ],
                authority: 'MANAGE_USERS'
            }
        ]
    },
    {
        id: 1003,
        name: 'Business Author',
        description: 'Business Author',
        responsibilities: [
            {
                id: 2022,
                name: 'Manage Attribute Tags',
                description: 'Responsibility to create, update, and delete Attribute Tags',
                permissions: [
                    'MANAGE_ATTRIBUTE_TAGS'
                ],
                authority: 'MANAGE_ATTRIBUTE_TAGS'
            },
            {
                id: 2021,
                name: 'Manage Models',
                description: 'Responsibility to create, update, and delete Enclave Models',
                permissions: [
                    'MANAGE_MODELS'
                ],
                authority: 'MANAGE_MODELS'
            }
        ]
    },
    {
        id: 1004,
        name: 'Control Author',
        description: 'Control Author',
        responsibilities: [
            {
                id: 2032,
                name: 'Manage Policy Group Templates',
                description: 'Responsibility to create, update, and delete Policy Group Templates',
                permissions: [
                    'MANAGE_POLICY_GROUP_TEMPLATES'
                ],
                authority: 'MANAGE_POLICY_GROUP_TEMPLATES'
            },
            {
                id: 2031,
                name: 'Manage Policy Groups',
                description: 'Responsibility to create, update, and delete Policy Groups',
                permissions: [
                    'MANAGE_POLICY_GROUPS'
                ],
                authority: 'MANAGE_POLICY_GROUPS'
            }
        ]
    },
    {
        id: 1005,
        name: 'Business Operator',
        description: 'Business Operator',
        responsibilities: [
            {
                id: 2051,
                name: 'Manage Workflow APIs',
                description: 'Responsibility to manage Workflow APIs',
                permissions: [
                    'MANAGE_DEPLOYMENTS'
                ],
                authority: 'MANAGE_DEPLOYMENTS'
            }
        ]
    }
];
exports.fakeMany = () => roles.map(role => new models_1.Role().deserialize(role));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5mYWtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9yb2xlL3NlcnZpY2VzL3JvbGUuZmFrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBOEM7QUFFOUMsTUFBTSxLQUFLLEdBQUc7SUFDWjtRQUNFLEVBQUUsRUFBRSxJQUFJO1FBQ1IsSUFBSSxFQUFFLG1CQUFtQjtRQUN6QixXQUFXLEVBQUUsbUJBQW1CO1FBQ2hDLGdCQUFnQixFQUFFO1lBQ2hCO2dCQUNFLEVBQUUsRUFBRSxJQUFJO2dCQUNSLElBQUksRUFBRSxxQkFBcUI7Z0JBQzNCLFdBQVcsRUFBRSx3REFBd0Q7Z0JBQ3JFLFdBQVcsRUFBRTtvQkFDWCxxQkFBcUI7aUJBQ3RCO2dCQUNELFNBQVMsRUFBRSxxQkFBcUI7YUFDakM7WUFDRDtnQkFDRSxFQUFFLEVBQUUsSUFBSTtnQkFDUixJQUFJLEVBQUUsc0JBQXNCO2dCQUM1QixXQUFXLEVBQUUsNERBQTREO2dCQUN6RSxXQUFXLEVBQUU7b0JBQ1gsdUJBQXVCO2lCQUN4QjtnQkFDRCxTQUFTLEVBQUUsdUJBQXVCO2FBQ25DO1NBQ0Y7S0FDRjtJQUNEO1FBQ0UsRUFBRSxFQUFFLElBQUk7UUFDUixJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7UUFDN0IsZ0JBQWdCLEVBQUU7WUFDaEI7Z0JBQ0UsRUFBRSxFQUFFLElBQUk7Z0JBQ1IsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFdBQVcsRUFBRSxnRkFBZ0Y7Z0JBQzdGLFdBQVcsRUFBRTtvQkFDWCxlQUFlO29CQUNmLGNBQWM7aUJBQ2Y7Z0JBQ0QsU0FBUyxFQUFFLDRCQUE0QjthQUN4QztZQUNEO2dCQUNFLEVBQUUsRUFBRSxJQUFJO2dCQUNSLElBQUksRUFBRSxjQUFjO2dCQUNwQixXQUFXLEVBQUUsa0RBQWtEO2dCQUMvRCxXQUFXLEVBQUU7b0JBQ1gsY0FBYztpQkFDZjtnQkFDRCxTQUFTLEVBQUUsY0FBYzthQUMxQjtTQUNGO0tBQ0Y7SUFDRDtRQUNFLEVBQUUsRUFBRSxJQUFJO1FBQ1IsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixXQUFXLEVBQUUsaUJBQWlCO1FBQzlCLGdCQUFnQixFQUFFO1lBQ2hCO2dCQUNFLEVBQUUsRUFBRSxJQUFJO2dCQUNSLElBQUksRUFBRSx1QkFBdUI7Z0JBQzdCLFdBQVcsRUFBRSw2REFBNkQ7Z0JBQzFFLFdBQVcsRUFBRTtvQkFDWCx1QkFBdUI7aUJBQ3hCO2dCQUNELFNBQVMsRUFBRSx1QkFBdUI7YUFDbkM7WUFDRDtnQkFDRSxFQUFFLEVBQUUsSUFBSTtnQkFDUixJQUFJLEVBQUUsZUFBZTtnQkFDckIsV0FBVyxFQUFFLDZEQUE2RDtnQkFDMUUsV0FBVyxFQUFFO29CQUNYLGVBQWU7aUJBQ2hCO2dCQUNELFNBQVMsRUFBRSxlQUFlO2FBQzNCO1NBQ0Y7S0FDRjtJQUNEO1FBQ0UsRUFBRSxFQUFFLElBQUk7UUFDUixJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7UUFDN0IsZ0JBQWdCLEVBQUU7WUFDaEI7Z0JBQ0UsRUFBRSxFQUFFLElBQUk7Z0JBQ1IsSUFBSSxFQUFFLCtCQUErQjtnQkFDckMsV0FBVyxFQUFFLHFFQUFxRTtnQkFDbEYsV0FBVyxFQUFFO29CQUNYLCtCQUErQjtpQkFDaEM7Z0JBQ0QsU0FBUyxFQUFFLCtCQUErQjthQUMzQztZQUNEO2dCQUNFLEVBQUUsRUFBRSxJQUFJO2dCQUNSLElBQUksRUFBRSxzQkFBc0I7Z0JBQzVCLFdBQVcsRUFBRSw0REFBNEQ7Z0JBQ3pFLFdBQVcsRUFBRTtvQkFDWCxzQkFBc0I7aUJBQ3ZCO2dCQUNELFNBQVMsRUFBRSxzQkFBc0I7YUFDbEM7U0FDRjtLQUNGO0lBQ0Q7UUFDRSxFQUFFLEVBQUUsSUFBSTtRQUNSLElBQUksRUFBRSxtQkFBbUI7UUFDekIsV0FBVyxFQUFFLG1CQUFtQjtRQUNoQyxnQkFBZ0IsRUFBRTtZQUNoQjtnQkFFRSxFQUFFLEVBQUUsSUFBSTtnQkFDUixJQUFJLEVBQUUsc0JBQXNCO2dCQUM1QixXQUFXLEVBQUUsd0NBQXdDO2dCQUNyRCxXQUFXLEVBQUU7b0JBQ1gsb0JBQW9CO2lCQUNyQjtnQkFDRCxTQUFTLEVBQUUsb0JBQW9CO2FBQ2hDO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFVyxRQUFBLFFBQVEsR0FBRyxHQUFXLEVBQUUsQ0FDbkMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksYUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUEifQ==