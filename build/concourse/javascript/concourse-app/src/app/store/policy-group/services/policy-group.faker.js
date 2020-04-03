"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require("faker/locale/en_US");
const models_1 = require("@concourse/core/models");
const helpers_1 = require("@concourse/shared/helpers");
// tslint:disable-next-line:max-line-length
const APPROVAL_STATUS = ['NO_APPROVAL_NEEDED', 'PENDING_CREATION_APPROVAL', 'DENIED_CREATION_APPROVAL', 'PENDING_DELETION_APPROVAL', 'DENIED_DELETION_APPROVAL', 'PENDING_UPDATE_APPROVAL', 'DENIED_UPDATE_APPROVAL', 'PENDING_PUBLISH_APPROVAL', 'DENIED_PUBLISH_APPROVAL', 'APPROVED'];
const POLICY_GROUP_STATUS = ['DRAFT', 'PUBLISHED'];
exports.fakeOne = (policyGroupTemplate, policies, surfaceLayers, attributeTags, group, i = 0) => (new models_1.PolicyGroup().deserialize({
    created: faker.date.past(),
    updated: faker.date.recent(2),
    version: faker.random.number(5),
    id: (i * 10) + 60001,
    lineageId: (i * 10) + 60001,
    status: faker.random.arrayElement(POLICY_GROUP_STATUS),
    approvalStatus: faker.random.arrayElement(APPROVAL_STATUS),
    institutionId: 1001,
    createdBy: 1001,
    updatedBy: 1001,
    majorVersion: i,
    minorVersion: i,
    isLatest: true,
    name: faker.hacker.ingverb(),
    description: faker.lorem.paragraph(),
    owningGroupId: group.id,
    attributeTagIds: attributeTags.map(a => a.id),
    surfaceLayerIds: surfaceLayers.map(o => o.id),
    policies,
    policyGroupTemplate: { id: policyGroupTemplate.id }
}));
exports.fakeMany = (policyGroupTemplates, policies, surfaceLayers, attributeTags = [], group) => policyGroupTemplates.map((_a) => {
    var { policyGroups } = _a, pgt = __rest(_a, ["policyGroups"]);
    return pgt;
}).map((pgt, index) => {
    const policiesSubset = helpers_1.sample(policies, faker.random.number({ min: 1, max: 3 }));
    const surfaceLayersSubset = helpers_1.sample(surfaceLayers, faker.random.number(3));
    const attributeTagsSubset = helpers_1.sample(attributeTags, faker.random.number(5));
    const groupSubset = group;
    return exports.fakeOne(new models_1.PolicyGroupTemplate().deserialize(pgt), policiesSubset, surfaceLayersSubset, attributeTagsSubset, groupSubset, index);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLmZha2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3BvbGljeS1ncm91cC9zZXJ2aWNlcy9wb2xpY3ktZ3JvdXAuZmFrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUE0QztBQUU1QyxtREFTZ0M7QUFDaEMsdURBQW1EO0FBRW5ELDJDQUEyQztBQUMzQyxNQUFNLGVBQWUsR0FBRyxDQUFDLG9CQUFvQixFQUFFLDJCQUEyQixFQUFFLDBCQUEwQixFQUFFLDJCQUEyQixFQUFFLDBCQUEwQixFQUFFLHlCQUF5QixFQUFFLHdCQUF3QixFQUFFLDBCQUEwQixFQUFFLHlCQUF5QixFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3pSLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFFdEMsUUFBQSxPQUFPLEdBQUcsQ0FDckIsbUJBQXdDLEVBQ3hDLFFBQWtCLEVBQ2xCLGFBQTZCLEVBQzdCLGFBQTZCLEVBQzdCLEtBQVksRUFDWixDQUFDLEdBQUcsQ0FBQyxFQUNRLEVBQUUsQ0FBQyxDQUFDLElBQUksb0JBQVcsRUFBRSxDQUFDLFdBQVcsQ0FDOUM7SUFDRSxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7SUFDMUIsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM3QixPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQy9CLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxLQUFLO0lBQ3BCLFNBQVMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxLQUFLO0lBQzNCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBc0I7SUFDM0UsY0FBYyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBbUI7SUFDNUUsYUFBYSxFQUFFLElBQUk7SUFDbkIsU0FBUyxFQUFFLElBQUk7SUFDZixTQUFTLEVBQUUsSUFBSTtJQUNmLFlBQVksRUFBRSxDQUFDO0lBQ2YsWUFBWSxFQUFFLENBQUM7SUFDZixRQUFRLEVBQUUsSUFBSTtJQUNkLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtJQUM1QixXQUFXLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7SUFDcEMsYUFBYSxFQUFFLEtBQUssQ0FBQyxFQUFFO0lBQ3ZCLGVBQWUsRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM3QyxlQUFlLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDN0MsUUFBUTtJQUNSLG1CQUFtQixFQUFFLEVBQUUsRUFBRSxFQUFFLG1CQUFtQixDQUFDLEVBQUUsRUFBRTtDQUNwRCxDQUNGLENBQUMsQ0FBQztBQUVVLFFBQUEsUUFBUSxHQUFHLENBQ3RCLG9CQUEyQyxFQUMzQyxRQUFrQixFQUNsQixhQUE2QixFQUM3QixnQkFBZ0MsRUFBRSxFQUNsQyxLQUFZLEVBQ0csRUFBRSxDQUNqQixvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUF3QixFQUFFLEVBQUU7UUFBNUIsRUFBRSxZQUFZLE9BQVUsRUFBUixrQ0FBTTtJQUFPLE9BQUEsR0FBRyxDQUFBO0NBQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUM3RSxNQUFNLGNBQWMsR0FBRyxnQkFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRixNQUFNLG1CQUFtQixHQUFHLGdCQUFNLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUUsTUFBTSxtQkFBbUIsR0FBRyxnQkFBTSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQztJQUMxQixPQUFPLGVBQU8sQ0FDWixJQUFJLDRCQUFtQixFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUMxQyxjQUFjLEVBQ2QsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUNuQixXQUFXLEVBQ1gsS0FBSyxDQUNOLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyJ9