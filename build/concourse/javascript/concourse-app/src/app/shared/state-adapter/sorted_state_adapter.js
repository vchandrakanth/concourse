"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_adapter_1 = require("./state_adapter");
const unsorted_state_adapter_1 = require("./unsorted_state_adapter");
const utils_1 = require("./utils");
function createSortedStateAdapter(selectId, sort) {
    const { removeOne, removeMany, removeAll } = unsorted_state_adapter_1.createUnsortedStateAdapter(selectId);
    function addOneMutably(entity, state) {
        return addManyMutably([entity], state);
    }
    function addManyMutably(newModels, state) {
        const models = newModels.filter(model => !(utils_1.selectIdValue(model, selectId) in state.entities));
        if (models.length === 0) {
            return state_adapter_1.DidMutate.None;
        }
        else {
            merge(models, state);
            return state_adapter_1.DidMutate.Both;
        }
    }
    function addAllMutably(models, state) {
        state.entities = {};
        state.ids = [];
        addManyMutably(models, state);
        return state_adapter_1.DidMutate.Both;
    }
    function updateOneMutably(update, state) {
        return updateManyMutably([update], state);
    }
    function takeUpdatedModel(models, update, state) {
        if (!(update.id in state.entities)) {
            return false;
        }
        const original = state.entities[update.id];
        // const updated = Object.assign({}, original, update.changes);
        const updated = Object.assign(Object.create(Object.getPrototypeOf(original)), original, update.changes);
        const newKey = utils_1.selectIdValue(updated, selectId);
        delete state.entities[update.id];
        models.push(updated);
        return newKey !== update.id;
    }
    function updateManyMutably(updates, state) {
        const models = [];
        const didMutateIds = updates.filter(update => takeUpdatedModel(models, update, state)).length >
            0;
        if (models.length === 0) {
            return state_adapter_1.DidMutate.None;
        }
        else {
            const originalIds = state.ids;
            const updatedIndexes = [];
            state.ids = state.ids.filter((id, index) => {
                if (id in state.entities) {
                    return true;
                }
                else {
                    updatedIndexes.push(index);
                    return false;
                }
            });
            merge(models, state);
            if (!didMutateIds &&
                updatedIndexes.every((i) => state.ids[i] === originalIds[i])) {
                return state_adapter_1.DidMutate.EntitiesOnly;
            }
            else {
                return state_adapter_1.DidMutate.Both;
            }
        }
    }
    function mapMutably(updatesOrMap, state) {
        const updates = state.ids.reduce((changes, id) => {
            const change = updatesOrMap(state.entities[id]);
            if (change !== state.entities[id]) {
                changes.push({ id, changes: change });
            }
            return changes;
        }, []);
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
    function merge(models, state) {
        models.sort(sort);
        const ids = [];
        let i = 0;
        let j = 0;
        while (i < models.length && j < state.ids.length) {
            const model = models[i];
            const modelId = utils_1.selectIdValue(model, selectId);
            const entityId = state.ids[j];
            const entity = state.entities[entityId];
            if (sort(model, entity) <= 0) {
                ids.push(modelId);
                i++;
            }
            else {
                ids.push(entityId);
                j++;
            }
        }
        if (i < models.length) {
            state.ids = ids.concat(models.slice(i).map(selectId));
        }
        else {
            state.ids = ids.concat(state.ids.slice(j));
        }
        models.forEach((model, i) => {
            state.entities[selectId(model)] = model;
        });
    }
    return {
        removeOne,
        removeMany,
        removeAll,
        addOne: state_adapter_1.createStateOperator(addOneMutably),
        updateOne: state_adapter_1.createStateOperator(updateOneMutably),
        upsertOne: state_adapter_1.createStateOperator(upsertOneMutably),
        addAll: state_adapter_1.createStateOperator(addAllMutably),
        addMany: state_adapter_1.createStateOperator(addManyMutably),
        updateMany: state_adapter_1.createStateOperator(updateManyMutably),
        upsertMany: state_adapter_1.createStateOperator(upsertManyMutably),
        map: state_adapter_1.createStateOperator(mapMutably)
    };
}
exports.createSortedStateAdapter = createSortedStateAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVkX3N0YXRlX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3N0YXRlLWFkYXB0ZXIvc29ydGVkX3N0YXRlX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSxtREFBaUU7QUFDakUscUVBQXNFO0FBQ3RFLG1DQUF3QztBQU14QyxTQUFnQix3QkFBd0IsQ0FBSSxRQUFhLEVBQUUsSUFBUztJQUdsRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsR0FBRyxtREFBMEIsQ0FDckUsUUFBUSxDQUNULENBQUM7SUFHRixTQUFTLGFBQWEsQ0FBQyxNQUFXLEVBQUUsS0FBVTtRQUM1QyxPQUFPLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFHRCxTQUFTLGNBQWMsQ0FBQyxTQUFnQixFQUFFLEtBQVU7UUFDbEQsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMscUJBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUM3RCxDQUFDO1FBRUYsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN2QixPQUFPLHlCQUFTLENBQUMsSUFBSSxDQUFDO1NBQ3ZCO2FBQU07WUFDTCxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLE9BQU8seUJBQVMsQ0FBQyxJQUFJLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBR0QsU0FBUyxhQUFhLENBQUMsTUFBYSxFQUFFLEtBQVU7UUFDOUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFZixjQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTlCLE9BQU8seUJBQVMsQ0FBQyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUdELFNBQVMsZ0JBQWdCLENBQUMsTUFBVyxFQUFFLEtBQVU7UUFDL0MsT0FBTyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFHRCxTQUFTLGdCQUFnQixDQUFDLE1BQWEsRUFBRSxNQUFXLEVBQUUsS0FBVTtRQUM5RCxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsQyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsK0RBQStEO1FBQy9ELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUM5QyxRQUFRLEVBQ1IsTUFBTSxDQUFDLE9BQU8sQ0FDZixDQUFDO1FBQ0YsTUFBTSxNQUFNLEdBQUcscUJBQWEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFaEQsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVqQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJCLE9BQU8sTUFBTSxLQUFLLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUdELFNBQVMsaUJBQWlCLENBQUMsT0FBYyxFQUFFLEtBQVU7UUFDbkQsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO1FBRXZCLE1BQU0sWUFBWSxHQUNoQixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDeEUsQ0FBQyxDQUFDO1FBRUosSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN2QixPQUFPLHlCQUFTLENBQUMsSUFBSSxDQUFDO1NBQ3ZCO2FBQU07WUFDTCxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQzlCLE1BQU0sY0FBYyxHQUFVLEVBQUUsQ0FBQztZQUNqQyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBTyxFQUFFLEtBQWEsRUFBRSxFQUFFO2dCQUN0RCxJQUFJLEVBQUUsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO29CQUN4QixPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTTtvQkFDTCxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMzQixPQUFPLEtBQUssQ0FBQztpQkFDZDtZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVyQixJQUNFLENBQUMsWUFBWTtnQkFDYixjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNwRTtnQkFDQSxPQUFPLHlCQUFTLENBQUMsWUFBWSxDQUFDO2FBQy9CO2lCQUFNO2dCQUNMLE9BQU8seUJBQVMsQ0FBQyxJQUFJLENBQUM7YUFDdkI7U0FDRjtJQUNILENBQUM7SUFHRCxTQUFTLFVBQVUsQ0FBQyxZQUFpQixFQUFFLEtBQVU7UUFDL0MsTUFBTSxPQUFPLEdBQWdCLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUMzQyxDQUFDLE9BQWMsRUFBRSxFQUFtQixFQUFFLEVBQUU7WUFDdEMsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoRCxJQUFJLE1BQU0sS0FBSyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZDO1lBQ0QsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQyxFQUNELEVBQUUsQ0FDSCxDQUFDO1FBRUYsT0FBTyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUdELFNBQVMsZ0JBQWdCLENBQUMsTUFBVyxFQUFFLEtBQVU7UUFDL0MsT0FBTyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFHRCxTQUFTLGlCQUFpQixDQUFDLFFBQWUsRUFBRSxLQUFVO1FBQ3BELE1BQU0sS0FBSyxHQUFVLEVBQUUsQ0FBQztRQUN4QixNQUFNLE9BQU8sR0FBVSxFQUFFLENBQUM7UUFFMUIsS0FBSyxNQUFNLE1BQU0sSUFBSSxRQUFRLEVBQUU7WUFDN0IsTUFBTSxFQUFFLEdBQUcscUJBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDM0MsSUFBSSxFQUFFLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUN2QztpQkFBTTtnQkFDTCxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3BCO1NBQ0Y7UUFFRCxNQUFNLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3RCxNQUFNLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFdEQsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLGdCQUFnQixLQUFLLHlCQUFTLENBQUMsSUFBSTtnQkFDdEMsa0JBQWtCLEtBQUsseUJBQVMsQ0FBQyxJQUFJO2dCQUNyQyxPQUFPLHlCQUFTLENBQUMsSUFBSSxDQUFDO1lBQ3hCLEtBQUssZ0JBQWdCLEtBQUsseUJBQVMsQ0FBQyxJQUFJO2dCQUN0QyxrQkFBa0IsS0FBSyx5QkFBUyxDQUFDLElBQUk7Z0JBQ3JDLE9BQU8seUJBQVMsQ0FBQyxJQUFJLENBQUM7WUFDeEI7Z0JBQ0UsT0FBTyx5QkFBUyxDQUFDLFlBQVksQ0FBQztTQUNqQztJQUNILENBQUM7SUFHRCxTQUFTLEtBQUssQ0FBQyxNQUFhLEVBQUUsS0FBVTtRQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLE1BQU0sR0FBRyxHQUFVLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFVixPQUFPLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUNoRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxPQUFPLEdBQUcscUJBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDL0MsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXhDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzVCLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsRUFBRSxDQUFDO2FBQ0w7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbkIsQ0FBQyxFQUFFLENBQUM7YUFDTDtTQUNGO1FBRUQsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNyQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUN2RDthQUFNO1lBQ0wsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUM7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU87UUFDTCxTQUFTO1FBQ1QsVUFBVTtRQUNWLFNBQVM7UUFDVCxNQUFNLEVBQUUsbUNBQW1CLENBQUMsYUFBYSxDQUFDO1FBQzFDLFNBQVMsRUFBRSxtQ0FBbUIsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRCxTQUFTLEVBQUUsbUNBQW1CLENBQUMsZ0JBQWdCLENBQUM7UUFDaEQsTUFBTSxFQUFFLG1DQUFtQixDQUFDLGFBQWEsQ0FBQztRQUMxQyxPQUFPLEVBQUUsbUNBQW1CLENBQUMsY0FBYyxDQUFDO1FBQzVDLFVBQVUsRUFBRSxtQ0FBbUIsQ0FBQyxpQkFBaUIsQ0FBQztRQUNsRCxVQUFVLEVBQUUsbUNBQW1CLENBQUMsaUJBQWlCLENBQUM7UUFDbEQsR0FBRyxFQUFFLG1DQUFtQixDQUFDLFVBQVUsQ0FBQztLQUNyQyxDQUFDO0FBQ0osQ0FBQztBQXBNRCw0REFvTUMifQ==