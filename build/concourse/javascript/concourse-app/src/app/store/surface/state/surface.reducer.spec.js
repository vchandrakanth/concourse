"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const surfaceFaker = require("../services/surface.faker");
const surface_actions_1 = require("./surface.actions");
const surface_reducer_1 = require("./surface.reducer");
describe('Surface Reducer', () => {
    it('should return the initial state', () => {
        const action = {};
        const result = surface_reducer_1.reducer(surface_reducer_1.initialState, action);
        expect(result).toBe(surface_reducer_1.initialState);
    });
    describe('Load Surfaces Actions', () => {
        describe('Load Surfaces', () => {
            it('should be loading to true', () => {
                const action = {
                    type: surface_actions_1.SurfaceActionTypes.LoadSurfaces
                };
                const result = surface_reducer_1.reducer(surface_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
    });
    describe('Load Surfaces Success', () => {
        const surfaces = surfaceFaker.fakeMany();
        const action = new surface_actions_1.LoadSurfacesSuccess(surfaces);
        const result = surface_reducer_1.reducer(surface_reducer_1.initialState, action);
        const ids = [...surfaces.map(ct => ct.id)];
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to true', () => {
            expect(result.loaded).toBe(true);
        });
        it('should have two entities', () => {
            expect(Object.keys(result.entities).length).toBe(surfaces.length);
        });
        it('should have two ids', () => {
            expect(result.ids.length).toBe(ids.length);
        });
    });
    describe('Load Surfaces Failure', () => {
        const action = new surface_actions_1.LoadSurfacesFailure();
        const result = surface_reducer_1.reducer(surface_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should be set loaded to false', () => {
            expect(result.loaded).toBe(true);
        });
    });
    describe('LoadSurface Actions', () => {
        describe('LoadSurface', () => {
            it('should set loading to true', () => {
                const surface = surfaceFaker.fakeOne();
                const action = {
                    type: surface_actions_1.SurfaceActionTypes.LoadSurface,
                    payload: surface.id
                };
                const result = surface_reducer_1.reducer(surface_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('LoadSurfaceSuccess', () => {
            const surface = surfaceFaker.fakeOne();
            const action = {
                type: surface_actions_1.SurfaceActionTypes.LoadSurfaceSuccess,
                payload: surface
            };
            const entities = {
                [surface.id]: surface
            };
            const ids = [surface.id];
            const result = surface_reducer_1.reducer(surface_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to false', () => {
                expect(result.loaded).toBe(true);
            });
            it('should have one entity', () => {
                expect(Object.keys(result.entities).length).toBe(ids.length);
                expect(result.entities).toEqual(entities);
            });
            it('should have one id', () => {
                expect(result.ids.length).toBe(ids.length);
                expect(result.ids[0]).toBe(surface.id);
            });
        });
        describe('LoadSurfaceFailure', () => {
            const action = new surface_actions_1.LoadSurfaceFailure();
            const result = surface_reducer_1.reducer(surface_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
        });
    });
    describe('CreateSurface Actions', () => {
        describe('CreateSurface', () => {
            it('should set loading to true', () => {
                const surface = surfaceFaker.fakeOne();
                const action = {
                    type: surface_actions_1.SurfaceActionTypes.CreateSurface,
                    payload: surface
                };
                const result = surface_reducer_1.reducer(surface_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('CreateSurfaceSuccess', () => {
            const surface = surfaceFaker.fakeOne();
            const action = {
                type: surface_actions_1.SurfaceActionTypes.CreateSurfaceSuccess,
                payload: surface
            };
            const entities = {
                [surface.id]: surface
            };
            const ids = [surface.id];
            const result = surface_reducer_1.reducer(surface_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should have one entity', () => {
                expect(Object.keys(result.entities).length).toBe(ids.length);
                expect(result.entities).toEqual(entities);
            });
            it('should have one id', () => {
                expect(result.ids.length).toBe(ids.length);
                expect(result.ids[0]).toBe(surface.id);
            });
        });
        describe('CreateSurfaceFailure', () => {
            const action = new surface_actions_1.CreateSurfaceFailure();
            const result = surface_reducer_1.reducer(surface_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
        });
    });
    describe('UpdateSurface Actions', () => {
        describe('UpdateSurface', () => {
            it('should set loading to true', () => {
                const surface = surfaceFaker.fakeOne();
                const action = {
                    type: surface_actions_1.SurfaceActionTypes.UpdateSurface,
                    payload: surface
                };
                const result = surface_reducer_1.reducer(surface_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('UpdateSurfaceSuccess', () => {
            const surface = surfaceFaker.fakeOne();
            const previousAction = new surface_actions_1.LoadSurfacesSuccess([surface]);
            const previousState = surface_reducer_1.reducer(surface_reducer_1.initialState, previousAction);
            const newSurface = Object.assign(Object.assign({}, surface), { name: 'Updated Name' });
            const action = new surface_actions_1.UpdateSurfaceSuccess(newSurface);
            const result = surface_reducer_1.reducer(previousState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should have same Surface IDS as previousState', () => {
                expect(result.ids).toBe(result.ids);
                expect(result.ids.length).toBe(result.ids.length);
            });
            it('should have updated name in updated Surface entity', () => {
                expect(result.entities[surface.id].name).toBe('Updated Name');
            });
            it('should not have other fields touched', () => {
                expect(result.entities[surface.id].description).toBe(surface.description);
                expect(result.entities[surface.id].institutionId).toBe(surface.institutionId);
            });
        });
        describe('UpdateSurfaceFailure', () => {
            const action = new surface_actions_1.UpdateSurfaceFailure();
            const result = surface_reducer_1.reducer(surface_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
        });
    });
    describe('DeleteSurface Actions', () => {
        const surface = surfaceFaker.fakeOne();
        describe('DeleteSurface', () => {
            it('should set loading to true', () => {
                const action = {
                    type: surface_actions_1.SurfaceActionTypes.DeleteSurface,
                    payload: surface.id
                };
                const result = surface_reducer_1.reducer(surface_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('DeleteSurfaceSuccess', () => {
            const action = {
                type: surface_actions_1.SurfaceActionTypes.DeleteSurfaceSuccess,
                payload: surface.id
            };
            const previousState = surface_reducer_1.reducer(surface_reducer_1.initialState, new surface_actions_1.LoadSurfaceSuccess(surface));
            const result = surface_reducer_1.reducer(previousState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should have Surface removed from ids', () => {
                const found = result.ids.includes(surface.id);
                expect(found).toBe(false);
            });
            it('should have Surface removed from entities', () => {
                const found = result.entities[surface.id];
                expect(found).toBeFalsy();
            });
        });
        describe('DeleteSurfaceFailure', () => {
            const action = new surface_actions_1.DeleteSurfaceFailure();
            const previousState = surface_reducer_1.reducer(surface_reducer_1.initialState, new surface_actions_1.LoadSurfaceSuccess(surface));
            const result = surface_reducer_1.reducer(previousState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should have ids untouched', () => {
                expect(result.ids).toBe(previousState.ids);
            });
            it('should have entities untouched', () => {
                expect(result.entities).toBe(previousState.entities);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS5yZWR1Y2VyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvc3VyZmFjZS9zdGF0ZS9zdXJmYWNlLnJlZHVjZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUEwRDtBQUMxRCx1REFpQjJCO0FBQzNCLHVEQUEwRDtBQUUxRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFO0lBQy9CLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7UUFDekMsTUFBTSxNQUFNLEdBQUcsRUFBUyxDQUFDO1FBRXpCLE1BQU0sTUFBTSxHQUFHLHlCQUFPLENBQUMsOEJBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU3QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLDhCQUFZLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLEVBQUU7UUFDckMsUUFBUSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7WUFDN0IsRUFBRSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtnQkFFbkMsTUFBTSxNQUFNLEdBQWlCO29CQUMzQixJQUFJLEVBQUUsb0NBQWtCLENBQUMsWUFBWTtpQkFDdEMsQ0FBQztnQkFDRixNQUFNLE1BQU0sR0FBRyx5QkFBTyxDQUFDLDhCQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLEVBQUU7UUFDckMsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sTUFBTSxHQUFHLElBQUkscUNBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFakQsTUFBTSxNQUFNLEdBQUcseUJBQU8sQ0FBQyw4QkFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTdDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFM0MsRUFBRSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtZQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7WUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxFQUFFO1lBQ2xDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtZQUM3QixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxFQUFFO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLElBQUkscUNBQW1CLEVBQUUsQ0FBQztRQUV6QyxNQUFNLE1BQU0sR0FBRyx5QkFBTyxDQUFDLDhCQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFN0MsRUFBRSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtZQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7WUFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7UUFDbkMsUUFBUSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7WUFDM0IsRUFBRSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRTtnQkFDcEMsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN2QyxNQUFNLE1BQU0sR0FBZ0I7b0JBQzFCLElBQUksRUFBRSxvQ0FBa0IsQ0FBQyxXQUFXO29CQUNwQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQUU7aUJBQ3BCLENBQUM7Z0JBRUYsTUFBTSxNQUFNLEdBQUcseUJBQU8sQ0FBQyw4QkFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUU3QyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtZQUNsQyxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkMsTUFBTSxNQUFNLEdBQXVCO2dCQUNqQyxJQUFJLEVBQUUsb0NBQWtCLENBQUMsa0JBQWtCO2dCQUMzQyxPQUFPLEVBQUUsT0FBTzthQUNqQixDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUc7Z0JBQ2YsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTzthQUN0QixDQUFDO1lBQ0YsTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFekIsTUFBTSxNQUFNLEdBQUcseUJBQU8sQ0FBQyw4QkFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRTdDLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7Z0JBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRTtnQkFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO2dCQUNoQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDN0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO2dCQUM1QixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7WUFDbEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxvQ0FBa0IsRUFBRSxDQUFDO1lBRXhDLE1BQU0sTUFBTSxHQUFHLHlCQUFPLENBQUMsOEJBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU3QyxFQUFFLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFO2dCQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxFQUFFO1FBQ3JDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1lBQzdCLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7Z0JBQ3BDLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDdkMsTUFBTSxNQUFNLEdBQWtCO29CQUM1QixJQUFJLEVBQUUsb0NBQWtCLENBQUMsYUFBYTtvQkFDdEMsT0FBTyxFQUFFLE9BQU87aUJBQ2pCLENBQUM7Z0JBRUYsTUFBTSxNQUFNLEdBQUcseUJBQU8sQ0FBQyw4QkFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUU3QyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBRTtZQUNwQyxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkMsTUFBTSxNQUFNLEdBQXlCO2dCQUNuQyxJQUFJLEVBQUUsb0NBQWtCLENBQUMsb0JBQW9CO2dCQUM3QyxPQUFPLEVBQUUsT0FBTzthQUNqQixDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUc7Z0JBQ2YsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTzthQUN0QixDQUFDO1lBQ0YsTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFekIsTUFBTSxNQUFNLEdBQUcseUJBQU8sQ0FBQyw4QkFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRTdDLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7Z0JBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtnQkFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzdELE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtnQkFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO1lBQ3BDLE1BQU0sTUFBTSxHQUFHLElBQUksc0NBQW9CLEVBQUUsQ0FBQztZQUUxQyxNQUFNLE1BQU0sR0FBRyx5QkFBTyxDQUFDLDhCQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFN0MsRUFBRSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtnQkFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLHVCQUF1QixFQUFFLEdBQUcsRUFBRTtRQUNyQyxRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtZQUM3QixFQUFFLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO2dCQUNwQyxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3ZDLE1BQU0sTUFBTSxHQUFrQjtvQkFDNUIsSUFBSSxFQUFFLG9DQUFrQixDQUFDLGFBQWE7b0JBQ3RDLE9BQU8sRUFBRSxPQUFPO2lCQUNqQixDQUFDO2dCQUVGLE1BQU0sTUFBTSxHQUFHLHlCQUFPLENBQUMsOEJBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFFN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7WUFDcEMsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sY0FBYyxHQUFHLElBQUkscUNBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzFELE1BQU0sYUFBYSxHQUFHLHlCQUFPLENBQUMsOEJBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztZQUU1RCxNQUFNLFVBQVUsbUNBQ1gsT0FBTyxLQUNWLElBQUksRUFBRSxjQUFjLEdBQ3JCLENBQUM7WUFDRixNQUFNLE1BQU0sR0FBRyxJQUFJLHNDQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sTUFBTSxHQUFHLHlCQUFPLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRTlDLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7Z0JBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLCtDQUErQyxFQUFFLEdBQUcsRUFBRTtnQkFDdkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxvREFBb0QsRUFBRSxHQUFHLEVBQUU7Z0JBQzVELE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDaEUsQ0FBQyxDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsc0NBQXNDLEVBQUUsR0FBRyxFQUFFO2dCQUM5QyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDMUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDaEYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7WUFDcEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxzQ0FBb0IsRUFBRSxDQUFDO1lBRTFDLE1BQU0sTUFBTSxHQUFHLHlCQUFPLENBQUMsOEJBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU3QyxFQUFFLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFO2dCQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxFQUFFO1FBQ3JDLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUV2QyxRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtZQUM3QixFQUFFLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO2dCQUNwQyxNQUFNLE1BQU0sR0FBa0I7b0JBQzVCLElBQUksRUFBRSxvQ0FBa0IsQ0FBQyxhQUFhO29CQUN0QyxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQUU7aUJBQ3BCLENBQUM7Z0JBRUYsTUFBTSxNQUFNLEdBQUcseUJBQU8sQ0FBQyw4QkFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUU3QyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBRTtZQUNwQyxNQUFNLE1BQU0sR0FBeUI7Z0JBQ25DLElBQUksRUFBRSxvQ0FBa0IsQ0FBQyxvQkFBb0I7Z0JBQzdDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRTthQUNwQixDQUFDO1lBRUYsTUFBTSxhQUFhLEdBQUcseUJBQU8sQ0FBQyw4QkFBWSxFQUFFLElBQUksb0NBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM3RSxNQUFNLE1BQU0sR0FBRyx5QkFBTyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU5QyxFQUFFLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFO2dCQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRSxHQUFHLEVBQUU7Z0JBQzlDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQywyQ0FBMkMsRUFBRSxHQUFHLEVBQUU7Z0JBQ25ELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMxQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7WUFDcEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxzQ0FBb0IsRUFBRSxDQUFDO1lBRTFDLE1BQU0sYUFBYSxHQUFHLHlCQUFPLENBQUMsOEJBQVksRUFBRSxJQUFJLG9DQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0UsTUFBTSxNQUFNLEdBQUcseUJBQU8sQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFOUMsRUFBRSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtnQkFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO2dCQUNuQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsZ0NBQWdDLEVBQUUsR0FBRyxFQUFFO2dCQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==