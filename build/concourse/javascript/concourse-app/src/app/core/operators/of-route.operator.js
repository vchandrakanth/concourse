"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const router_actions_1 = require("../router/router.actions");
exports.ofRoute = (routes, propagateToParent = true) => (source) => source.pipe(operators_1.filter(action => action.type === router_actions_1.RouterActionTypes.Change), operators_1.startWith(undefined), operators_1.distinctUntilChanged(), operators_1.pairwise(), operators_1.filter(([oldAction, newAction]) => {
    const newRouteAction = newAction;
    const oldRouteAction = oldAction;
    const oldParentRoute = !!oldRouteAction ? oldRouteAction.payload.parentRoute : undefined;
    const routePath = newRouteAction.payload.path;
    const queryParams = newRouteAction.payload.queryParams;
    const parentRoute = newRouteAction.payload.parentRoute;
    if (routes.includes(routePath)) {
        return true;
    }
    if (propagateToParent && routes.includes(parentRoute) && oldParentRoute !== parentRoute) {
        return true;
    }
    if (Object.keys(queryParams).length > 0) {
        // fetching path with out queryParams.
        const path = routePath.split('?')[0];
        return routes.includes(path);
    }
    return false;
}), operators_1.map(([oldAction, newAction]) => newAction));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2Ytcm91dGUub3BlcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9vcGVyYXRvcnMvb2Ytcm91dGUub3BlcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSw4Q0FBd0Y7QUFFeEYsNkRBQTJFO0FBRTlELFFBQUEsT0FBTyxHQUFHLENBQ3JCLE1BQWdCLEVBQ2hCLGlCQUFpQixHQUFHLElBQUksRUFDVSxFQUFFLENBQ3BDLENBQUMsTUFBMEIsRUFBc0IsRUFBRSxDQUNqRCxNQUFNLENBQUMsSUFBSSxDQUNULGtCQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLGtDQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUMxRCxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxFQUNwQixnQ0FBb0IsRUFBRSxFQUN0QixvQkFBUSxFQUFFLEVBQ1Ysa0JBQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLEVBQUU7SUFDaEMsTUFBTSxjQUFjLEdBQUcsU0FBeUIsQ0FBQztJQUNqRCxNQUFNLGNBQWMsR0FBRyxTQUF5QixDQUFDO0lBQ2pELE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDekYsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDOUMsTUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFDdkQsTUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFFdkQsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQUUsT0FBTyxJQUFJLENBQUM7S0FBRTtJQUNoRCxJQUFJLGlCQUFpQixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksY0FBYyxLQUFLLFdBQVcsRUFBRTtRQUFFLE9BQU8sSUFBSSxDQUFDO0tBQUU7SUFDekcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDdkMsc0NBQXNDO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUMsRUFDRixlQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQzNDLENBQUMifQ==