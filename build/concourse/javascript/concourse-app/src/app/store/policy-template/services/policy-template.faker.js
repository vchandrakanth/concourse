"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require("faker/locale/en_US");
const models_1 = require("@concourse/core/models");
/**
 * For reference:
 *  Attributes: java/com/concoursehub/api/service/policy/domain/Attribute.java
 *  Attribute Mapping: java/com/concoursehub/tools/datasetup/setup/SetupPolicyTemplates.java
 *  Policy Templates Enum: java/com/concoursehub/api/service/policy/domain/PolicyTemplateEnum.java
 */
const ATTRIBUTE_TEMPLATES = [
    { name: 'Allow', type: 'ALLOW', multipleValued: false },
    { name: 'ApprovalGroups', type: 'APPROVAL_GROUP', multipleValued: true },
    { name: 'AwsRegion', type: 'AWS_REGION', multipleValued: true },
    { name: 'AwsProduct', type: 'AWS_SERVICE', multipleValued: true },
    { name: 'Entity', type: 'ENTITY', multipleValued: false },
    { name: 'Events', type: 'EVENT', multipleValued: true },
    { name: 'ConnectivitySpecification', type: 'CONNECTION_SPECIFICATION', multipleValued: false },
    { name: 'SurfaceLayers', type: 'ORGANIZATION', multipleValued: true }
];
const POLICY_TEMPLATE_TEMPLATES = [
    {
        id: 10001,
        name: 'Secure Perimeter',
        category: 'Security',
        predicate: 'Only Resources in Control Artifact are present in the target Security Group',
        claims: `All Interaction and ingress/ egress of Data restricted to only members of the Perimeter.\n
Perimeter implemented via Security Group created per deployed instance of Digital Asset`,
        proofs: `Security Group exists for each Deployed Asset and has all Services in the associated Service Model Control Artifact present.\n
Security Group associated with each Deployment is ONLY associated with the Deployment and no others.`,
        repeatable: false,
        attributes: []
    },
    {
        id: 10002,
        name: 'Model Authority',
        category: 'Security',
        predicate: 'Perimeter limited to the associated Service Model\'s Control Artifact members',
        claims: 'Membership of the Perimeter to be only those declared in the associated Service Model Control Artifact.',
        proofs: `Services within Security Group ONLY comprise services from the deployed Control Artifact.\n
No data transfer is occurring from Security Group to any Service NOT IN the Security Group OR an entitled Perimeter with a valid contract.`,
        repeatable: false,
        attributes: []
    },
    {
        id: 10003,
        name: 'Encrypt Stateful Data',
        category: 'Security',
        predicate: 'All Services encrypt stored data',
        claims: 'Ensures any Service being used which contains STATEFUL data must be encrypted.',
        proofs: `All Services within the deployed Control Artifact which are STATEFUL support encryption.\n
All STATEFUL Services have a valid encryption key.`,
        repeatable: false,
        attributes: []
    },
    {
        id: 10004,
        name: 'Restrict Internet Ingress',
        category: 'Security',
        predicate: 'No inbound connections from public internet',
        claims: 'Ensure Security Group does not allow inbound connectivity from public internet in cloud',
        proofs: 'No internet ingress present for any Resource present in a Control Artifact.',
        repeatable: false,
        attributes: []
    },
    {
        id: 10005,
        name: 'Restrict Internet Egress',
        category: 'Security',
        predicate: 'No outbound connections to public internet',
        claims: 'Ensure Security Group does not allow outbound connectivity to public internet in cloud.',
        proofs: 'No internet egress present for any Resource present in a Control Artifact.',
        repeatable: false,
        attributes: []
    },
    {
        id: 10006,
        name: 'Allow AWS Services',
        category: 'Regulatory',
        predicate: '{Allow} Deployment of Service only of type: {AwsProduct}',
        claims: 'Only AWS Services provided in the provided group are (dis)allowed.',
        proofs: 'Only Services present in the list are permitted for a given Deployment.',
        repeatable: false,
        attributes: ['ALLOW', 'AWS_SERVICE']
    },
    {
        id: 10007,
        name: 'Allow AWS Regions',
        category: 'Regulatory',
        predicate: '{Allow} Deployment of Assets only in Regions: {AwsRegion}',
        claims: 'Only AWS Regions provided in the provided group are (dis)allowed.',
        proofs: 'Only Regions present in the list are permitted for a given Deployment.',
        repeatable: false,
        attributes: ['ALLOW', 'AWS_REGION']
    },
    {
        id: 10010,
        name: 'Require Approval',
        category: 'Institutional',
        predicate: 'Require approval for {Entity} when {Events} occur from {ApprovalGroups}.',
        claims: 'A designated Event occurring on any of the designated Entities will require an Approval from a designated Approval Group.',
        proofs: 'Before an event can occur, an Approval Request will be created that needs to be confirmed by a designated Approval Group.',
        repeatable: true,
        attributes: ['APPROVAL_GROUP', 'EVENT', 'ENTITY']
    },
    {
        id: 10011,
        name: 'Network Connectivity',
        category: 'Regulatory',
        predicate: '{ConnectivitySpecification} to {SurfaceLayers}',
        // tslint:disable-next-line:max-line-length
        claims: 'Connections between the policy-associated and designated SurfaceLayers\' services will be evaluated by the Connectivity Specification.',
        proofs: 'TBD',
        repeatable: true,
        attributes: ['CONNECTION_SPECIFICATION', 'ORGANIZATION']
    }
];
exports.fakeAll = () => POLICY_TEMPLATE_TEMPLATES.map((pt, index) => (new models_1.PolicyTemplate().deserialize(Object.assign(Object.assign({ created: faker.date.recent(), updated: faker.date.recent(), version: faker.random.number(5), id: (index * 10) + 10001 }, pt), { attributes: pt.attributes.map((type, i) => (Object.assign({ created: faker.date.recent(), updated: faker.date.recent(), version: faker.random.number(5), id: (index + i * 10) + 30001 }, ATTRIBUTE_TEMPLATES.find(at => type === at.type)))) }))));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXRlbXBsYXRlLmZha2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3BvbGljeS10ZW1wbGF0ZS9zZXJ2aWNlcy9wb2xpY3ktdGVtcGxhdGUuZmFrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBNEM7QUFFNUMsbURBQW1FO0FBRW5FOzs7OztHQUtHO0FBRUgsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFO0lBQ3ZELEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO0lBQ3hFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7SUFDL0QsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtJQUNqRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7SUFDdkQsRUFBRSxJQUFJLEVBQUUsMkJBQTJCLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUU7SUFDOUYsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtDQUN0RSxDQUFDO0FBRUYsTUFBTSx5QkFBeUIsR0FBRztJ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