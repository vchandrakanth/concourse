"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const effects_1 = require("@ngrx/effects");
const testing_2 = require("@ngrx/effects/testing");
const jasmine_marbles_1 = require("jasmine-marbles");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const fakeRoles = require("../services/role.faker");
const role_service_1 = require("../services/role.service");
const role_actions_1 = require("./role.actions");
const role_effects_1 = require("./role.effects");
describe('RoleEffects', () => {
    let actions;
    let effects;
    let service;
    let metadata;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                role_effects_1.RoleEffects,
                testing_2.provideMockActions(() => actions),
                {
                    provide: role_service_1.RoleService,
                    useValue: {
                        list: jest.fn()
                    }
                }
            ]
        });
        effects = testing_1.TestBed.get(role_effects_1.RoleEffects);
        service = testing_1.TestBed.get(role_service_1.RoleService);
        metadata = effects_1.getEffectsMetadata(effects);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('dispatch registrations', () => {
        it('should register loadRoles$', () => {
            expect(metadata.loadRoles$).toEqual({ dispatch: true });
        });
    });
    describe('loadRoles$', () => {
        it('should return a LoadRolesSuccess, with an array of roles, on success', () => {
            const roles = fakeRoles.fakeMany();
            const action = new role_actions_1.LoadRoles();
            const outcome = new role_actions_1.LoadRolesSuccess(roles);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: roles });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.list = jest.fn(() => response);
            expect(effects.loadRoles$).toBeObservable(expected);
        });
        it('should return a LoadRolesFailure, with an error, on failure', () => {
            const action = new role_actions_1.LoadRoles();
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const err = new role_actions_1.LoadRolesFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.list = jest.fn(() => response);
            expect(effects.loadRoles$).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcm9sZS9zdGF0ZS9yb2xlLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFnRDtBQUNoRCwyQ0FBb0U7QUFDcEUsbURBQTJEO0FBRTNELHFEQUE0QztBQUc1Qyw2RUFBZ0Y7QUFDaEYsb0RBQW9EO0FBQ3BELDJEQUF1RDtBQUN2RCxpREFJd0I7QUFDeEIsaURBQTZDO0FBRTdDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO0lBQzNCLElBQUksT0FBd0IsQ0FBQztJQUM3QixJQUFJLE9BQW9CLENBQUM7SUFDekIsSUFBSSxPQUFvQixDQUFDO0lBQ3pCLElBQUksUUFBc0MsQ0FBQztJQUUzQyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixTQUFTLEVBQUU7Z0JBQ1QsMEJBQVc7Z0JBQ1gsNEJBQWtCLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQztvQkFDRSxPQUFPLEVBQUUsMEJBQVc7b0JBQ3BCLFFBQVEsRUFBRTt3QkFDUixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtxQkFDaEI7aUJBQ0Y7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxpQkFBTyxDQUFDLEdBQUcsQ0FBQywwQkFBVyxDQUFDLENBQUM7UUFDbkMsT0FBTyxHQUFHLGlCQUFPLENBQUMsR0FBRyxDQUFDLDBCQUFXLENBQUMsQ0FBQztRQUNuQyxRQUFRLEdBQUcsNEJBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO1FBQzNCLE1B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