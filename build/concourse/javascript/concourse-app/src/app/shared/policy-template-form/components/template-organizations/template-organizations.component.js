"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
let TemplateOrganizationsComponent = class TemplateOrganizationsComponent {
    constructor(ptfComponent, surfaceLayerFacade) {
        this.ptfComponent = ptfComponent;
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.control = new forms_1.FormControl(undefined, [forms_1.Validators.required]);
        this.surfaceLayers$ = this.surfaceLayerFacade.listWithChildrenBySurface$;
    }
    ngOnInit() {
        if (this.templateConfig.attributeValues) {
            this.control.setValue(this.templateConfig.attributeValues);
        }
        this.ptfComponent.getGroup(this.templateConfig.parent).addControl(this.templateConfig.name, this.control);
    }
};
TemplateOrganizationsComponent = __decorate([
    core_1.Component({
        selector: 'app-template-organizations',
        // tslint:disable-next-line:component-max-inline-declarations
        template: `
    <control-validation class="form-group row">
      <label [attr.for]="templateConfig.name">Select Surface Layers</label>
      <div class="selector-container">
        <surface-layer-tree-selector
          [formControl]="control"
          [multiSelect]="templateConfig.multipleValued"
          returnValue="id"
          [surfaceLayers]="surfaceLayers$ | async">
        </surface-layer-tree-selector>
      </div>
    </control-validation>
  `,
        styles: ['.selector-container { max-height: 300px; overflow-y: auto; }']
    })
], TemplateOrganizationsComponent);
exports.TemplateOrganizationsComponent = TemplateOrganizationsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtb3JnYW5pemF0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3BvbGljeS10ZW1wbGF0ZS1mb3JtL2NvbXBvbmVudHMvdGVtcGxhdGUtb3JnYW5pemF0aW9ucy90ZW1wbGF0ZS1vcmdhbml6YXRpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCwwQ0FBeUQ7QUF3QnpELElBQWEsOEJBQThCLEdBQTNDLE1BQWEsOEJBQThCO0lBS3pDLFlBQ21CLFlBQXlDLEVBQ3pDLGtCQUFzQztRQUR0QyxpQkFBWSxHQUFaLFlBQVksQ0FBNkI7UUFDekMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUx6RCxZQUFPLEdBQUcsSUFBSSxtQkFBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM1RCxtQkFBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQywwQkFBMEIsQ0FBQztJQUtoRSxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUM1RDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1RyxDQUFDO0NBQ0YsQ0FBQTtBQWhCWSw4QkFBOEI7SUFsQjFDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNEJBQTRCO1FBQ3RDLDZEQUE2RDtRQUM3RCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztHQVlUO1FBQ0QsTUFBTSxFQUFFLENBQUMsOERBQThELENBQUM7S0FDekUsQ0FBQztHQUNXLDhCQUE4QixDQWdCMUM7QUFoQlksd0VBQThCIn0=