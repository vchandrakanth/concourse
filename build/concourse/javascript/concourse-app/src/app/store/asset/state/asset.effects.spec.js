"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@ngrx/effects/testing");
const jasmine_marbles_1 = require("jasmine-marbles");
const modal_1 = require("@concourse/core/modal");
const router_actions_1 = require("@concourse/core/router/router.actions");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const asset_facade_1 = require("@concourse/store/asset/state/asset.facade");
const fakeGroups = require("@concourse/store/group/services/group.faker");
const test_1 = require("@concourse/test");
const fakeAssets = require("../services/asset.faker");
const asset_service_1 = require("../services/asset.service");
const asset_actions_1 = require("./asset.actions");
const asset_effects_1 = require("./asset.effects");
describe('AssetEffects', () => {
    let actions;
    let effects;
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                asset_effects_1.AssetEffects,
                testing_2.provideMockActions(() => actions),
                test_1.mockFacade(asset_facade_1.AssetFacade),
                {
                    provide: asset_service_1.AssetService,
                    useValue: {
                        applicationList: jest.fn(),
                        enclaveList: jest.fn(),
                        getApplication: jest.fn(),
                        getEnclave: jest.fn(),
                        CreateEnclaveModel: jest.fn(),
                        UpdateEnclaveModel: jest.fn()
                    }
                }
            ]
        });
        effects = testing_1.TestBed.get(asset_effects_1.AssetEffects);
        service = testing_1.TestBed.get(asset_service_1.AssetService);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('loadAsset$', () => {
        it('should return a LoadAssetSuccess, with an enclave asset, on success', () => {
            const group = fakeGroups.fakeOne();
            const enclave = fakeAssets.fakeOneEnclave([], group);
            const action = new asset_actions_1.LoadAsset({ type: 'enclave', id: enclave.id });
            const outcome = new asset_actions_1.LoadAssetSuccess({ type: 'enclave', asset: enclave });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: enclave });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.getEnclave = jest.fn(() => response);
            expect(effects.loadAsset$).toBeObservable(expected);
        });
        it('should return a LoadAssetSuccess, with an application asset, on success', () => {
            const group = fakeGroups.fakeOne();
            const application = fakeAssets.fakeOneApplication(1, group);
            const action = new asset_actions_1.LoadAsset({ type: 'application', id: application.id });
            const outcome = new asset_actions_1.LoadAssetSuccess({ type: 'application', asset: application });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: application });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.getApplication = jest.fn(() => response);
            expect(effects.loadAsset$).toBeObservable(expected);
        });
    });
    describe('createEnclaveModel$', () => {
        it('should return a CreateEnclaveModelSuccess, with created model, on success', () => {
            const group = fakeGroups.fakeOne();
            const enclaveModel = fakeAssets.fakeOneEnclave([], group);
            const action = new asset_actions_1.CreateEnclaveModel({ enclaveModel, versionBump: 'MAJOR' });
            const outcome = new asset_actions_1.CreateEnclaveModelSuccess(enclaveModel);
            const closeModal = new modal_1.CloseModal();
            const toast = new toast_actions_1.OpenToast({ message: 'Enclave Model Created', type: 'success' });
            const routerRedirect = new router_actions_1.RouterGo({ path: [`assets/enclave/${enclaveModel.id}`] });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: enclaveModel });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: outcome, c: closeModal, d: toast, e: routerRedirect });
            service.createEnclaveModel = jest.fn(() => response);
            expect(effects.createEnclaveModel$).toBeObservable(expected);
        });
    });
    describe('updateEnclaveModel$', () => {
        it('should return a UpdateEnclaveModelSuccess, with an enclave model, on success', () => {
            const group = fakeGroups.fakeOne();
            const enclaveModel = fakeAssets.fakeOneEnclave([], group);
            const action = new asset_actions_1.UpdateEnclaveModel({ enclaveModel, versionBump: 'MAJOR' });
            const outcome = new asset_actions_1.UpdateEnclaveModelSuccess(enclaveModel);
            const closeModal = new modal_1.CloseModal();
            const toast = new toast_actions_1.OpenToast({ message: 'Enclave Model Updated', type: 'success' });
            const routerRedirect = new router_actions_1.RouterGo({ path: [`assets/enclave/${enclaveModel.id}`] });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: enclaveModel });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: outcome, c: closeModal, d: toast, e: routerRedirect });
            service.updateEnclaveModel = jest.fn(() => response);
            expect(effects.updateEnclaveModel$).toBeObservable(expected);
        });
    });
    describe('deleteEnclaveModel$', () => {
        it('should return a DeleteEnclaveModelSuccess, with deleted EnclaveModel id, on success', () => {
            const enclaveModelId = 10001;
            const action = new asset_actions_1.DeleteEnclaveModel(enclaveModelId);
            const outcome = new asset_actions_1.DeleteEnclaveModelSuccess(enclaveModelId);
            const routerRedirect = new router_actions_1.RouterGo({ path: ['/assets'] });
            const toast = new toast_actions_1.OpenToast({ message: 'Enclave Deleted', type: 'success' });
            const closeModal = new modal_1.CloseModal();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: enclaveModelId });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: outcome, c: toast, d: closeModal, e: routerRedirect });
            service.deleteEnclaveModel = jest.fn(() => response);
            expect(effects.deleteEnclaveModel$).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuZWZmZWN0cy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2Fzc2V0L3N0YXRlL2Fzc2V0LmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFnRDtBQUNoRCxtREFBMkQ7QUFFM0QscURBQTRDO0FBRzVDLGlEQUFtRDtBQUNuRCwwRUFBaUU7QUFDakUsdUVBQWdFO0FBQ2hFLDRFQUF3RTtBQUN4RSwwRUFBMEU7QUFDMUUsMENBQTZDO0FBQzdDLHNEQUFzRDtBQUN0RCw2REFBeUQ7QUFDekQsbURBV3lCO0FBQ3pCLG1EQUErQztBQUUvQyxRQUFRLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRTtJQUM1QixJQUFJLE9BQXdCLENBQUM7SUFDN0IsSUFBSSxPQUFxQixDQUFDO0lBQzFCLElBQUksT0FBcUIsQ0FBQztJQUUxQixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixTQUFTLEVBQUU7Z0JBQ1QsNEJBQVk7Z0JBQ1osNEJBQWtCLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQyxpQkFBVSxDQUFDLDBCQUFXLENBQUM7Z0JBQ3ZCO29CQUNFLE9BQU8sRUFBRSw0QkFBWTtvQkFDckIsUUFBUSxFQUFFO3dCQUNSLGVBQWUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO3dCQUMxQixXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTt3QkFDdEIsY0FBYyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7d0JBQ3pCLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO3dCQUNyQixrQkFBa0IsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO3dCQUM3QixrQkFBa0IsRUFBRSxJQUFJLENBQUMsRUFBRSxF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