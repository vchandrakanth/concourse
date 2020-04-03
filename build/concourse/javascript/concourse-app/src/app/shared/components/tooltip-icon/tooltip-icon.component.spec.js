"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const tooltip_1 = require("ngx-bootstrap/tooltip");
const tooltip_icon_component_1 = require("./tooltip-icon.component");
describe('TooltipIconComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                angular_fontawesome_1.FontAwesomeModule,
                tooltip_1.TooltipModule.forRoot()
            ],
            declarations: [tooltip_icon_component_1.TooltipIconComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(tooltip_icon_component_1.TooltipIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should render a tooltip with a description only', () => {
        component.tooltipDescription = 'Hello World';
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
    });
    xit('should render a tooltip with content and no description', testing_1.fakeAsync(() => {
        component.tooltipContent = [
            { label: 'Claims', prop: 'claims' },
            { label: 'Proofs', prop: 'proofs' }
        ];
        component.tooltipData = {
            policyTemplate: {
                claims: 'Some claim to test',
                proofs: 'Some proof to test'
            }
        };
        /***
         * TODO: Unsure how to test if it renders correctly.
         * Using fixture.nativeElement.querySelector('.tooltip-list') does not work since the content we need to check is a template
         * https://github.com/valor-software/ngx-bootstrap/blob/development/src/spec/tooltip.directive.spec.ts
         * */
        const element = fixture.debugElement.nativeElement;
        const tooltipElement = element.querySelector('#tooltip');
        tooltipElement.focus();
        fixture.detectChanges();
        testing_1.tick(0);
        fixture.detectChanges();
        expect(element.querySelectorAll('.tooltip-list')).toBe('');
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1pY29uLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL3Rvb2x0aXAtaWNvbi90b29sdGlwLWljb24uY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBMEY7QUFDMUYsMEVBQXFFO0FBQ3JFLG1EQUFzRDtBQUN0RCxxRUFBZ0U7QUFFaEUsUUFBUSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBRTtJQUNwQyxJQUFJLFNBQStCLENBQUM7SUFDcEMsSUFBSSxPQUErQyxDQUFDO0lBRXBELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFO2dCQUNQLHVDQUFpQjtnQkFDakIsdUJBQWEsQ0FBQyxPQUFPLEVBQUU7YUFDeEI7WUFDRCxZQUFZLEVBQUUsQ0FBQyw2Q0FBb0IsQ0FBQztTQUNyQyxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyw2Q0FBb0IsQ0FBQyxDQUFDO1FBQ3hELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGlEQUFpRCxFQUFFLEdBQUcsRUFBRTtRQUN6RCxTQUFTLENBQUMsa0JBQWtCLEdBQUcsYUFBYSxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN4QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMseURBQXlELEVBQUUsbUJBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDNUUsU0FBUyxDQUFDLGNBQWMsR0FBRztZQUN6QixFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUNuQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtTQUNwQyxDQUFDO1FBQ0YsU0FBUyxDQUFDLFdBQVcsR0FBRztZQUN0QixjQUFjLEVBQUU7Z0JBQ2QsTUFBTSxFQUFFLG9CQUFvQjtnQkFDNUIsTUFBTSxFQUFFLG9CQUFvQjthQUM3QjtTQUNGLENBQUM7UUFFRjs7OzthQUlLO1FBRUwsTUFBTSxPQUFPLEdBQWdCLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBQ2hFLE1BQU0sY0FBYyxHQUFRLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUQsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN4QixjQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUixPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMifQ==