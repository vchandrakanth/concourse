"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const effects_1 = require("@ngrx/effects");
const testing_2 = require("@ngrx/effects/testing");
const ngx_toastr_1 = require("ngx-toastr");
const jasmine_marbles_1 = require("jasmine-marbles");
const toast_effects_1 = require("./toast.effects");
const toast_actions_1 = require("./toast.actions");
const error_facade_1 = require("../error/state/error.facade");
describe('ToastEffects', () => {
    let actions;
    let effects;
    let metadata;
    let toastService;
    let applicationErrorFacade;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                toast_effects_1.ToastEffects,
                testing_2.provideMockActions(() => actions),
                {
                    provide: ngx_toastr_1.ToastrService,
                    useValue: {
                        show: jest.fn()
                    }
                },
                {
                    provide: error_facade_1.ApplicationErrorFacade,
                    useValue: {}
                }
            ]
        });
        effects = testing_1.TestBed.get(toast_effects_1.ToastEffects);
        toastService = testing_1.TestBed.get(ngx_toastr_1.ToastrService);
        metadata = effects_1.getEffectsMetadata(effects);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('dispatch registrations', () => {
        it('should register openToast$', () => {
            expect(metadata.openToast$).toEqual({ dispatch: false });
        });
    });
    describe('openToast', () => {
        it('should return ToastHidden & call toast service with only message passed', () => {
            const toastOptions = { message: 'Test Message' };
            const action = new toast_actions_1.OpenToast(toastOptions);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const expected = jasmine_marbles_1.cold(''); // '' = EMPTY
            expect(effects.openToast$).toBeObservable(expected);
            expect(toastService.show).toHaveBeenCalledWith(toastOptions.message, undefined, { "positionClass": "toast-bottom-right" }, undefined);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuZWZmZWN0cy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvdG9hc3QvdG9hc3QuZWZmZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQWdEO0FBQ2hELDJDQUFvRTtBQUNwRSxtREFBMkQ7QUFDM0QsMkNBQTJDO0FBRTNDLHFEQUE0QztBQUc1QyxtREFBK0M7QUFDL0MsbURBQTRDO0FBQzVDLDhEQUFxRTtBQUVyRSxRQUFRLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRTtJQUM1QixJQUFJLE9BQXdCLENBQUM7SUFDN0IsSUFBSSxPQUFxQixDQUFDO0lBQzFCLElBQUksUUFBdUMsQ0FBQztJQUM1QyxJQUFJLFlBQTJCLENBQUM7SUFDaEMsSUFBSSxzQkFBOEMsQ0FBQztJQUVuRCxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixTQUFTLEVBQUU7Z0JBQ1QsNEJBQVk7Z0JBQ1osNEJBQWtCLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQztvQkFDRSxPQUFPLEVBQUUsMEJBQWE7b0JBQ3RCLFFBQVEsRUFBRTt3QkFDUixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtxQkFDaEI7aUJBQ0Y7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLHFDQUFzQjtvQkFDL0IsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxpQkFBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBWSxDQUFDLENBQUM7UUFDcEMsWUFBWSxHQUFHLGlCQUFPLENBQUMsR0FBRyxDQUFDLDBCQUFhLENBQUMsQ0FBQztRQUMxQyxRQUFRLEdBQUcsNEJBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO1FBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7UUFDdEMsRUFBRSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRTtZQUNwQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtRQUN6QixFQUFFLENBQUMseUVBQXlFLEVBQUUsR0FBRyxFQUFFO1lBQ2pGLE1BQU0sWUFBWSxHQUFHLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDO1lBQ2pELE1BQU0sTUFBTSxHQUFHLElBQUkseUJBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUUzQyxPQUFPLEdBQUcscUJBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNuQyxNQUFNLFFBQVEsR0FBRyxzQkFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYTtZQUV4QyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUMsZUFBZSxFQUFFLG9CQUFvQixFQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdEksQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=