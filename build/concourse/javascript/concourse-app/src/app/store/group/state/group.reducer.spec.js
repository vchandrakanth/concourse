"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fakeUsers = require("@concourse/store/user/services/user.faker");
const fakeGroups = require("../services/group.faker");
const group_actions_1 = require("./group.actions");
const group_reducer_1 = require("./group.reducer");
describe('Group Reducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = {};
            const result = group_reducer_1.reducer(group_reducer_1.initialState, action);
            expect(result).toBe(group_reducer_1.initialState);
        });
    });
    describe('LoadGroups Actions', () => {
        describe('LoadGroups', () => {
            it('should set loading to true', () => {
                const action = {
                    type: group_actions_1.GroupActionTypes.LoadGroups
                };
                const result = group_reducer_1.reducer(group_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('LoadGroupsSuccess', () => {
            const groups = fakeGroups.fakeMany(2);
            const action = {
                type: group_actions_1.GroupActionTypes.LoadGroupsSuccess,
                payload: groups
            };
            const entities = {
                [groups[0].id]: groups[0],
                [groups[1].id]: groups[1]
            };
            const ids = [groups[0].id, groups[1].id];
            const result = group_reducer_1.reducer(group_reducer_1.initialState, action);
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
        describe('LoadGroupsFailure', () => {
            const action = new group_actions_1.LoadGroupsFailure();
            const result = group_reducer_1.reducer(group_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to false', () => {
                expect(result.loaded).toBe(true);
            });
        });
    });
    describe('LoadGroup Actions', () => {
        describe('LoadGroup', () => {
            it('should set loading to true', () => {
                const group = fakeGroups.fakeOne();
                const action = {
                    type: group_actions_1.GroupActionTypes.LoadGroup,
                    payload: group.id
                };
                const result = group_reducer_1.reducer(group_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('LoadGroupSuccess', () => {
            const group = fakeGroups.fakeOne();
            const action = {
                type: group_actions_1.GroupActionTypes.LoadGroupSuccess,
                payload: group
            };
            const entities = {
                [group.id]: group
            };
            const ids = [group.id];
            const result = group_reducer_1.reducer(group_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to false', () => {
                expect(result.loaded).toBe(true);
            });
            it('should have one entity', () => {
                expect(Object.keys(result.entities).length).toBe(ids.length);
                expect(result.entities).toEqual(entities);
            });
            it('should have one id', () => {
                expect(result.ids.length).toBe(ids.length);
                expect(result.ids[0]).toBe(group.id);
            });
        });
        describe('LoadGroupFailure', () => {
            const action = new group_actions_1.LoadGroupFailure();
            const result = group_reducer_1.reducer(group_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
        });
    });
    describe('CreateGroup Actions', () => {
        describe('CreateGroup', () => {
            it('should set loading to true', () => {
                const group = fakeGroups.fakeOne();
                const action = {
                    type: group_actions_1.GroupActionTypes.CreateGroup,
                    payload: group
                };
                const result = group_reducer_1.reducer(group_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('CreateGroupSuccess', () => {
            const group = fakeGroups.fakeOne();
            const action = {
                type: group_actions_1.GroupActionTypes.CreateGroupSuccess,
                payload: group
            };
            const entities = {
                [group.id]: group
            };
            const ids = [group.id];
            const result = group_reducer_1.reducer(group_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should have one entity', () => {
                expect(Object.keys(result.entities).length).toBe(ids.length);
                expect(result.entities).toEqual(entities);
            });
            it('should have one id', () => {
                expect(result.ids.length).toBe(ids.length);
                expect(result.ids[0]).toBe(group.id);
            });
        });
        describe('CreateGroupFailure', () => {
            const action = new group_actions_1.CreateGroupFailure();
            const result = group_reducer_1.reducer(group_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
        });
    });
    describe('UpdateGroup Actions', () => {
        describe('UpdateGroup', () => {
            it('should set loading to true', () => {
                const group = fakeGroups.fakeOne();
                const action = {
                    type: group_actions_1.GroupActionTypes.UpdateGroup,
                    payload: group
                };
                const result = group_reducer_1.reducer(group_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        // TODO: Uncomment when the model auto mocking is complete
        xdescribe('UpdateGroupSuccess', () => {
            const groups = fakeGroups.fakeMany();
            const previousAction = new group_actions_1.LoadGroupsSuccess(groups);
            const previousState = group_reducer_1.reducer(group_reducer_1.initialState, previousAction);
            const group = Object.assign(Object.assign({}, groups[0]), { name: 'Updated Name' });
            const action = new group_actions_1.UpdateGroupSuccess(group);
            const result = group_reducer_1.reducer(previousState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should have same group IDS as previousState', () => {
                expect(result.ids).toBe(result.ids);
                expect(result.ids.length).toBe(result.ids.length);
            });
            it('should have updated name in updated group entity', () => {
                expect(result.entities[group.id].name).toBe('Updated Name');
            });
            it('should not have other fields touched', () => {
                expect(result.entities[group.id].description).toBe(groups[0].description);
                expect(result.entities[group.id].institutionId).toBe(groups[0].institutionId);
                expect(result.entities[group.id].users).toBe(groups[0].users);
            });
        });
        describe('UpdateGroupFailure', () => {
            const action = new group_actions_1.UpdateGroupFailure();
            const result = group_reducer_1.reducer(group_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
        });
    });
    describe('DeleteGroup Actions', () => {
        const group = fakeGroups.fakeOne();
        describe('DeleteGroup', () => {
            it('should set loading to true', () => {
                const action = {
                    type: group_actions_1.GroupActionTypes.DeleteGroup,
                    payload: group.id
                };
                const result = group_reducer_1.reducer(group_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('DeleteGroupSuccess', () => {
            const action = {
                type: group_actions_1.GroupActionTypes.DeleteGroupSuccess,
                payload: group.id
            };
            const previousState = group_reducer_1.reducer(group_reducer_1.initialState, new group_actions_1.LoadGroupSuccess(group));
            const result = group_reducer_1.reducer(previousState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should have group removed from ids', () => {
                const found = result.ids.includes(group.id);
                expect(found).toBe(false);
            });
            it('should have group removed from entities', () => {
                const found = result.entities[group.id];
                expect(found).toBeFalsy();
            });
        });
        describe('DeleteGroupFailure', () => {
            const action = new group_actions_1.DeleteGroupFailure();
            const previousState = group_reducer_1.reducer(group_reducer_1.initialState, new group_actions_1.LoadGroupSuccess(group));
            const result = group_reducer_1.reducer(previousState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should have ids untouched', () => {
                expect(result.ids).toBe(previousState.ids);
            });
            it('should have entities untouched', () => {
                expect(result.entities).toBe(previousState.entities);
            });
        });
    });
    describe('AddUserToGroup Actions', () => {
        const initialUsers = fakeUsers.fakeMany(5);
        const initialGroup = fakeGroups.fakeOne(1, initialUsers);
        describe('AddUserToGroup', () => {
            it('should set loading to true', () => {
                const action = {
                    type: group_actions_1.GroupActionTypes.AddUserToGroup,
                    payload: { groupId: initialGroup.id, userId: initialUsers[0].id }
                };
                const result = group_reducer_1.reducer(group_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('AddUserToGroupSuccess', () => {
            const newUser = fakeUsers.fakeOne();
            const newGroup = Object.assign(Object.assign({}, initialGroup), { users: [...initialGroup.users, { email: newUser.email, id: newUser.id }] });
            const action = {
                type: group_actions_1.GroupActionTypes.AddUserToGroupSuccess,
                payload: newGroup
            };
            const previousState = group_reducer_1.reducer(group_reducer_1.initialState, new group_actions_1.LoadGroupSuccess(initialGroup));
            const result = group_reducer_1.reducer(previousState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should add user to group', () => {
                expect(result.entities[initialGroup.id].users.length).toBeGreaterThan(initialGroup.users.length);
                expect(result.entities[initialGroup.id].users.length).toBe(newGroup.users.length);
            });
            it('should not have other properties modified', () => {
                const _a = result.entities[initialGroup.id], { users: discard1 } = _a, check = __rest(_a, ["users"]);
                const { users: descard2 } = initialGroup, expected = __rest(initialGroup, ["users"]);
                expect(check).toEqual(expected);
            });
        });
        describe('AddUserToGroupFailure', () => {
            const action = new group_actions_1.AddUserToGroupFailure();
            const previousState = group_reducer_1.reducer(group_reducer_1.initialState, new group_actions_1.LoadGroupSuccess(initialGroup));
            const result = group_reducer_1.reducer(previousState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should not have modified users list', () => {
                expect(result.entities[initialGroup.id].users).toBe(initialGroup.users);
            });
        });
    });
    describe('RemoveUserFromGroup Actions', () => {
        // returning array of userId's
        const initialUsers = fakeUsers.fakeMany(5).reduce((acc, user) => {
            acc.push(user.id);
            return acc;
        }, []);
        const initialGroup = fakeGroups.fakeOne(1, initialUsers);
        describe('RemoveUserFromGroup', () => {
            it('should set loading to true', () => {
                const action = {
                    type: group_actions_1.GroupActionTypes.RemoveUserFromGroup,
                    payload: { groupId: initialGroup.id, userId: initialUsers[0] }
                };
                const result = group_reducer_1.reducer(group_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('RemoveUserFromGroupSuccess', () => {
            const newGroup = Object.assign(Object.assign({}, initialGroup), { users: [...initialGroup.users.filter(u => u !== initialUsers[0])] });
            const action = {
                type: group_actions_1.GroupActionTypes.AddUserToGroupSuccess,
                payload: newGroup
            };
            const previousState = group_reducer_1.reducer(group_reducer_1.initialState, new group_actions_1.LoadGroupSuccess(initialGroup));
            const result = group_reducer_1.reducer(previousState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should remove user from group', () => {
                expect(result.entities[initialGroup.id].users.length).toBeLessThan(initialGroup.users.length);
                expect(result.entities[initialGroup.id].users.length).toBe(newGroup.users.length);
                expect(result.entities[initialGroup.id].users).toEqual(newGroup.users);
            });
            it('should not have other properties modified', () => {
                const _a = result.entities[initialGroup.id], { users: discard1 } = _a, check = __rest(_a, ["users"]);
                const { users: descard2 } = initialGroup, expected = __rest(initialGroup, ["users"]);
                expect(check).toEqual(expected);
            });
        });
        describe('RemoveUserFromGroupFailure', () => {
            const action = new group_actions_1.RemoveUserFromGroupFailure();
            const previousState = group_reducer_1.reducer(group_reducer_1.initialState, new group_actions_1.LoadGroupSuccess(initialGroup));
            const result = group_reducer_1.reducer(previousState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should not have modified users list', () => {
                expect(result.entities[initialGroup.id].users).toBe(initialGroup.users);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAucmVkdWNlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2dyb3VwL3N0YXRlL2dyb3VwLnJlZHVjZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsdUVBQXVFO0FBQ3ZFLHNEQUFzRDtBQUN0RCxtREFzQnlCO0FBQ3pCLG1EQUF3RDtBQUV4RCxRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtJQUM3QixRQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1FBQzlCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7WUFDekMsTUFBTSxNQUFNLEdBQUcsRUFBUyxDQUFDO1lBRXpCLE1BQU0sTUFBTSxHQUFHLHVCQUFPLENBQUMsNEJBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU3QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLDRCQUFZLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtRQUNsQyxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtZQUMxQixFQUFFLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO2dCQUNwQyxNQUFNLE1BQU0sR0FBZTtvQkFDekIsSUFBSSxFQUFFLGdDQUFnQixDQUFDLFVBQVU7aUJBQ2xDLENBQUM7Z0JBRUYsTUFBTSxNQUFNLEdBQUcsdUJBQU8sQ0FBQyw0QkFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUU3QyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNM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