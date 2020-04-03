"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const accordion_1 = require("ngx-bootstrap/accordion");
const tabs_1 = require("ngx-bootstrap/tabs");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const view_user_component_1 = require("./view-user.component");
describe('ViewUserComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                testing_2.RouterTestingModule,
                shared_module_1.SharedModule,
                store_1.StoreModule.forRoot({}),
                angular_fontawesome_1.FontAwesomeModule,
                tabs_1.TabsModule.forRoot(),
                accordion_1.AccordionModule.forRoot(),
                dynamic_form_1.DynamicFormModule
            ],
            providers: [
                test_1.mockFacade(facades_1.AuditHistoryFacade),
                test_1.mockFacade(facades_1.ModalStoreFacade),
                ...test_1.directiveProviders
            ],
            declarations: [view_user_component_1.ViewUserComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(view_user_component_1.ViewUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy11c2VyLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3VzZXItbWFuYWdlbWVudC91c2Vycy92aWV3LXVzZXIvdmlldy11c2VyLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSxxREFBOEQ7QUFDOUQsMEVBQXFFO0FBQ3JFLHVDQUEwQztBQUMxQyx1REFBMEQ7QUFDMUQsNkNBQWdEO0FBRWhELGlFQUFtRTtBQUNuRSxtRUFBK0Q7QUFDL0Qsc0RBQWdGO0FBQ2hGLDBDQUFpRTtBQUNqRSwrREFBMEQ7QUFFMUQsUUFBUSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtJQUNqQyxJQUFJLFNBQTRCLENBQUM7SUFDakMsSUFBSSxPQUE0QyxDQUFDO0lBRWpELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7WUFDM0IsT0FBTyxFQUFFO2dCQUNQLDZCQUFtQjtnQkFDbkIsNEJBQVk7Z0JBQ1osbUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUN2Qix1Q0FBaUI7Z0JBQ2pCLGlCQUFVLENBQUMsT0FBTyxFQUFFO2dCQUNwQiwyQkFBZSxDQUFDLE9BQU8sRUFBRTtnQkFDekIsZ0NBQWlCO2FBQ2xCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGlCQUFVLENBQUMsNEJBQWtCLENBQUM7Z0JBQzlCLGlCQUFVLENBQUMsMEJBQWdCLENBQUM7Z0JBQzVCLEdBQUcseUJBQWtCO2FBQ3RCO1lBQ0QsWUFBWSxFQUFFLENBQUMsdUNBQWlCLENBQUM7U0FDbEMsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsdUNBQWlCLENBQUMsQ0FBQztRQUNyRCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=