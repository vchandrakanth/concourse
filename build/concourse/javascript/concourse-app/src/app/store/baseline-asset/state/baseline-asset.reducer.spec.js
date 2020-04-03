"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseline_asset_reducer_1 = require("./baseline-asset.reducer");
const fakeBaseline = require("../services/baseline-asset.faker");
const baseline_asset_actions_1 = require("./baseline-asset.actions");
describe('Baseline Reducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = {};
            const result = baseline_asset_reducer_1.reducer(baseline_asset_reducer_1.initialState, action);
            expect(result).toBe(baseline_asset_reducer_1.initialState);
        });
    });
    describe('LoadBaselineAssets Actions', () => {
        describe('LoadBaselineAssets', () => {
            it('should be loading to true', () => {
                const action = {
                    type: baseline_asset_actions_1.ActionTypes.LoadBaselineAssets
                };
                const result = baseline_asset_reducer_1.reducer(baseline_asset_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
    });
    describe('LoadBaselineAssetsSuccess', () => {
        let result;
        const baselines = fakeBaseline.fakeManyBaselineAssets(5);
        const action = {
            type: baseline_asset_actions_1.ActionTypes.LoadBaselineAssetsSuccess,
            payload: baselines
        };
        result = baseline_asset_reducer_1.reducer(baseline_asset_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to true', () => {
            expect(result.loaded).toBe(true);
        });
        it('should have 5 entities', () => {
            expect(Object.keys(result.entities).length).toBe(5);
        });
        it('should have 5 ids', () => {
            expect(result.ids.length).toBe(5);
            expect(result.ids[0]).toEqual(baselines[0].id);
        });
    });
    describe('LoadBaselineAssetsFailure', () => {
        const action = new baseline_asset_actions_1.LoadBaselineAssetsFailure();
        const result = baseline_asset_reducer_1.reducer(baseline_asset_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should be set loaded to false', () => {
            expect(result.loaded).toBe(false);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXQucmVkdWNlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2Jhc2VsaW5lLWFzc2V0L3N0YXRlL2Jhc2VsaW5lLWFzc2V0LnJlZHVjZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHFFQUF3RTtBQU94RSxpRUFBaUU7QUFDakUscUVBQWlJO0FBQ2pJLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7SUFDaEMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtRQUM5QixFQUFFLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxFQUFFO1lBQ3pDLE1BQU0sTUFBTSxHQUFHLEVBQVMsQ0FBQztZQUV6QixNQUFNLE1BQU0sR0FBRyxnQ0FBTyxDQUFDLHFDQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxxQ0FBWSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7UUFDMUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtZQUNsQyxFQUFFLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO2dCQUNuQyxNQUFNLE1BQU0sR0FBdUI7b0JBQ2pDLElBQUksRUFBRSxvQ0FBVyxDQUFDLGtCQUFrQjtpQkFDckMsQ0FBQztnQkFDRixNQUFNLE1BQU0sR0FBRyxnQ0FBTyxDQUFDLHFDQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7UUFDekMsSUFBSSxNQUFhLENBQUM7UUFDbEIsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpELE1BQU0sTUFBTSxHQUE4QjtZQUN4QyxJQUFJLEVBQUUsb0NBQVcsQ0FBQyx5QkFBeUI7WUFDM0MsT0FBTyxFQUFFLFNBQVM7U0FDbkIsQ0FBQztRQUVGLE1BQU0sR0FBRyxnQ0FBTyxDQUFDLHFDQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFdkMsRUFBRSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtZQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7WUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO1lBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7UUFDekMsTUFBTSxNQUFNLEdBQUcsSUFBSSxrREFBeUIsRUFBRSxDQUFDO1FBRS9DLE1BQU0sTUFBTSxHQUFHLGdDQUFPLENBQUMscUNBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU3QyxFQUFFLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFO1lBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtZQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==