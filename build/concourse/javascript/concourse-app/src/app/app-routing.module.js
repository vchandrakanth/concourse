"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const guards_1 = require("@concourse/core/guards");
const env_1 = require("@concourse/env");
const routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'user', loadChildren: './user/user.module#UserModule' },
    {
        path: 'admin',
        canActivate: [guards_1.AuthGuard, guards_1.RoleGuard],
        loadChildren: './concourse-admin/concourse-admin.module#ConcourseAdminModule',
        data: {
            roles: 'SUPER_ADMIN'
        }
    },
    { path: 'dashboard', canActivate: [guards_1.AuthGuard], loadChildren: './dashboard/dashboard.module#DashboardModule' },
    {
        path: 'user-management',
        canActivate: [guards_1.AuthGuard, guards_1.RoleGuard],
        loadChildren: './user-management/user-management.module#UserManagementModule',
        data: {
            roles: ['MANAGE_GROUPS', 'MANAGE_USERS']
        }
    },
    {
        path: 'surfaces',
        canActivate: [guards_1.AuthGuard],
        loadChildren: './org-tree/org-tree.module#OrgTreeModule'
    },
    {
        path: 'policy-groups',
        canActivate: [guards_1.AuthGuard, guards_1.RoleGuard],
        loadChildren: './policy-groups/policy-groups.module#PolicyGroupsModule',
        data: {
            roles: ['MANAGE_POLICY_GROUPS']
        }
    },
    {
        path: 'policy-group-templates',
        canActivate: [guards_1.AuthGuard],
        loadChildren: './policy-group-template/policy-group-template.module#PolicyGroupTemplateModule',
        data: {
            roles: 'MANAGE_POLICY_GROUP_TEMPLATES'
        }
    },
    {
        path: 'institution',
        loadChildren: './institution/institution.module#InstitutionModule'
    },
    {
        path: 'assets',
        canActivate: [guards_1.AuthGuard],
        loadChildren: './assets/assets.module#AssetsModule',
        data: {
            roles: 'MANAGE_MODELS'
        }
    },
    {
        path: 'baseline-assets',
        canActivate: [guards_1.AuthGuard],
        loadChildren: './baseline-assets/baseline-assets.module#BaselineAssetsModule',
        data: {
            roles: 'MANAGE_MODELS'
        }
    },
    {
        path: 'attribute-tags',
        canActivate: [guards_1.AuthGuard],
        loadChildren: './attribute-tag/attribute-tag.module#AttributeTagModule',
        data: {
            roles: 'MANAGE_ATTRIBUTE_TAGS'
        }
    },
    {
        path: 'workflows',
        canActivate: [guards_1.AuthGuard],
        loadChildren: './workflows/workflows.module#WorkflowsModule',
        data: {
            roles: 'MANAGE_ATTRIBUTE_TAGS'
        }
    },
    {
        path: 'cloud-roles',
        canActivate: [guards_1.AuthGuard],
        loadChildren: './cloud-roles/cloud-roles.module#CloudRolesModule',
        data: {
            roles: ''
        }
    },
    {
        path: 'analytics',
        canActivate: [guards_1.AuthGuard],
        loadChildren: './analytics/analytics.module#AnalyticsModule',
        data: {
            roles: ''
        }
    },
    {
        path: 'style-guide',
        canActivate: [guards_1.AuthGuard],
        loadChildren: './style-guide/style-guide.module#StyleGuideModule',
        data: {
            roles: ''
        }
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes, Object.assign({}, (env_1.environment.preloadModules ? { preloadingStrategy: router_1.PreloadAllModules } : {})))],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2FwcC1yb3V0aW5nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6Qyw0Q0FBMEU7QUFFMUUsbURBQWdGO0FBQ2hGLHdDQUE2QztBQUU3QyxNQUFNLE1BQU0sR0FBVztJQUNyQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0lBQ3hELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsK0JBQStCLEVBQUU7SUFDL0Q7UUFDRSxJQUFJLEVBQUUsT0FBTztRQUNiLFdBQVcsRUFBRSxDQUFDLGtCQUFTLEVBQUUsa0JBQVMsQ0FBQztRQUNuQyxZQUFZLEVBQUUsK0RBQStEO1FBQzdFLElBQUksRUFBRTtZQUNKLEtBQUssRUFBRSxhQUFhO1NBQ3JCO0tBQ0Y7SUFDRCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLENBQUMsa0JBQVMsQ0FBQyxFQUFFLFlBQVksRUFBRSw4Q0FBOEMsRUFBRTtJQUM3RztRQUNFLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsV0FBVyxFQUFFLENBQUMsa0JBQVMsRUFBRSxrQkFBUyxDQUFDO1FBQ25DLFlBQVksRUFBRSwrREFBK0Q7UUFDN0UsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQztTQUN6QztLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsVUFBVTtRQUNoQixXQUFXLEVBQUUsQ0FBQyxrQkFBUyxDQUFDO1FBQ3hCLFlBQVksRUFBRSwwQ0FBMEM7S0FDekQ7SUFDRDtRQUNFLElBQUksRUFBRSxlQUFlO1FBQ3JCLFdBQVcsRUFBRSxDQUFDLGtCQUFTLEVBQUUsa0JBQVMsQ0FBQztRQUNuQyxZQUFZLEVBQUUseURBQXlEO1FBQ3ZFLElBQUksRUFBRTtZQUNKLEtBQUssRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ2hDO0tBQ0Y7SUFDRDtRQUNFLElBQUksRUFBRSx3QkFBd0I7UUFDOUIsV0FBVyxFQUFFLENBQUMsa0JBQVMsQ0FBQztRQUN4QixZQUFZLEVBQUUsZ0ZBQWdGO1FBQzlGLElBQUksRUFBRTtZQUNKLEtBQUssRUFBRSwrQkFBK0I7U0FDdkM7S0FDRjtJQUNEO1FBQ0UsSUFBSSxFQUFFLGFBQWE7UUFDbkIsWUFBWSxFQUFFLG9EQUFvRDtLQUNuRTtJQUNEO1FBQ0UsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsQ0FBQyxrQkFBUyxDQUFDO1FBQ3hCLFlBQVksRUFBRSxxQ0FBcUM7UUFDbkQsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLGVBQWU7U0FDdkI7S0FDRjtJQUNEO1FBQ0UsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixXQUFXLEVBQUUsQ0FBQyxrQkFBUyxDQUFDO1FBQ3hCLFlBQVksRUFBRSwrREFBK0Q7UUFDN0UsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLGVBQWU7U0FDdkI7S0FDRjtJQUNEO1FBQ0UsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixXQUFXLEVBQUUsQ0FBQyxrQkFBUyxDQUFDO1FBQ3hCLFlBQVksRUFBRSx5REFBeUQ7UUFDdkUsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLHVCQUF1QjtTQUMvQjtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsV0FBVztRQUNqQixXQUFXLEVBQUUsQ0FBQyxrQkFBUyxDQUFDO1FBQ3hCLFlBQVksRUFBRSw4Q0FBOEM7UUFDNUQsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLHVCQUF1QjtTQUMvQjtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsYUFBYTtRQUNuQixXQUFXLEVBQUUsQ0FBQyxrQkFBUyxDQUFDO1FBQ3hCLFlBQVksRUFBRSxtREFBbUQ7UUFDakUsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLEVBQUU7U0FDVjtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsV0FBVztRQUNqQixXQUFXLEVBQUUsQ0FBQyxrQkFBUyxDQUFDO1FBQ3hCLFlBQVksRUFBRSw4Q0FBOEM7UUFDNUQsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLEVBQUU7U0FDVjtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsYUFBYTtRQUNuQixXQUFXLEVBQUUsQ0FBQyxrQkFBUyxDQUFDO1FBQ3hCLFlBQVksRUFBRSxtREFBbUQ7UUFDakUsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLEVBQUU7U0FDVjtLQUNGO0NBRUYsQ0FBQztBQVFGLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0NBQUksQ0FBQTtBQUFwQixnQkFBZ0I7SUFONUIsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxvQkFDaEMsQ0FBQyxpQkFBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxrQkFBa0IsRUFBRSwwQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFDaEYsQ0FBQztRQUNILE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUM7S0FDeEIsQ0FBQztHQUNXLGdCQUFnQixDQUFJO0FBQXBCLDRDQUFnQiJ9