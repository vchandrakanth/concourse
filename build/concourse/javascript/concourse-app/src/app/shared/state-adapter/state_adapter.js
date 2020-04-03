"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DidMutate;
(function (DidMutate) {
    DidMutate[DidMutate["EntitiesOnly"] = 0] = "EntitiesOnly";
    DidMutate[DidMutate["Both"] = 1] = "Both";
    DidMutate[DidMutate["None"] = 2] = "None";
})(DidMutate = exports.DidMutate || (exports.DidMutate = {}));
function createStateOperator(mutator) {
    return function operation(arg, state) {
        const clonedEntityState = {
            ids: [...state.ids],
            entities: Object.assign({}, state.entities)
        };
        const didMutate = mutator(arg, clonedEntityState);
        if (didMutate === DidMutate.Both) {
            return Object.assign(Object.assign({}, state), clonedEntityState);
        }
        if (didMutate === DidMutate.EntitiesOnly) {
            return Object.assign(Object.assign({}, state), { entities: clonedEntityState.entities });
        }
        return state;
    };
}
exports.createStateOperator = createStateOperator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvc3RhdGUtYWRhcHRlci9zdGF0ZV9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ25CLHlEQUFZLENBQUE7SUFDWix5Q0FBSSxDQUFBO0lBQ0oseUNBQUksQ0FBQTtBQUNOLENBQUMsRUFKVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUlwQjtBQUtELFNBQWdCLG1CQUFtQixDQUNqQyxPQUE0QztJQUU1QyxPQUFPLFNBQVMsU0FBUyxDQUEyQixHQUFNLEVBQUUsS0FBVTtRQUNwRSxNQUFNLGlCQUFpQixHQUFtQjtZQUN4QyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDbkIsUUFBUSxvQkFBTyxLQUFLLENBQUMsUUFBUSxDQUFFO1NBQ2hDLENBQUM7UUFFRixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFbEQsSUFBSSxTQUFTLEtBQUssU0FBUyxDQUFDLElBQUksRUFBRTtZQUNoQyx1Q0FBWSxLQUFLLEdBQUssaUJBQWlCLEVBQUc7U0FDM0M7UUFFRCxJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsWUFBWSxFQUFFO1lBQ3hDLHVDQUNLLEtBQUssS0FDUixRQUFRLEVBQUUsaUJBQWlCLENBQUMsUUFBUSxJQUNwQztTQUNIO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDLENBQUM7QUFDSixDQUFDO0FBeEJELGtEQXdCQyJ9