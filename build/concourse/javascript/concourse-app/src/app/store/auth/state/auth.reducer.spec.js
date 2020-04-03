"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_reducer_1 = require("./auth.reducer");
// TODO: write tests modeled on institution.reducer tests
// https://redmine.concourse.company/issues/80
describe('Auth Reducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = {};
            const result = auth_reducer_1.reducer(auth_reducer_1.initialState, action);
            expect(result).toBe(auth_reducer_1.initialState);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yZWR1Y2VyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvYXV0aC9zdGF0ZS9hdXRoLnJlZHVjZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUF1RDtBQUV2RCx5REFBeUQ7QUFDekQsOENBQThDO0FBRTlDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFO0lBQzVCLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7UUFDOUIsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLEdBQUcsRUFBRTtZQUN6QyxNQUFNLE1BQU0sR0FBRyxFQUFTLENBQUM7WUFFekIsTUFBTSxNQUFNLEdBQUcsc0JBQU8sQ0FBQywyQkFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRTdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsMkJBQVksQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9