"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const ng_let_directive_1 = require("@concourse/shared/directives/ng-let.directive");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const institution_data_form_component_1 = require("./institution-data-form.component");
describe('InstitutionDataFormComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                forms_1.ReactiveFormsModule
            ],
            providers: [
                test_1.mockFacade(facades_1.InstitutionDataFacade)
            ],
            declarations: [
                ng_let_directive_1.NgLetDirective,
                institution_data_form_component_1.InstitutionDataFormComponent
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(institution_data_form_component_1.InstitutionDataFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24tZGF0YS1mb3JtLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2luc3RpdHV0aW9uLWRhdGEtZm9ybS9pbnN0aXR1dGlvbi1kYXRhLWZvcm0uY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBaUQ7QUFDakQsbURBQXlFO0FBQ3pFLDBDQUFxRDtBQUVyRCxvRkFBK0U7QUFDL0Usc0RBQWlFO0FBQ2pFLDBDQUE2QztBQUM3Qyx1RkFBaUY7QUFFakYsUUFBUSxDQUFDLDhCQUE4QixFQUFFLEdBQUcsRUFBRTtJQUM1QyxJQUFJLFNBQXVDLENBQUM7SUFDNUMsSUFBSSxPQUF1RCxDQUFDO0lBRTVELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7WUFDM0IsT0FBTyxFQUFFO2dCQUNQLDJCQUFtQjthQUNwQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLCtCQUFxQixDQUFDO2FBQ2xDO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLGlDQUFjO2dCQUNkLDhEQUE0QjthQUM3QjtTQUNGLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLDhEQUE0QixDQUFDLENBQUM7UUFDaEUsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9