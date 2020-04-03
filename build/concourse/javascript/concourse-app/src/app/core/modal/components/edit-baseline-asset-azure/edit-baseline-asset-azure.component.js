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
const basic_modal_1 = require("../basic-modal");
let EditBaselineAssetAzureComponent = class EditBaselineAssetAzureComponent extends basic_modal_1.BasicModal {
    constructor(catalogFacade, baselineAssetFacade, baselineAssetService, institutionDataFacade, fb) {
        super();
        this.catalogFacade = catalogFacade;
        this.baselineAssetFacade = baselineAssetFacade;
        this.baselineAssetService = baselineAssetService;
        this.institutionDataFacade = institutionDataFacade;
        this.fb = fb;
        this.selectedFieldValues$ = this.institutionDataFacade.selectedFieldValues$;
        this.azureRegions$ = this.catalogFacade.azureRegionsList$;
        this.azureResourceTagsSelectedValues$ = this.institutionDataFacade.azureResourceTagsSelectedValues$.pipe(operators_1.mergeMap(values => this.selectedFieldValues$.pipe(operators_1.filter(() => values), operators_1.map(selectedValues => values.filter(item => (selectedValues.indexOf(item) < 0), selectedValues)), operators_1.startWith([]))));
        this.formReady = false;
        // TODO: Updated with baseline values
        this.form = this.fb.group({
            accountIds: [],
            templateHashes: [],
            regions: [],
            resourceGroups: [],
            subscriptions: [],
            resourceTypes: [],
            resourceTags: this.fb.group({})
        });
        this.accountsLoading = true;
        this.resourceGroupsLoading = true;
        this.resourceTagsBuilder = [];
        this.resourceTagsLoading = true;
        this.resourceTypesLoading = true;
        this.templateHashesLoading = true;
        this.subscriptionsLoading = true;
        this.loading$ = this.baselineAssetFacade.isLoading$;
        this.catalogFacade.getAzureRegions();
        this.baselineAssetService.getAzureAccounts().pipe(operators_1.take(1)).subscribe(res => {
            this.accounts = res;
            this.accountsLoading = false;
        });
        this.baselineAssetService.getAzureResourceGroups().pipe(operators_1.take(1)).subscribe(res => {
            this.resourceGroups = res;
            this.resourceGroupsLoading = false;
        });
        this.baselineAssetService.getAzureResourceTags().pipe(operators_1.take(1)).subscribe(res => {
            const formatted = res.reduce((acc, curr) => {
                const [key, val] = curr.split('%');
                !acc[key] ? acc[key] = [val] : acc[key] = [...acc[key], val];
                return acc;
            }, {});
            const formattedEntries = Object.entries(formatted);
            const formattedEntriesObjs = [];
            for (const i of formattedEntries) {
                const obj = {
                    name: i[0],
                    values: i[1]
                };
                formattedEntriesObjs.push(obj);
            }
            this.resourceTags = formattedEntriesObjs;
            this.resourceTagsLoading = false;
        });
        this.baselineAssetService.getAzureResourceTypes().pipe(operators_1.take(1)).subscribe(res => {
            this.resourceTypes = res;
            this.resourceTypesLoading = false;
        });
        this.baselineAssetService.getAzureTemplateHashes().pipe(operators_1.take(1)).subscribe(res => {
            this.templateHashes = res;
            this.templateHashesLoading = false;
        });
        this.baselineAssetService.getAzureSubscriptions().pipe(operators_1.take(1)).subscribe(res => {
            this.subscriptions = res;
            this.subscriptionsLoading = false;
        });
    }
    ngAfterViewInit() {
        this.buildForm();
    }
    buildForm() {
        this.form = this.fb.group({
            accountIds: [this.baseline.azureBaseline.accountIds],
            templateHashes: [this.baseline.azureBaseline.templateHashes],
            regions: [this.baseline.azureBaseline.regions],
            resourceGroups: [this.baseline.azureBaseline.resourceGroups],
            subscriptions: [this.baseline.azureBaseline.subscriptions],
            resourceTypes: [this.baseline.azureBaseline.resourceTypes],
            resourceTags: this.fb.group({})
        });
        this.setInitialResourceTags();
        this.formReady = true;
    }
    onAddTagSelection() {
        const formGroup = this.form.get('resourceTags');
        // tslint:disable-next-line:max-line-length
        formGroup.addControl(`${this.selectedResourceTag.name}`, new forms_1.FormControl(this.selectedResourceTagValues));
        this.selectedResourceTag = '';
        this.selectedResourceTagValues = '';
    }
    setInitialResourceTags() {
        Object.entries(this.baseline.azureBaseline.resourceTags).forEach(i => {
            this.form.get('resourceTags').addControl(`${i[0]}`, new forms_1.FormControl(i[1]));
        });
    }
    getResourceTags() {
        return Object.entries(this.form.get('resourceTags').value);
    }
    onRemoveResourceTag(tag) {
        this.form.get('resourceTags').removeControl(tag[0]);
    }
    onSubmit() {
        const id = this.baseline.id;
        const formValue = Object.assign({}, this.form.value);
        const baseline = Object.assign({}, this.baseline);
        baseline.azureBaseline = Object.assign({}, formValue);
        const params = Object.assign({}, baseline);
        this.baselineAssetFacade.updateAzure(id, params);
    }
};
EditBaselineAssetAzureComponent = __decorate([
    core_1.Component({
        selector: 'app-edit-baseline-asset-azure',
        templateUrl: './edit-baseline-asset-azure.component.html',
        styleUrls: ['./edit-baseline-asset-azure.component.scss']
    })
], EditBaselineAssetAzureComponent);
exports.EditBaselineAssetAzureComponent = EditBaselineAssetAzureComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1iYXNlbGluZS1hc3NldC1henVyZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2VkaXQtYmFzZWxpbmUtYXNzZXQtYXp1cmUvZWRpdC1iYXNlbGluZS1hc3NldC1henVyZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBaUU7QUFDakUsMENBQXFFO0FBTXJFLDhDQUE2RTtBQUM3RSxnREFBNEM7QUFPNUMsSUFBYSwrQkFBK0IsR0FBNUMsTUFBYSwrQkFBZ0MsU0FBUSx3QkFBVTtJQW1EN0QsWUFDVSxhQUFtQyxFQUNuQyxtQkFBd0MsRUFDeEMsb0JBQTBDLEVBQzFDLHFCQUE0QyxFQUM1QyxFQUFlO1FBRXZCLEtBQUssRUFBRSxDQUFDO1FBTkEsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBQ25DLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLE9BQUUsR0FBRixFQUFFLENBQWE7UUFyRHpCLHlCQUFvQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxvQkFBb0IsQ0FBQztRQUV2RSxrQkFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUM7UUFFckQscUNBQWdDLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGdDQUFnQyxDQUFDLElBQUksQ0FDakcsb0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQy9DLGtCQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQ3BCLGVBQUcsQ0FBQyxj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