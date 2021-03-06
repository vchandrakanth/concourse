"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@ngrx/store");
const enums_1 = require("@concourse/shared/enums");
const fromPolicyGroupTemplate = require("./policy-group-template.reducer");
exports.getState = store_1.createFeatureSelector(enums_1.StoreNames.PolicyGroupTemplate);
exports.getAll = store_1.createSelector(exports.getState, fromPolicyGroupTemplate.selectAll);
exports.getAllEntities = store_1.createSelector(exports.getState, fromPolicyGroupTemplate.selectEntities);
exports.getIsLoaded = store_1.createSelector(exports.getState, fromPolicyGroupTemplate.isLoaded);
exports.getIsUpdating = store_1.createSelector(exports.getState, fromPolicyGroupTemplate.isUpdating);
exports.getSelectedId = store_1.createSelector(exports.getState, fromPolicyGroupTemplate.selectedId);
exports.getSelected = store_1.createSelector(exports.getAllEntities, exports.getSelectedId, (entities, id) => entities[id]);
exports.hasNextLink = store_1.createSelector(exports.getState, fromPolicyGroupTemplate.hasNextLink);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXRlbXBsYXRlLnNlbGVjdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktZ3JvdXAtdGVtcGxhdGUvc3RhdGUvcG9saWN5LWdyb3VwLXRlbXBsYXRlLnNlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFvRTtBQUVwRSxtREFBcUQ7QUFDckQsMkVBQTJFO0FBRTlELFFBQUEsUUFBUSxHQUFHLDZCQUFxQixDQUFnQyxrQkFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDaEcsUUFBQSxNQUFNLEdBQUcsc0JBQWMsQ0FBQyxnQkFBUSxFQUFFLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JFLFFBQUEsY0FBYyxHQUFHLHNCQUFjLENBQUMsZ0JBQVEsRUFBRSx1QkFBdUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNsRixRQUFBLFdBQVcsR0FBRyxzQkFBYyxDQUFDLGdCQUFRLEVBQUUsdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekUsUUFBQSxhQUFhLEdBQUcsc0JBQWMsQ0FBQyxnQkFBUSxFQUFFLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzdFLFFBQUEsYUFBYSxHQUFHLHNCQUFjLENBQUMsZ0JBQVEsRUFBRSx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3RSxRQUFBLFdBQVcsR0FBRyxzQkFBYyxDQUFDLHNCQUFjLEVBQUUscUJBQWEsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzVGLFFBQUEsV0FBVyxHQUFHLHNCQUFjLENBQUMsZ0JBQVEsRUFBRSx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyJ9