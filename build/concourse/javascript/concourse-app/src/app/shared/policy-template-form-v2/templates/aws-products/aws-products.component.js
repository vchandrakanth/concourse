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
const operators_1 = require("rxjs/operators");
let AwsProductsComponent = class AwsProductsComponent {
    constructor(fb, catalogFacade, ptfComponent) {
        this.fb = fb;
        this.catalogFacade = catalogFacade;
        this.ptfComponent = ptfComponent;
        this.form = new forms_1.FormGroup({});
        this.controlNames = new Map();
        this.options$ = this.catalogFacade.awsProductsList$.pipe(operators_1.skipWhile(services => services === undefined || services.length === 0), operators_1.map(services => services.map(s => s.namespace)), operators_1.startWith([]));
    }
    ngOnInit() {
        // For 10023: Allow Aws Products In Accounts, 10006: Allow Aws Products In Stacks.
        this.policyTemplate.attributes.forEach(attribute => {
            this.form.addControl(`${attribute.id}`, new forms_1.FormControl('', forms_1.Validators.required));
            this.controlNames.set(attribute.name, attribute.id);
        });
        this.catalogFacade.getAwsProducts();
        this.ptfComponent.addAndPopulateTemplate(this.policyTemplate.id, this.form);
    }
};
AwsProductsComponent = __decorate([
    core_1.Component({
        selector: 'app-aws-products',
        templateUrl: './aws-products.component.html'
    })
], AwsProductsComponent);
exports.AwsProductsComponent = AwsProductsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXByb2R1Y3RzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvcG9saWN5LXRlbXBsYXRlLWZvcm0tdjIvdGVtcGxhdGVzL2F3cy1wcm9kdWN0cy9hd3MtcHJvZHVjdHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELDBDQUFpRjtBQUVqRiw4Q0FBMkQ7QUFXM0QsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFTL0IsWUFDbUIsRUFBZSxFQUNmLGFBQW1DLEVBQ25DLFlBQXlDO1FBRnpDLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFDbkMsaUJBQVksR0FBWixZQUFZLENBQTZCO1FBVjVELFNBQUksR0FBYyxJQUFJLGlCQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbkMsaUJBQVksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLGFBQVEsR0FBeUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQ3ZFLHFCQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEtBQUssU0FBUyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQ3RFLGVBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFDL0MscUJBQVMsQ0FBQyxFQUFFLENBQUMsQ0FDZCxDQUFDO0lBS0UsQ0FBQztJQUVMLFFBQVE7UUFDTixrRkFBa0Y7UUFDbEYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksbUJBQVcsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDO0NBRUYsQ0FBQTtBQTFCWSxvQkFBb0I7SUFKaEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLCtCQUErQjtLQUM3QyxDQUFDO0dBQ1csb0JBQW9CLENBMEJoQztBQTFCWSxvREFBb0IifQ==