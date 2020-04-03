"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const surfaceLayerFaker = require("../services/surface-layer.faker");
const surface_layer_actions_1 = require("./surface-layer.actions");
const surface_layer_reducer_1 = require("./surface-layer.reducer");
describe('SurfaceLayer Reducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = {};
            const result = surface_layer_reducer_1.reducer(surface_layer_reducer_1.initialState, action);
            expect(result).toBe(surface_layer_reducer_1.initialState);
        });
    });
    describe('LoadSurfaceLayers Actions', () => {
        describe('LoadSurfaceLayers', () => {
            it('should set loading to true', () => {
                const action = {
                    type: surface_layer_actions_1.SurfaceLayerActionTypes.LoadSurfaceLayers
                };
                const result = surface_layer_reducer_1.reducer(surface_layer_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('LoadSurfaceLayersSuccess', () => {
            const surfaceLayers = surfaceLayerFaker.fakeMany(2);
            const action = {
                type: surface_layer_actions_1.SurfaceLayerActionTypes.LoadSurfaceLayersSuccess,
                payload: surfaceLayers
            };
            const entities = surfaceLayers.reduce((acc, surfaceLayer) => {
                acc[surfaceLayer.id] = surfaceLayer;
                acc[surfaceLayer.id].isCollapsed = false;
                return acc;
            }, {});
            const ids = [...surfaceLayers.map(o => o.id)];
            const result = surface_layer_reducer_1.reducer(surface_layer_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to true', () => {
                expect(result.loaded).toBe(true);
            });
            it('should have two entities', () => {
                expect(Object.keys(result.entities).length).toBe(2);
                expect(result.entities).toEqual(entities);
            });
            it('should have two ids', () => {
                expect(result.ids.length).toBe(2);
                expect(result.ids).toEqual(ids);
            });
        });
        describe('LoadSurfaceLayersFailure', () => {
            const action = new surface_layer_actions_1.LoadSurfaceLayersFailure();
            const result = surface_layer_reducer_1.reducer(surface_layer_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to false', () => {
                expect(result.loaded).toBe(false);
            });
        });
    });
    describe('AddSurfaceLayer Actions', () => {
        describe('AddSurfaceLayer', () => {
            it('should set loading to true', () => {
                const action = {
                    type: surface_layer_actions_1.SurfaceLayerActionTypes.LoadSurfaceLayers
                };
                const result = surface_layer_reducer_1.reducer(surface_layer_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('AddSurfaceLayerSuccess', () => {
            const surfaceLayer = surfaceLayerFaker.fakeOne();
            surfaceLayer.isCollapsed = false;
            const action = {
                type: surface_layer_actions_1.SurfaceLayerActionTypes.AddSurfaceLayerSuccess,
                payload: surfaceLayer
            };
            const result = surface_layer_reducer_1.reducer(surface_layer_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should have one entity', () => {
                expect(Object.keys(result.entities).length).toBe(1);
                expect(result.entities[surfaceLayer.id]).toEqual(surfaceLayer);
            });
            it('should have one ID', () => {
                expect(result.ids.length).toBe(1);
                expect(result.ids[0]).toBe(surfaceLayer.id);
            });
        });
        describe('AddSurfaceLayerFailure', () => {
            const action = new surface_layer_actions_1.LoadSurfaceLayersFailure();
            const result = surface_layer_reducer_1.reducer(surface_layer_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to false', () => {
                expect(result.loaded).toBe(false);
            });
        });
    });
    describe('SelectSurfaceLayer', () => {
        const action = {
            type: surface_layer_actions_1.SurfaceLayerActionTypes.SelectSurfaceLayer,
            payload: 1001
        };
        const result = surface_layer_reducer_1.reducer(surface_layer_reducer_1.initialState, action);
        it('should set id to selected surfaceLayer id', () => {
            expect(result.selectedSurfaceLayer).toEqual(1001);
        });
    });
    describe('ToggleCollapsedSurfaceLayer', () => {
        const surfaceLayers = surfaceLayerFaker.fakeMany(5);
        const previousAction = {
            type: surface_layer_actions_1.SurfaceLayerActionTypes.LoadSurfaceLayersSuccess,
            payload: surfaceLayers
        };
        const previousState = surface_layer_reducer_1.reducer(surface_layer_reducer_1.initialState, previousAction);
        const toggleId = surfaceLayers[0].id;
        const action = {
            type: surface_layer_actions_1.SurfaceLayerActionTypes.ToggleCollapsedSurfaceLayer,
            payload: toggleId
        };
        const result = surface_layer_reducer_1.reducer(previousState, action);
        it('should have toggled isCollapsed property for selected surfaceLayer', () => {
            expect(result.entities[toggleId].isCollapsed).toBe(!surfaceLayers[0].isCollapsed);
        });
    });
    describe('UpdateSurfaceLayer', () => {
        describe('UpdateSurfaceLayer', () => {
            it('should set loading to true', () => {
                const surfaceLayer = surfaceLayerFaker.fakeOne();
                const action = {
                    type: surface_layer_actions_1.SurfaceLayerActionTypes.UpdateSurfaceLayer,
                    payload: surfaceLayer
                };
                const result = surface_layer_reducer_1.reducer(surface_layer_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('UpdateSurfaceLayerSuccess', () => {
            const surfaceLayers = surfaceLayerFaker.fakeMany(3);
            const originalSurfaceLayer = surfaceLayers[0];
            const updatedSurfaceLayer = Object.assign(Object.assign({}, surfaceLayers[0]), { name: `${surfaceLayers[0].name} Updated` });
            const previousAction = new surface_layer_actions_1.LoadSurfaceLayersSuccess(surfaceLayers);
            const previousState = surface_layer_reducer_1.reducer(surface_layer_reducer_1.initialState, previousAction);
            const action = new surface_layer_actions_1.UpdateSurfaceLayerSuccess(updatedSurfaceLayer);
            const result = surface_layer_reducer_1.reducer(previousState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should have same # of entities', () => {
                expect(Object.keys(result.entities).length).toBe(surfaceLayers.length);
            });
            it('should have same # of ids', () => {
                expect(Object.keys(result.ids).length).toBe(surfaceLayers.length);
            });
            it('should title edited in updated surfaceLayer', () => {
                expect(result.entities[updatedSurfaceLayer.id].name).toBe(updatedSurfaceLayer.name);
            });
            it('should not have modified other fields', () => {
                expect(result.entities[updatedSurfaceLayer.id].description).toBe(originalSurfaceLayer.description);
                expect(result.entities[updatedSurfaceLayer.id].parent).toBe(originalSurfaceLayer.parent);
                expect(result.entities[updatedSurfaceLayer.id].children).toBe(originalSurfaceLayer.children);
                expect(result.entities[updatedSurfaceLayer.id].isRoot).toBe(originalSurfaceLayer.isRoot);
            });
        });
        describe('UpdateSurfaceLayerFailure', () => {
            const action = new surface_layer_actions_1.UpdateSurfaceLayerFailure();
            const result = surface_layer_reducer_1.reducer(surface_layer_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to false', () => {
                expect(result.loaded).toBe(false);
            });
        });
    });
    describe('RemoveSurfaceLayer Actions', () => {
        describe('RemoveSurfaceLayer', () => {
            it('should set loading to true', () => {
                const action = {
                    type: surface_layer_actions_1.SurfaceLayerActionTypes.LoadSurfaceLayers
                };
                const result = surface_layer_reducer_1.reducer(surface_layer_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('RemoveSurfaceLayerSuccess', () => {
            const surfaceLayers = surfaceLayerFaker.fakeMany(3);
            const removedSurfaceLayer = surfaceLayers[2];
            const previousAction = {
                type: surface_layer_actions_1.SurfaceLayerActionTypes.LoadSurfaceLayersSuccess,
                payload: surfaceLayers
            };
            const previousState = surface_layer_reducer_1.reducer(surface_layer_reducer_1.initialState, previousAction);
            const action = {
                type: surface_layer_actions_1.SurfaceLayerActionTypes.RemoveSurfaceLayerSuccess,
                payload: removedSurfaceLayer
            };
            const result = surface_layer_reducer_1.reducer(previousState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should have 1 less entity after removal', () => {
                expect(Object.keys(result.entities).length).toEqual(surfaceLayers.length - 1);
            });
            it('should have 1 less id after removal', () => {
                expect(result.ids.length).toEqual(surfaceLayers.length - 1);
            });
            it('should have deleted entity removed from entities object', () => {
                const hasEntity = Object.keys(result.entities).includes(`${removedSurfaceLayer.id}`);
                expect(hasEntity).toBeFalsy();
            });
            it('should have id removed from ids index/array', () => {
                const hasId = result.ids.includes(removedSurfaceLayer.id);
                expect(hasId).toBeFalsy();
            });
        });
        describe('RemoveSurfaceLayerFailure', () => {
            const action = new surface_layer_actions_1.RemoveSurfaceLayerFailure();
            const result = surface_layer_reducer_1.reducer(surface_layer_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to false', () => {
                expect(result.loaded).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS1sYXllci5yZWR1Y2VyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvc3VyZmFjZS1sYXllci9zdGF0ZS9zdXJmYWNlLWxheWVyLnJlZHVjZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFFQUFxRTtBQUNyRSxtRUFhaUM7QUFDakMsbUVBQWdFO0FBRWhFLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtRQUM5QixFQUFFLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxFQUFFO1lBQ3pDLE1BQU0sTUFBTSxHQUFHLEVBQVMsQ0FBQztZQUV6QixNQUFNLE1BQU0sR0FBRywrQkFBTyxDQUFDLG9DQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxvQ0FBWSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7UUFDekMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtZQUNqQyxFQUFFLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO2dCQUNwQyxNQUFNLE1BQU0sR0FBc0I7b0JBQ2hDLElBQUksRUFBRSwrQ0FBdUIsQ0FBQyxpQkFBaUI7aUJBQ2hELENBQUM7Z0JBRUYsTUFBTSxNQUFNLEdBQUcsK0JBQU8sQ0FBQyxvQ0FBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUU3QyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FB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