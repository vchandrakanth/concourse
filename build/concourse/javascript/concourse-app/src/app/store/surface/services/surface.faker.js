"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@concourse/core/models");
const faker = require("faker/locale/en_US");
exports.fakeOne = (i = 0) => new models_1.Surface().deserialize({
    id: i + 1001,
    created: faker.date.recent(30),
    updated: faker.date.recent(),
    version: faker.random.number(10),
    name: faker.commerce.department(),
    description: faker.lorem.paragraph(),
    institutionId: 1001,
    groupIds: [1001, 1002],
    isAssociated: (i === 0),
    hasGroup: (groupId) => true
});
exports.fakeMany = (count = faker.random.number({ min: 3, max: 25 })) => {
    const surfaces = [];
    for (let i = 0; i < count; i++) {
        surfaces.push(exports.fakeOne(i));
    }
    return surfaces;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS5mYWtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9zdXJmYWNlL3NlcnZpY2VzL3N1cmZhY2UuZmFrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBaUQ7QUFDakQsNENBQTRDO0FBRS9CLFFBQUEsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBTyxFQUFFLENBQ3BDLElBQUksZ0JBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUN4QixFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUk7SUFDWixPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQzlCLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtJQUM1QixPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2hDLElBQUksRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRTtJQUNqQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7SUFDcEMsYUFBYSxFQUFFLElBQUk7SUFDbkIsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztJQUN0QixZQUFZLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLFFBQVEsRUFBRSxDQUFDLE9BQWUsRUFBRSxFQUFFLENBQUMsSUFBSTtDQUNwQyxDQUFDLENBQUM7QUFFUSxRQUFBLFFBQVEsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQU8sRUFBRTtJQUNoRixNQUFNLFFBQVEsR0FBYyxFQUFFLENBQUM7SUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM5QixRQUFRLENBQUMsSUFBSSxDQUFDLGVBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzNCO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyxDQUFDIn0=