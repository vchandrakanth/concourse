"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const effects_1 = require("@ngrx/effects");
const testing_2 = require("@ngrx/effects/testing");
const store_1 = require("@ngrx/store");
const testing_3 = require("@ngrx/store/testing");
const modal_1 = require("ngx-bootstrap/modal");
const jasmine_marbles_1 = require("jasmine-marbles");
const rxjs_1 = require("rxjs");
const modal_actions_1 = require("./modal.actions");
const modal_effects_1 = require("./modal.effects");
const modal_facade_1 = require("./modal.facade");
const modal_reducer_1 = require("./modal.reducer");
let TestComponent = class TestComponent {
};
TestComponent = __decorate([
    core_1.Component({
        template: '<div>Test Component</div>'
    })
], TestComponent);
describe('ModalEffects', () => {
    let actions;
    let store;
    let effects;
    let service;
    let metadata;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                modal_1.ModalModule.forRoot()
            ],
            providers: [
                modal_facade_1.ModalStoreFacade,
                modal_effects_1.ModalEffects,
                testing_3.provideMockStore({ initialState: modal_reducer_1.initialState }),
                testing_2.provideMockActions(() => actions),
                {
                    provide: modal_1.BsModalService,
                    useValue: {
                        onHidden: new rxjs_1.BehaviorSubject({}),
                        show: jest.fn()
                    }
                }
            ]
        });
        store = testing_1.TestBed.get(store_1.Store);
        effects = testing_1.TestBed.get(modal_effects_1.ModalEffects);
        service = testing_1.TestBed.get(modal_1.BsModalService);
        metadata = effects_1.getEffectsMetadata(effects);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    it('should register closeModal$ with dispatch: false', () => {
        expect(metadata.closeModal$).toEqual({ dispatch: false });
    });
    describe('openModal$', () => {
        it('should return a OpenModalSuccess action, with payload, on success', () => {
            const id = 'test-modal';
            const action = new modal_actions_1.OpenModal({
                id,
                component: TestComponent
            });
            const outcome = new modal_actions_1.OpenModalSuccess({
                id,
                modalRef: service.show(TestComponent, {})
            });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const expected = jasmine_marbles_1.cold('-b', { b: outcome });
            expect(effects.openModal$).toBeObservable(expected);
            expect(service.show).toHaveBeenCalledWith(TestComponent, {});
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuZWZmZWN0cy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvc3RhdGUvbW9kYWwuZWZmZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTBDO0FBQzFDLG1EQUFnRDtBQUNoRCwyQ0FBb0U7QUFDcEUsbURBQTJEO0FBQzNELHVDQUFvQztBQUNwQyxpREFBa0U7QUFDbEUsK0NBQThFO0FBRTlFLHFEQUE0QztBQUM1QywrQkFBbUQ7QUFFbkQsbURBQThEO0FBQzlELG1EQUErQztBQUMvQyxpREFBa0Q7QUFDbEQsbURBQStDO0FBSy9DLElBQU0sYUFBYSxHQUFuQixNQUFNLGFBQWE7Q0FBSSxDQUFBO0FBQWpCLGFBQWE7SUFIbEIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwyQkFBMkI7S0FDdEMsQ0FBQztHQUNJLGFBQWEsQ0FBSTtBQUV2QixRQUFRLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRTtJQUM1QixJQUFJLE9BQXdCLENBQUM7SUFDN0IsSUFBSSxLQUtGLENBQUM7SUFDSCxJQUFJLE9BQXFCLENBQUM7SUFDMUIsSUFBSSxPQUF1QixDQUFDO0lBQzVCLElBQUksUUFBdUMsQ0FBQztJQUU1QyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsbUJBQVcsQ0FBQyxPQUFPLEVBQUU7YUFDdEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsK0JBQWdCO2dCQUNoQiw0QkFBWTtnQkFDWiwwQkFBZ0IsQ0FBQyxFQUFFLFlBQVksRUFBWiw0QkFBWSxFQUFFLENBQUM7Z0JBQ2xDLDRCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakM7b0JBQ0UsT0FBTyxFQUFFLHNCQUFjO29CQUN2QixRQUFRLEVBQUU7d0JBQ1IsUUFBUSxFQUFFLElBQUksc0JBQWUsQ0FBQyxFQUFFLENBQUM7d0JBQ2pDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO3FCQUNoQjtpQkFDRjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsS0FBSyxHQUFHLGlCQUFPLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxDQUFDO1FBQzNCLE9BQU8sR0FBRyxpQkFBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBWSxDQUFDLENBQUM7UUFDcEMsT0FBTyxHQUFHLGlCQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFjLENBQUMsQ0FBQztRQUN0QyxRQUFRLEdBQUcsNEJBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO1FBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxHQUFHLEVBQUU7UUFDMUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUM1RCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO1FBQzFCLEVBQUUsQ0FBQyxtRUFBbUUsRUFBRSxHQUFHLEVBQUU7WUFDM0UsTUFBTSxFQUFFLEdBQUcsWUFBWSxDQUFDO1lBQ3hCLE1BQU0sTUFBTSxHQUFHLElBQUkseUJBQVMsQ0FBQztnQkFDM0IsRUFBRTtnQkFDRixTQUFTLEVBQUUsYUFBYTthQUN6QixDQUFDLENBQUM7WUFDSCxNQUFNLE9BQU8sR0FBRyxJQUFJLGdDQUFnQixDQUFDO2dCQUNuQyxFQUFFO2dCQUNGLFFBQVEsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUM7YUFDMUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxHQUFHLHFCQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsc0JBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUU1QyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUMifQ==