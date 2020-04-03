"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_state_1 = require("./entity_state");
const sorted_state_adapter_1 = require("./sorted_state_adapter");
const state_selectors_1 = require("./state_selectors");
const unsorted_state_adapter_1 = require("./unsorted_state_adapter");
function createEntityAdapter(options = {}) {
    const { selectId, sortComparer } = Object.assign({ sortComparer: false, selectId: (instance) => instance.id }, options);
    const stateFactory = entity_state_1.createInitialStateFactory();
    const selectorsFactory = state_selectors_1.createSelectorsFactory();
    const stateAdapter = sortComparer
        ? sorted_state_adapter_1.createSortedStateAdapter(selectId, sortComparer)
        : unsorted_state_adapter_1.createUnsortedStateAdapter(selectId);
    return Object.assign(Object.assign(Object.assign({ selectId,
        sortComparer }, stateFactory), selectorsFactory), stateAdapter);
}
exports.createEntityAdapter = createEntityAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3N0YXRlLWFkYXB0ZXIvY3JlYXRlX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBMkQ7QUFPM0QsaUVBQWtFO0FBQ2xFLHVEQUEyRDtBQUMzRCxxRUFBc0U7QUFFdEUsU0FBZ0IsbUJBQW1CLENBQ2pDLFVBR0ksRUFBRTtJQUVOLE1BQU0sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLG1CQUM5QixZQUFZLEVBQUUsS0FBSyxFQUNuQixRQUFRLEVBQUUsQ0FBQyxRQUFhLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQ3JDLE9BQU8sQ0FDWCxDQUFDO0lBRUYsTUFBTSxZQUFZLEdBQUcsd0NBQXlCLEVBQUssQ0FBQztJQUNwRCxNQUFNLGdCQUFnQixHQUFHLHdDQUFzQixFQUFLLENBQUM7SUFDckQsTUFBTSxZQUFZLEdBQUcsWUFBWTtRQUMvQixDQUFDLENBQUMsK0NBQXdCLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQztRQUNsRCxDQUFDLENBQUMsbURBQTBCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFekMsbURBQ0UsUUFBUTtRQUNSLFlBQVksSUFDVCxZQUFZLEdBQ1osZ0JBQWdCLEdBQ2hCLFlBQVksRUFDZjtBQUNKLENBQUM7QUF6QkQsa0RBeUJDIn0=