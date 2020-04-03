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
let SecurePerimeterInAccountsComponent = class SecurePerimeterInAccountsComponent {
    constructor(fb, institutionDataFacade, ptfComponent) {
        this.fb = fb;
        this.institutionDataFacade = institutionDataFacade;
        this.ptfComponent = ptfComponent;
        this.form = this.fb.group({
            30029: ['BIDIRECTIONAL', forms_1.Validators.required],
            30025: [undefined, forms_1.Validators.required] // External Network Whitelist.
        });
        this.cidrBlocks$ = this.institutionDataFacade.cidrs$.pipe(operators_1.filter(selected => !!selected), operators_1.map(blocks => Object.entries(blocks.multiMapValues).map(([label, value]) => ({ label, value: value.join(',') }))));
    }
    ngOnInit() {
        this.institutionDataFacade.get({ dataDomain: 'INSTITUTION' }, 'network-whitelists');
        this.ptfComponent.addAndPopulateTemplate(this.policyTemplate.id, this.form);
    }
    ngAfterViewInit() {
        // to populate value on update
        if (this.form.get('30025').value instanceof Array) {
            const value = this.form.get('30025').value;
            this.form.controls['30025'].patchValue(value.join(','));
        }
    }
};
SecurePerimeterInAccountsComponent = __decorate([
    core_1.Component({
        selector: 'app-secure-perimeter-in-accounts',
        templateUrl: './secure-perimeter-in-accounts.component.html',
        styleUrls: ['./secure-perimeter-in-accounts.component.scss']
    })
], SecurePerimeterInAccountsComponent);
exports.SecurePerimeterInAccountsComponent = SecurePerimeterInAccountsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLXBlcmltZXRlci1pbi1hY2NvdW50cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3BvbGljeS10ZW1wbGF0ZS1mb3JtLXYyL3RlbXBsYXRlcy9zZWN1cmUtcGVyaW1ldGVyLWluLWFjY291bnRzL3NlY3VyZS1wZXJpbWV0ZXItaW4tYWNjb3VudHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELDBDQUF5RDtBQUN6RCw4Q0FBNkM7QUFXN0MsSUFBYSxrQ0FBa0MsR0FBL0MsTUFBYSxrQ0FBa0M7SUFhN0MsWUFDbUIsRUFBZSxFQUNmLHFCQUE0QyxFQUM1QyxZQUF5QztRQUZ6QyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QyxpQkFBWSxHQUFaLFlBQVksQ0FBNkI7UUFkNUQsU0FBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25CLEtBQUssRUFBRSxDQUFDLGVBQWUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQztZQUM3QyxLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyw4QkFBOEI7U0FDdkUsQ0FBQyxDQUFDO1FBRUgsZ0JBQVcsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDbEQsa0JBQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFDOUIsZUFBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FDbEgsQ0FBQztJQU9FLENBQUM7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxlQUFlO1FBQ2IsOEJBQThCO1FBQzlCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxZQUFZLEtBQUssRUFBRTtZQUNqRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUE7WUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUN4RDtJQUNILENBQUM7Q0FFRixDQUFBO0FBaENZLGtDQUFrQztJQUw5QyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGtDQUFrQztRQUM1QyxXQUFXLEVBQUUsK0NBQStDO1FBQzVELFNBQVMsRUFBRSxDQUFDLCtDQUErQyxDQUFDO0tBQzdELENBQUM7R0FDVyxrQ0FBa0MsQ0FnQzlDO0FBaENZLGdGQUFrQyJ9