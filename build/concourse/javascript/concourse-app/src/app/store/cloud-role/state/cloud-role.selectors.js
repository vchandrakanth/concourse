"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@ngrx/store");
const enums_1 = require("@concourse/shared/enums");
const fromRole = require("./cloud-role.reducer");
exports.getState = store_1.createFeatureSelector(enums_1.StoreNames.CloudRole);
exports.getAll = store_1.createSelector(exports.getState, fromRole.selectAll);
exports.getEntities = store_1.createSelector(exports.getState, fromRole.selectEntities);
exports.getIsLoaded = store_1.createSelector(exports.getState, fromRole.isLoaded);
exports.getIsUpdating = store_1.createSelector(exports.getState, fromRole.isUpdating);
exports.getSelectedId = store_1.createSelector(exports.getState, fromRole.getSelected);
exports.getSelected = store_1.createSelector(exports.getEntities, exports.getSelectedId, (entities, id) => entities[id]);
exports.getCloudRoleSyncPending = store_1.createSelector(exports.getState, fromRole.getCloudRoleSyncPending);
exports.hasNextLink = store_1.createSelector(exports.getState, fromRole.hasNextLink);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS5zZWxlY3RvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvY2xvdWQtcm9sZS9zdGF0ZS9jbG91ZC1yb2xlLnNlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFvRTtBQUVwRSxtREFBcUQ7QUFDckQsaURBQWlEO0FBRXBDLFFBQUEsUUFBUSxHQUFHLDZCQUFxQixDQUFpQixrQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZFLFFBQUEsTUFBTSxHQUFHLHNCQUFjLENBQUMsZ0JBQVEsRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdEQsUUFBQSxXQUFXLEdBQUcsc0JBQWMsQ0FBQyxnQkFBUSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNoRSxRQUFBLFdBQVcsR0FBRyxzQkFBYyxDQUFDLGdCQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFELFFBQUEsYUFBYSxHQUFHLHNCQUFjLENBQUMsZ0JBQVEsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDOUQsUUFBQSxhQUFhLEdBQUcsc0JBQWMsQ0FBQyxnQkFBUSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMvRCxRQUFBLFdBQVcsR0FBRyxzQkFBYyxDQUFDLG1CQUFXLEVBQUUscUJBQWEsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pGLFFBQUEsdUJBQXVCLEdBQUcsc0JBQWMsQ0FBQyxnQkFBUSxFQUFFLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3JGLFFBQUEsV0FBVyxHQUFHLHNCQUFjLENBQUMsZ0JBQVEsRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMifQ==