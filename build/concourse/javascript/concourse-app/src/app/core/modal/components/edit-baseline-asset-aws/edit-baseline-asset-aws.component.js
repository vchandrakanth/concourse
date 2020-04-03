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
let EditBaselineAssetAwsComponent = class EditBaselineAssetAwsComponent extends basic_modal_1.BasicModal {
    constructor(catalogService, catalogFacade, baselineAssetFacade, baselineAssetService, fb) {
        super();
        this.catalogService = catalogService;
        this.catalogFacade = catalogFacade;
        this.baselineAssetFacade = baselineAssetFacade;
        this.baselineAssetService = baselineAssetService;
        this.fb = fb;
        this.formReady = false;
        // TODO: Updated with baseline values
        this.form = this.fb.group({
            accountIds: [],
            regions: [],
            stackNames: [],
            resourceGroups: [],
            resourceTypes: [],
            resourceTags: this.fb.group({})
        });
        this.resourceGroupsLoading = true;
        this.stackNamesLoading = true;
        this.accountsLoading = true;
        this.regions$ = this.catalogFacade.awsRegionsList$;
        this.typesLoading = true;
        this.resourceTagsLoading = true;
        this.loading$ = this.baselineAssetFacade.isLoading$;
        this.catalogFacade.getAWSRegions();
        this.catalogFacade.getAWSActions();
        this.baselineAssetService.getAwsResourceGroups().pipe(operators_1.take(1)).subscribe(res => {
            this.resourceGroupsLoading = false;
            this.resourceGroups = res;
        });
        this.baselineAssetService.getAwsResourceTags().pipe(operators_1.take(1)).subscribe(res => {
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
        this.baselineAssetService.getAwsStackNames().pipe(operators_1.take(1)).subscribe(res => {
            this.stackNames = res;
            this.stackNamesLoading = false;
        });
        this.baselineAssetService.getAwsAccounts().pipe(operators_1.take(1)).subscribe(res => {
            this.accounts = res;
            this.accountsLoading = false;
        });
        this.catalogService.awsProducts().pipe(operators_1.take(1)).subscribe(res => {
            const p = [];
            for (const a of res) {
                p.push(a.namespace);
            }
            this.types = [...new Set(p)];
            this.typesLoading = false;
        });
    }
    ngAfterViewInit() {
        this.buildForm();
    }
    buildForm() {
        this.form = this.fb.group({
            accountIds: [this.baseline.awsBaseline.accountIds],
            stackNames: [this.baseline.awsBaseline.stackNames],
            regions: [this.baseline.awsBaseline.regions],
            resourceGroups: [this.baseline.awsBaseline.resourceGroups],
            resourceTypes: [this.baseline.awsBaseline.resourceTypes],
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
        Object.entries(this.baseline.awsBaseline.resourceTags).forEach(i => {
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
        baseline.awsBaseline = Object.assign({}, formValue);
        const params = Object.assign({}, baseline);
        this.baselineAssetFacade.updateAws(id, params);
    }
};
EditBaselineAssetAwsComponent = __decorate([
    core_1.Component({
        selector: 'app-edit-baseline-asset-aws',
        templateUrl: './edit-baseline-asset-aws.component.html',
        styleUrls: ['./edit-baseline-asset-aws.component.scss']
    })
], EditBaselineAssetAwsComponent);
exports.EditBaselineAssetAwsComponent = EditBaselineAssetAwsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1iYXNlbGluZS1hc3NldC1hd3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9lZGl0LWJhc2VsaW5lLWFzc2V0LWF3cy9lZGl0LWJhc2VsaW5lLWFzc2V0LWF3cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBeUQ7QUFDekQsMENBQXFFO0FBS3JFLDhDQUFzQztBQUN0QyxnREFBNEM7QUFPNUMsSUFBYSw2QkFBNkIsR0FBMUMsTUFBYSw2QkFBOEIsU0FBUSx3QkFBVTtJQWlDM0QsWUFDVSxjQUE4QixFQUM5QixhQUFtQyxFQUNuQyxtQkFBd0MsRUFDeEMsb0JBQTBDLEVBQzFDLEVBQWU7UUFFdkIsS0FBSyxFQUFFLENBQUM7UUFOQSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBQ25DLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBbEN6QixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLHFDQUFxQztRQUNyQyxTQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDbkIsVUFBVSxFQUFFLEVBQUU7WUFDZCxPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxFQUFFO1lBQ2QsY0FBYyxFQUFFLEVBQUU7WUFDbEIsYUFBYSxFQUFFLEVBQUU7WUFDakIsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUNoQyxDQUFDLENBQUM7UUFFSCwwQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFFN0Is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