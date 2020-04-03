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
const platform_browser_1 = require("@angular/platform-browser");
const close_modal_directive_1 = require("./close-modal.directive");
const modal_facade_1 = require("./state/modal.facade");
// Simple test component that will not in the actual app
let TestComponent = class TestComponent {
};
TestComponent = __decorate([
    core_1.Component({
        template: '<button appCloseModal>Close</button>'
    })
], TestComponent);
describe('CloseModalDirective', () => {
    let component;
    let fixture;
    let modalStoreFacade;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                {
                    provide: modal_facade_1.ModalStoreFacade,
                    useValue: {
                        closeModal: jest.fn()
                    }
                }
            ],
            declarations: [
                TestComponent,
                close_modal_directive_1.CloseModalDirective
            ]
        });
        modalStoreFacade = testing_1.TestBed.get(modal_facade_1.ModalStoreFacade);
        fixture = testing_1.TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    });
    it('should create component', () => {
        expect(component).toBeDefined();
    });
    it('should call ModalStoreFacade.closeModal when clicked', () => {
        fixture.whenStable().then(() => {
            const button = fixture.debugElement.query(platform_browser_1.By.css('button'));
            button.nativeElement.dispatchEvent(new Event('click'));
            expect(modalStoreFacade.closeModal).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2UtbW9kYWwuZGlyZWN0aXZlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jbG9zZS1tb2RhbC5kaXJlY3RpdmUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEwQztBQUMxQyxtREFBa0U7QUFDbEUsZ0VBQStDO0FBRS9DLG1FQUE4RDtBQUM5RCx1REFBd0Q7QUFFeEQsd0RBQXdEO0FBSXhELElBQU0sYUFBYSxHQUFuQixNQUFNLGFBQWE7Q0FBSSxDQUFBO0FBQWpCLGFBQWE7SUFIbEIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxzQ0FBc0M7S0FDakQsQ0FBQztHQUNJLGFBQWEsQ0FBSTtBQUV2QixRQUFRLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0lBQ25DLElBQUksU0FBd0IsQ0FBQztJQUM3QixJQUFJLE9BQXdDLENBQUM7SUFDN0MsSUFBSSxnQkFBa0MsQ0FBQztJQUV2QyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLCtCQUFnQjtvQkFDekIsUUFBUSxFQUFFO3dCQUNSLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO3FCQUN0QjtpQkFDRjthQUNGO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLGFBQWE7Z0JBQ2IsMkNBQW1CO2FBQ3BCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZ0JBQWdCLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMsK0JBQWdCLENBQUMsQ0FBQztRQUNqRCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztJQUN4QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLEVBQUU7UUFDakMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHNEQUFzRCxFQUFFLEdBQUcsRUFBRTtRQUM5RCxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUM3QixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFFdkQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=