"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@ngrx/effects/testing");
const jasmine_marbles_1 = require("jasmine-marbles");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const modal_1 = require("@concourse/core/modal");
const router_actions_1 = require("@concourse/core/router/router.actions");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const fakeEnclaves = require("@concourse/store/asset/services/asset.faker");
const fakeAttributeTags = require("@concourse/store/attribute-tag/services/attribute-tag.faker");
const fakeGroups = require("@concourse/store/group/services/group.faker");
const fakeSurfaceLayers = require("@concourse/store/surface-layer/services/surface-layer.faker");
const surface_layer_facade_1 = require("@concourse/store/surface-layer/state/surface-layer.facade");
const fakeUsers = require("@concourse/store/user/services/user.faker");
const test_1 = require("@concourse/test");
const fakeDeployments = require("../services/logical-deployment.faker");
const logical_deployment_service_1 = require("../services/logical-deployment.service");
const logical_deployment_actions_1 = require("./logical-deployment.actions");
const logical_deployment_effects_1 = require("./logical-deployment.effects");
const logical_deployment_facade_1 = require("./logical-deployment.facade");
const asset_actions_1 = require("@concourse/store/asset/state/asset.actions");
describe('LogicalDeploymentEffects', () => {
    let actions;
    let effects;
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                logical_deployment_effects_1.LogicalDeploymentEffects,
                testing_2.provideMockActions(() => actions),
                {
                    provide: logical_deployment_service_1.LogicalDeploymentService,
                    useValue: {
                        listLogicalDeploymentsBySurfaceLayerId: jest.fn(),
                        getLogicalDeploymentBySurfaceLayerId: jest.fn()
                    }
                },
                test_1.mockFacade(surface_layer_facade_1.SurfaceLayerFacade),
                test_1.mockFacade(logical_deployment_facade_1.LogicalDeploymentFacade)
            ]
        });
        effects = testing_1.TestBed.get(logical_deployment_effects_1.LogicalDeploymentEffects);
        service = testing_1.TestBed.get(logical_deployment_service_1.LogicalDeploymentService);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('loadLogicalDeployments$', () => {
        it('should return a LoadLogicalDeploymentsSuccess, with an array of LogicalDeployments, on success', () => {
            const surfaceLayers = fakeSurfaceLayers.fakeMany();
            const requesters = fakeUsers.fakeMany();
            const group = fakeGroups.fakeOne();
            const attributeTags = fakeAttributeTags.fakeMany();
            const models = fakeEnclaves.fakeManyEnclaves(attributeTags, group);
            const logicalDeployments = fakeDeployments.fakeMany(surfaceLayers, requesters, models, 5);
            const action = new logical_deployment_actions_1.LoadLogicalDeployments();
            const outcome = new logical_deployment_actions_1.LoadLogicalDeploymentsSuccess(logicalDeployments);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: logicalDeployments });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.list = jest.fn(() => response);
            expect(effects.loadLogicalDeployments$).toBeObservable(expected);
        });
        it('should return a LoadLogicalDeploymentsFailure, with an error, on failure', () => {
            const action = new logical_deployment_actions_1.LoadLogicalDeployments();
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const ldError = new logical_deployment_actions_1.LoadLogicalDeploymentsFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: ldError });
            service.list = jest.fn(() => response);
            expect(effects.loadLogicalDeployments$).toBeObservable(expected);
        });
    });
    describe('loadLogicalDeploymentsBySurfaceLayerId$', () => {
        it('should return a LoadLogicalDeploymentsBySurfaceLayerIdSuccess, with an array of LogicalDeployments, on success', () => {
            const surfaceLayers = fakeSurfaceLayers.fakeMany();
            const requesters = fakeUsers.fakeMany();
            const attributeTags = fakeAttributeTags.fakeMany();
            const group = fakeGroups.fakeOne();
            const models = fakeEnclaves.fakeManyEnclaves(attributeTags, group);
            const logicalDeployments = fakeDeployments.fakeMany(surfaceLayers, requesters, models, 5);
            const action = new logical_deployment_actions_1.LoadLogicalDeploymentsBySurfaceLayerId([surfaceLayers[0].id]);
            const outcome = new logical_deployment_actions_1.LoadLogicalDeploymentsBySurfaceLayerIdSuccess(logicalDeployments);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: logicalDeployments });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.listBySurfaceLayerIds = jest.fn(() => response);
            expect(effects.loadLogicalDeploymentsBySurfaceLayerId$).toBeObservable(expected);
        });
        it('should return a LoadLogicalDeploymentsBySurfaceLayerIdFailure, with an error, on failure', () => {
            const action = new logical_deployment_actions_1.LoadLogicalDeploymentsBySurfaceLayerId([1001]);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const ldError = new logical_deployment_actions_1.LoadLogicalDeploymentsBySurfaceLayerIdFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: ldError });
            service.listBySurfaceLayerIds = jest.fn(() => response);
            expect(effects.loadLogicalDeploymentsBySurfaceLayerId$).toBeObservable(expected);
        });
    });
    describe('loadLogicalDeploymentBySurfaceLayerId', () => {
        it('should return a LoadLogicalDeploymentBySurfaceLayerId, with a single logicalDeploymentBySurfaceLayerId, on success', () => {
            const surfaceLayers = fakeSurfaceLayers.fakeOne();
            const requester = fakeUsers.fakeOne();
            const attributeTags = fakeAttributeTags.fakeMany();
            const group = fakeGroups.fakeOne();
            const model = fakeEnclaves.fakeOneEnclave(attributeTags, group);
            const logicalDeployment = fakeDeployments.fakeOne(surfaceLayers.id, requester.id, model.id);
            const action = new logical_deployment_actions_1.LoadLogicalDeployment({ surfaceLayerId: surfaceLayers.id, deploymentId: logicalDeployment.id });
            const outcome = new logical_deployment_actions_1.LoadLogicalDeploymentSuccess(logicalDeployment);
            const loadAsset = new asset_actions_1.LoadAsset({ type: 'enclave', id: logicalDeployment.modelId });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: logicalDeployment });
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: loadAsset });
            service.get = jest.fn(() => response);
            expect(effects.loadLogicalDeployment$).toBeObservable(expected);
        });
        it('should return a LoadLogicalDeploymentBySurfaceLayerIdFailure, with an error, on failure', () => {
            const surfaceLayers = fakeSurfaceLayers.fakeOne();
            const requester = fakeUsers.fakeOne();
            const attributeTags = fakeAttributeTags.fakeMany();
            const group = fakeGroups.fakeOne();
            const model = fakeEnclaves.fakeOneEnclave(attributeTags, group);
            const logicalDeployment = fakeDeployments.fakeOne(surfaceLayers.id, requester.id, model.id);
            const action = new logical_deployment_actions_1.LoadLogicalDeployment({ surfaceLayerId: surfaceLayers.id, deploymentId: logicalDeployment.id });
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const ldError = new logical_deployment_actions_1.LoadLogicalDeploymentFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: ldError });
            service.get = jest.fn(() => response);
            expect(effects.loadLogicalDeployment$).toBeObservable(expected);
        });
    });
    describe('createLogicalDeployment$', () => {
        it('should return a CreateLogicalDeploymentSuccess, with created Logical Deployment, on success', () => {
            const surfaceLayer = fakeSurfaceLayers.fakeOne();
            const requester = fakeUsers.fakeOne();
            const attributeTags = fakeAttributeTags.fakeMany();
            const group = fakeGroups.fakeOne();
            const model = fakeEnclaves.fakeOneEnclave(attributeTags, group);
            const logicalDeployment = fakeDeployments.fakeOne(surfaceLayer.id, requester.id, model.id);
            const action = new logical_deployment_actions_1.CreateLogicalDeployment(logicalDeployment);
            const outcome = new logical_deployment_actions_1.CreateLogicalDeploymentSuccess(logicalDeployment);
            const closeModal = new modal_1.CloseModal();
            const toast = new toast_actions_1.OpenToast({ message: 'Deployment Created Successfully', type: 'success' });
            const redirect = new router_actions_1.RouterGo({ path: logicalDeployment.routerLink });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: logicalDeployment });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: outcome, c: closeModal, d: toast, e: redirect });
            service.create = jest.fn(() => response);
            expect(effects.createLogicalDeployment$).toBeObservable(expected);
        });
        it('should return a CreateLogicalDeploymentFailure, with an error, on failure', () => {
            const action = new logical_deployment_actions_1.CreateLogicalDeployment({});
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const ldError = new logical_deployment_actions_1.CreateLogicalDeploymentFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: ldError });
            service.create = jest.fn(() => response);
            expect(effects.createLogicalDeployment$).toBeObservable(expected);
        });
    });
    xdescribe('deleteLogicalDeployment$', () => {
        // TODO: Update to support pending & success
        it('should return a DeleteLogicalDeploymentSuccess, with deleted LogicalDeployment id, on success', () => {
            const deploymentId = 10002;
            const action = new logical_deployment_actions_1.DeleteLogicalDeployment({ surfaceLayerId: 1002, deploymentId });
            const outcome = new logical_deployment_actions_1.DeleteLogicalDeploymentSuccess(deploymentId);
            const openSuccessToaster = new toast_actions_1.OpenToast({ message: 'Deployment Deleted Successfully', type: 'success' });
            const routerRedirect = new router_actions_1.RouterGo({ path: ['/workflows/logical-deployments'] });
            const closeModal = new modal_1.CloseModal();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: deploymentId });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: outcome, c: openSuccessToaster, d: closeModal, e: routerRedirect });
            service.delete = jest.fn(() => response);
            expect(effects.deleteLogicalDeployment$).toBeObservable(expected);
        });
        it('should return a DeleteLogicalDeploymentFailure, with an error, on failure', () => {
            const action = new logical_deployment_actions_1.DeleteLogicalDeployment({ surfaceLayerId: 1002, deploymentId: 10002 });
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form'
            });
            const ldError = new logical_deployment_actions_1.DeleteLogicalDeploymentFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: ldError });
            service.delete = jest.fn(() => response);
            expect(effects.deleteLogicalDeployment$).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naWNhbC1kZXBsb3ltZW50LmVmZmVjdHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9sb2dpY2FsLWRlcGxveW1lbnQvc3RhdGUvbG9naWNhbC1kZXBsb3ltZW50LmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFnRDtBQUNoRCxtREFBMkQ7QUFFM0QscURBQTRDO0FBRzVDLDZFQUFnRjtBQUNoRixpREFBbUQ7QUFDbkQsMEVBQWlFO0FBQ2pFLHVFQUFnRTtBQUNoRSw0RUFBNEU7QUFDNUUsaUdBQWlHO0FBQ2pHLDBFQUEwRTtBQUMxRSxpR0FBaUc7QUFDakcsb0dBQStGO0FBQy9GLHVFQUF1RTtBQUN2RSwwQ0FBNkM7QUFDN0Msd0VBQXdFO0FBQ3hFLHVGQUFrRjtBQUNsRiw2RUFnQnNDO0FBQ3RDLDZFQUF3RTtBQUN4RSwyRUFBc0U7QUFDdEUsOEVBQXVFO0FBRXZFLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7SUFDeEMsSUFBSSxPQUF3QixDQUFDO0lBQzdCLElBQUksT0FBaUMsQ0FBQztJQUN0QyxJQUFJLE9BQWlDLENBQUM7SUFFdEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsU0FBUyxFQUFFO2dCQUNULHFEQUF3QjtnQkFDeEIsNEJBQWtCLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQztvQkFDRSxPQUFPLEVBQUUscURBQXdCO29CQUNqQyxRQUFRLEVBQUU7d0JBQ1Isc0NBQXNDLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTt3QkFDakQsb0NBQW9DLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtxQkFDaEQ7aUJBQ0Y7Z0JBQ0QsaUJBQVUsQ0FBQyx5Q0FBa0Is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