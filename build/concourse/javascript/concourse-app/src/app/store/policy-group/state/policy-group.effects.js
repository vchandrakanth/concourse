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
const operators_2 = require("rxjs/operators");
const modal_1 = require("@concourse/core/modal");
const router_actions_1 = require("@concourse/core/router/router.actions");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const approval_actions_1 = require("@concourse/store/approval/state/approval.actions");
const attribute_tag_actions_1 = require("@concourse/store/attribute-tag/state/attribute-tag.actions");
const group_actions_1 = require("@concourse/store/group/state/group.actions");
const policy_group_template_actions_1 = require("@concourse/store/policy-group-template/state/policy-group-template.actions");
const policy_resolution_actions_1 = require("@concourse/store/policy-resolution/state/policy-resolution.actions");
const policy_template_actions_1 = require("@concourse/store/policy-template/state/policy-template.actions");
const surface_layer_actions_1 = require("@concourse/store/surface-layer/state/surface-layer.actions");
const policy_group_actions_1 = require("./policy-group.actions");
let PolicyGroupEffects = class PolicyGroupEffects {
    constructor(actions$, policyGroupFacade, policyGroupApi, surfaceFacade) {
        this.actions$ = actions$;
        this.policyGroupFacade = policyGroupFacade;
        this.policyGroupApi = policyGroupApi;
        this.surfaceFacade = surfaceFacade;
        this.loadPolicyGroups$ = this.actions$.pipe(effects_1.ofType(policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroups), operators_2.switchMap(_ => this.policyGroupApi.list().pipe(operators_2.map(data => new policy_group_actions_1.LoadPolicyGroupsSuccess(data)), operators_1.handleError('toast', new policy_group_actions_1.LoadPolicyGroupFailure()))));
        this.loadPolicyGroupsByPagination$ = this.actions$.pipe(effects_1.ofType(policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroupsByPagination), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.policyGroupApi.paginatedList(payload.size, payload.page).pipe(operators_2.map(data => new policy_group_actions_1.LoadPolicyGroupsByPaginationSuccess(data)), operators_1.handleError('toast', new policy_group_actions_1.LoadPolicyGroupsByPaginationFailure()))));
        this.loadPolicyGroupsBySurfaceLayer$ = this.actions$.pipe(effects_1.ofType(policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroupsBySurfaceLayerIds), operators_2.map((action) => action.payload), operators_2.switchMap(surfaceLayerIds => this.policyGroupApi.listBySurfaceLayerIds(surfaceLayerIds).pipe(operators_2.map(data => new policy_group_actions_1.LoadPolicyGroupsBySurfaceLayerIdsSuccess(data)), operators_1.handleError('toast', new policy_group_actions_1.LoadPolicyGroupsBySurfaceLayerIdsFailure()))));
        this.loadPolicyGroup$ = this.actions$.pipe(effects_1.ofType(policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroup), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.policyGroupApi.get(payload).pipe(operators_2.map(data => new policy_group_actions_1.LoadPolicyGroupSuccess(data)), operators_1.handleError('toast', new policy_group_actions_1.LoadPolicyGroupFailure()))));
        this.createPolicyGroup$ = this.actions$.pipe(effects_1.ofType(policy_group_actions_1.PolicyGroupActionTypes.CreatePolicyGroup), operators_2.map((action) => action.payload), operators_2.exhaustMap(({ policyGroup: payload, versionBump }) => this.policyGroupApi.create(payload, versionBump).pipe(operators_2.mergeMap(data => [
            new policy_group_actions_1.CreatePolicyGroupSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Policy Group Created Successfully', type: 'success' }),
            new router_actions_1.RouterGo({ path: [`/policy-groups/${data.id}`] })
        ]), operators_1.handleError('form', new policy_group_actions_1.CreatePolicyGroupFailure()))));
        this.deletePolicyGroup$ = this.actions$.pipe(effects_1.ofType(policy_group_actions_1.PolicyGroupActionTypes.DeletePolicyGroup), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.policyGroupApi.delete(payload).pipe(operators_2.mergeMap(data => !!data ?
            [
                new policy_group_actions_1.DeletePolicyGroupPending(data),
                new modal_1.CloseModal()
            ] :
            [
                new policy_group_actions_1.DeletePolicyGroupSuccess(payload),
                new toast_actions_1.OpenToast({ message: 'Policy Group Deleted Successfully', type: 'success' }),
                new modal_1.CloseModal(),
                new router_actions_1.RouterGo({ path: ['/policy-groups/'] })
            ]), operators_1.handleError('form', new policy_group_actions_1.DeletePolicyGroupFailure()))));
        this.updatePolicyGroupDetails$ = this.actions$.pipe(effects_1.ofType(policy_group_actions_1.PolicyGroupActionTypes.UpdatePolicyGroup), operators_2.map((action) => action.payload), operators_2.concatMap(({ newPolicyGroupDetails: payload, versionBump }) => this.policyGroupApi.updatePolicyDetails(payload, versionBump).pipe(operators_2.mergeMap(data => [
            new policy_group_actions_1.UpdatePolicyGroupSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Policy Group Updated Successfully', type: 'success' }),
            ...(payload.id !== data.id ? [
                new policy_group_actions_1.UpdatePolicyGroupSuccess(payload.copyWith({ isLatest: false, status: payload.status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT' })),
                new router_actions_1.RouterGo({ path: [`/policy-groups/${data.id}`] })
            ] : [])
        ]), operators_1.handleError('form', new policy_group_actions_1.UpdatePolicyGroupFailure()))));
        this.updatePolicyGroupAsset$ = this.actions$.pipe(effects_1.ofType(policy_group_actions_1.PolicyGroupActionTypes.UpdatePolicyGroupRelated), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.policyGroupApi.updatePolicyGroupRelated(payload).pipe(
        // When edit the policy group assets having status draft, it won't redirect to new page, we need to reload updated audit history.
        operators_2.mergeMap(data => [
            new policy_group_actions_1.UpdatePolicyGroupRelatedSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Update Policy Group Asset', type: 'success' }),
            new router_actions_1.RouterGo({ path: [`/policy-groups/${data.id}`] })
        ]), operators_1.handleError('toast', new policy_group_actions_1.UpdatePolicyGroupRelatedFailure()))));
        this.searchPolicyGroup$ = this.actions$.pipe(effects_1.ofType(policy_group_actions_1.PolicyGroupActionTypes.SearchPolicyGroup), operators_2.map((action) => action.payload), operators_2.map(searchText => searchText.toLocaleLowerCase()), operators_2.withLatestFrom(this.policyGroupFacade.list$), operators_2.map(([searchText, policyGroups]) => policyGroups.filter(pg => pg.name.toLocaleLowerCase().includes(searchText)).map(pg => pg.id)), operators_2.map(searchResults => new policy_group_actions_1.SearchPolicyGroupSuccess(searchResults)));
        // routing effects
        this.loadPolicyGroupsNav$ = this.actions$.pipe(operators_1.ofRoute(['/policy-groups']), operators_2.mergeMap(_ => [
            new policy_group_actions_1.SelectPolicyGroup(undefined),
            new policy_group_actions_1.LoadPolicyGroupsByPagination({ page: '0', size: '200' }),
            // new LoadPolicyGroupsByPagination({page: '0', size: '10'}),
            // new LoadPolicyGroups(),
            new policy_template_actions_1.LoadPolicyTemplates(),
            new policy_group_template_actions_1.LoadPolicyGroupTemplates(),
            new surface_layer_actions_1.LoadSurfaceLayers(),
            new attribute_tag_actions_1.LoadAttributeTags(),
            new group_actions_1.LoadGroups()
        ]));
        this.loadPolicyGroupNav$ = this.actions$.pipe(operators_1.ofRoute(['/policy-groups/:id']), operators_2.map((action) => action.payload), operators_2.exhaustMap(route => this.surfaceFacade.selectedId$.pipe(operators_2.takeUntil(this.actions$.pipe(effects_1.ofType(policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroup))), operators_2.filter(id => id !== undefined), operators_2.mergeMap(_ => [
            new policy_group_actions_1.LoadPolicyGroup(+route.params['id']),
            new policy_group_actions_1.SelectPolicyGroup(+route.params['id']),
            new approval_actions_1.LoadApprovalRequestByRequestEntityId(route.params['id']),
            new policy_resolution_actions_1.LoadPolicyResolutionsByEntityId({ entityKey: 'policyGroupId', entityId: +route.params['id'] })
        ]))));
    }
};
__decorate([
    effects_1.Effect()
], PolicyGroupEffects.prototype, "loadPolicyGroups$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupEffects.prototype, "loadPolicyGroupsByPagination$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupEffects.prototype, "loadPolicyGroupsBySurfaceLayer$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupEffects.prototype, "loadPolicyGroup$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupEffects.prototype, "createPolicyGroup$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupEffects.prototype, "deletePolicyGroup$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupEffects.prototype, "updatePolicyGroupDetails$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupEffects.prototype, "updatePolicyGroupAsset$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupEffects.prototype, "searchPolicyGroup$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupEffects.prototype, "loadPolicyGroupsNav$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupEffects.prototype, "loadPolicyGroupNav$", void 0);
PolicyGroupEffects = __decorate([
    core_1.Injectable()
], PolicyGroupEffects);
exports.PolicyGroupEffects = PolicyGroupEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLmVmZmVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcG9saWN5LWdyb3VwL3N0YXRlL3BvbGljeS1ncm91cC5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBaUU7QUFFakUsOENBQWdKO0FBRWhKLGlEQUFtRDtBQUNuRCwwRUFBa0c7QUFDbEcsdUVBQWdFO0FBQ2hFLHVGQUF3RztBQUN4RyxzR0FBK0Y7QUFDL0YsOEVBQXdFO0FBQ3hFLDhIQUFzSDtBQUN0SCxrSEFBcUg7QUFDckgsNEdBQXFHO0FBQ3JHLHNHQUErRjtBQUUvRixpRUE2QmdDO0FBSWhDLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBa0s3QixZQUNtQixRQUFpQixFQUNqQixpQkFBb0MsRUFDcEMsY0FBa0MsRUFDbEMsYUFBNEI7UUFINUIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLG1CQUFjLEdBQWQsY0FBYyxDQUFvQjtRQUNsQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXBLckMsc0JBQWlCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNsRSxnQkFBTSxDQUFDLDZDQUFzQixDQUFDLGdCQUFnQixDQUFDLEVBQy9DLHFCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDWixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FDN0IsZUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSw4Q0FBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUM5Qyx1QkFBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLDZDQUFzQixFQUFF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