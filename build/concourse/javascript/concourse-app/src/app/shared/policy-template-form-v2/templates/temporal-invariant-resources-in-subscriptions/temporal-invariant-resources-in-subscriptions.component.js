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
const helpers_1 = require("@concourse/shared/helpers");
const rxjs_1 = require("rxjs");
const operators_2 = require("@concourse/core/operators");
let TemporalInvariantResourcesInSubscriptionsComponent = class TemporalInvariantResourcesInSubscriptionsComponent {
    constructor(fb, ptfComponent, catalogService) {
        this.fb = fb;
        this.ptfComponent = ptfComponent;
        this.catalogService = catalogService;
        this.MINUTES_MESSAGE = 'values should fall with in 0-59';
        this.HOURS_MESSAGE = 'values should fall with in 0-23';
        this.DAYS_MESSAGE = 'values should fall with in 0-179';
        this.form = this.fb.group({
            30045: [0, [forms_1.Validators.required, forms_1.Validators.min(0), forms_1.Validators.max(59)]],
            30044: [0, [forms_1.Validators.required, forms_1.Validators.min(0), forms_1.Validators.max(23)]],
            30017: [0, [forms_1.Validators.required, forms_1.Validators.min(0), forms_1.Validators.max(179)]],
            30047: [0, [forms_1.Validators.required, forms_1.Validators.min(0), forms_1.Validators.max(59)]],
            30046: [0, [forms_1.Validators.required, forms_1.Validators.min(0), forms_1.Validators.max(23)]],
            30018: [0, [forms_1.Validators.required, forms_1.Validators.min(0), forms_1.Validators.max(179)]],
            30035: [undefined, forms_1.Validators.required],
            30036: [undefined, forms_1.Validators.required],
            30037: [undefined, forms_1.Validators.required],
            30038: [{}],
            30039: [{}] // Filter Json.
        });
        this.resources$ = this.catalogService.azureSpecifications$;
        this.cloudResourceProviders$ = this.resources$.pipe(operators_1.filter(d => !helpers_1.Util.isNullOrUndefined(d)));
        this.cloudResources$ = rxjs_1.combineLatest(this.form.get('30035').valueChanges, this.cloudResourceProviders$).pipe(operators_1.filter(([n, r]) => !helpers_1.Util.isNullOrUndefined(n) && r.length > 0), operators_1.map(([resourceName, resources]) => resources.find(r => r.name === resourceName).resources));
        this.cloudResourceVersions$ = rxjs_1.combineLatest(this.form.get('30036').valueChanges, this.cloudResources$).pipe(operators_1.filter(([n, p]) => !helpers_1.Util.isNullOrUndefined(n) && p.length > 0), operators_1.map(([versionName, versions]) => versions.filter(v => versionName.includes(v.name)).
            reduce((acc, v) => acc.concat(v.versions), [])));
        this.selectedVersion$ = rxjs_1.combineLatest(this.form.get('30037').valueChanges, this.cloudResourceVersions$).pipe(operators_1.filter(([n, v]) => !helpers_1.Util.isNullOrUndefined(n) && v.length > 0), operators_1.map(([versionName, versions]) => versions.find(c => c.name === versionName)));
    }
    ngOnInit() {
        this.catalogService.getAzureSpecifications();
    }
    ngAfterViewInit() {
        this.ptfComponent.addAndPopulateTemplate(this.policyTemplate.id, this.form);
        this.form.get('30035').valueChanges.pipe(operators_1.distinctUntilChanged(), operators_2.untilDestroy(this)).subscribe(_ => {
            this.form.get('30036').reset();
            this.form.get('30037').reset();
        });
        this.form.get('30036').valueChanges.pipe(operators_1.distinctUntilChanged(), operators_2.untilDestroy(this)).subscribe(_ => {
            this.form.get('30037').reset();
        });
    }
    ngOnDestroy() {
        // stub for untilDestroy
    }
};
TemporalInvariantResourcesInSubscriptionsComponent = __decorate([
    core_1.Component({
        selector: 'app-temporal-invariant-resources-in-subscriptions',
        templateUrl: './temporal-invariant-resources-in-subscriptions.component.html',
        styleUrls: ['./temporal-invariant-resources-in-subscriptions.component.scss']
    })
], TemporalInvariantResourcesInSubscriptionsComponent);
exports.TemporalInvariantResourcesInSubscriptionsComponent = TemporalInvariantResourcesInSubscriptionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcG9yYWwtaW52YXJpYW50LXJlc291cmNlcy1pbi1zdWJzY3JpcHRpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvcG9saWN5LXRlbXBsYXRlLWZvcm0tdjIvdGVtcGxhdGVzL3RlbXBvcmFsLWludmFyaWFudC1yZXNvdXJjZXMtaW4tc3Vic2NyaXB0aW9ucy90ZW1wb3JhbC1pbnZhcmlhbnQtcmVzb3VyY2VzLWluLXN1YnNjcmlwdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTRFO0FBQzVFLDBDQUF5RDtBQUt6RCw4Q0FBbUU7QUFDbkUsdURBQWlEO0FBQ2pELCtCQUFxQztBQUNyQyx5REFBeUQ7QUFPekQsSUFBYSxrREFBa0QsR0FBL0QsTUFBYSxrREFBa0Q7SUFnRDdELFlBQ21CLEVBQWUsRUFDZixZQUF5QyxFQUN6QyxjQUFvQztRQUZwQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsaUJBQVksR0FBWixZQUFZLENBQTZCO1FBQ3pDLG1CQUFjLEdBQWQsY0FBYyxDQUFzQjtRQWxEdkQsb0JBQWUsR0FBRyxpQ0FBaUMsQ0FBQztRQUNwRCxrQkFBYSxHQUFHLGlDQUFpQyxDQUFBO1FBQ2pELGlCQUFZLEdBQUcsa0NBQWtDLENBQUE7UUFHakQsU0FBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25CLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxFQUFFLGtCQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLGtCQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLEVBQUUsa0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsa0JBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4RSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsRUFBRSxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxFQUFFLGtCQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLGtCQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLEVBQUUsa0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsa0JBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4RSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsRUFBRSxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLEtBQUssRUFBRSxDQUFDLFNBQVMsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQztZQUN2QyxLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7WUFDdkMsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1lBQ3ZDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNYLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWU7U0FDNUIsQ0FBQyxDQUFDO1FBRUgsZUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUM7UUFDdEQsNEJBQXVCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQzVDLGtCQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGNBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN4QyxDQUFDO1FBQ0Ysb0JBQWUsR0FBRyxvQkFBYSxDQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQ25DLElBQUksQ0FBQyx1QkFBdUIsQ0FDN0IsQ0FBQyxJQUFJLENBQ0osa0JBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGNBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUM5RCxlQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQzNGLENBQUM7UUFDRiwyQkFBc0IsR0FBRyxvQkFBYSxDQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQ25DLElBQUksQ0FBQyxlQUFlLENBQ3JCLENBQUMsSUFBSSxDQUNKLGtCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxjQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFDOUQsZUFBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUNoQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQzdDLENBQ0YsQ0FBQztRQUNGLHFCQUFnQixHQUFHLG9CQUFhLENBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksRUFDbkMsSUFBSSxDQUFDLHNCQUFzQixDQUM1QixDQUFDLElBQUksQ0FDSixrQkFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsY0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQzlELGVBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUM3RSxDQUFDO0lBS0UsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsY0FBYyxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUN0QyxnQ0FBb0IsRUFBRSxFQUN0Qix3QkFBWSxDQUFDLElBQUksQ0FBQyxDQUNuQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDdEMsZ0NBQW9CLEVBQUUsRUFDdEIsd0JBQVksQ0FBQyxJQUFJLENBQUMsQ0FDbkIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1Qsd0JBQXdCO0lBQzFCLENBQUM7Q0FFRixDQUFBO0FBL0VZLGtEQUFrRDtJQUw5RCxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1EQUFtRDtRQUM3RCxXQUFXLEVBQUUsZ0VBQWdFO1FBQzdFLFNBQVMsRUFBRSxDQUFDLGdFQUFnRSxDQUFDO0tBQzlFLENBQUM7R0FDVyxrREFBa0QsQ0ErRTlEO0FBL0VZLGdIQUFrRCJ9