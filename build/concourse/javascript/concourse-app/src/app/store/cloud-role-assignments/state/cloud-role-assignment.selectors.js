"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("@concourse/shared/enums");
const store_1 = require("@ngrx/store");
const fromRole = require("./cloud-role-assignment.reducer");
exports.getState = store_1.createFeatureSelector(enums_1.StoreNames.CloudRoleAssignment);
exports.getAll = store_1.createSelector(exports.getState, fromRole.selectAll);
exports.getEntities = store_1.createSelector(exports.getState, fromRole.selectEntities);
exports.getIsLoaded = store_1.createSelector(exports.getState, fromRole.isLoaded);
exports.getIsUpdating = store_1.createSelector(exports.getState, fromRole.isUpdating);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS1hc3NpZ25tZW50LnNlbGVjdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9jbG91ZC1yb2xlLWFzc2lnbm1lbnRzL3N0YXRlL2Nsb3VkLXJvbGUtYXNzaWdubWVudC5zZWxlY3RvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBcUQ7QUFDckQsdUNBQW9FO0FBQ3BFLDREQUE0RDtBQUUvQyxRQUFBLFFBQVEsR0FBRyw2QkFBcUIsQ0FBaUIsa0JBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ2pGLFFBQUEsTUFBTSxHQUFHLHNCQUFjLENBQUMsZ0JBQVEsRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdEQsUUFBQSxXQUFXLEdBQUcsc0JBQWMsQ0FBQyxnQkFBUSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNoRSxRQUFBLFdBQVcsR0FBRyxzQkFBYyxDQUFDLGdCQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFELFFBQUEsYUFBYSxHQUFHLHNCQUFjLENBQUMsZ0JBQVEsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMifQ==