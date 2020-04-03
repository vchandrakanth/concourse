"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fakeRoles = require("../services/cloud-role.faker");
const cloud_role_actions_1 = require("./cloud-role.actions");
const cloud_role_reducer_1 = require("./cloud-role.reducer");
describe('Role Reducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = {};
            const result = cloud_role_reducer_1.reducer(cloud_role_reducer_1.initialState, action);
            expect(result).toBe(cloud_role_reducer_1.initialState);
        });
    });
    describe('LoadCloudRoles Actions', () => {
        describe('LoadRoles', () => {
            it('should set loading to true', () => {
                const action = {
                    type: cloud_role_actions_1.CloudRoleActionTypes.LoadCloudRoles
                };
                const result = cloud_role_reducer_1.reducer(cloud_role_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('LoadCloudRolesSuccess', () => {
            const roles = fakeRoles.fakeMany();
            const action = {
                type: cloud_role_actions_1.CloudRoleActionTypes.LoadCloudRolesSuccess,
                payload: roles
            };
            const entities = roles.reduce((acc, role) => {
                acc[role.id] = role;
                return acc;
            }, {});
            const ids = [...roles.map(r => r.id)];
            const result = cloud_role_reducer_1.reducer(cloud_role_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to true', () => {
                expect(result.loaded).toBe(true);
            });
            it('should have entities', () => {
                expect(Object.keys(result.entities).length).toBe(roles.length);
                expect(result.entities).toEqual(entities);
            });
            it('should have ids', () => {
                expect(result.ids.length).toBe(ids.length);
                expect(result.ids).toEqual(ids);
            });
        });
        describe('LoadCloudRolesFailure', () => {
            const action = {
                type: cloud_role_actions_1.CloudRoleActionTypes.LoadCloudRolesFailure,
            };
            const result = cloud_role_reducer_1.reducer(cloud_role_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to false', () => {
                expect(result.loaded).toBe(true);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS5yZWR1Y2VyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvY2xvdWQtcm9sZS9zdGF0ZS9jbG91ZC1yb2xlLnJlZHVjZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUEwRDtBQUMxRCw2REFLOEI7QUFDOUIsNkRBQTZEO0FBRTdELFFBQVEsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFO0lBQzVCLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7UUFDOUIsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLEdBQUcsRUFBRTtZQUN6QyxNQUFNLE1BQU0sR0FBRyxFQUFTLENBQUM7WUFFekIsTUFBTSxNQUFNLEdBQUcsNEJBQU8sQ0FBQyxpQ0FBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRTdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsaUNBQVksQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO1FBQ3RDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO1lBQ3pCLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7Z0JBQ3BDLE1BQU0sTUFBTSxHQUFtQjtvQkFDN0IsSUFBSSxFQUFFLHlDQUFvQixDQUFDLGNBQWM7aUJBQzFDLENBQUM7Z0JBRUYsTUFBTSxNQUFNLEdBQUcsNEJBQU8sQ0FBQyxpQ0FBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUU3QyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FB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