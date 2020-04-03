"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@ngrx/store");
function createSelectorsFactory() {
    function getSelectors(selectState) {
        const selectIds = (state) => state.ids;
        const selectEntities = (state) => state.entities;
        const selectAll = store_1.createSelector(selectIds, selectEntities, (ids, entities) => ids.map((id) => entities[id]));
        const selectTotal = store_1.createSelector(selectIds, ids => ids.length);
        if (!selectState) {
            return {
                selectIds,
                selectEntities,
                selectAll,
                selectTotal
            };
        }
        return {
            selectIds: store_1.createSelector(selectState, selectIds),
            selectEntities: store_1.createSelector(selectState, selectEntities),
            selectAll: store_1.createSelector(selectState, selectAll),
            selectTotal: store_1.createSelector(selectState, selectTotal)
        };
    }
    return { getSelectors };
}
exports.createSelectorsFactory = createSelectorsFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfc2VsZWN0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9zdGF0ZS1hZGFwdGVyL3N0YXRlX3NlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUE2QztBQUc3QyxTQUFnQixzQkFBc0I7SUFLcEMsU0FBUyxZQUFZLENBQ25CLFdBQTRDO1FBRTVDLE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQzVDLE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBcUIsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUNqRSxNQUFNLFNBQVMsR0FBRyxzQkFBYyxDQUM5QixTQUFTLEVBQ1QsY0FBYyxFQUNkLENBQUMsR0FBUSxFQUFFLFFBQXVCLEVBQU8sRUFBRSxDQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBTyxFQUFFLEVBQUUsQ0FBRSxRQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQzlDLENBQUM7UUFFRixNQUFNLFdBQVcsR0FBRyxzQkFBYyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVqRSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLE9BQU87Z0JBQ0wsU0FBUztnQkFDVCxjQUFjO2dCQUNkLFNBQVM7Z0JBQ1QsV0FBVzthQUNaLENBQUM7U0FDSDtRQUVELE9BQU87WUFDTCxTQUFTLEVBQUUsc0JBQWMsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDO1lBQ2pELGNBQWMsRUFBRSxzQkFBYyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUM7WUFDM0QsU0FBUyxFQUFFLHNCQUFjLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQztZQUNqRCxXQUFXLEVBQUUsc0JBQWMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO1NBQ3RELENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTyxFQUFFLFlBQVksRUFBRSxDQUFDO0FBQzFCLENBQUM7QUFyQ0Qsd0RBcUNDIn0=