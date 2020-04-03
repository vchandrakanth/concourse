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
const faMinusCircle_1 = require("@fortawesome/free-solid-svg-icons/faMinusCircle");
const faPlusCircle_1 = require("@fortawesome/free-solid-svg-icons/faPlusCircle");
let AwsResourcesComponent = class AwsResourcesComponent {
    constructor(fb, ptfComponent) {
        this.fb = fb;
        this.ptfComponent = ptfComponent;
        this.form = this.fb.group({
            30012: [undefined, forms_1.Validators.required] // AwsCustomResources
        });
        this.icons = { faPlusCircle: faPlusCircle_1.faPlusCircle, faMinusCircle: faMinusCircle_1.faMinusCircle };
    }
    ngOnInit() {
        this.ptfComponent.addAndPopulateTemplate(this.policyTemplate.id, this.form);
    }
    createControl(value) {
        return this.fb.group({
            customResource: this.fb.control(value, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('^Custom::(.*)')]))
        });
    }
    get awsResources() {
        return this.form.get('30012');
    }
};
AwsResourcesComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'template-allow-custom-resources',
        // tslint:disable-next-line:max-inline-declarations
        templateUrl: 'aws-resources.component.html'
    })
], AwsResourcesComponent);
exports.AwsResourcesComponent = AwsResourcesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXJlc291cmNlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3BvbGljeS10ZW1wbGF0ZS1mb3JtLXYyL3RlbXBsYXRlcy9hd3MtcmVzb3VyY2VzL2F3cy1yZXNvdXJjZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELDBDQUFvRTtBQUVwRSxtRkFBZ0Y7QUFDaEYsaUZBQThFO0FBUzlFLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBT2hDLFlBQ21CLEVBQWUsRUFDZixZQUF5QztRQUR6QyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsaUJBQVksR0FBWixZQUFZLENBQTZCO1FBUDVELFNBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNuQixLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxxQkFBcUI7U0FDOUQsQ0FBQyxDQUFDO1FBQ00sVUFBSyxHQUFHLEVBQUUsWUFBWSxFQUFaLDJCQUFZLEVBQUUsYUFBYSxFQUFiLDZCQUFhLEVBQUUsQ0FBQztJQUs3QyxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25CLGNBQWMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsa0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsRUFBRSxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkgsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNGLENBQUE7QUF6QlkscUJBQXFCO0lBTmpDLGdCQUFTLENBQUM7UUFDVCw4Q0FBOEM7UUFDOUMsUUFBUSxFQUFFLGlDQUFpQztRQUMzQyxtREFBbUQ7UUFDbkQsV0FBVyxFQUFFLDhCQUE4QjtLQUM1QyxDQUFDO0dBQ1cscUJBQXFCLENBeUJqQztBQXpCWSxzREFBcUIifQ==