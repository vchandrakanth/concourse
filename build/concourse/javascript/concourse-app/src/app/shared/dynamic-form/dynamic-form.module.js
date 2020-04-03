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
const forms_1 = require("@angular/forms");
const ng_select_1 = require("@ng-select/ng-select");
const alert_1 = require("ngx-bootstrap/alert");
const shared_module_1 = require("../shared.module");
const dynamic_field_directive_1 = require("./components/dynamic-field/dynamic-field.directive");
const form_button_component_1 = require("./components/form-button/form-button.component");
const form_checkbox_component_1 = require("./components/form-checkbox/form-checkbox.component");
const form_file_upload_component_1 = require("./components/form-file-upload/form-file-upload.component");
const form_input_component_1 = require("./components/form-input/form-input.component");
const form_radio_component_1 = require("./components/form-radio/form-radio.component");
const form_select_component_1 = require("./components/form-select/form-select.component");
const form_text_area_component_1 = require("./components/form-text-area/form-text-area.component");
const form_type_ahead_component_1 = require("./components/form-type-ahead/form-type-ahead.component");
const dynamic_form_component_1 = require("./dynamic-form.component");
const entryComponents = [
    form_button_component_1.FormButtonComponent,
    form_checkbox_component_1.FormCheckboxComponent,
    form_input_component_1.FormInputComponent,
    form_select_component_1.FormSelectComponent,
    form_text_area_component_1.FormTextAreaComponent,
    form_type_ahead_component_1.FormTypeAheadComponent,
    form_file_upload_component_1.FormFileUploadComponent,
    form_radio_component_1.FormRadioComponent
];
let DynamicFormModule = class DynamicFormModule {
};
DynamicFormModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.ReactiveFormsModule,
            alert_1.AlertModule.forRoot(),
            ng_select_1.NgSelectModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            dynamic_form_component_1.DynamicFormComponent,
            dynamic_field_directive_1.DynamicFieldDirective,
            ...entryComponents
        ],
        entryComponents: [...entryComponents],
        exports: [dynamic_form_component_1.DynamicFormComponent]
    })
], DynamicFormModule);
exports.DynamicFormModule = DynamicFormModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvZHluYW1pYy1mb3JtL2R5bmFtaWMtZm9ybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSw0Q0FBK0M7QUFDL0Msd0NBQXlDO0FBQ3pDLDBDQUFxRDtBQUNyRCxvREFBc0Q7QUFDdEQsK0NBQWtEO0FBRWxELG9EQUFnRDtBQUNoRCxnR0FBMkY7QUFDM0YsMEZBQXFGO0FBQ3JGLGdHQUEyRjtBQUMzRix5R0FBbUc7QUFDbkcsdUZBQWtGO0FBQ2xGLHVGQUFrRjtBQUNsRiwwRkFBcUY7QUFDckYsbUdBQTZGO0FBQzdGLHNHQUFnRztBQUNoRyxxRUFBZ0U7QUFFaEUsTUFBTSxlQUFlLEdBQUc7SUFDdEIsMkNBQW1CO0lBQ25CLCtDQUFxQjtJQUNyQix5Q0FBa0I7SUFDbEIsMkNBQW1CO0lBQ25CLGdEQUFxQjtJQUNyQixrREFBc0I7SUFDdEIsb0RBQXVCO0lBQ3ZCLHlDQUFrQjtDQUNuQixDQUFDO0FBa0JGLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0NBQUksQ0FBQTtBQUFyQixpQkFBaUI7SUFoQjdCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLHFCQUFZO1lBQ1osMkJBQW1CO1lBQ25CLG1CQUFXLENBQUMsT0FBTyxFQUFFO1lBQ3JCLDBCQUFjO1lBQ2QsNEJBQVk7U0FDYjtRQUNELFlBQVksRUFBRTtZQUNaLDZDQUFvQjtZQUNwQiwrQ0FBcUI7WUFDckIsR0FBRyxlQUFlO1NBQ25CO1FBQ0QsZUFBZSxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUM7UUFDckMsT0FBTyxFQUFFLENBQUMsNkNBQW9CLENBQUM7S0FDaEMsQ0FBQztHQUNXLGlCQUFpQixDQUFJO0FBQXJCLDhDQUFpQiJ9