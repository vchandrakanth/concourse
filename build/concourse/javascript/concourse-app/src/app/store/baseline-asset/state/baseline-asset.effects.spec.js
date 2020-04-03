"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@ngrx/effects/testing");
const jasmine_marbles_1 = require("jasmine-marbles");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const modal_1 = require("@concourse/core/modal");
const router_actions_1 = require("@concourse/core/router/router.actions");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const surface_layer_facade_1 = require("@concourse/store/surface-layer/state/surface-layer.facade");
const test_1 = require("@concourse/test");
const fakeBaselines = require("../services/baseline-asset.faker");
const baseline_asset_service_1 = require("../services/baseline-asset.service");
const baseline_asset_actions_1 = require("./baseline-asset.actions");
const baseline_asset_effects_1 = require("./baseline-asset.effects");
const baseline_asset_facade_1 = require("./baseline-asset.facade");
describe('BaselineAssetEffects', () => {
    let actions;
    let effects;
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                baseline_asset_effects_1.BaselineAssetEffects,
                testing_2.provideMockActions(() => actions),
                {
                    provide: baseline_asset_service_1.BaselineAssetService,
                    useValue: {
                        listLogicalDeploymentsBySurfaceLayerId: jest.fn(),
                        getLogicalDeploymentBySurfaceLayerId: jest.fn()
                    }
                },
                test_1.mockFacade(surface_layer_facade_1.SurfaceLayerFacade),
                test_1.mockFacade(baseline_asset_facade_1.BaselineAssetFacade)
            ]
        });
        effects = testing_1.TestBed.get(baseline_asset_effects_1.BaselineAssetEffects);
        service = testing_1.TestBed.get(baseline_asset_service_1.BaselineAssetService);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('list$', () => {
        it('should return a BaselineAssetSuccess, with an array of BaselineAssets, on success', () => {
            const baselines = fakeBaselines.fakeManyBaselineAssets(5);
            const action = new baseline_asset_actions_1.LoadBaselineAssets();
            const outcome = new baseline_asset_actions_1.LoadBaselineAssetsSuccess(baselines);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: baselines });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.list = jest.fn(() => response);
            expect(effects.list$).toBeObservable(expected);
        });
        it('should return a BaselineAssetsFailure, with an error, on failure', () => {
            const action = new baseline_asset_actions_1.LoadBaselineAssets();
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const blError = new baseline_asset_actions_1.LoadBaselineAssetsFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: blError });
            service.list = jest.fn(() => response);
            expect(effects.list$).toBeObservable(expected);
        });
    });
    describe('loadContent$', () => {
        it('should return a LoadBaselineAssetContentSuccess, with an array of BaselineAssetContent, on success', () => {
            const baseline = fakeBaselines.fakeOneBaselineAsset();
            const baselineContent = fakeBaselines.fakeOneBaselineContent();
            const action = new baseline_asset_actions_1.LoadBaselineAssetContent(baseline.id);
            const outcome = new baseline_asset_actions_1.LoadBaselineAssetContentSuccess(baselineContent);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: baselineContent });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.getContent = jest.fn(() => response);
            expect(effects.loadContent$).toBeObservable(expected);
        });
        it('should return a LoadBaselineAssetContentFailure, with an error, on failure', () => {
            const action = new baseline_asset_actions_1.LoadBaselineAssetContent(0);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const blcError = new baseline_asset_actions_1.LoadBaselineAssetContentFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: blcError });
            service.getContent = jest.fn(() => response);
            expect(effects.loadContent$).toBeObservable(expected);
        });
    });
    describe('loadStats$', () => {
        it('should return a LoadBaselineAssetStatsSuccess, with an array of BaselineAssetStats, on success', () => {
            const baseline = fakeBaselines.fakeOneBaselineAsset();
            const stat = fakeBaselines.fakeOneBaselineStat();
            const action = new baseline_asset_actions_1.LoadBaselineAssetStats(baseline.id);
            const outcome = new baseline_asset_actions_1.LoadBaselineAssetStatsSuccess(stat);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: stat });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.getStats = jest.fn(() => response);
            expect(effects.loadStata$).toBeObservable(expected);
        });
        it('should return a BaselineAssetsFailure, with an error, on failure', () => {
            const action = new baseline_asset_actions_1.LoadBaselineAssetStats(0);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const blsError = new baseline_asset_actions_1.LoadBaselineAssetStatsFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: blsError });
            service.getStats = jest.fn(() => response);
            expect(effects.loadStata$).toBeObservable(expected);
        });
    });
    describe('loadOverview$', () => {
        it('should return a LoadBaselineAssetOverview, with an  BaselineAssetOverview, on success', () => {
            const baseline = fakeBaselines.fakeOneBaselineAsset();
            const overview = fakeBaselines.fakeOneBaselineOverview();
            const action = new baseline_asset_actions_1.LoadBaselineAssetOverview(baseline.id);
            const outcome = new baseline_asset_actions_1.LoadBaselineAssetOverviewSuccess(overview);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: overview });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.getOverview = jest.fn(() => response);
            expect(effects.loadOverview$).toBeObservable(expected);
        });
        it('should return a BaselineAssetsFailure, with an error, on failure', () => {
            const action = new baseline_asset_actions_1.LoadBaselineAssetOverview(0);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const blError = new baseline_asset_actions_1.LoadBaselineAssetOverviewFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: blError });
            service.getOverview = jest.fn(() => response);
            expect(effects.loadOverview$).toBeObservable(expected);
        });
    });
    describe('create$', () => {
        it('should return a CreateBaselineAsset, with created BaselineAsset, on success', () => {
            const baseline = fakeBaselines.fakeOneBaselineAsset();
            const action = new baseline_asset_actions_1.CreateBaselineAsset(baseline);
            const outcome = new baseline_asset_actions_1.CreateBaselineAssetSuccess(baseline);
            const closeModal = new modal_1.CloseModal();
            const toast = new toast_actions_1.OpenToast({ message: 'Baseline Created', type: 'success' });
            const redirect = new router_actions_1.RouterGo({ path: [`/baseline-assets/${baseline.id}`] });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: baseline });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: outcome, c: toast, d: closeModal, e: redirect });
            service.create = jest.fn(() => response);
            expect(effects.create$).toBeObservable(expected);
        });
        it('should return a CreateBaselineAssetFailure, with an error, on failure', () => {
            const action = new baseline_asset_actions_1.CreateBaselineAsset({});
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const ldError = new baseline_asset_actions_1.CreateBaselineAssetFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: ldError });
            service.create = jest.fn(() => response);
            expect(effects.create$).toBeObservable(expected);
        });
    });
    xdescribe('delete$', () => {
        // TODO: Update to support pending & success
        it('should return a DeleteLogicalDeploymentSuccess, with deleted LogicalDeployment id, on success', () => {
            const baseline = fakeBaselines.fakeOneBaselineAsset();
            const action = new baseline_asset_actions_1.DeleteBaselineAsset(baseline.id);
            const outcome = new baseline_asset_actions_1.DeleteBaselineAssetSuccess(baseline.id);
            const openSuccessToaster = new toast_actions_1.OpenToast({ message: 'Baseline Deleted', type: 'success' });
            const routerRedirect = new router_actions_1.RouterGo({ path: ['/baseline-assets'] });
            const closeModal = new modal_1.CloseModal();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: baseline.id });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: outcome, c: openSuccessToaster, d: closeModal, e: routerRedirect });
            service.delete = jest.fn(() => response);
            expect(effects.delete$).toBeObservable(expected);
        });
        it('should return a DeleteLogicalDeploymentFailure, with an error, on failure', () => {
            const action = new baseline_asset_actions_1.DeleteBaselineAsset(0);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form'
            });
            const ldError = new baseline_asset_actions_1.DeleteBaselineAssetFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: ldError });
            service.delete = jest.fn(() => response);
            expect(effects.delete$).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXQuZWZmZWN0cy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2Jhc2VsaW5lLWFzc2V0L3N0YXRlL2Jhc2VsaW5lLWFzc2V0LmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFnRDtBQUNoRCxtREFBMkQ7QUFFM0QscURBQTRDO0FBRzVDLDZFQUFnRjtBQUNoRixpREFBbUQ7QUFDbkQsMEVBQWlFO0FBQ2pFLHVFQUFnRTtBQUVoRSxvR0FBK0Y7QUFDL0YsMENBQTZDO0FBQzdDLGtFQUFrRTtBQUNsRSwrRUFBMEU7QUFDMUUscUVBQStoQjtBQUMvaEIscUVBQWdFO0FBQ2hFLG1FQUE4RDtBQUU5RCxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO0lBQ3BDLElBQUksT0FBd0IsQ0FBQztJQUM3QixJQUFJLE9BQTZCLENBQUM7SUFDbEMsSUFBSSxPQUE2QixDQUFDO0lBRWxDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLFNBQVMsRUFBRTtnQkFDVCw2Q0FBb0I7Z0JBQ3BCLDRCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakM7b0JBQ0UsT0FBTyxFQUFFLDZDQUFvQjtvQkFDN0IsUUFBUSxFQUFFO3dCQUNSLHNDQUFzQyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7d0JBQ2pELG9DQUFvQyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7cUJBQ2hEO2lCQUNGO2dCQUNELGlCQUFVLENBQUMseUNBQWtCLENBQUM7Z0JBQzlCLGlCQUFVLENBQUMsMkNBQW1CLENBQUM7YUFDaEM7U0FDRixDQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENB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