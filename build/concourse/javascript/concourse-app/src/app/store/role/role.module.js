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
const role_service_1 = require("./services/role.service");
const role_effects_1 = require("./state/role.effects");
const role_facade_1 = require("./state/role.facade");
const fromRole = require("./state/role.reducer");
let RoleStoreModule = class RoleStoreModule {
};
RoleStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.Role, fromRole.reducer),
            effects_1.EffectsModule.forFeature([role_effects_1.RoleEffects])
        ],
        providers: [role_service_1.RoleService, role_facade_1.RoleFacade]
    })
], RoleStoreModule);
exports.RoleStoreModule = RoleStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcm9sZS9yb2xlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCwwREFBc0Q7QUFDdEQsdURBQW1EO0FBQ25ELHFEQUFpRDtBQUNqRCxpREFBaUQ7QUFTakQsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtDQUFJLENBQUE7QUFBbkIsZUFBZTtJQVAzQixlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ3pELHVCQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsMEJBQVcsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsU0FBUyxFQUFFLENBQUMsMEJBQVcsRUFBRSx3QkFBVSxDQUFDO0tBQ3JDLENBQUM7R0FDVyxlQUFlLENBQUk7QUFBbkIsMENBQWUifQ==