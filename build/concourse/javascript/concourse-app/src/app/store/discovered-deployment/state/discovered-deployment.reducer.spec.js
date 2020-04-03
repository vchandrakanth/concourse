"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discovered_deployment_actions_1 = require("./discovered-deployment.actions");
const discovered_deployment_reducer_1 = require("./discovered-deployment.reducer");
const fakeEnclaves = require("@concourse/store/asset/services/asset.faker");
const fakeAttributeTags = require("@concourse/store/attribute-tag/services/attribute-tag.faker");
const fakeGroups = require("@concourse/store/group/services/group.faker");
const fakeLogicalDeployments = require("@concourse/store/logical-deployment/services/logical-deployment.faker");
const fakeSurfaceLayers = require("@concourse/store/surface-layer/services/surface-layer.faker");
const fakeUsers = require("@concourse/store/user/services/user.faker");
const fakeDiscoveredDeployments = require("../services/discovered-deployment.faker");
describe('DiscoveredDeployment Reducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = {};
            const result = discovered_deployment_reducer_1.reducer(discovered_deployment_reducer_1.initialState, action);
            expect(result).toBe(discovered_deployment_reducer_1.initialState);
        });
    });
    describe('LoadDiscoveredDeployments Actions', () => {
        describe('LoadDiscoveredDeployments', () => {
            it('should be loading to true', () => {
                const action = {
                    type: discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.LoadDiscoveredDeployments
                };
                const result = discovered_deployment_reducer_1.reducer(discovered_deployment_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
    });
    describe('LoadDiscoveredDeploymentsSuccess', () => {
        let result;
        const surfaceLayers = fakeSurfaceLayers.fakeMany();
        const requesters = fakeUsers.fakeMany();
        const attributeTags = fakeAttributeTags.fakeMany();
        const group = fakeGroups.fakeOne();
        const models = fakeEnclaves.fakeManyEnclaves(attributeTags, group);
        const logicalDeployments = fakeLogicalDeployments.fakeMany(surfaceLayers, requesters, models, 2);
        const discoveredDeployments = fakeDiscoveredDeployments.fakeMany(models, logicalDeployments, 2);
        const action = {
            type: discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.LoadDiscoveredDeploymentsSuccess,
            payload: discoveredDeployments
        };
        result = discovered_deployment_reducer_1.reducer(discovered_deployment_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to true', () => {
            expect(result.loaded).toBe(true);
        });
        it('should have two entities', () => {
            expect(Object.keys(result.entities).length).toBe(2);
        });
        it('should have two ids', () => {
            expect(result.ids.length).toBe(2);
            expect(result.ids[0]).toEqual(discoveredDeployments[0].id);
        });
    });
    describe('LoadDiscoveredDeploymentsFailure', () => {
        const action = new discovered_deployment_actions_1.LoadDiscoveredDeploymentsFailure();
        const result = discovered_deployment_reducer_1.reducer(discovered_deployment_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should be set loaded to false', () => {
            expect(result.loaded).toBe(false);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXJlZC1kZXBsb3ltZW50LnJlZHVjZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9kaXNjb3ZlcmVkLWRlcGxveW1lbnQvc3RhdGUvZGlzY292ZXJlZC1kZXBsb3ltZW50LnJlZHVjZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1GQUt5QztBQUN6QyxtRkFBK0U7QUFFL0UsNEVBQTRFO0FBQzVFLGlHQUFpRztBQUNqRywwRUFBMEU7QUFDMUUsZ0hBQWdIO0FBQ2hILGlHQUFpRztBQUNqRyx1RUFBdUU7QUFDdkUscUZBQXFGO0FBRXJGLFFBQVEsQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLEVBQUU7SUFDNUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtRQUM5QixFQUFFLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxFQUFFO1lBQ3pDLE1BQU0sTUFBTSxHQUFHLEVBQVMsQ0FBQztZQUV6QixNQUFNLE1BQU0sR0FBRyx1Q0FBTyxDQUFDLDRDQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyw0Q0FBWSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLEVBQUU7UUFDakQsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtZQUN6QyxFQUFFLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO2dCQUNuQyxNQUFNLE1BQU0sR0FBOEI7b0JBQ3hDLElBQUksRUFBRSwrREFBK0IsQ0FBQyx5QkFBeUI7aUJBQ2hFLENBQUM7Z0JBQ0YsTUFBTSxNQUFNLEdBQUcsdUNBQU8sQ0FBQyw0Q0FBWSxFQUFF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