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
const operators_1 = require("@concourse/core/operators");
const rxjs_1 = require("rxjs");
const operators_2 = require("rxjs/operators");
const helpers_1 = require("@concourse/shared/helpers");
let InvariantDefinitionPolicyComponent = class InvariantDefinitionPolicyComponent {
    constructor(fb, ptfComponent, catalogService) {
        this.fb = fb;
        this.ptfComponent = ptfComponent;
        this.catalogService = catalogService;
        this.form = this.fb.group({
            30013: [undefined, forms_1.Validators.required],
            30014: [undefined, forms_1.Validators.required],
            30015: [undefined, forms_1.Validators.required],
            30016: [{}],
            30032: [{}],
            30033: [{}],
            30034: [{}] // filter
        });
        this.resources$ = this.catalogService.azureSpecifications$;
        this.cloudResourceProviders$ = this.resources$.pipe(operators_2.filter(d => !helpers_1.Util.isNullOrUndefined(d)));
        this.cloudResources$ = rxjs_1.combineLatest(this.form.get('30013').valueChanges, this.cloudResourceProviders$).pipe(operators_2.filter(([n, r]) => !helpers_1.Util.isNullOrUndefined(n) && r.length > 0), operators_2.map(([resourceName, resources]) => resources.find(r => r.name === resourceName).resources));
        this.cloudResourceVersions$ = rxjs_1.combineLatest(this.form.get('30015').valueChanges, this.cloudResources$).pipe(operators_2.filter(([n, p]) => !helpers_1.Util.isNullOrUndefined(n) && p.length > 0), operators_2.map(([versionName, versions]) => versions.filter(v => versionName.includes(v.name)).
            reduce((acc, v) => acc.concat(v.versions), [])));
        this.selectedVersion$ = rxjs_1.combineLatest(this.form.get('30014').valueChanges, this.cloudResourceVersions$).pipe(operators_2.filter(([n, v]) => !helpers_1.Util.isNullOrUndefined(n) && v.length > 0), operators_2.map(([versionName, versions]) => versions.find(c => c.name === versionName)));
    }
    ngOnInit() {
        this.catalogService.getAzureSpecifications();
    }
    ngAfterViewInit() {
        this.ptfComponent.addAndPopulateTemplate(this.policyTemplate.id, this.form);
        this.form.get('30013').valueChanges.pipe(operators_2.distinctUntilChanged(), operators_1.untilDestroy(this)).subscribe(_ => {
            this.form.get('30014').reset();
            this.form.get('30015').reset();
        });
        this.form.get('30015').valueChanges.pipe(operators_2.distinctUntilChanged(), operators_1.untilDestroy(this)).subscribe(_ => {
            this.form.get('30014').reset();
        });
    }
    ngOnDestroy() {
        // stub for untilDestroy
    }
};
InvariantDefinitionPolicyComponent = __decorate([
    core_1.Component({
        selector: 'app-invariant-definition-policy',
        templateUrl: './invariant-definition-policy.component.html',
        styleUrls: ['./invariant-definition-policy.component.scss']
    })
], InvariantDefinitionPolicyComponent);
exports.InvariantDefinitionPolicyComponent = InvariantDefinitionPolicyComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52YXJpYW50LWRlZmluaXRpb24tcG9saWN5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvcG9saWN5LXRlbXBsYXRlLWZvcm0tdjIvdGVtcGxhdGVzL2ludmFyaWFudC1kZWZpbml0aW9uLXBvbGljeS9pbnZhcmlhbnQtZGVmaW5pdGlvbi1wb2xpY3kuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTRFO0FBQzVFLDBDQUF5RDtBQUV6RCx5REFBeUQ7QUFDekQsK0JBQXFDO0FBQ3JDLDhDQUFtRTtBQUduRSx1REFBaUQ7QUFTakQsSUFBYSxrQ0FBa0MsR0FBL0MsTUFBYSxrQ0FBa0M7SUEwQzdDLFlBQ21CLEVBQWUsRUFDZixZQUF5QyxFQUN6QyxjQUFvQztRQUZwQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsaUJBQVksR0FBWixZQUFZLENBQTZCO1FBQ3pDLG1CQUFjLEdBQWQsY0FBYyxDQUFzQjtRQTFDdkQsU0FBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25CLEtBQUssRUFBRSxDQUFDLFNBQVMsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQztZQUN2QyxLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7WUFDdkMsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1lBQ3ZDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNYLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNYLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNYLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVM7U0FDdEIsQ0FBQyxDQUFDO1FBRUgsZUFB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