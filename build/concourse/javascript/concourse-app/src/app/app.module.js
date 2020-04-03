"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const animations_1 = require("@angular/platform-browser/animations");
const core_module_1 = require("@concourse/core/core.module");
const app_routing_module_1 = require("./app-routing.module");
const app_component_1 = require("./app.component");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            core_module_1.CoreModule.forRoot(),
            app_routing_module_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXlDO0FBQ3pDLGdFQUEwRDtBQUMxRCxxRUFBK0U7QUFFL0UsNkRBQXlEO0FBQ3pELDZEQUF3RDtBQUN4RCxtREFBK0M7QUFjL0MsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztDQUFJLENBQUE7QUFBYixTQUFTO0lBWnJCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLGdDQUFhO1lBQ2Isb0NBQXVCO1lBQ3ZCLHdCQUFVLENBQUMsT0FBTyxFQUFFO1lBQ3BCLHFDQUFnQjtTQUNqQjtRQUNELFlBQVksRUFBRTtZQUNaLDRCQUFZO1NBQ2I7UUFDRCxTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO0tBQzFCLENBQUM7R0FDVyxTQUFTLENBQUk7QUFBYiw4QkFBUyJ9