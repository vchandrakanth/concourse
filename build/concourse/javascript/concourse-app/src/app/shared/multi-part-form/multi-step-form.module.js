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
const progressbar_1 = require("ngx-bootstrap/progressbar");
const multi_step_form_component_1 = require("./multi-step-form.component");
const step_directive_1 = require("./step.directive");
const shared_module_1 = require("@concourse/shared/shared.module");
let MultiStepFormModule = class MultiStepFormModule {
};
MultiStepFormModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            angular_fontawesome_1.FontAwesomeModule,
            progressbar_1.ProgressbarModule.forRoot(),
            shared_module_1.SharedModule
        ],
        declarations: [
            multi_step_form_component_1.MultiStepFormComponent,
            step_directive_1.StepDirective
        ],
        exports: [
            multi_step_form_component_1.MultiStepFormComponent,
            step_directive_1.StepDirective
        ]
    })
], MultiStepFormModule);
exports.MultiStepFormModule = MultiStepFormModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc3RlcC1mb3JtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvbXVsdGktcGFydC1mb3JtL211bHRpLXN0ZXAtZm9ybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSw0Q0FBK0M7QUFDL0Msd0NBQXlDO0FBQ3pDLDBFQUFxRTtBQUNyRSwyREFBOEQ7QUFFOUQsMkVBQXFFO0FBQ3JFLHFEQUFpRDtBQUVqRCxtRUFBK0Q7QUFrQi9ELElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0NBQUksQ0FBQTtBQUF2QixtQkFBbUI7SUFoQi9CLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLHFCQUFZO1lBQ1osdUNBQWlCO1lBQ2pCLCtCQUFpQixDQUFDLE9BQU8sRUFBRTtZQUMzQiw0QkFBWTtTQUNiO1FBQ0QsWUFBWSxFQUFFO1lBQ1osa0RBQXNCO1lBQ3RCLDhCQUFhO1NBQ2Q7UUFDRCxPQUFPLEVBQUU7WUFDUCxrREFBc0I7WUFDdEIsOEJBQWE7U0FDZDtLQUNGLENBQUM7R0FDVyxtQkFBbUIsQ0FBSTtBQUF2QixrREFBbUIifQ==