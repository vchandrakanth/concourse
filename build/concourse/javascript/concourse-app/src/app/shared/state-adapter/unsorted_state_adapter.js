"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_adapter_1 = require("./state_adapter");
const utils_1 = require("./utils");
function createUnsortedStateAdapter(selectId) {
    function addOneMutably(entity, state) {
        const key = utils_1.selectIdValue(entity, selectId);
        if (key in state.entities) {
            return state_adapter_1.DidMutate.None;
        }
        state.ids.push(key);
        state.entities[key] = entity;
        return state_adapter_1.DidMutate.Both;
    }
    function addManyMutably(entities, state) {
        let didMutate = false;
        for (const entity of entities) {
            didMutate = addOneMutably(entity, state) !== state_adapter_1.DidMutate.None || didMutate;
        }
        return didMutate ? state_adapter_1.DidMutate.Both : state_adapter_1.DidMutate.None;
    }
    function addAllMutably(entities, state) {
        state.ids = [];
        state.entities = {};
        addManyMutably(entities, state);
        return state_adapter_1.DidMutate.Both;
    }
    function removeOneMutably(key, state) {
        return removeManyMutably([key], state);
    }
    function removeManyMutably(keysOrPredicate, state) {
        const keys = keysOrPredicate instanceof Array
            ? keysOrPredicate
            : state.ids.filter((key) => keysOrPredicate(state.entities[key]));
        const didMutate = keys
            .filter((key) => key in state.entities)
            .map((key) => delete state.entities[key]).length > 0;
        if (didMutate) {
            state.ids = state.ids.filter((id) => id in state.entities);
        }
        return didMutate ? state_adapter_1.DidMutate.Both : state_adapter_1.DidMutate.None;
    }
    function removeAll(state) {
        return Object.assign(Object.assign({}, state), { ids: [], entities: {} });
    }
    function takeNewKey(keys, update, state) {
        const original = state.entities[update.id];
        // const updated: T = Object.assign({}, original, update.changes);
        const updated = Object.assign(Object.create(Object.getPrototypeOf(original)), original, update.changes);
        const newKey = utils_1.selectIdValue(updated, selectId);
        const hasNewKey = newKey !== update.id;
        if (hasNewKey) {
            keys[update.id] = newKey;
            delete state.entities[update.id];
        }
        state.entities[newKey] = updated;
        return hasNewKey;
    }
    function updateOneMutably(update, state) {
        return updateManyMutably([update], state);
    }
    function updateManyMutably(updates, state) {
        const newKeys = {};
        updates = updates.filter(update => update.id in state.entities);
        const didMutateEntities = updates.length > 0;
        if (didMutateEntities) {
            const didMutateIds = updates.filter(update => takeNewKey(newKeys, update, state)).length > 0;
            if (didMutateIds) {
                state.ids = state.ids.map((id) => newKeys[id] || id);
                return state_adapter_1.DidMutate.Both;
            }
            else {
                return state_adapter_1.DidMutate.EntitiesOnly;
            }
        }
        return state_adapter_1.DidMutate.None;
    }
    function mapMutably(map, state) {
        const changes = state.ids.reduce((changes, id) => {
            const change = map(state.entities[id]);
            if (change !== state.entities[id]) {
                changes.push({ id, changes: change });
            }
            return changes;
        }, []);
        const updates = changes.filter(({ id }) => id in state.entities);
        return updateManyMutably(updates, state);
    }
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([entity], state);
    }
    function upsertManyMutably(entities, state) {
        const added = [];
        const updated = [];
        for (const entity of entities) {
            const id = utils_1.selectIdValue(entity, selectId);
            if (id in state.entities) {
                updated.push({ id, changes: entity });
            }
            else {
                added.push(entity);
            }
        }
        const didMutateByUpdated = updateManyMutably(updated, state);
        const didMutateByAdded = addManyMutably(added, state);
        switch (true) {
            case didMutateByAdded === state_adapter_1.DidMutate.None &&
                didMutateByUpdated === state_adapter_1.DidMutate.None:
                return state_adapter_1.DidMutate.None;
            case didMutateByAdded === state_adapter_1.DidMutate.Both ||
                didMutateByUpdated === state_adapter_1.DidMutate.Both:
                return state_adapter_1.DidMutate.Both;
            default:
                return state_adapter_1.DidMutate.EntitiesOnly;
        }
    }
    return {
        removeAll,
        addOne: state_adapter_1.createStateOperator(addOneMutably),
        addMany: state_adapter_1.createStateOperator(addManyMutably),
        addAll: state_adapter_1.createStateOperator(addAllMutably),
        updateOne: state_adapter_1.createStateOperator(updateOneMutably),
        updateMany: state_adapter_1.createStateOperator(updateManyMutably),
        upsertOne: state_adapter_1.createStateOperator(upsertOneMutably),
        upsertMany: state_adapter_1.createStateOperator(upsertManyMutably),
        removeOne: state_adapter_1.createStateOperator(removeOneMutably),
        removeMany: state_adapter_1.createStateOperator(removeManyMutably),
        map: state_adapter_1.createStateOperator(mapMutably)
    };
}
exports.createUnsortedStateAdapter = createUnsortedStateAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zb3J0ZWRfc3RhdGVfYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvc3RhdGUtYWRhcHRlci91bnNvcnRlZF9zdGF0ZV9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUUEsbURBQWlFO0FBQ2pFLG1DQUF3QztBQUt4QyxTQUFnQiwwQkFBMEIsQ0FBSSxRQUF1QjtJQUluRSxTQUFTLGFBQWEsQ0FBQyxNQUFXLEVBQUUsS0FBVTtRQUM1QyxNQUFNLEdBQUcsR0FBRyxxQkFBYSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUU1QyxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ3pCLE9BQU8seUJBQVMsQ0FBQyxJQUFJLENBQUM7U0FDdkI7UUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUU3QixPQUFPLHlCQUFTLENBQUMsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFHRCxTQUFTLGNBQWMsQ0FBQyxRQUFlLEVBQUUsS0FBVTtRQUNqRCxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdEIsS0FBSyxNQUFNLE1BQU0sSUFBSSxRQUFRLEVBQUU7WUFDN0IsU0FBUyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUsseUJBQVMsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDO1NBQzFFO1FBRUQsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLHlCQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyx5QkFBUyxDQUFDLElBQUksQ0FBQztJQUNyRCxDQUFDO0lBR0QsU0FBUyxhQUFhLENBQUMsUUFBZSxFQUFFLEtBQVU7UUFDaEQsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZixLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVwQixjQUFjLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWhDLE9BQU8seUJBQVMsQ0FBQyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUdELFNBQVMsZ0JBQWdCLENBQUMsR0FBUSxFQUFFLEtBQVU7UUFDNUMsT0FBTyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFJRCxTQUFTLGlCQUFpQixDQUN4QixlQUFxQyxFQUNyQyxLQUFVO1FBRVYsTUFBTSxJQUFJLEdBQ1IsZUFBZSxZQUFZLEtBQUs7WUFDOUIsQ0FBQyxDQUFDLGVBQWU7WUFDakIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFM0UsTUFBTSxTQUFTLEdBQ2IsSUFBSTthQUNELE1BQU0sQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUM7YUFDM0MsR0FBRyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRTlELElBQUksU0FBUyxFQUFFO1lBQ2IsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNqRTtRQUVELE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyx5QkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMseUJBQVMsQ0FBQyxJQUFJLENBQUM7SUFDckQsQ0FBQztJQUdELFNBQVMsU0FBUyxDQUFjLEtBQVU7UUFDeEMsdUNBQ0ssS0FBSyxLQUNSLEdBQUcsRUFBRSxFQUFFLEVBQ1AsUUFBUSxFQUFFLEVBQUUsSUFDWjtJQUNKLENBQUM7SUFPRCxTQUFTLFVBQVUsQ0FDakIsSUFBMkIsRUFDM0IsTUFBaUIsRUFDakIsS0FBVTtRQUVWLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLGtFQUFrRTtRQUNsRSxNQUFNLE9BQU8sR0FBTSxNQUFNLENBQUMsTUFBTSxDQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsRUFDOUMsUUFBUSxFQUNSLE1BQU0sQ0FBQyxPQUFPLENBQ2YsQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHLHFCQUFhLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sU0FBUyxHQUFHLE1BQU0sS0FBSyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBRXZDLElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDekIsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNsQztRQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBRWpDLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFHRCxTQUFTLGdCQUFnQixDQUFDLE1BQVcsRUFBRSxLQUFVO1FBQy9DLE9BQU8saUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBR0QsU0FBUyxpQkFBaUIsQ0FBQyxPQUFjLEVBQUUsS0FBVTtRQUNuRCxNQUFNLE9BQU8sR0FBNkIsRUFBRSxDQUFDO1FBRTdDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEUsTUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUU3QyxJQUFJLGlCQUFpQixFQUFFO1lBQ3JCLE1BQU0sWUFBWSxHQUNoQixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBRTFFLElBQUksWUFBWSxFQUFFO2dCQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzFELE9BQU8seUJBQVMsQ0FBQyxJQUFJLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0wsT0FBTyx5QkFBUyxDQUFDLFlBQVksQ0FBQzthQUMvQjtTQUNGO1FBRUQsT0FBTyx5QkFBUyxDQUFDLElBQUksQ0FBQztJQUN4QixDQUFDO0lBR0QsU0FBUyxVQUFVLENBQUMsR0FBUSxFQUFFLEtBQVU7UUFDdEMsTUFBTSxPQUFPLEdBQWdCLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUMzQyxDQUFDLE9BQWMsRUFBRSxFQUFtQixFQUFFLEVBQUU7WUFDdEMsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLE1BQU0sS0FBSyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZDO1lBQ0QsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQyxFQUNELEVBQUUsQ0FDSCxDQUFDO1FBQ0YsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFakUsT0FBTyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUdELFNBQVMsZ0JBQWdCLENBQUMsTUFBVyxFQUFFLEtBQVU7UUFDL0MsT0FBTyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFHRCxTQUFTLGlCQUFpQixDQUFDLFFBQWUsRUFBRSxLQUFVO1FBQ3BELE1BQU0sS0FBSyxHQUFVLEVBQUUsQ0FBQztRQUN4QixNQUFNLE9BQU8sR0FBVSxFQUFFLENBQUM7UUFFMUIsS0FBSyxNQUFNLE1BQU0sSUFBSSxRQUFRLEVBQUU7WUFDN0IsTUFBTSxFQUFFLEdBQUcscUJBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDM0MsSUFBSSxFQUFFLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUN2QztpQkFBTTtnQkFDTCxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3BCO1NBQ0Y7UUFFRCxNQUFNLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3RCxNQUFNLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFdEQsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLGdCQUFnQixLQUFLLHlCQUFTLENBQUMsSUFBSTtnQkFDdEMsa0JBQWtCLEtBQUsseUJBQVMsQ0FBQyxJQUFJO2dCQUNyQyxPQUFPLHlCQUFTLENBQUMsSUFBSSxDQUFDO1lBQ3hCLEtBQUssZ0JBQWdCLEtBQUsseUJBQVMsQ0FBQyxJQUFJO2dCQUN0QyxrQkFBa0IsS0FBSyx5QkFBUyxDQUFDLElBQUk7Z0JBQ3JDLE9BQU8seUJBQVMsQ0FBQyxJQUFJLENBQUM7WUFDeEI7Z0JBQ0UsT0FBTyx5QkFBUyxDQUFDLFlBQVksQ0FBQztTQUNqQztJQUNILENBQUM7SUFFRCxPQUFPO1FBQ0wsU0FBUztRQUNULE1BQU0sRUFBRSxtQ0FBbUIsQ0FBQyxhQUFhLENBQUM7UUFDMUMsT0FBTyxFQUFFLG1DQUFtQixDQUFDLGNBQWMsQ0FBQztRQUM1QyxNQUFNLEVBQUUsbUNBQW1CLENBQUMsYUFBYSxDQUFDO1FBQzFDLFNBQVMsRUFBRSxtQ0FBbUIsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRCxVQUFVLEVBQUUsbUNBQW1CLENBQUMsaUJBQWlCLENBQUM7UUFDbEQsU0FBUyxFQUFFLG1DQUFtQixDQUFDLGdCQUFnQixDQUFDO1FBQ2hELFVBQVUsRUFBRSxtQ0FBbUIsQ0FBQyxpQkFBaUIsQ0FBQztRQUNsRCxTQUFTLEVBQUUsbUNBQW1CLENBQUMsZ0JBQWdCLENBQUM7UUFDaEQsVUFBVSxFQUFFLG1DQUFtQixDQUFDLGlCQUFpQixDQUFDO1FBQ2xELEdBQUcsRUFBRSxtQ0FBbUIsQ0FBQyxVQUFVLENBQUM7S0FDckMsQ0FBQztBQUNKLENBQUM7QUFyTUQsZ0VBcU1DIn0=