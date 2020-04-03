"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const policyTemplateFaker = require("@concourse/store/policy-template/services/policy-template.faker");
const predicate_replacement_common_1 = require("./predicate-replacement.common");
describe('PredicateReplacementCommon', () => {
    const policyTemplates = policyTemplateFaker.fakeAll();
    it('should return an empty array when no predicate given', () => {
        const predicate = policyTemplates.find(pt => pt.name === 'Restrict Internet Egress').predicate;
        expect(predicate_replacement_common_1.PredicateReplacement.matchByRegex(predicate).length).toEqual(0);
        expect(predicate_replacement_common_1.PredicateReplacement.matchByRegex(predicate)).toEqual([]);
    });
    it('should extract two attribute names from a predicate', () => {
        const predicate = policyTemplates.find(pt => pt.name === 'Allow AWS Regions').predicate;
        expect(predicate_replacement_common_1.PredicateReplacement.matchByRegex(predicate).length).toEqual(2);
        expect(predicate_replacement_common_1.PredicateReplacement.matchByRegex(predicate)).toEqual(['Allow', 'AwsRegion']);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZGljYXRlLXJlcGxhY2VtZW50LmNvbW1vbi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL3ByZWRpY2F0ZS1yZXBsYWNlbWVudC9wcmVkaWNhdGUtcmVwbGFjZW1lbnQuY29tbW9uLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1R0FBdUc7QUFDdkcsaUZBQXNFO0FBRXRFLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7SUFDMUMsTUFBTSxlQUFlLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFdEQsRUFBRSxDQUFDLHNEQUFzRCxFQUFFLEdBQUcsRUFBRTtRQUM5RCxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSywwQkFBMEIsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMvRixNQUFNLENBQUMsbURBQW9CLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsbURBQW9CLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFEQUFxRCxFQUFFLEdBQUcsRUFBRTtRQUM3RCxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxtQkFBbUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUN4RixNQUFNLENBQUMsbURBQW9CLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsbURBQW9CLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9