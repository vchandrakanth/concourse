"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const helpers_1 = require("@concourse/shared/helpers");
const findParams = (routeState) => {
    let params = {};
    if (Object.keys(routeState.params).length > 0) {
        params = Object.assign(Object.assign({}, params), routeState.params);
    }
    if (routeState.children.length > 0) {
        params = Object.assign(Object.assign({}, params), routeState.children.reduce((obj, child) => (Object.assign(Object.assign({}, obj), findParams(child))), {}));
    }
    return params;
};
exports.routeParams = () => (source) => source.pipe(operators_1.map(({ routerState }) => {
    const params = findParams(routerState.root);
    let path = routerState.url;
    const queryParams = routerState.root.queryParams;
    Object.entries(params).forEach(([key, value]) => {
        path = path.replace(value, `:${key}`);
    });
    // it will give parent route;
    // if path policyGroups/:id, it returns policyGroups;
    const parentRoute = getParentRoute(routerState.root.firstChild);
    return { params, path, queryParams, parentRoute };
}));
const getParentRoute = (route, path = '') => {
    if (helpers_1.Util.isUndefined(route)) {
        return '';
    }
    if (Object.keys(route.params).length === 0) {
        const newPath = route.routeConfig.path !== '' ? `${path}/${route.routeConfig.path}` : path;
        return getParentRoute(route.firstChild, newPath);
    }
    return path;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUtcGFyYW1zLm9wZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvb3BlcmF0b3JzL3JvdXRlLXBhcmFtcy5vcGVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLDhDQUFxQztBQUdyQyx1REFBaUQ7QUFFakQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxVQUFrQyxFQUFVLEVBQUU7SUFDaEUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUM3QyxNQUFNLG1DQUNELE1BQU0sR0FDTixVQUFVLENBQUMsTUFBTSxDQUNyQixDQUFDO0tBQ0g7SUFDRCxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNsQyxNQUFNLG1DQUNELE1BQU0sR0FDTixVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUMzQyxpQ0FBTSxHQUFHLEdBQUssVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFHLEVBQUUsRUFBRSxDQUFDLENBQzFDLENBQUM7S0FDSDtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUVXLFFBQUEsV0FBVyxHQUFHLEdBQUcsRUFBRSxDQUM5QixDQUFDLE1BQTBFLEVBQWdDLEVBQUUsQ0FDM0csTUFBTSxDQUFDLElBQUksQ0FDVCxlQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7SUFDdEIsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDO0lBQzNCLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQ2pELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtRQUM5QyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFlLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0lBQ0gsNkJBQTZCO0lBQzdCLHFEQUFxRDtJQUNyRCxNQUFNLFdBQVcsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVoRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFzQixDQUFDO0FBQ3hFLENBQUMsQ0FBQyxDQUNILENBQUM7QUFFTixNQUFNLGNBQWMsR0FBRyxDQUFDLEtBQTZCLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2xFLElBQUksY0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMzQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzFDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzNGLE9BQU8sY0FBYyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDbEQ7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQyJ9