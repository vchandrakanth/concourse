"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@ngrx/store");
const enums_1 = require("@concourse/shared/enums");
const helpers_1 = require("@concourse/shared/helpers");
const fromPolicyTemplate = require("./policy-template.reducer");
exports.getState = store_1.createFeatureSelector(enums_1.StoreNames.PolicyTemplate);
exports.getAll = store_1.createSelector(exports.getState, fromPolicyTemplate.selectAll);
exports.getCategory = store_1.createSelector(exports.getState, fromPolicyTemplate.category);
exports.getByCategory = store_1.createSelector(exports.getAll, exports.getCategory, (policyTemplates, category) => !helpers_1.Util.isUndefined(category) && category.length > 0 ?
    policyTemplates.filter(pt => pt.category === category) : policyTemplates);
exports.getEntities = store_1.createSelector(exports.getState, fromPolicyTemplate.selectEntities);
exports.getIsLoaded = store_1.createSelector(exports.getState, fromPolicyTemplate.isLoaded);
exports.getIsUpdating = store_1.createSelector(exports.getState, fromPolicyTemplate.isUpdating);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXRlbXBsYXRlLnNlbGVjdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktdGVtcGxhdGUvc3RhdGUvcG9saWN5LXRlbXBsYXRlLnNlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFvRTtBQUVwRSxtREFBcUQ7QUFDckQsdURBQWlEO0FBQ2pELGdFQUFnRTtBQUVuRCxRQUFBLFFBQVEsR0FBRyw2QkFBcUIsQ0FBMkIsa0JBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN0RixRQUFBLE1BQU0sR0FBRyxzQkFBYyxDQUFDLGdCQUFRLEVBQUUsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEUsUUFBQSxXQUFXLEdBQUcsc0JBQWMsQ0FBQyxnQkFBUSxFQUFFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3BFLFFBQUEsYUFBYSxHQUN4QixzQkFBYyxDQUFDLGNBQU0sRUFBRSxtQkFBVyxFQUFFLENBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQ2hFLENBQUMsY0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xELGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQzNFLENBQUM7QUFDUyxRQUFBLFdBQVcsR0FBRyxzQkFBYyxDQUFDLGdCQUFRLEVBQUUsa0JBQWtCLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDMUUsUUFBQSxXQUFXLEdBQUcsc0JBQWMsQ0FBQyxnQkFBUSxFQUFFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3BFLFFBQUEsYUFBYSxHQUFHLHNCQUFjLENBQUMsZ0JBQVEsRUFBRSxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyJ9