"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const effects_1 = require("@ngrx/effects");
const testing_2 = require("@ngrx/effects/testing");
const jasmine_marbles_1 = require("jasmine-marbles");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const test_1 = require("@concourse/test");
const fakeRoles = require("../services/cloud-role.faker");
const cloud_role_service_1 = require("../services/cloud-role.service");
const cloud_role_actions_1 = require("./cloud-role.actions");
const cloud_role_effects_1 = require("./cloud-role.effects");
const cloud_role_facade_1 = require("./cloud-role.facade");
describe('RoleEffects', () => {
    let actions;
    let effects;
    let service;
    let metadata;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                cloud_role_effects_1.CloudRoleEffects,
                test_1.mockFacade(cloud_role_facade_1.CloudRoleFacade),
                testing_2.provideMockActions(() => actions),
                {
                    provide: cloud_role_service_1.CloudRoleService,
                    useValue: {
                        list: jest.fn()
                    }
                }
            ]
        });
        effects = testing_1.TestBed.get(cloud_role_effects_1.CloudRoleEffects);
        service = testing_1.TestBed.get(cloud_role_service_1.CloudRoleService);
        metadata = effects_1.getEffectsMetadata(effects);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('loadRoles$', () => {
        it('should return a LoadRolesSuccess, with an array of roles, on success', () => {
            const roles = fakeRoles.fakeMany();
            const action = new cloud_role_actions_1.LoadCloudRoles();
            const outcome = new cloud_role_actions_1.LoadCloudRolesSuccess(roles);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: roles });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.list = jest.fn(() => response);
            expect(effects.loadCloudRoles$).toBeObservable(expected);
        });
        it('should return a LoadRolesFailure, with an error, on failure', () => {
            const action = new cloud_role_actions_1.LoadCloudRoles();
            const error = new Error('An unknown error occurred');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const err = new cloud_role_actions_1.LoadCloudRolesFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.list = jest.fn(() => response);
            expect(effects.loadCloudRoles$).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvY2xvdWQtcm9sZS9zdGF0ZS9jbG91ZC1yb2xlLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFnRDtBQUNoRCwyQ0FBb0U7QUFDcEUsbURBQTJEO0FBRTNELHFEQUE0QztBQUc1Qyw2RUFBZ0Y7QUFDaEYsMENBQTZDO0FBQzdDLDBEQUEwRDtBQUMxRCx1RUFBa0U7QUFDbEUsNkRBSThCO0FBQzlCLDZEQUF3RDtBQUN4RCwyREFBc0Q7QUFFdEQsUUFBUSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7SUFDM0IsSUFBSSxPQUF3QixDQUFDO0lBQzdCLElBQUksT0FBeUIsQ0FBQztJQUM5QixJQUFJLE9BQXlCLENBQUM7SUFDOUIsSUFBSSxRQUEyQyxDQUFDO0lBRWhELFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLFNBQVMsRUFBRTtnQkFDVCxxQ0FBZ0I7Z0JBQ2hCLGlCQUFVLENBQUMsbUNBQWUsQ0FBQztnQkFDM0IsNEJBQWtCLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQztvQkFDRSxPQUFPLEVBQUUscUNBQWdCO29CQUN6QixRQUFRLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7cUJBQ2hCO2lCQUNGO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMscUNBQWdCLENBQUMsQ0FBQztRQUN4QyxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMscUNBQWdCLENBQUMsQ0FBQztRQUN4QyxRQUFRLEdBQUcsNEJBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO1FBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO1FBQzFCLEVBQUUsQ0FBQyxzRUFBc0UsRUFBRSxHQUFHLEVBQUU7WUFDOUUsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25DLE1BQU0sTUFBTSxHQUFHLElBQUksbUNBQWMsRUFBRSxDQUFDO1lBQ3BDLE1BQU0sT0FBTyxHQUFHLElBQUksMENBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFakQsT0FBTyxHQUFHLHFCQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsc0JBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUMzQyxNQUFNLFFBQVEsR0FBRyxzQkFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV2QyxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw2REFBNkQsRUFBRSxHQUFHLEVBQUU7WUFDckUsTUFBTSxNQUFNLEdBQUcsSUFBSSxtQ0FBYyxFQUFFLENBQUM7WUFDcEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUVyRCxNQUFNLE9BQU8sR0FBRyxJQUFJLG1DQUFtQixDQUFDO2dCQUN0QyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87Z0JBQ3RCLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUM7WUFFSCxNQUFNLEdBQUcsR0FBRyxJQUFJLDBDQUFxQixFQUFFLENBQUM7WUFDeEMsT0FBTyxHQUFHLHFCQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsc0JBQUksQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQy9DLE1BQU0sUUFBUSxHQUFHLHNCQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN4RCxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFdkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=