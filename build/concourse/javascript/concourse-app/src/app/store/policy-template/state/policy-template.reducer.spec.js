"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const policyTemplateFaker = require("../services/policy-template.faker");
const policy_template_actions_1 = require("./policy-template.actions");
const policy_template_reducer_1 = require("./policy-template.reducer");
describe('Policy Template Reducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = {};
            const result = policy_template_reducer_1.reducer(policy_template_reducer_1.initialState, action);
            expect(result).toBe(policy_template_reducer_1.initialState);
        });
    });
    describe('Load Policy Templates action', () => {
        it('should set loading to true', () => {
            const action = {
                type: policy_template_actions_1.PolicyTemplateActionTypes.LoadPolicyTemplates
            };
            const result = policy_template_reducer_1.reducer(policy_template_reducer_1.initialState, action);
            expect(result.loading).toBe(true);
        });
    });
    describe('Load Policy Templates Success action', () => {
        let action;
        let result;
        const policyTemplates = policyTemplateFaker.fakeAll();
        action = {
            type: policy_template_actions_1.PolicyTemplateActionTypes.LoadPolicyTemplatesSuccess,
            payload: policyTemplates
        };
        result = policy_template_reducer_1.reducer(policy_template_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to true', () => {
            expect(result.loaded).toBe(true);
        });
        it('should have two entities', () => {
            expect(Object.keys(result.entities).length).toBe(policyTemplates.length);
        });
        it('should have two ids', () => {
            expect(result.ids.length).toBe(policyTemplates.length);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXRlbXBsYXRlLnJlZHVjZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktdGVtcGxhdGUvc3RhdGUvcG9saWN5LXRlbXBsYXRlLnJlZHVjZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlFQUF5RTtBQUN6RSx1RUFJbUM7QUFDbkMsdUVBQXlFO0FBRXpFLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLEVBQUU7SUFDdkMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtRQUM5QixFQUFFLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxFQUFFO1lBQ3pDLE1BQU0sTUFBTSxHQUFHLEVBQVMsQ0FBQztZQUV6QixNQUFNLE1BQU0sR0FBRyxpQ0FBTyxDQUFDLHNDQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxzQ0FBWSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLEVBQUU7UUFDNUMsRUFBRSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRTtZQUNwQyxNQUFNLE1BQU0sR0FBd0I7Z0JBQ2xDLElBQUksRUFBRSxtREFBeUIsQ0FBQyxtQkFBbUI7YUFDcEQsQ0FBQztZQUVGLE1BQU0sTUFBTSxHQUFHLGlDQUFPLENBQUMsc0NBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU3QyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLHNDQUFzQyxFQUFFLEdBQUcsRUFBRTtRQUNwRCxJQUFJLE1BQWtDLENBQUM7UUFDdkMsSUFBSSxNQUFhLENBQUM7UUFDbEIsTUFBTSxlQUFlLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFdEQsTUFBTSxHQUFHO1lBQ1AsSUFBSSxFQUFFLG1EQUF5QixDQUFDLDBCQUEwQjtZQUMxRCxPQUFPLEVBQUUsZUFBZTtTQUN6QixDQUFDO1FBRUYsTUFBTSxHQUFHLGlDQUFPLENBQUMsc0NBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV2QyxFQUFFLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFO1lBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtZQUNuQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7WUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIn0=