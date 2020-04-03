"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getInitialEntityState() {
    return {
        ids: [],
        entities: {}
    };
}
exports.getInitialEntityState = getInitialEntityState;
function createInitialStateFactory() {
    function getInitialState(additionalState = {}) {
        return Object.assign(getInitialEntityState(), additionalState);
    }
    return { getInitialState };
}
exports.createInitialStateFactory = createInitialStateFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5X3N0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9zdGF0ZS1hZGFwdGVyL2VudGl0eV9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLFNBQWdCLHFCQUFxQjtJQUNuQyxPQUFPO1FBQ0wsR0FBRyxFQUFFLEVBQUU7UUFDUCxRQUFRLEVBQUUsRUFBRTtLQUNiLENBQUM7QUFDSixDQUFDO0FBTEQsc0RBS0M7QUFFRCxTQUFnQix5QkFBeUI7SUFLdkMsU0FBUyxlQUFlLENBQUMsa0JBQXVCLEVBQUU7UUFDaEQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQztBQUM3QixDQUFDO0FBVkQsOERBVUMifQ==