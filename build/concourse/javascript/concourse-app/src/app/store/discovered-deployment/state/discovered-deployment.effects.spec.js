"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const effects_1 = require("@ngrx/effects");
const testing_2 = require("@ngrx/effects/testing");
const jasmine_marbles_1 = require("jasmine-marbles");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const fakeEnclaves = require("@concourse/store/asset/services/asset.faker");
const fakeAttributeTags = require("@concourse/store/attribute-tag/services/attribute-tag.faker");
const fakeGroups = require("@concourse/store/group/services/group.faker");
const fakeLogicalDeployments = require("@concourse/store/logical-deployment/services/logical-deployment.faker");
const fakeSurfaceLayers = require("@concourse/store/surface-layer/services/surface-layer.faker");
const fakeUsers = require("@concourse/store/user/services/user.faker");
const test_1 = require("@concourse/test");
const fakeDiscoveredDeployments = require("../services/discovered-deployment.faker");
const discovered_deployment_service_1 = require("../services/discovered-deployment.service");
const discovered_deployment_actions_1 = require("./discovered-deployment.actions");
const discovered_deployment_effects_1 = require("./discovered-deployment.effects");
const discovered_deployment_facade_1 = require("./discovered-deployment.facade");
describe('DiscoveredDeploymentEffects', () => {
    let actions;
    let effects;
    let metadata;
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                discovered_deployment_effects_1.DiscoveredDeploymentEffects,
                testing_2.provideMockActions(() => actions),
                {
                    provide: discovered_deployment_service_1.DiscoveredDeploymentService,
                    useValue: {
                        listDiscoveredAwsDeployments: jest.fn()
                    }
                },
                test_1.mockFacade(discovered_deployment_facade_1.DiscoveredDeploymentFacade)
            ]
        });
        effects = testing_1.TestBed.get(discovered_deployment_effects_1.DiscoveredDeploymentEffects);
        service = testing_1.TestBed.get(discovered_deployment_service_1.DiscoveredDeploymentService);
        metadata = effects_1.getEffectsMetadata(effects);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('loadDiscoveredDeployments$', () => {
        it('should return a LoadDiscoveredDeploymentsSuccess, with an array of DiscoveredDeployments, on success', () => {
            const surfaceLayers = fakeSurfaceLayers.fakeMany();
            const requesters = fakeUsers.fakeMany();
            const attributeTags = fakeAttributeTags.fakeMany();
            const group = fakeGroups.fakeOne();
            const models = fakeEnclaves.fakeManyEnclaves(attributeTags, group);
            const logicalDeployments = fakeLogicalDeployments.fakeMany(surfaceLayers, requesters, models, 2);
            const discoveredDeployments = fakeDiscoveredDeployments.fakeMany(models, logicalDeployments, 2);
            const action = new discovered_deployment_actions_1.LoadDiscoveredDeployments();
            const outcome = new discovered_deployment_actions_1.LoadDiscoveredDeploymentsSuccess(discoveredDeployments);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: discoveredDeployments });
            const expected = jasmine_marbles_1.cold('--(b)', { b: outcome });
            service.list = jest.fn(() => response);
            expect(effects.loadDiscoveredDeployments$).toBeObservable(expected);
        });
        it('should return a LoadDiscoveredDeploymentsFailure, with an error, on failure', () => {
            const action = new discovered_deployment_actions_1.LoadDiscoveredDeployments();
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const ddError = new discovered_deployment_actions_1.LoadDiscoveredDeploymentsFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: ddError });
            service.list = jest.fn(() => response);
            expect(effects.loadDiscoveredDeployments$).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXJlZC1kZXBsb3ltZW50LmVmZmVjdHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9kaXNjb3ZlcmVkLWRlcGxveW1lbnQvc3RhdGUvZGlzY292ZXJlZC1kZXBsb3ltZW50LmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFnRDtBQUNoRCwyQ0FBb0U7QUFDcEUsbURBQTJEO0FBRTNELHFEQUE0QztBQUc1Qyw2RUFBZ0Y7QUFDaEYsNEVBQTRFO0FBQzVFLGlHQUFpRztBQUNqRywwRUFBMEU7QUFDMUUsZ0hBQWdIO0FBQ2hILGlHQUFpRztBQUNqRyx1RUFBdUU7QUFDdkUsMENBQTZDO0FBQzdDLHFGQUFxRjtBQUNyRiw2RkFBd0Y7QUFDeEYsbUZBSXlDO0FBQ3pDLG1GQUE4RTtBQUM5RSxpRkFBNEU7QUFFNUUsUUFBUSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtJQUMzQyxJQUFJLE9BQXdCLENBQUM7SUFDN0IsSUFBSSxPQUFvQyxDQUFDO0lBQ3pDLElBQUksUUFBc0QsQ0FBQztJQUMzRCxJQUFJLE9BQW9DLENBQUM7SUFFekMsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsU0FBUyxFQUFFO2dCQUNULDJEQUEyQjtnQkFDM0IsNEJBQWtCLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQztvQkFDRSxPQUFPLEVBQUUsMkRBQTJCO29CQUNwQyxRQUFRLEVBQUU7d0JBQ1IsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtxQkFDeEM7aUJBQ0Y7Z0JBQ0QsaUJBQVUsQ0FBQyx5REFBMEIsQ0FBQzthQUN2QztTQUNGLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxpQkFBTyxD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