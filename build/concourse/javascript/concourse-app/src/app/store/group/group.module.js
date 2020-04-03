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
const group_service_1 = require("./services/group.service");
const role_assignment_service_1 = require("./services/role-assignment.service");
const group_effects_1 = require("./state/group.effects");
const group_facade_1 = require("./state/group.facade");
const fromGroup = require("./state/group.reducer");
let GroupStoreModule = class GroupStoreModule {
};
GroupStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.Group, fromGroup.reducer),
            effects_1.EffectsModule.forFeature([group_effects_1.GroupEffects])
        ],
        providers: [group_service_1.GroupService, role_assignment_service_1.RoleAssignmentService, group_facade_1.GroupFacade]
    })
], GroupStoreModule);
exports.GroupStoreModule = GroupStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2dyb3VwL2dyb3VwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCw0REFBd0Q7QUFDeEQsZ0ZBQTJFO0FBQzNFLHlEQUFxRDtBQUNyRCx1REFBbUQ7QUFDbkQsbURBQW1EO0FBU25ELElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0NBQUksQ0FBQTtBQUFwQixnQkFBZ0I7SUFQNUIsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsbUJBQVcsQ0FBQyxVQUFVLENBQUMsa0JBQVUsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUMzRCx1QkFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLDRCQUFZLENBQUMsQ0FBQztTQUN6QztRQUNELFNBQVMsRUFBRSxDQUFDLDRCQUFZLEVBQUUsK0NBQXFCLEVBQUUsMEJBQVcsQ0FBQztLQUM5RCxDQUFDO0dBQ1csZ0JBQWdCLENBQUk7QUFBcEIsNENBQWdCIn0=