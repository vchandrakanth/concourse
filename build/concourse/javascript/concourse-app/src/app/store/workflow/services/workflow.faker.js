"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require("faker/locale/en_US");
const models_1 = require("@concourse/core/models");
const helpers_1 = require("@concourse/shared/helpers");
const mapToSummary = (entities, type) => entities.map(e => {
    let id;
    let status;
    let requestEntityType;
    switch (type) {
        case 'APPROVAL': {
            id = e.approvalRequestId;
            status = e.approvalRequestStatus;
            requestEntityType = e.requestEntityType;
            break;
        }
        case 'POLICY_VIOLATION_RESOLUTION': {
            id = e.resolutionRequestId;
            status = e.status;
            requestEntityType = e.policyViolationType;
            break;
        }
        default: {
            id = faker.random.number(99999);
        }
    }
    return {
        workflowName: faker.hacker.noun(),
        workflowType: type,
        priority: e.priority,
        workflowId: faker.random.number(99999),
        status,
        id,
        requesterId: e.requesterId,
        requestEntityId: e.requestEntityId,
        requestEntityType,
        created: e.created,
        updated: e.updated
    };
}).map(item => new models_1.Summary().deserialize(item));
exports.allWorkflowSummaries = (approvals, policyResolutionRequests) => ({
    owned: [
        ...mapToSummary(approvals, 'APPROVAL'),
        ...mapToSummary(policyResolutionRequests, 'POLICY_VIOLATION_RESOLUTION')
    ],
    assigned: [
        ...helpers_1.sample(mapToSummary(approvals, 'APPROVAL'), faker.random.number({ min: 5, max: 25 })),
        ...helpers_1.sample(mapToSummary(policyResolutionRequests, 'POLICY_VIOLATION_RESOLUTION'), faker.random.number({ min: 5, max: 25 }))
    ],
    watched: []
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3cuZmFrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvd29ya2Zsb3cvc2VydmljZXMvd29ya2Zsb3cuZmFrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBNEM7QUFFNUMsbURBTWdDO0FBQ2hDLHVEQUFtRDtBQUVuRCxNQUFNLFlBQVksR0FBRyxDQUFDLFFBQWUsRUFBRSxJQUFrQixFQUFhLEVBQUUsQ0FDdEUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUNmLElBQUksRUFBVSxDQUFDO0lBQ2YsSUFBSSxNQUFXLENBQUM7SUFDaEIsSUFBSSxpQkFBc0IsQ0FBQztJQUMzQixRQUFRLElBQUksRUFBRTtRQUNaLEtBQUssVUFBVSxDQUFDLENBQUM7WUFDZixFQUFFLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBQ3pCLE1BQU0sR0FBRyxDQUFDLENBQUMscUJBQXFCLENBQUM7WUFDakMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBQ3hDLE1BQU07U0FDUDtRQUVELEtBQUssNkJBQTZCLENBQUMsQ0FBQztZQUNsQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO1lBQzNCLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ2xCLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQztZQUMxQyxNQUFNO1NBQ1A7UUFFRCxPQUFPLENBQUMsQ0FBQztZQUNQLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQztLQUNGO0lBQ0QsT0FBTztRQUNMLFlBQVksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNqQyxZQUFZLEVBQUUsSUFBSTtRQUNsQixRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVE7UUFDcEIsVUFBVSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN0QyxNQUFNO1FBQ04sRUFBRTtRQUNGLFdBQVcsRUFBRSxDQUFDLENBQUMsV0FBVztRQUMxQixlQUFlLEVBQUUsQ0FBQyxDQUFDLGVBQWU7UUFDbEMsaUJBQWlCO1FBQ2pCLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTztRQUNsQixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87S0FDbkIsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksZ0JBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBRXJDLFFBQUEsb0JBQW9CLEdBQUcsQ0FDbEMsU0FBNEIsRUFDNUIsd0JBQTRDLEVBQzNCLEVBQUUsQ0FBQyxDQUFDO0lBQ3JCLEtBQUssRUFBRTtRQUNMLEdBQUcsWUFBWSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7UUFDdEMsR0FBRyxZQUFZLENBQUMsd0JBQXdCLEVBQUUsNkJBQTZCLENBQUM7S0FDekU7SUFDRCxRQUFRLEVBQUU7UUFDUixHQUFHLGdCQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEYsR0FBRyxnQkFBTSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsRUFBRSw2QkFBNkIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUMzSDtJQUNELE9BQU8sRUFBRSxFQUFFO0NBQ1osQ0FBQyxDQUFDIn0=