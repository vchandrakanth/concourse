"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const effects_1 = require("@ngrx/effects");
const operators_1 = require("@concourse/core/operators");
const rxjs_1 = require("rxjs");
const operators_2 = require("rxjs/operators");
const asset_actions_1 = require("@concourse/store/asset/state/asset.actions");
const attribute_tag_actions_1 = require("@concourse/store/attribute-tag/state/attribute-tag.actions");
const aws_account_actions_1 = require("@concourse/store/aws-accounts/state/aws-account.actions");
const catalog_service_actions_1 = require("@concourse/store/catalog-service/state/catalog-service.actions");
const group_actions_1 = require("@concourse/store/group/state/group.actions");
const institution_data_actions_1 = require("@concourse/store/institution-data/state/institution-data.actions");
const policy_group_template_actions_1 = require("@concourse/store/policy-group-template/state/policy-group-template.actions");
const policy_template_actions_1 = require("@concourse/store/policy-template/state/policy-template.actions");
const policy_violation_actions_1 = require("@concourse/store/policy-violation/state/policy-violation.actions");
const surface_layer_actions_1 = require("@concourse/store/surface-layer/state/surface-layer.actions");
const components_1 = require("../components");
const modal_actions_1 = require("./modal.actions");
let ModalEffects = class ModalEffects {
    constructor(actions$, modalService, modalStoreFacade) {
        this.actions$ = actions$;
        this.modalService = modalService;
        this.modalStoreFacade = modalStoreFacade;
        this.openModal$ = this.actions$.pipe(effects_1.ofType(modal_actions_1.ModalActionTypes.OpenModal), operators_2.map((action) => action.payload), operators_2.map(payload => new modal_actions_1.OpenModalSuccess({
            id: payload.id,
            modalRef: this.modalService.show(payload.component, payload.options)
        })));
        this.closeModal$ = this.actions$.pipe(effects_1.ofType(modal_actions_1.ModalActionTypes.CloseModal), operators_2.switchMap(_ => rxjs_1.combineLatest(this.modalStoreFacade.activeModal$, this.modalStoreFacade.modals$).pipe(operators_2.take(1))), operators_2.tap(([activeModal, modals]) => {
            if (!!activeModal) {
                modals[activeModal].hide();
            }
        }), operators_2.switchMap(() => rxjs_1.EMPTY));
        this.modalServiceHide$ = this.modalService.onHidden.pipe(operators_2.withLatestFrom(this.modalStoreFacade.activeModal$), operators_2.map(([onHiddenEvent, modalId]) => new modal_actions_1.CloseModalSuccess(modalId)));
        this.openedPolicyGroupModal$ = this.actions$.pipe(operators_1.ofModal([components_1.CreatePolicyGroupComponent, components_1.CreatePolicyGroupV3Component]), operators_2.mergeMap(_ => [
            new policy_violation_actions_1.ClearEvaluation(),
            new policy_template_actions_1.LoadPolicyTemplates(),
            new policy_group_template_actions_1.LoadPolicyGroupTemplates(),
            new surface_layer_actions_1.LoadSurfaceLayers(),
            new attribute_tag_actions_1.LoadAttributeTags(),
            new group_actions_1.LoadGroups()
        ]));
        this.openedPolicyGroupTemplateModal$ = this.actions$.pipe(operators_1.ofModal(components_1.CreatePolicyGroupTemplateComponent), operators_2.mergeMap(_ => [
            new policy_template_actions_1.LoadPolicyTemplates()
        ]));
        this.openedPolicyTemplateEditModal$ = this.actions$.pipe(operators_1.ofModal(components_1.ModifyPolicyTemplatesComponent), operators_2.mergeMap(_ => [
            new policy_template_actions_1.LoadPolicyTemplates()
        ]));
        this.openedAssetModal$ = this.actions$.pipe(operators_1.ofModal(components_1.EnclaveFormModalComponent), operators_2.mergeMap(_ => [
            new attribute_tag_actions_1.LoadAttributeTags(),
            new group_actions_1.LoadGroups()
        ]));
        this.openedDeployNodeModal$ = this.actions$.pipe(operators_1.ofModal(components_1.DeployNodeComponent), operators_2.mergeMap(_ => [
            new surface_layer_actions_1.LoadSurfaceLayers(),
            new catalog_service_actions_1.LoadAWSRegionsFromCatalog(),
            new aws_account_actions_1.LoadAwsAccounts()
        ]));
        this.openedInstitutionDataModal$ = this.actions$.pipe(operators_1.ofModal(components_1.CreateInstitutionDataComponent), operators_2.mergeMap(_ => [
            new catalog_service_actions_1.LoadInstitutionDatas()
        ]));
        this.manageKeyValueData$ = this.actions$.pipe(operators_1.ofModal(components_1.ManageKeyValueDataComponent), operators_2.mergeMap(({ options }) => {
            const { dataDomain, surfaceId, surfaceLayerId } = options.initialState;
            return [
                new institution_data_actions_1.LoadInstitutionsData({ dataDomain, surfaceId, surfaceLayerId })
            ];
        }));
        this.openedChangeVersionModal$ = this.actions$.pipe(operators_1.ofModal(components_1.ChangeDeploymentVersionComponent), operators_2.mergeMap(({ options }) => {
            const { currentModel } = options.initialState;
            return [
                new asset_actions_1.LoadAssetsByLineageId(currentModel.lineageId)
            ];
        }));
        this.openedAWSActionEdit$ = this.actions$.pipe(operators_1.ofModal([
            components_1.CreateCloudUserRoleComponent,
            components_1.ModifyAwsActionsComponent,
            components_1.ModifyAwsNonActionsComponent
        ]), operators_2.mergeMap(_ => [
            new catalog_service_actions_1.LoadAWSActions()
        ]));
        this.openedAzureActionEdit$ = this.actions$.pipe(operators_1.ofModal([
            components_1.CreateCloudUserRoleComponent,
            components_1.ModifyAzureActionsComponent,
            components_1.ModifyAzureNonActionsComponent
        ]), operators_2.mergeMap(_ => [
            new catalog_service_actions_1.LoadAzureActions()
        ]));
    }
};
__decorate([
    effects_1.Effect()
], ModalEffects.prototype, "openModal$", void 0);
__decorate([
    effects_1.Effect({ dispatch: false })
], ModalEffects.prototype, "closeModal$", void 0);
__decorate([
    effects_1.Effect()
], ModalEffects.prototype, "modalServiceHide$", void 0);
__decorate([
    effects_1.Effect()
], ModalEffects.prototype, "openedPolicyGroupModal$", void 0);
__decorate([
    effects_1.Effect()
], ModalEffects.prototype, "openedPolicyGroupTemplateModal$", void 0);
__decorate([
    effects_1.Effect()
], ModalEffects.prototype, "openedPolicyTemplateEditModal$", void 0);
__decorate([
    effects_1.Effect()
], ModalEffects.prototype, "openedAssetModal$", void 0);
__decorate([
    effects_1.Effect()
], ModalEffects.prototype, "openedDeployNodeModal$", void 0);
__decorate([
    effects_1.Effect()
], ModalEffects.prototype, "openedInstitutionDataModal$", void 0);
__decorate([
    effects_1.Effect()
], ModalEffects.prototype, "manageKeyValueData$", void 0);
__decorate([
    effects_1.Effect()
], ModalEffects.prototype, "openedChangeVersionModal$", void 0);
__decorate([
    effects_1.Effect()
], ModalEffects.prototype, "openedAWSActionEdit$", void 0);
__decorate([
    effects_1.Effect()
], ModalEffects.prototype, "openedAzureActionEdit$", void 0);
ModalEffects = __decorate([
    core_1.Injectable()
], ModalEffects);
exports.ModalEffects = ModalEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuZWZmZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL3N0YXRlL21vZGFsLmVmZmVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMkM7QUFDM0MsMkNBQXdEO0FBSXhELHlEQUFvRDtBQUNwRCwrQkFBd0Q7QUFDeEQsOENBQXFGO0FBRXJGLDhFQUFtRjtBQUNuRixzR0FBK0Y7QUFDL0YsaUdBQTBGO0FBQzFGLDRHQUt3RTtBQUN4RSw4RUFBd0U7QUFDeEUsK0dBQXdHO0FBQ3hHLDhIQUFzSDtBQUN0SCw0R0FBcUc7QUFDckcsK0dBQW1HO0FBQ25HLHNHQUErRjtBQUMvRiw4Q0FldUI7QUFDdkIsbURBS3lCO0FBSXpCLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUE0SHZCLFlBQ21CLFFBQWlCLEVBQ2pCLFlBQTRCLEVBQzVCLGdCQUFrQztRQUZsQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLGlCQUFZLEdBQVosWUFBWSxDQUFnQjtRQUM1QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBN0gzQyxlQUFVLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUMzRCxnQkFBTSxDQUFDLGdDQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUNsQyxlQUFHLENBQUMsQ0FBQyxNQUFpQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQzFDLGVBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksZ0NBQWdCLENBQUM7WUFDbEMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ2QsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQztT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