"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logical_deployment_actions_1 = require("./logical-deployment.actions");
const logical_deployment_reducer_1 = require("./logical-deployment.reducer");
const fakeEnclaves = require("@concourse/store/asset/services/asset.faker");
const fakeAttributeTags = require("@concourse/store/attribute-tag/services/attribute-tag.faker");
const fakeGroups = require("@concourse/store/group/services/group.faker");
const fakeSurfaceLayers = require("@concourse/store/surface-layer/services/surface-layer.faker");
const fakeUsers = require("@concourse/store/user/services/user.faker");
const fakeLogicalDeployments = require("../services/logical-deployment.faker");
describe('LogicalDeployment Reducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = {};
            const result = logical_deployment_reducer_1.reducer(logical_deployment_reducer_1.initialState, action);
            expect(result).toBe(logical_deployment_reducer_1.initialState);
        });
    });
    describe('LoadLogicalDeployments Actions', () => {
        describe('LoadLogicalDeployments', () => {
            it('should be loading to true', () => {
                const surfaceLayers = fakeSurfaceLayers.fakeMany();
                const action = {
                    type: logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadLogicalDeployments
                };
                const result = logical_deployment_reducer_1.reducer(logical_deployment_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
    });
    describe('LoadLogicalDeploymentsSuccess', () => {
        let result;
        const surfaceLayers = fakeSurfaceLayers.fakeMany();
        const requesters = fakeUsers.fakeMany();
        const attributeTags = fakeAttributeTags.fakeMany();
        const group = fakeGroups.fakeOne();
        const models = fakeEnclaves.fakeManyEnclaves(attributeTags, group);
        const logicalDeployments = fakeLogicalDeployments.fakeMany(surfaceLayers, requesters, models, 2);
        const action = {
            type: logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadLogicalDeploymentsSuccess,
            payload: logicalDeployments
        };
        result = logical_deployment_reducer_1.reducer(logical_deployment_reducer_1.initialState, action);
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
            expect(result.ids[0]).toEqual(logicalDeployments[0].id);
        });
    });
    describe('LoadLogicalDeploymentsFailure', () => {
        const action = new logical_deployment_actions_1.LoadLogicalDeploymentsFailure();
        const result = logical_deployment_reducer_1.reducer(logical_deployment_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should be set loaded to false', () => {
            expect(result.loaded).toBe(false);
        });
    });
    describe('LoadLogicalDeploymentBySurfaceLayerIdFailure', () => {
        const action = new logical_deployment_actions_1.LoadLogicalDeploymentFailure();
        const result = logical_deployment_reducer_1.reducer(logical_deployment_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should be set loaded to false', () => {
            expect(result.loaded).toBe(false);
        });
    });
    describe('LoadLogicalDeploymentsBySurfaceLayerId Actions', () => {
        describe('LoadLogicalDeploymentsBySurfaceLayerId', () => {
            it('should be loading to true', () => {
                const surfaceLayers = fakeSurfaceLayers.fakeMany();
                const action = {
                    type: logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadLogicalDeploymentsBySurfaceLayerId,
                    payload: [surfaceLayers[0].id]
                };
                const result = logical_deployment_reducer_1.reducer(logical_deployment_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
    });
    describe('LoadLogicalDeploymentsBySurfaceLayerIdSuccess', () => {
        let result;
        const surfaceLayers = fakeSurfaceLayers.fakeMany();
        const requesters = fakeUsers.fakeMany();
        const attributeTags = fakeAttributeTags.fakeMany();
        const group = fakeGroups.fakeOne();
        const models = fakeEnclaves.fakeManyEnclaves(attributeTags, group);
        const logicalDeployments = fakeLogicalDeployments.fakeMany(surfaceLayers, requesters, models, 2);
        const action = {
            type: logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadLogicalDeploymentsBySurfaceLayerIdSuccess,
            payload: logicalDeployments
        };
        result = logical_deployment_reducer_1.reducer(logical_deployment_reducer_1.initialState, action);
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
            expect(result.ids[0]).toEqual(logicalDeployments[0].id);
        });
    });
    describe('LoadLogicalDeploymentsBySurfaceLayerIdFailure', () => {
        const action = new logical_deployment_actions_1.LoadLogicalDeploymentsBySurfaceLayerIdFailure();
        const result = logical_deployment_reducer_1.reducer(logical_deployment_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should be set loaded to false', () => {
            expect(result.loaded).toBe(false);
        });
    });
    describe('LoadLogicalDeploymentBySurfaceLayerId Actions', () => {
        describe('LoadLogicalDeploymentBySurfaceLayerId', () => {
            it('should be loading to true', () => {
                const surfaceLayer = fakeSurfaceLayers.fakeOne();
                const user = fakeUsers.fakeOne();
                const attributeTags = fakeAttributeTags.fakeMany();
                const group = fakeGroups.fakeOne();
                const model = fakeEnclaves.fakeOneEnclave(attributeTags, group);
                const logicalDeployments = fakeLogicalDeployments.fakeOne(surfaceLayer.id, user.id, model.id, 2);
                const action = new logical_deployment_actions_1.LoadLogicalDeployment({ surfaceLayerId: surfaceLayer.id, deploymentId: logicalDeployments.id });
                const result = logical_deployment_reducer_1.reducer(logical_deployment_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
    });
    describe('LoadLogicalDeploymentBySurfaceLayerIdSuccess', () => {
        const surfaceLayer = fakeSurfaceLayers.fakeOne();
        const user = fakeUsers.fakeOne();
        const attributeTags = fakeAttributeTags.fakeMany();
        const group = fakeGroups.fakeOne();
        const model = fakeEnclaves.fakeOneEnclave(attributeTags, group);
        const logicalDeployments = fakeLogicalDeployments.fakeOne(surfaceLayer.id, user.id, model.id);
        const action = {
            type: logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadLogicalDeploymentSuccess,
            payload: logicalDeployments
        };
        const result = logical_deployment_reducer_1.reducer(logical_deployment_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to false', () => {
            expect(result.loaded).toBe(true);
        });
        it('should have one entity', () => {
            expect(Object.keys(result.entities).length).toBe(1);
        });
        it('should have one id', () => {
            expect(result.ids.length).toBe(1);
        });
    });
    describe('LoadLogicalDeploymentBySurfaceLayerIdFailure', () => {
        const action = new logical_deployment_actions_1.LoadLogicalDeploymentFailure();
        const result = logical_deployment_reducer_1.reducer(logical_deployment_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should be set loaded to false', () => {
            expect(result.loaded).toBe(false);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naWNhbC1kZXBsb3ltZW50LnJlZHVjZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9sb2dpY2FsLWRlcGxveW1lbnQvc3RhdGUvbG9naWNhbC1kZXBsb3ltZW50LnJlZHVjZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZFQVdzQztBQUN0Qyw2RUFBNEU7QUFFNUUsNEVBQTRFO0FBQzVFLGlHQUFpRztBQUNqRywwRUFBMEU7QUFDMUUsaUdBQWlHO0FBQ2pHLHVFQUF1RTtBQUN2RSwrRUFBK0U7QUFFL0UsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtJQUN6QyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1FBQzlCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7WUFDekMsTUFBTSxNQUFNLEdBQUcsRUFBUyxDQUFDO1lBRXpCLE1BQU0sTUFBTSxHQUFHLG9DQUFPLENBQUMseUNBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU3QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLHlDQUFZLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsRUFBRTtRQUM5QyxRQUFRLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO1lBQ3RDLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7Z0JBQ25DLE1BQU0sYUFBYSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNuRCxNQUFNLE1BQU0sR0FBMkI7b0JBQ3JDLElBQUksRUFBRSx5REFBNEIsQ0FBQyxzQkFBc0I7aUJBQzFELENBQUM7Z0JBQ0YsTUFBTSxNQUFN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