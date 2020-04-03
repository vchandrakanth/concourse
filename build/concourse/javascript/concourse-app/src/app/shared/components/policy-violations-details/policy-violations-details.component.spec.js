"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const animations_1 = require("@angular/platform-browser/animations");
const accordion_1 = require("ngx-bootstrap/accordion");
const ngx_pipes_1 = require("ngx-pipes");
const models_1 = require("@concourse/core/models");
const ng_let_directive_1 = require("../../directives/ng-let.directive");
const policy_violations_details_component_1 = require("./policy-violations-details.component");
describe('PolicyViolationsDetailsComponent', () => {
    let component;
    let fixture;
    let sampleValidation;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                ngx_pipes_1.NgStringPipesModule,
                accordion_1.AccordionModule.forRoot()
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            declarations: [
                ng_let_directive_1.NgLetDirective,
                policy_violations_details_component_1.PolicyViolationsDetailsComponent
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(policy_violations_details_component_1.PolicyViolationsDetailsComponent);
        sampleValidation = new models_1.CommonEvaluation().deserialize({
            state: 'FAILED',
            policyViolations: [
                {
                    policyId: 20002,
                    policyGroupId: 60002,
                    violations: [
                        {
                            name: 'EFS Self Referencing Security Group',
                            details: 'All Security Group Ingress and Egress resources must be configured to route traffic within the source security group.'
                        },
                        {
                            name: 'RDS DBInstance Self Referencing Security Group',
                            details: 'All Security Group Ingress and Egress resources must be configured to route traffic within the source security group.'
                        }
                    ]
                }
            ],
            evaluationTimeMs: '1556736188890'
        });
        component = fixture.componentInstance;
        component.violationResponse = sampleValidation;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should render a loading state when @Input() isLoading is true', () => {
        component.isLoading = true;
        fixture.detectChanges();
        const isLoadingTemplateTitle = fixture.debugElement.query(platform_browser_1.By.css('div.justify-content-center h3')).nativeElement;
        const isLoadingTemplateIcon = fixture.debugElement.query(platform_browser_1.By.css('div.justify-content-center fa-icon')).nativeElement;
        expect(isLoadingTemplateTitle.textContent).toEqual('Loading...');
        expect(isLoadingTemplateIcon.icon.iconName).toEqual('spinner');
    });
    it('should test against a sample policy violation if there is a violation', () => {
        component.isLoading = false;
        fixture.detectChanges();
        const hasViolationAccordionContent = fixture.debugElement.query(platform_browser_1.By.css('accordion-group'));
        expect(component.violationResponse.hasViolations).toBe(true);
        expect(hasViolationAccordionContent.nativeElement.textContent).toContain('All Security Group Ingress and Egress resources must be configured to route traffic within the source security group.');
    });
    it('should test against a sample policy violation if there is no violation', () => {
        component.isLoading = false;
        component.violationResponse = sampleValidation.copyWith({
            state: 'PASSED',
            policyViolations: []
        });
        fixture.detectChanges();
        expect(component.violationResponse.hasViolations).toBe(false);
        expect(fixture.debugElement.query(platform_browser_1.By.css('h3')).nativeElement.textContent).toEqual('All proofs passed');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXZpb2xhdGlvbnMtZGV0YWlscy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9wb2xpY3ktdmlvbGF0aW9ucy1kZXRhaWxzL3BvbGljeS12aW9sYXRpb25zLWRldGFpbHMuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBaUQ7QUFDakQsbURBQXlFO0FBQ3pFLGdFQUErQztBQUMvQyxxRUFBNEU7QUFDNUUsdURBQTBEO0FBQzFELHlDQUFnRDtBQUVoRCxtREFBMEQ7QUFDMUQsd0VBQW1FO0FBQ25FLCtGQUF5RjtBQUV6RixRQUFRLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxFQUFFO0lBQ2hELElBQUksU0FBMkMsQ0FBQztJQUNoRCxJQUFJLE9BQTJELENBQUM7SUFDaEUsSUFBSSxnQkFBa0MsQ0FBQztJQUV2QyxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCxpQ0FBb0I7Z0JBQ3BCLCtCQUFtQjtnQkFDbkIsMkJBQWUsQ0FBQyxPQUFPLEVBQUU7YUFDMUI7WUFDRCxPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztZQUMzQixZQUFZLEVBQUU7Z0JBQ1osaUNBQWM7Z0JBQ2Qsc0VBQWdDO2FBQ2pDO1NBQ0YsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsc0VBQWdDLENBQUMsQ0FBQztRQUNwRSxnQkFBZ0IsR0FBRyxJQUFJLHlCQUFnQixFQUFFLENBQUMsV0FB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