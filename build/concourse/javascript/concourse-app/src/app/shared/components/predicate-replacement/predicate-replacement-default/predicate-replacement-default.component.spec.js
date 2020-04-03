"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const predicate_replacement_default_component_1 = require("./predicate-replacement-default.component");
const enums_1 = require("@concourse/shared/enums");
const policyTemplateFaker = require("@concourse/store/policy-template/services/policy-template.faker");
describe('PredicateReplacementDefaultComponent', () => {
    let component;
    let fixture;
    const policyTemplates = policyTemplateFaker.fakeAll();
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [predicate_replacement_default_component_1.PredicateReplacementDefaultComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(predicate_replacement_default_component_1.PredicateReplacementDefaultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should return a predicate without a default attribute replacement', () => {
        const genPolicyTemplate = policyTemplates.find(pt => pt.name === 'Secure Perimeter');
        component.policyTemplate = genPolicyTemplate;
        expect(component.predicate).toEqual(`${genPolicyTemplate.predicate}`);
    });
    it('should return a predicate with two placeholder attributes when provided a policy template', () => {
        const genPolicyTemplate = policyTemplates.find(pt => pt.name === 'Allow AWS Regions');
        component.policyTemplate = genPolicyTemplate;
        expect(component.predicate).toEqual(`<b>${enums_1.policyPredicateDefaults['ALLOW']}</b> Deployment of Assets only in Regions: <b>\
${enums_1.policyPredicateDefaults['AWS_REGION']}</b>`);
    });
    it('should return a predicate with three placeholder attributes when provided a policy template', () => {
        const genPolicyTemplate = policyTemplates.find(pt => pt.name === 'Require Approval');
        component.policyTemplate = genPolicyTemplate;
        expect(component.predicate).toEqual(`Require approval for <b>${enums_1.policyPredicateDefaults['ENTITY']}</b> when <b>${enums_1.policyPredicateDefaults['EVENT']}</b> occur from <b>${enums_1.policyPredicateDefaults['APPROVAL_GROUP']}</b>.`);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZGljYXRlLXJlcGxhY2VtZW50LWRlZmF1bHQuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvcHJlZGljYXRlLXJlcGxhY2VtZW50L3ByZWRpY2F0ZS1yZXBsYWNlbWVudC1kZWZhdWx0L3ByZWRpY2F0ZS1yZXBsYWNlbWVudC1kZWZhdWx0LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBRXpFLHVHQUFpRztBQUVqRyxtREFBa0U7QUFDbEUsdUdBQXVHO0FBRXZHLFFBQVEsQ0FBQyxzQ0FBc0MsRUFBRSxHQUFHLEVBQUU7SUFDcEQsSUFBSSxTQUErQyxDQUFDO0lBQ3BELElBQUksT0FBK0QsQ0FBQztJQUNwRSxNQUFNLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUV0RCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLFlBQVksRUFBRSxDQUFDLDhFQUFvQyxDQUFDO1NBQ3JELENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLDhFQUFvQyxDQUFDLENBQUM7UUFDeEUsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbUVBQW1FLEVBQUUsR0FBRyxFQUFFO1FBQzNFLE1BQU0saUJBQWlCLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssa0JBQWtCLENBQUMsQ0FBQztRQUNyRixTQUFTLENBQUMsY0FBYyxHQUFHLGlCQUFpQixDQUFDO1FBRTdDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUN4RSxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywyRkFBMkYsRUFBRSxHQUFHLEVBQUU7UUFDbkcsTUFBTSxpQkFBaUIsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3RGLFNBQVMsQ0FBQyxjQUFjLEdBQUcsaUJBQWlCLENBQUM7UUFFN0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQ2pDLE1BQU0sK0JBQXVCLENBQUMsT0FBTyxDQUFDO0VBQzFDLCtCQUF1QixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQ3hDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw2RkFBNkYsRUFBRSxHQUFHLEVBQUU7UUFDckcsTUFBTSxpQkFBaUIsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3JGLFNBQVMsQ0FBQyxjQUFjLEdBQUcsaUJBQWlCLENBQUM7UUFFN0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQ2pDLDJCQUEyQiwrQkFBdUIsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLCtCQUF1QixDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsK0JBQXVCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUNuTCxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9