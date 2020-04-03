"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const accordion_1 = require("ngx-bootstrap/accordion");
const tabs_1 = require("ngx-bootstrap/tabs");
const testing_2 = require("@angular/router/testing");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const user_widget_component_1 = require("./user-widget.component");
describe('UserWidgetComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                testing_2.RouterTestingModule,
                store_1.StoreModule.forRoot({}),
                angular_fontawesome_1.FontAwesomeModule,
                tabs_1.TabsModule.forRoot(),
                accordion_1.AccordionModule.forRoot(),
                dynamic_form_1.DynamicFormModule,
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.UserFacade)
            ],
            declarations: [user_widget_component_1.UserWidgetComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(user_widget_component_1.UserWidgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci13aWRnZXQuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvZGFzaGJvYXJkL3VzZXItd2lkZ2V0L3VzZXItd2lkZ2V0LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLDBFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMsdURBQTBEO0FBQzFELDZDQUFnRDtBQUVoRCxxREFBOEQ7QUFDOUQsaUVBQW1FO0FBQ25FLG1FQUErRDtBQUMvRCxzREFBc0Q7QUFDdEQsMENBQTZDO0FBQzdDLG1FQUE4RDtBQUU5RCxRQUFRLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0lBQ25DLElBQUksU0FBOEIsQ0FBQztJQUNuQyxJQUFJLE9BQThDLENBQUM7SUFFbkQsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsNkJBQW1CO2dCQUNuQixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLHVDQUFpQjtnQkFDakIsaUJBQVUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BCLDJCQUFlLENBQUMsT0FBTyxFQUFFO2dCQUN6QixnQ0FBaUI7Z0JBQ2pCLDRCQUFZO2FBQ2I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsaUJBQVUsQ0FBQyxvQkFBVSxDQUFDO2FBQ3ZCO1lBQ0QsWUFBWSxFQUFFLENBQUMsMkNBQW1CLENBQUM7U0FDcEMsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsMkNBQW1CLENBQUMsQ0FBQztRQUN2RCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=