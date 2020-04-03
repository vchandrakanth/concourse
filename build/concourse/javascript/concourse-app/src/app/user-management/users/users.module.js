"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const accordion_1 = require("ngx-bootstrap/accordion");
const tabs_1 = require("ngx-bootstrap/tabs");
const ngx_pipes_1 = require("ngx-pipes");
const dynamic_form_module_1 = require("@concourse/shared/dynamic-form/dynamic-form.module");
const shared_module_1 = require("@concourse/shared/shared.module");
const list_users_component_1 = require("./list-users/list-users.component");
const users_routing_module_1 = require("./users-routing.module");
const view_user_component_1 = require("./view-user/view-user.component");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            angular_fontawesome_1.FontAwesomeModule,
            accordion_1.AccordionModule.forRoot(),
            tabs_1.TabsModule.forRoot(),
            ngx_pipes_1.NgArrayPipesModule,
            ngx_pipes_1.NgStringPipesModule,
            dynamic_form_module_1.DynamicFormModule,
            shared_module_1.SharedModule,
            users_routing_module_1.UsersRoutingModule
        ],
        declarations: [
            list_users_component_1.ListUsersComponent,
            view_user_component_1.ViewUserComponent
        ]
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3VzZXItbWFuYWdlbWVudC91c2Vycy91c2Vycy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSw0Q0FBK0M7QUFDL0Msd0NBQXlDO0FBQ3pDLDBFQUFxRTtBQUNyRSx1REFBMEQ7QUFDMUQsNkNBQWdEO0FBQ2hELHlDQUFvRTtBQUVwRSw0RkFBdUY7QUFDdkYsbUVBQStEO0FBQy9ELDRFQUF1RTtBQUN2RSxpRUFBNEQ7QUFDNUQseUVBQW9FO0FBbUJwRSxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0NBQUksQ0FBQTtBQUFmLFdBQVc7SUFqQnZCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLHFCQUFZO1lBQ1osdUNBQWlCO1lBQ2pCLDJCQUFlLENBQUMsT0FBTyxFQUFFO1lBQ3pCLGlCQUFVLENBQUMsT0FBTyxFQUFFO1lBQ3BCLDhCQUFrQjtZQUNsQiwrQkFBbUI7WUFDbkIsdUNBQWlCO1lBQ2pCLDRCQUFZO1lBQ1oseUNBQWtCO1NBQ25CO1FBQ0QsWUFBWSxFQUFFO1lBQ1oseUNBQWtCO1lBQ2xCLHVDQUFpQjtTQUNsQjtLQUNGLENBQUM7R0FDVyxXQUFXLENBQUk7QUFBZixrQ0FBVyJ9