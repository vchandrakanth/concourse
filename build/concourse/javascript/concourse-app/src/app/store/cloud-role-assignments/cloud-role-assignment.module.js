"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const effects_1 = require("@ngrx/effects");
const store_1 = require("@ngrx/store");
const enums_1 = require("@concourse/shared/enums");
const cloud_role_assignment_service_1 = require("./services/cloud-role-assignment.service");
const cloud_role_assignment_effects_1 = require("./state/cloud-role-assignment.effects");
const cloud_role_assignment_facade_1 = require("./state/cloud-role-assignment.facade");
const fromRole = require("./state/cloud-role-assignment.reducer");
let CloudRoleAssignmentStoreModule = class CloudRoleAssignmentStoreModule {
};
CloudRoleAssignmentStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.CloudRoleAssignment, fromRole.reducer),
            effects_1.EffectsModule.forFeature([cloud_role_assignment_effects_1.CloudRoleAssignmentEffects])
        ],
        providers: [cloud_role_assignment_service_1.CloudRoleAssignmentService, cloud_role_assignment_facade_1.CloudRoleAssignmentFacade]
    })
], CloudRoleAssignmentStoreModule);
exports.CloudRoleAssignmentStoreModule = CloudRoleAssignmentStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS1hc3NpZ25tZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9jbG91ZC1yb2xlLWFzc2lnbm1lbnRzL2Nsb3VkLXJvbGUtYXNzaWdubWVudC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBeUM7QUFDekMsMkNBQThDO0FBQzlDLHVDQUEwQztBQUUxQyxtREFBcUQ7QUFDckQsNEZBQXNGO0FBQ3RGLHlGQUFtRjtBQUNuRix1RkFBaUY7QUFDakYsa0VBQWtFO0FBU2xFLElBQWEsOEJBQThCLEdBQTNDLE1BQWEsOEJBQThCO0NBQUksQ0FBQTtBQUFsQyw4QkFBOEI7SUFQMUMsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsbUJBQVcsQ0FBQyxVQUFVLENBQUMsa0JBQVUsQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ3hFLHVCQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsMERBQTBCLENBQUMsQ0FBQztTQUN2RDtRQUNELFNBQVMsRUFBRSxDQUFDLDBEQUEwQixFQUFFLHdEQUF5QixDQUFDO0tBQ25FLENBQUM7R0FDVyw4QkFBOEIsQ0FBSTtBQUFsQyx3RUFBOEIifQ==