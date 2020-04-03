"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_faker_1 = require("../services/user.faker");
const user_actions_1 = require("./user.actions");
const user_reducer_1 = require("./user.reducer");
describe('User Reducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = {};
            const result = user_reducer_1.reducer(user_reducer_1.initialState, action);
            expect(result).toBe(user_reducer_1.initialState);
        });
    });
    describe('Load Users action', () => {
        it('should set loading to true', () => {
            const action = {
                type: user_actions_1.UserActionTypes.LoadUsers
            };
            const result = user_reducer_1.reducer(user_reducer_1.initialState, action);
            expect(result.loading).toBe(true);
        });
    });
    describe('Load users Success action', () => {
        let action;
        let result;
        const users = user_faker_1.fakeMany(2);
        const entities = {
            [users[0].id]: users[0],
            [users[1].id]: users[1]
        };
        const ids = [users[0].id, users[1].id];
        action = {
            type: user_actions_1.UserActionTypes.LoadUsersSuccess,
            payload: users
        };
        result = user_reducer_1.reducer(user_reducer_1.initialState, action);
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
    describe('Load Users Failure action', () => {
        const action = new user_actions_1.LoadUserFailure();
        const result = user_reducer_1.reducer(user_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to false', () => {
            expect(result.loaded).toBe(false);
        });
    });
    describe('Load User action', () => {
        it('should set loading to true', () => {
            const action = {
                type: user_actions_1.UserActionTypes.LoadUser,
                payload: 101
            };
            const result = user_reducer_1.reducer(user_reducer_1.initialState, action);
            expect(result.loading).toBe(true);
        });
    });
    describe('Load User Success action', () => {
        const user = user_faker_1.fakeOne();
        const entities = {
            [user.id]: user
        };
        const action = new user_actions_1.LoadUserSuccess(user);
        const result = user_reducer_1.reducer(user_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to false', () => {
            expect(result.loaded).toBe(false);
        });
        it('should have one entity', () => {
            expect(Object.keys(result.entities).length).toBe(1);
            expect(result.entities).toEqual(entities);
        });
        it('should have one id', () => {
            expect(result.ids.length).toBe(1);
            expect(result.ids[0]).toBe(user.id);
        });
    });
    describe('Invite User action', () => {
        it('should set formPending to true', () => {
            const action = {
                type: user_actions_1.UserActionTypes.InviteUser,
                payload: { name: 'test', email: 'test@gmail.com' }
            };
            const result = user_reducer_1.reducer(user_reducer_1.initialState, action);
            expect(result.formPending).toBe(true);
        });
    });
    describe('Invite User Success Action', () => {
        const user = user_faker_1.fakeOne();
        const action = new user_actions_1.InviteUserSuccess(user);
        const result = user_reducer_1.reducer(user_reducer_1.initialState, action);
        it('should set loading to true', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to false', () => {
            expect(result.loaded).toBe(false);
        });
    });
    describe('Invite User Failure Action', () => {
        const action = new user_actions_1.InviteUserFailure();
        const result = user_reducer_1.reducer(user_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to false', () => {
            expect(result.loaded).toBe(false);
        });
    });
    describe('Load Delete User action', () => {
        const user = user_faker_1.fakeOne();
        it('should set loading to true', () => {
            const action = new user_actions_1.DeleteUser(user.id);
            const result = user_reducer_1.reducer(user_reducer_1.initialState, action);
            expect(result.loading).toBe(true);
        });
        describe('Delete User Success Action', () => {
            const action = new user_actions_1.DeleteUserSuccess(user.id);
            const previousState = user_reducer_1.reducer(user_reducer_1.initialState, new user_actions_1.LoadUserSuccess(user));
            const result = user_reducer_1.reducer(previousState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should have user removed from entities', () => {
                const found = result.entities[user.id];
                expect(found).toBeFalsy();
            });
        });
        describe('Delete User Failure Action', () => {
            const action = new user_actions_1.DeleteUserFailure();
            const result = user_reducer_1.reducer(user_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to false', () => {
                expect(result.loaded).toBe(false);
            });
        });
    });
    describe('Update User Password Action', () => {
        it('should set loading to true', () => {
            const action = new user_actions_1.UpdatePassword({
                userId: 1001,
                updatePasswordRequest: {
                    currentPassword: 'currentPwd!1',
                    newPassword: 'newPwd!1',
                    newPasswordConfirm: 'newPwd!1'
                }
            });
            const result = user_reducer_1.reducer(user_reducer_1.initialState, action);
            expect(result.loading).toBe(true);
        });
        describe('Update User Password Success Action', () => {
            const action = {
                type: user_actions_1.UserActionTypes.UpdatePasswordSuccess
            };
            const previousState = user_reducer_1.reducer(user_reducer_1.initialState, new user_actions_1.UpdatePasswordSuccess());
            const result = user_reducer_1.reducer(previousState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
        });
        describe('Update User Password Failure Action', () => {
            const action = new user_actions_1.UpdatePasswordFailure();
            const result = user_reducer_1.reducer(user_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to false', () => {
                expect(result.loaded).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5yZWR1Y2VyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvdXNlci9zdGF0ZS91c2VyLnJlZHVjZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVEQUEyRDtBQUMzRCxpREFnQndCO0FBQ3hCLGlEQUE4RDtBQUU5RCxRQUFRLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRTtJQUM1QixRQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1FBQzlCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7WUFDekMsTUFBTSxNQUFNLEdBQUcsRUFBUyxDQUFDO1lBRXpCLE1BQU0sTUFBTSxHQUFHLHNCQUFPLENBQUMsMkJBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU3QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLDJCQUFZLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtRQUNqQyxFQUFFLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO1lBQ3BDLE1BQU0sTUFBTSxHQUFjO2dCQUN4QixJQUFJLEVBQUUsOEJBQWUsQ0FBQyxTQUFTO2FBQ2hDLENBQUM7WUFFRixNQUFNLE1BQU0sR0FBRyxzQkFBTyxDQUFDLDJCQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7UUFDekMsSUFBSSxNQUF3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