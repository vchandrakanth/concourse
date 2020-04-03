"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@ngrx/store");
const enums_1 = require("@concourse/shared/enums");
const fromPolicyViolation = require("./policy-violation.reducer");
exports.getState = store_1.createFeatureSelector(enums_1.StoreNames.PolicyViolation);
exports.getEvaluation = store_1.createSelector(exports.getState, fromPolicyViolation.getEvaluation);
exports.isEvaluationPending = store_1.createSelector(exports.getState, fromPolicyViolation.isEvaluationPending);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXZpb2xhdGlvbi5zZWxlY3RvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcG9saWN5LXZpb2xhdGlvbi9zdGF0ZS9wb2xpY3ktdmlvbGF0aW9uLnNlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFvRTtBQUVwRSxtREFBcUQ7QUFDckQsa0VBQWtFO0FBRXJELFFBQUEsUUFBUSxHQUFHLDZCQUFxQixDQUE0QixrQkFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3hGLFFBQUEsYUFBYSxHQUFHLHNCQUFjLENBQUMsZ0JBQVEsRUFBRSxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUM1RSxRQUFBLG1CQUFtQixHQUFHLHNCQUFjLENBQUMsZ0JBQVEsRUFBRSxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDIn0=