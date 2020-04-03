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
const modal_1 = require("@concourse/core/modal");
const router_actions_1 = require("@concourse/core/router/router.actions");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const helpers_1 = require("@concourse/shared/helpers");
const approval_actions_1 = require("@concourse/store/approval/state/approval.actions");
const attribute_tag_actions_1 = require("@concourse/store/attribute-tag/state/attribute-tag.actions");
const discovered_deployment_actions_1 = require("@concourse/store/discovered-deployment/state/discovered-deployment.actions");
const group_actions_1 = require("@concourse/store/group/state/group.actions");
const logical_deployment_actions_1 = require("@concourse/store/logical-deployment/state/logical-deployment.actions");
const policy_group_actions_1 = require("@concourse/store/policy-group/state/policy-group.actions");
const policy_resolution_actions_1 = require("@concourse/store/policy-resolution/state/policy-resolution.actions");
const asset_actions_1 = require("./asset.actions");
let AssetEffects = class AssetEffects {
    constructor(actions$, assetApi, assetFacade) {
        this.actions$ = actions$;
        this.assetApi = assetApi;
        this.assetFacade = assetFacade;
        this.loadAssetsPrimer$ = this.actions$.pipe(effects_1.ofType(asset_actions_1.AssetsActionTypes.LoadAssets), operators_2.map((action) => action.payload), operators_2.mergeMap(({ includeTemplates }) => rxjs_1.zip(this.assetApi.enclaveList({ includeTemplates }).pipe(operators_2.map(assets => new asset_actions_1.LoadAssetsByTypeSuccess({ type: 'enclave', assets })), operators_1.handleError('toast', new asset_actions_1.LoadAssetsByTypeFailure())), this.assetApi.applicationList().pipe(operators_2.map(assets => new asset_actions_1.LoadAssetsByTypeSuccess({ type: 'application', assets })), operators_1.handleError('toast', new asset_actions_1.LoadAssetsByTypeFailure())))), operators_2.mergeMap(actions => actions));
        this.loadAssetsByPagination$ = this.actions$.pipe(effects_1.ofType(asset_actions_1.AssetsActionTypes.LoadAssetsByPagination), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.assetApi.paginatedList(payload.size, payload.page).pipe(operators_2.map(data => new asset_actions_1.LoadAssetsByPaginationSuccess(Object.assign({ type: 'enclave' }, data))), operators_1.handleError('toast', new asset_actions_1.LoadAssetsByPaginationFailure()))));
        this.loadAssetsByLineageId$ = this.actions$.pipe(effects_1.ofType(asset_actions_1.AssetsActionTypes.LoadAssetsByLineageId), operators_2.map((action) => action.payload), operators_2.mergeMap(lineageId => (this.assetApi.enclaveList({ includeTemplates: false, lineageId }).pipe(operators_2.map(assets => new asset_actions_1.LoadAssetsByLineageIdSuccess({ assets, type: 'enclave', lineageId })), operators_1.handleError('toast', new asset_actions_1.LoadAssetsByLineageIdFailure())))));
        this.loadAsset$ = this.actions$.pipe(effects_1.ofType(asset_actions_1.AssetsActionTypes.LoadAsset), operators_2.map((action) => action.payload), operators_2.mergeMap(({ type, id }) => {
            switch (type) {
                case 'enclave':
                    return this.assetApi.getEnclave(id).pipe(operators_2.map(asset => new asset_actions_1.LoadAssetSuccess({ type, asset })), operators_1.handleError('toast', new asset_actions_1.LoadAssetFailure()));
                case 'application':
                    return this.assetApi.getApplication(id).pipe(operators_2.map(asset => new asset_actions_1.LoadAssetSuccess({ type, asset })), operators_1.handleError('toast', new asset_actions_1.LoadAssetFailure()));
                default:
                    return rxjs_1.EMPTY;
            }
        }));
        this.searchAssets$ = this.actions$.pipe(effects_1.ofType(asset_actions_1.AssetsActionTypes.SearchAssets), operators_2.map((action) => action.payload), operators_2.map(searchText => searchText.toLocaleLowerCase()), operators_2.withLatestFrom(this.assetFacade.assetList$), operators_2.map(([searchText, assets]) => assets.filter(a => a.name.toLocaleLowerCase().includes(searchText)).map(a => `${a.assetType}-${a.id}`)), operators_2.map(searchResults => new asset_actions_1.SearchAssetsSuccess(searchResults)));
        this.createEnclaveModel$ = this.actions$.pipe(effects_1.ofType(asset_actions_1.AssetsActionTypes.CreateEnclaveModel), operators_2.map((action) => action.payload), operators_2.exhaustMap(({ enclaveModel, versionBump }) => this.assetApi.createEnclaveModel(enclaveModel, versionBump).pipe(operators_2.mergeMap(enclave => [
            new asset_actions_1.CreateEnclaveModelSuccess(enclave),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Enclave Model Created', type: 'success' }),
            new router_actions_1.RouterGo({ path: [`assets/enclave/${enclave.id}`] })
        ]), operators_1.handleError('form', new asset_actions_1.CreateEnclaveModelFailure()))));
        this.resolveCFTResource$ = this.actions$.pipe(effects_1.ofType(asset_actions_1.AssetsActionTypes.ResolveCFTResource), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.assetApi.resolveCFTResource(payload).pipe(operators_2.map(data => {
            const fileNames = Object.keys(data);
            const templates = fileNames.map(fileName => ({
                name: fileName,
                nestedTemplates: Object.entries(data[fileName])
                    .map(([name, path]) => {
                    const parsedPath = helpers_1.safeJSONParse(path);
                    if (parsedPath) {
                        const values = helpers_1.flattenDeep(Object.values(parsedPath));
                        const newPath = values.reduce((acc, v) => {
                            if (/^[\w\-. ]+$/g.test(v)) {
                                acc = v;
                            }
                            return acc;
                        });
                        return { name, path: newPath };
                    }
                    return { name, path };
                })
            }));
            const nestedTemplates = templates.reduce((acc, t) => [...acc, ...t.nestedTemplates.map(nt => nt)], []);
            return {
                fileNames,
                nestedTemplates,
                templates: templates.filter(t => t.nestedTemplates.length > 0)
            };
        }), operators_2.map(data => new asset_actions_1.ResolveCFTResourceSuccess(data)), operators_1.handleError('form', new asset_actions_1.ResolveCFTResourceFailure()))));
        this.updateEnclaveModel$ = this.actions$.pipe(effects_1.ofType(asset_actions_1.AssetsActionTypes.UpdateEnclaveModel), operators_2.map((action) => action.payload), operators_2.exhaustMap(({ enclaveModel, versionBump }) => this.assetApi.updateEnclaveModel(enclaveModel, versionBump).pipe(operators_2.mergeMap(response => [
            new asset_actions_1.UpdateEnclaveModelSuccess(response),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Enclave Model Updated', type: 'success' }),
            new router_actions_1.RouterGo({ path: [`assets/enclave/${response.id}`] })
        ]), operators_1.handleError('form', new asset_actions_1.UpdateEnclaveModelFailure()))));
        this.deleteEnclaveModel$ = this.actions$.pipe(effects_1.ofType(asset_actions_1.AssetsActionTypes.DeleteEnclaveModel), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.assetApi.deleteEnclaveModel(payload).pipe(operators_2.mergeMap(_ => [
            new asset_actions_1.DeleteEnclaveModelSuccess(payload),
            new toast_actions_1.OpenToast({ message: 'Enclave Deleted', type: 'success' }),
            new modal_1.CloseModal(),
            new router_actions_1.RouterGo({ path: ['/assets'] })
        ]), operators_1.handleError('form', new asset_actions_1.DeleteEnclaveModelFailure()))));
        // routing effects
        this.loadListOnNav$ = this.actions$.pipe(operators_1.ofRoute(['/assets'], false), operators_2.mergeMap(_ => [
            // new LoadAssets(), // deprecated, moving to infinite scroll loading
            new asset_actions_1.LoadAssetsByPagination({ includeTemplates: false, page: '0', size: '200' }),
            new attribute_tag_actions_1.LoadAttributeTags(),
            new group_actions_1.LoadGroups()
        ]));
        this.loadApplicationOnNav$ = this.actions$.pipe(operators_1.ofRoute(['/assets/:assetType/:id']), operators_2.map((action) => action.payload), operators_2.map(route => ({ type: route.params['assetType'], id: +route.params['id'] })), operators_2.mergeMap(({ type, id }) => [
            new asset_actions_1.LoadAsset({ type, id }),
            new asset_actions_1.SelectAsset({ type, id }),
            new attribute_tag_actions_1.LoadAttributeTags(),
            new policy_group_actions_1.LoadPolicyGroups(),
            new approval_actions_1.LoadApprovalRequestByRequestEntityId(id),
            new logical_deployment_actions_1.LoadLogicalDeployments(),
            new discovered_deployment_actions_1.LoadDiscoveredDeployments(),
            new policy_resolution_actions_1.LoadPolicyResolutionsByEntityId({ entityKey: 'modelId', entityId: id })
        ]));
    }
};
__decorate([
    effects_1.Effect()
], AssetEffects.prototype, "loadAssetsPrimer$", void 0);
__decorate([
    effects_1.Effect()
], AssetEffects.prototype, "loadAssetsByPagination$", void 0);
__decorate([
    effects_1.Effect()
], AssetEffects.prototype, "loadAssetsByLineageId$", void 0);
__decorate([
    effects_1.Effect()
], AssetEffects.prototype, "loadAsset$", void 0);
__decorate([
    effects_1.Effect()
], AssetEffects.prototype, "searchAssets$", void 0);
__decorate([
    effects_1.Effect()
], AssetEffects.prototype, "createEnclaveModel$", void 0);
__decorate([
    effects_1.Effect()
], AssetEffects.prototype, "resolveCFTResource$", void 0);
__decorate([
    effects_1.Effect()
], AssetEffects.prototype, "updateEnclaveModel$", void 0);
__decorate([
    effects_1.Effect()
], AssetEffects.prototype, "deleteEnclaveModel$", void 0);
__decorate([
    effects_1.Effect()
], AssetEffects.prototype, "loadListOnNav$", void 0);
__decorate([
    effects_1.Effect()
], AssetEffects.prototype, "loadApplicationOnNav$", void 0);
AssetEffects = __decorate([
    core_1.Injectable()
], AssetEffects);
exports.AssetEffects = AssetEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuZWZmZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9hc3NldC9zdGF0ZS9hc3NldC5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBaUU7QUFDakUsK0JBQThDO0FBQzlDLDhDQUFpRztBQUVqRyxpREFBbUQ7QUFDbkQsMEVBQStFO0FBQy9FLHVFQUFnRTtBQUNoRSx1REFBdUU7QUFDdkUsdUZBQXdHO0FBR3hHLHNHQUErRjtBQUMvRiw4SEFBdUg7QUFDdkgsOEVBQXdFO0FBQ3hFLHFIQUE4RztBQUM5RyxtR0FBNEY7QUFDNUYsa0hBQXFIO0FBQ3JILG1EQTZCeUI7QUFHekIsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQTJMdkIsWUFDbUIsUUFBaUIsRUFDakIsUUFBc0IsRUFDdEIsV0FBd0I7UUFGeEIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixhQUFRLEdBQVIsUUFBUSxDQUFjO1FBQ3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBNUxqQyxzQkFBaUIsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2xFLGdCQUFNLENBQUMsaUNBQWlCLENBQUMsVUFBVSxDQUFDLEVBQ3BDLGVBQUcsQ0FBQyxDQUFDLE1BQWtCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDM0Msb0JBQVEsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBRyxDQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ2xELGVBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksdUNBQXVC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