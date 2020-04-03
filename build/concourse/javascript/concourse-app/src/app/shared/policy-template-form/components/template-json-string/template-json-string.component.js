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
const helpers_1 = require("@concourse/shared/helpers");
const valid_json_validator_1 = require("@concourse/shared/helpers/valid-json.validator");
let TemplateJsonStringComponent = class TemplateJsonStringComponent {
    constructor(jsonPipe, ptfComponent) {
        this.jsonPipe = jsonPipe;
        this.ptfComponent = ptfComponent;
        this.control = new forms_1.FormControl('{}', [forms_1.Validators.maxLength(65000), valid_json_validator_1.jsonValidator()]);
        this.contentLoaded = false;
        this.codeMirrorOptions = {
            mode: 'application/json',
            gutters: ['CodeMirror-lint-markers'],
            lineNumbers: true,
            lineWrapping: true,
            autoCloseTags: true,
            styleActiveLine: true,
            lint: true
        };
    }
    ngOnInit() {
        this.ptfComponent.getGroup(this.templateConfig.parent).addControl(this.templateConfig.name, this.control);
    }
    ngAfterViewInit() {
        if (!helpers_1.Util.isUndefined(this.templateConfig.attributeValues)) {
            const [value] = this.templateConfig.attributeValues;
            if (helpers_1.Util.isString(value)) {
                this.control.setValue(value);
            }
            else {
                this.control.setValue(this.jsonPipe.transform(value));
            }
        }
        this.contentLoaded = true;
    }
};
TemplateJsonStringComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'template-json-string',
        // tslint:disable-next-line:max-inline-declarations
        // tslint:disable-next-line:component-max-inline-declarations
        template: `
  <control-validation class="form-group">
    <label>{{templateConfig?.name}} JSON</label>
    <ngx-codemirror *ngIf="contentLoaded" [formControl]="control" [options]="codeMirrorOptions">
    </ngx-codemirror>
    <p validator="jsonInvalid">JSON must be valid</p>
    <p validator="maxlength">Must be less than 65000 characters</p>
  </control-validation>
  `
    })
], TemplateJsonStringComponent);
exports.TemplateJsonStringComponent = TemplateJsonStringComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtanNvbi1zdHJpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9wb2xpY3ktdGVtcGxhdGUtZm9ybS9jb21wb25lbnRzL3RlbXBsYXRlLWpzb24tc3RyaW5nL3RlbXBsYXRlLWpzb24tc3RyaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBLHdDQUFpRTtBQUNqRSwwQ0FBeUQ7QUFHekQsdURBQWlEO0FBQ2pELHlGQUErRTtBQWtCL0UsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7SUFjdEMsWUFDbUIsUUFBa0IsRUFDbEIsWUFBeUM7UUFEekMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixpQkFBWSxHQUFaLFlBQVksQ0FBNkI7UUFkNUQsWUFBTyxHQUFHLElBQUksbUJBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxvQ0FBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLHNCQUFpQixHQUFHO1lBQ2xCLElBQUksRUFBRSxrQkFBa0I7WUFDeEIsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7WUFDcEMsV0FBVyxFQUFFLElBQUk7WUFDakIsWUFBWSxFQUFFLElBQUk7WUFDbEIsYUFBYSxFQUFFLElBQUk7WUFDbkIsZUFBZSxFQUFFLElBQUk7WUFDckIsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDO0lBS0UsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUcsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsY0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQzFELE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQztZQUNwRCxJQUFJLGNBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzlCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDdkQ7U0FDRjtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7Q0FFRixDQUFBO0FBbkNZLDJCQUEyQjtJQWZ2QyxnQkFBUyxDQUFDO1FBQ1QsOENBQThDO1FBQzlDLFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsbURBQW1EO1FBQ25ELDZEQUE2RDtRQUM3RCxRQUFRLEVBQUU7Ozs7Ozs7O0dBUVQ7S0FDRixDQUFDO0dBQ1csMkJBQTJCLENBbUN2QztBQW5DWSxrRUFBMkIifQ==