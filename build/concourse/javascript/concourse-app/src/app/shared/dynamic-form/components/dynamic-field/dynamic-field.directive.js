"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const form_button_component_1 = require("../form-button/form-button.component");
const form_checkbox_component_1 = require("../form-checkbox/form-checkbox.component");
const form_file_upload_component_1 = require("../form-file-upload/form-file-upload.component");
const form_input_component_1 = require("../form-input/form-input.component");
const form_radio_component_1 = require("../form-radio/form-radio.component");
const form_select_component_1 = require("../form-select/form-select.component");
const form_text_area_component_1 = require("../form-text-area/form-text-area.component");
const form_type_ahead_component_1 = require("../form-type-ahead/form-type-ahead.component");
const components = {
    button: form_button_component_1.FormButtonComponent,
    checkbox: form_checkbox_component_1.FormCheckboxComponent,
    input: form_input_component_1.FormInputComponent,
    select: form_select_component_1.FormSelectComponent,
    typeahead: form_type_ahead_component_1.FormTypeAheadComponent,
    textarea: form_text_area_component_1.FormTextAreaComponent,
    fileupload: form_file_upload_component_1.FormFileUploadComponent,
    radio: form_radio_component_1.FormRadioComponent
    // TODO: multi select w/tags & autocomplete(?)
};
let DynamicFieldDirective = class DynamicFieldDirective {
    constructor(resolver, container) {
        this.resolver = resolver;
        this.container = container;
    }
    ngOnInit() {
        if (Object.keys(this.config).length !== 0) {
            if (!components[this.config.type]) {
                const supportedTypes = Object.keys(components).join(', ');
                throw new Error(`Trying to use an unsupported type (${this.config.type}).
          Supported types: ${supportedTypes}`);
            }
            const component = this.resolver.resolveComponentFactory(components[this.config.type]);
            this.component = this.container.createComponent(component);
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
        }
    }
    ngOnChanges() {
        if (this.component) {
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
        }
    }
};
__decorate([
    core_1.Input()
], DynamicFieldDirective.prototype, "config", void 0);
__decorate([
    core_1.Input()
], DynamicFieldDirective.prototype, "group", void 0);
DynamicFieldDirective = __decorate([
    core_1.Directive({
        // tslint:disable-next-line:directive-selector
        selector: '[dynamicField]'
    })
], DynamicFieldDirective);
exports.DynamicFieldDirective = DynamicFieldDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1maWVsZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2R5bmFtaWMtZm9ybS9jb21wb25lbnRzL2R5bmFtaWMtZmllbGQvZHluYW1pYy1maWVsZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FTdUI7QUFHdkIsZ0ZBQTJFO0FBQzNFLHNGQUFpRjtBQUNqRiwrRkFBeUY7QUFDekYsNkVBQXdFO0FBQ3hFLDZFQUF3RTtBQUN4RSxnRkFBMkU7QUFDM0UseUZBQW1GO0FBQ25GLDRGQUFzRjtBQUl0RixNQUFNLFVBQVUsR0FBb0M7SUFDbEQsTUFBTSxFQUFFLDJDQUFtQjtJQUMzQixRQUFRLEVBQUUsK0NBQXFCO0lBQy9CLEtBQUssRUFBRSx5Q0FBa0I7SUFDekIsTUFBTSxFQUFFLDJDQUFtQjtJQUMzQixTQUFTLEVBQUUsa0RBQXNCO0lBQ2pDLFFBQVEsRUFBRSxnREFBcUI7SUFDL0IsVUFBVSxFQUFFLG9EQUF1QjtJQUNuQyxLQUFLLEVBQUUseUNBQWtCO0lBQ3pCLDhDQUE4QztDQUMvQyxDQUFDO0FBTUYsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFLaEMsWUFDbUIsUUFBa0MsRUFDbEMsU0FBMkI7UUFEM0IsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFDMUMsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNqQyxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUQsTUFBTSxJQUFJLEtBQUssQ0FDYixzQ0FBc0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJOzZCQUNuQyxjQUFjLEVBQUUsQ0FDcEMsQ0FBQzthQUNIO1lBQ0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBUSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUM1QztJQUNILENBQUM7Q0FFRixDQUFBO0FBaENVO0lBQVIsWUFBSyxFQUFFO3FEQUFxQjtBQUNwQjtJQUFSLFlBQUssRUFBRTtvREFBa0I7QUFGZixxQkFBcUI7SUFKakMsZ0JBQVMsQ0FBQztRQUNULDhDQUE4QztRQUM5QyxRQUFRLEVBQUUsZ0JBQWdCO0tBQzNCLENBQUM7R0FDVyxxQkFBcUIsQ0FpQ2pDO0FBakNZLHNEQUFxQiJ9