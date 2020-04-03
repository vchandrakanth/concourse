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
const cloud_role_service_1 = require("./services/cloud-role.service");
const cloud_role_effects_1 = require("./state/cloud-role.effects");
const cloud_role_facade_1 = require("./state/cloud-role.facade");
const fromRole = require("./state/cloud-role.reducer");
let CloudRoleStoreModule = class CloudRoleStoreModule {
};
CloudRoleStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.CloudRole, fromRole.reducer),
            effects_1.EffectsModule.forFeature([cloud_role_effects_1.CloudRoleEffects])
        ],
        providers: [cloud_role_service_1.CloudRoleService, cloud_role_facade_1.CloudRoleFacade]
    })
], CloudRoleStoreModule);
exports.CloudRoleStoreModule = CloudRoleStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvY2xvdWQtcm9sZS9jbG91ZC1yb2xlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCxzRUFBaUU7QUFDakUsbUVBQThEO0FBQzlELGlFQUE0RDtBQUM1RCx1REFBdUQ7QUFTdkQsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7Q0FBSSxDQUFBO0FBQXhCLG9CQUFvQjtJQVBoQyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQzlELHVCQUFhLENBQUMsVUFBVSxDQUFDLENBQUMscUNBQWdCLENBQUMsQ0FBQztTQUM3QztRQUNELFNBQVMsRUFBRSxDQUFDLHFDQUFnQixFQUFFLG1DQUFlLENBQUM7S0FDL0MsQ0FBQztHQUNXLG9CQUFvQixDQUFJO0FBQXhCLG9EQUFvQiJ9