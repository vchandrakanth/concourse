"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require("faker/locale/en_US");
const models_1 = require("@concourse/core/models");
const NOTIFICATIONTYPE = ['APPROVAL REQUEST', 'DEPLOYMENT REQUEST', 'CLOUD FORMATION DEPLOYMENT', 'POLICY VIOLATION'];
const ENTITYTYPE = ['APPLICATION', 'POLICY GROUP', 'DEPLOYMENT', 'MODEL'];
const PRIORITY = ['URGENT', 'HIGH', 'MEDIUM', 'LOW'];
const CAUSETYPE = ['CREATION', 'APPROVAL', 'REJECTION', 'ASSIGNMENT', 'CANCELLATION', 'UPDATE', 'DELETION', 'VERIFICATION', 'INACTIVATION', 'UNKNOWN'];
exports.fakeOne = (i = 0) => (new models_1.Notification().deserialize({
    created: faker.date.recent(),
    updated: faker.date.recent(),
    version: faker.random.number(5),
    institutionId: 1001,
    id: (i * 10) + 20001,
    title: faker.lorem.sentence(3),
    description: faker.lorem.sentence(6),
    type: faker.random.arrayElement(NOTIFICATIONTYPE),
    entityId: (i * 10) + 4001,
    subjectType: faker.random.arrayElement(ENTITYTYPE),
    subjectId: (i * 10) + 6001,
    priority: faker.random.arrayElement(PRIORITY),
    notifiedUserIds: Array(faker.random.number({ min: 1, max: 20 })).fill(undefined).map((a, i) => faker.random.number(1000)),
    notifiedGroupIds: Array(faker.random.number({ min: 1, max: 20 })).fill(undefined).map((a, i) => faker.random.number(1000)),
    dismissedUserIds: Array(faker.random.number({ min: 1, max: 20 })).fill(undefined).map((a, i) => faker.random.number(1000)),
    cause: faker.random.arrayElement(CAUSETYPE)
}));
exports.fakeMany = (count = faker.random.number({ min: 5, max: 50 })) => {
    const notifications = [];
    for (let i = 0; i < count; i++) {
        notifications.push(exports.fakeOne(i));
    }
    return notifications;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmZha2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbm90aWZpY2F0aW9uL3NlcnZpY2VzL25vdGlmaWNhdGlvbi5mYWtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUE0QztBQUU1QyxtREFBMkc7QUFFM0csTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLDRCQUE0QixFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFDdEgsTUFBTSxVQUFVLEdBQUcsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMxRSxNQUFNLFFBQVEsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3JELE1BQU0sU0FBUyxHQUFHLENBQUMsVUFBVSxFQUFHLFVBQVUsRUFBRyxXQUFXLEVBQUcsWUFBWSxFQUFHLGNBQWMsRUFBRyxRQUFRLEVBQUcsVUFBVSxFQUFHLGNBQWMsRUFBRyxjQUFjLEVBQUcsU0FBUyxDQUFDLENBQUE7QUFFbEosUUFBQSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFnQixFQUFFLENBQUMsQ0FDOUMsSUFBSSxxQkFBWSxFQUFFLENBQUMsV0FBVyxDQUM1QjtJQUNFLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtJQUM1QixPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7SUFDNUIsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMvQixhQUFhLEVBQUUsSUFBSTtJQUNuQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFD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