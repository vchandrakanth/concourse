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
let AwsRegionsComponent = class AwsRegionsComponent {
    constructor(fb, catalogFacade, ptfComponent) {
        this.fb = fb;
        this.catalogFacade = catalogFacade;
        this.ptfComponent = ptfComponent;
        this.form = this.fb.group({
            30004: [undefined, forms_1.Validators.required],
            30005: [undefined, forms_1.Validators.required] // Regions
        });
        this.options$ = this.catalogFacade.awsRegionsList$.pipe(operators_1.skipWhile(regions => regions === undefined || regions.length === 0), operators_1.map(regions => regions.map(region => region.region)), operators_1.startWith([]));
    }
    ngOnInit() {
        this.catalogFacade.getAWSRegions();
        this.ptfComponent.addAndPopulateTemplate(this.policyTemplate.id, this.form);
    }
};
AwsRegionsComponent = __decorate([
    core_1.Component({
        selector: 'app-aws-regions',
        templateUrl: './aws-regions.component.html',
        styleUrls: ['./aws-regions.component.scss']
    })
], AwsRegionsComponent);
exports.AwsRegionsComponent = AwsRegionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXJlZ2lvbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9wb2xpY3ktdGVtcGxhdGUtZm9ybS12Mi90ZW1wbGF0ZXMvYXdzLXJlZ2lvbnMvYXdzLXJlZ2lvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELDBDQUF5RDtBQUV6RCw4Q0FBZ0U7QUFZaEUsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFXOUIsWUFDbUIsRUFBZSxFQUNmLGFBQW1DLEVBQ25DLFlBQXlDO1FBRnpDLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFDbkMsaUJBQVksR0FBWixZQUFZLENBQTZCO1FBWjVELFNBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNuQixLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7WUFDdkMsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVTtTQUNuRCxDQUFDLENBQUM7UUFDSCxhQUFRLEdBQXlCLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLElBQUksQ0FDdEUscUJBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sS0FBSyxTQUFTLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFDbkUsZUFBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUNwRCxxQkFBUyxDQUFDLEVBQUUsQ0FBQyxDQUNkLENBQUM7SUFLRSxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUUsQ0FBQztDQUVGLENBQUE7QUF0QlksbUJBQW1CO0lBTC9CLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSw4QkFBOEI7UUFDM0MsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7S0FDNUMsQ0FBQztHQUNXLG1CQUFtQixDQXNCL0I7QUF0Qlksa0RBQW1CIn0=