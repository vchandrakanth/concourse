"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require("faker/locale/en_US");
const models_1 = require("@concourse/core/models");
exports.fakeOne = (i = 0, groups = []) => {
    const fName = faker.name.firstName();
    const lName = faker.name.lastName();
    return new models_1.User().deserialize({
        id: i + 101,
        created: faker.date.recent(30),
        updated: faker.date.recent(),
        version: faker.random.number(10),
        email: faker.internet.email(fName, lName, 'concoursehub.com'),
        name: `${fName} ${lName}`,
        confirmationStatus: i % 2 === 0 ? 'ACTIVE' : 'PENDING',
        institutionId: 1001,
        groups: groups || []
    });
};
exports.fakeMany = (count = faker.random.number({ min: 15, max: 100 })) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push(exports.fakeOne(i));
    }
    return users;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5mYWtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS91c2VyL3NlcnZpY2VzL3VzZXIuZmFrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBNEM7QUFHNUMsbURBQXFEO0FBRXhDLFFBQUEsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUEyQixFQUFFLEVBQUUsRUFBRTtJQUM5RCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFcEMsT0FBTyxJQUFJLGFBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUM1QixFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUc7UUFDWCxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzlCLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUM1QixPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2hDLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixDQUFDO1FBQzdELElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxLQUFLLEVBQUU7UUFDekIsa0JBQWtCLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUN0RCxhQUFhLEVBQUUsSUFBSTtRQUNuQixNQUFNLEVBQUUsTUFBTSxJQUFJLEVBQUU7S0FDckIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRVcsUUFBQSxRQUFRLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFVLEVBQUU7SUFDckYsTUFBTSxLQUFLLEdBQVcsRUFBRSxDQUFDO0lBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDOUIsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4QjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDIn0=