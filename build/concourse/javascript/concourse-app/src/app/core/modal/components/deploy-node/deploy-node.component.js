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
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
const helpers_1 = require("@concourse/shared/helpers");
let DeployNodeComponent = class DeployNodeComponent {
    constructor(fb, catalogFacade, assetFacade, policyViolation, surfaceFacade, surfaceLayerFacade, logicalDeploymentFacade) {
        this.fb = fb;
        this.catalogFacade = catalogFacade;
        this.assetFacade = assetFacade;
        this.policyViolation = policyViolation;
        this.surfaceFacade = surfaceFacade;
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.logicalDeploymentFacade = logicalDeploymentFacade;
        this.asset$ = this.assetFacade.asset$;
        this.surfaceLayers$ = this.surfaceLayerFacade.listWithChildrenBySurface$;
        this.enclaveModelEvaluationResponse$ = this.policyViolation.savedModelEvaluation$;
        this.isLoaded$ = this.assetFacade.isLoaded$;
        this.isUpdating$ = this.logicalDeploymentFacade.isUpdating$;
        this.formPending$ = this.logicalDeploymentFacade.formPending$;
        this.isEvaluationPending$ = this.policyViolation.isEvaluationPending$;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.form = this.fb.group({
            deploymentDetails: this.fb.group({
                name: ['', [forms_1.Validators.required]],
                stackName: ['', [forms_1.Validators.required, forms_1.Validators.pattern('^([A-Z]*\-*[^-]){6,128}$')]],
                surfaceLayer: [undefined, forms_1.Validators.required],
                cloudRegion: [undefined, forms_1.Validators.required],
                cloudAccount: [undefined, forms_1.Validators.required]
            }),
            eval: this.fb.group({})
        });
        this.regionOptions$ = this.catalogFacade.awsRegionsList$.pipe(operators_2.skipWhile(regions => helpers_1.Util.isNullOrUndefined(regions) || regions.length === 0), operators_2.map(regions => regions.map(r => r.region)), operators_2.startWith([]));
        this.awsAccounts$ = this.surfaceFacade.selectedWithRelated$.pipe(operators_2.map(surface => surface.awsAccounts));
    }
    get formValues() {
        return this.form.value;
    }
    get hasSelectedSurface() {
        const field = this.form.get('deploymentDetails.surfaceLayer');
        return !helpers_1.Util.isNullOrUndefined(field.value);
    }
    ngOnInit() {
        this.asset$.pipe(operators_2.filter((asset) => asset.discoveredDeployments.length && asset.LogicalDeployments.length), operators_2.map((asset) => asset.discoveredDeployments.concat(asset.LogicalDeployments).map(d => d.stackName)), operators_2.filter(deploymentsStackNames => new Set(deploymentsStackNames).size === deploymentsStackNames.length), operators_2.map(deploymentsStackNames => deploymentsStackNames[0])).subscribe(stackName => {
            const stackNameField = this.form.get('deploymentDetails.stackName');
            stackNameField.setValue(stackName);
        });
        this.form.get('deploymentDetails.surfaceLayer').valueChanges.pipe(operators_2.filter(x => !helpers_1.Util.isNullOrUndefined(x)), operators_2.distinctUntilKeyChanged('id'), operators_1.untilDestroy(this));
    }
    ngOnDestroy() {
        // stub for onDestroy
    }
    stepEvent(step, asset) {
        if (step.formGroupName === 'eval') {
            this.policyViolation.evaluateSavedEnclaveModel(asset.id, this.formValues.deploymentDetails.surfaceLayer.id);
        }
    }
    get isStackDisable() {
        return this.form.get('deploymentDetails').get('name').value === '';
    }
    get stackName() {
        const stackName = this.form.get('deploymentDetails').get('name').value;
        return stackName.replace(/[^a-zA-Z0-9- ]/g, '').replace(/\s{1,}/g, '-');
    }
    submit(asset) {
        const { name, stackName, surfaceLayer, cloudAccount, cloudRegion } = this.formValues.deploymentDetails;
        const deploymentData = {
            name,
            stackName,
            surfaceLayerId: surfaceLayer.id,
            modelId: asset.id,
            cloudAccount: helpers_1.Util.isArray(cloudAccount) ? cloudAccount.shift() : cloudAccount,
            cloudRegion,
            priority: 'HIGH' // hard-coded in back-end
        };
        this.logicalDeploymentFacade.create(deploymentData);
    }
};
DeployNodeComponent = __decorate([
    core_1.Component({
        selector: 'app-deploy-node',
        templateUrl: './deploy-node.component.html',
        styleUrls: ['./deploy-node.component.scss']
    })
], DeployNodeComponent);
exports.DeployNodeComponent = DeployNodeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LW5vZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9kZXBsb3ktbm9kZS9kZXBsb3ktbm9kZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBNkQ7QUFDN0QsMENBQXlEO0FBQ3pELHVFQUFvRTtBQUVwRSx5REFBeUQ7QUFDekQsOENBQXVHO0FBR3ZHLHVEQUFpRDtBQWdCakQsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUF1QzlCLFlBQ21CLEVBQWUsRUFDZixhQUFtQyxFQUNuQyxXQUF3QixFQUN4QixlQUFzQyxFQUN0QyxhQUE0QixFQUM1QixrQkFBc0MsRUFDdEMsdUJBQWdEO1FBTmhELE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFDbkMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQXVCO1FBQ3RDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQTdDbkUsV0FBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ2pDLG1CQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDBCQUEwQixDQUFDO1FBQ3BFLG9DQUErQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUM7UUFDN0UsY0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQztRQUN2RCxpQkFBWSxH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