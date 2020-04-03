"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const core_1 = require("@angular/core");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const jsonlint_1 = require("jsonlint");
window['jsonlint'] = jsonlint_1.default;
require("jshint");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/yaml/yaml");
require("codemirror/addon/lint/lint");
require("codemirror/addon/lint/json-lint");
require("codemirror/addon/edit/matchbrackets");
require("codemirror/addon/edit/closetag");
require("codemirror/addon/selection/active-line");
const app_module_1 = require("./app/app.module");
const environment_1 = require("./environments/environment");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(err => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQkFBb0I7QUFDcEIsd0NBQStDO0FBQy9DLGdGQUEyRTtBQUUzRSx1Q0FBZ0M7QUFDaEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLGtCQUFRLENBQUM7QUFDOUIsa0JBQWdCO0FBRWhCLGlEQUErQztBQUMvQyxxQ0FBbUM7QUFDbkMsc0NBQW9DO0FBQ3BDLDJDQUF5QztBQUd6QywrQ0FBNkM7QUFDN0MsMENBQXdDO0FBQ3hDLGtEQUFnRDtBQUVoRCxpREFBNkM7QUFDN0MsNERBQXlEO0FBRXpELElBQUkseUJBQVcsQ0FBQyxVQUFVLEVBQUU7SUFDMUIscUJBQWMsRUFBRSxDQUFDO0NBQ2xCO0FBRUQsaURBQXNCLEVBQUUsQ0FBQyxlQUFlLENBQUMsc0JBQVMsQ0FBQztLQUNoRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMifQ==