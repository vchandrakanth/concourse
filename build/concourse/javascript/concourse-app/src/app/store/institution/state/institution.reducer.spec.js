"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const institution_faker_1 = require("../services/institution.faker");
const institution_actions_1 = require("./institution.actions");
const institution_reducer_1 = require("./institution.reducer");
describe('Institution Reducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = {};
            const result = institution_reducer_1.reducer(institution_reducer_1.initialState, action);
            expect(result).toBe(institution_reducer_1.initialState);
        });
    });
    describe('Load Institutions action', () => {
        it('should set loading to true', () => {
            const action = {
                type: institution_actions_1.InstitutionActionTypes.LoadInstitutions
            };
            const result = institution_reducer_1.reducer(institution_reducer_1.initialState, action);
            expect(result.loading).toBe(true);
        });
    });
    describe('Load Institutions Success action', () => {
        let action;
        let result;
        const institutions = institution_faker_1.fakeMany(2);
        const entities = {
            [institutions[0].id]: institutions[0],
            [institutions[1].id]: institutions[1]
        };
        const ids = [institutions[0].id, institutions[1].id];
        action = {
            type: institution_actions_1.InstitutionActionTypes.LoadInstitutionsSuccess,
            payload: institutions
        };
        result = institution_reducer_1.reducer(institution_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to true', () => {
            expect(result.loaded).toBe(true);
        });
        it('should have two entities', () => {
            expect(Object.keys(result.entities).length).toBe(2);
            expect(result.entities).toEqual(entities);
        });
        it('should have two ids', () => {
            expect(result.ids.length).toBe(2);
            expect(result.ids).toEqual(ids);
        });
    });
    describe('Load Institutions Failure action', () => {
        const action = new institution_actions_1.LoadInstitutionsFailure();
        const result = institution_reducer_1.reducer(institution_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to false', () => {
            expect(result.loaded).toBe(true);
        });
    });
    describe('Load Institution action', () => {
        it('should set loading to true', () => {
            const action = new institution_actions_1.LoadInstitution(1001);
            const result = institution_reducer_1.reducer(institution_reducer_1.initialState, action);
            expect(result.loading).toBe(true);
        });
    });
    describe('Load Institution Success action', () => {
        const institution = institution_faker_1.fakeOne();
        const entities = {
            [institution.id]: institution
        };
        const action = new institution_actions_1.LoadInstitutionSuccess(institution);
        const result = institution_reducer_1.reducer(institution_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to false', () => {
            expect(result.loaded).toBe(true);
        });
        it('should have one entity', () => {
            expect(Object.keys(result.entities).length).toBe(1);
            expect(result.entities).toEqual(entities);
        });
        it('should have one id', () => {
            expect(result.ids.length).toBe(1);
            expect(result.ids[0]).toBe(institution.id);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24ucmVkdWNlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2luc3RpdHV0aW9uL3N0YXRlL2luc3RpdHV0aW9uLnJlZHVjZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFFQUFrRTtBQUNsRSwrREFPK0I7QUFDL0IsK0RBQXFFO0FBRXJFLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7SUFDbkMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtRQUM5QixFQUFFLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxFQUFFO1lBQ3pDLE1BQU0sTUFBTSxHQUFHLEVBQVMsQ0FBQztZQUV6QixNQUFNLE1BQU0sR0FBRyw2QkFBTyxDQUFDLGtDQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxrQ0FBWSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7UUFDeEMsRUFBRSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRTtZQUNwQyxNQUFNLE1BQU0sR0FBcUI7Z0JBQy9CLElBQUksRUFBRSw0Q0FBc0IsQ0FBQyxnQkFBZ0I7YUFDOUMsQ0FBQztZQUVGLE1BQU0sTUFBTSxHQUFHLDZCQUFPLENBQUMsa0NBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU3QyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtRQUNoRCxJQUFJLE1BQStCLENBQUM7UUFDcEMsSUFBSSxNQUFhLENBQUM7UUFDbEIsTUFBTSxZQUFZLEdBQUcsNEJBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxNQUFNLFFBQVEsR0FBRztZQUNmLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDckMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUN0QyxDQUFDO1FBQ0YsTUFBTSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVyRCxNQUFNLEdBQUc7WUFDUCxJQUFJLEVBQUUsNENBQXNCLENBQUMsdUJBQXVCO1lBQ3BELE9BQU8sRUFBRSxZQUFZO1NBQ3RCLENBQUM7UUFFRixNQUFNLEdBQUcsNkJBQU8sQ0FBQyxrQ0FBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXZDLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7WUFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO1lBQ25DLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtZQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtZQUM3QixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUU7UUFDaEQsTUFBTSxNQUFNLEdBQUcsSUFBSSw2Q0FBdUIsRUFBRSxDQUFDO1FBRTdDLE1BQU0sTUFBTSxHQUFHLDZCQUFPLENBQUMsa0NBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU3QyxFQUFFLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFO1lBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRTtZQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRTtRQUN2QyxFQUFFLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO1lBQ3BDLE1BQU0sTUFBTSxHQUFHLElBQUkscUNBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV6QyxNQUFNLE1BQU0sR0FBRyw2QkFBTyxDQUFDLGtDQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7UUFDL0MsTUFBTSxXQUFXLEdBQUcsMkJBQU8sRUFBRSxDQUFDO1FBQzlCLE1BQU0sUUFBUSxHQUFHO1lBQ2YsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVztTQUM5QixDQUFDO1FBRUYsTUFBTSxNQUFNLEdBQUcsSUFBSSw0Q0FBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2RCxNQUFNLE1BQU0sR0FBRyw2QkFBTyxDQUFDLGtDQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFN0MsRUFBRSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtZQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7WUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=