"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@ngrx/effects/testing");
const jasmine_marbles_1 = require("jasmine-marbles");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const modal_1 = require("@concourse/core/modal");
const router_actions_1 = require("@concourse/core/router/router.actions");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const test_1 = require("@concourse/test");
const surfaceLayerFaker = require("../services/surface-layer.faker");
const surface_layer_service_1 = require("../services/surface-layer.service");
const surface_layer_actions_1 = require("./surface-layer.actions");
const surface_layer_effects_1 = require("./surface-layer.effects");
const surface_layer_facade_1 = require("./surface-layer.facade");
describe('SurfaceLayerEffects', () => {
    let actions;
    let effects;
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                surface_layer_effects_1.SurfaceLayerEffects,
                test_1.mockFacade(surface_layer_facade_1.SurfaceLayerFacade),
                {
                    provide: surface_layer_service_1.SurfaceLayerService,
                    useValue: {
                        list: jest.fn(),
                        create: jest.fn(),
                        remove: jest.fn(),
                        update: jest.fn()
                    }
                },
                testing_2.provideMockActions(() => actions)
            ]
        });
        effects = testing_1.TestBed.get(surface_layer_effects_1.SurfaceLayerEffects);
        service = testing_1.TestBed.get(surface_layer_service_1.SurfaceLayerService);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('loadSurfaceLayers', () => {
        it('should return a LoadSurfaceLayersSuccess, with an array of surfaceLayers, on success', () => {
            const surfaceLayers = surfaceLayerFaker.fakeMany(5);
            const action = new surface_layer_actions_1.LoadSurfaceLayers();
            const outcome = new surface_layer_actions_1.LoadSurfaceLayersSuccess(surfaceLayers);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: surfaceLayers });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.list = jest.fn(() => response);
            expect(effects.loadSurfaceLayers$).toBeObservable(expected);
        });
        it('should return a LoadSurfaceLayersFailure, with an error, on failure', () => {
            const action = new surface_layer_actions_1.LoadSurfaceLayers();
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const err = new surface_layer_actions_1.LoadSurfaceLayersFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.list = jest.fn(() => response);
            expect(effects.loadSurfaceLayers$).toBeObservable(expected);
        });
    });
    describe('addSurfaceLayer', () => {
        it('should return an AddSurfaceLayerSuccess, with an surfaceLayer, on success', () => {
            const surfaceLayer = surfaceLayerFaker.fakeOne();
            const partialsurfaceLayer = { name: surfaceLayer.name };
            const action = new surface_layer_actions_1.AddSurfaceLayer(partialsurfaceLayer);
            const outcome = new surface_layer_actions_1.AddSurfaceLayerSuccess(surfaceLayer);
            const closeModal = new modal_1.CloseModal();
            const toast = new toast_actions_1.OpenToast({ message: 'SurfaceLayer Created', type: 'success' });
            const routerRedirect = new router_actions_1.RouterGo({ path: [`surfaces/${surfaceLayer.id}`] });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: surfaceLayer });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: outcome, c: closeModal, d: toast, e: routerRedirect });
            service.create = jest.fn(() => response);
            expect(effects.addSurfaceLayer$).toBeObservable(expected);
        });
        it('should return an AddSurfaceLayerFailure, with an error, on failure', () => {
            const partialsurfaceLayer = { name: 'Test surfaceLayer' };
            const action = new surface_layer_actions_1.AddSurfaceLayer(partialsurfaceLayer);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const err = new surface_layer_actions_1.AddSurfaceLayerFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.create = jest.fn(() => response);
            expect(effects.addSurfaceLayer$).toBeObservable(expected);
        });
    });
    describe('updateSurfaceLayer', () => {
        it('should return an UpdateSurfaceLayerSuccess, with an surfaceLayer, on success', () => {
            const surfaceLayer = surfaceLayerFaker.fakeOne();
            const action = new surface_layer_actions_1.UpdateSurfaceLayer(surfaceLayer);
            const closeModal = new modal_1.CloseModal();
            const outcome = new surface_layer_actions_1.UpdateSurfaceLayerSuccess(surfaceLayer);
            const toast = new toast_actions_1.OpenToast({ message: 'SurfaceLayer Updated', type: 'success' });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a', { a: surfaceLayer });
            const expected = jasmine_marbles_1.cold('--(bcd)', { b: outcome, c: closeModal, d: toast });
            service.update = jest.fn(() => response);
            expect(effects.updateSurfaceLayer$).toBeObservable(expected);
        });
        it('should return an UpdateSurfaceLayerFailure, with an error, on failure', () => {
            const surfaceLayer = surfaceLayerFaker.fakeOne();
            const action = new surface_layer_actions_1.UpdateSurfaceLayer(surfaceLayer);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const err = new surface_layer_actions_1.UpdateSurfaceLayerFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.update = jest.fn(() => response);
            expect(effects.updateSurfaceLayer$).toBeObservable(expected);
        });
    });
    describe('removeSurfaceLayer', () => {
        it('should return a RemoveSurfaceLayerSuccess, with an id, on success', () => {
            const surfaceLayer = surfaceLayerFaker.fakeOne();
            const action = new surface_layer_actions_1.RemoveSurfaceLayer(surfaceLayer);
            const outcome = new surface_layer_actions_1.RemoveSurfaceLayerSuccess(surfaceLayer);
            const toast = new toast_actions_1.OpenToast({ message: 'SurfaceLayer Deleted', type: 'success' });
            const closeModal = new modal_1.CloseModal();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a', { a: surfaceLayer });
            const expected = jasmine_marbles_1.cold('--(bcd))', { b: outcome, c: toast, d: closeModal });
            service.remove = jest.fn(() => response);
            expect(effects.removeSurfaceLayer$).toBeObservable(expected);
        });
        it('should return a RemoveSurfaceLayerFailure, with an error, on failure', () => {
            const surfaceLayer = surfaceLayerFaker.fakeOne();
            const action = new surface_layer_actions_1.RemoveSurfaceLayer(surfaceLayer);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const err = new surface_layer_actions_1.RemoveSurfaceLayerFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.remove = jest.fn(() => response);
            expect(effects.removeSurfaceLayer$).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS1sYXllci5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvc3VyZmFjZS1sYXllci9zdGF0ZS9zdXJmYWNlLWxheWVyLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFnRDtBQUNoRCxtREFBMkQ7QUFFM0QscURBQTRDO0FBRzVDLDZFQUFnRjtBQUNoRixpREFBbUQ7QUFFbkQsMEVBQWlFO0FBQ2pFLHVFQUFnRTtBQUNoRSwwQ0FBNkM7QUFDN0MscUVBQXFFO0FBQ3JFLDZFQUF3RTtBQUN4RSxtRUFhaUM7QUFDakMsbUVBQThEO0FBQzlELGlFQUE0RDtBQUU1RCxRQUFRLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0lBQ25DLElBQUksT0FBd0IsQ0FBQztJQUM3QixJQUFJLE9BQTRCLENBQUM7SUFDakMsSUFBSSxPQUE0QixDQUFDO0lBRWpDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLFNBQVMsRUFBRTtnQkFDVCwyQ0FBbUI7Z0JBQ25CLGlCQUFVLENBQUMseUNBQWtCLENBQUM7Z0JBQzlCO29CQUNFLE9BQU8sRUFBRSwyQ0FBbUI7b0JBQzVCLFFBQVEsRUFBRTt3QkFDUixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTt3QkFDZixNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTt3QkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7d0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO3FCQUNsQjtpQkFDRjtnQkFDRCw0QkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDbEM7U0FDRixDQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMsMkNBQW1CLENBQUMsQ0FBQztRQUMzQyxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMsMkNBQW1CLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7UUFDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtRQUNqQyxFQUFFLENBQUMsc0ZBQXNGLEVBQUUsR0FBRyxFQUFFO1lBQzlGLE1BQU0sYUFBYSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxNQUFNLE1BQU0sR0FBRyxJQUFJLHlDQUFpQixFQUFFLENBQUM7WUFDdkMsTUFBTSxPQUFPLEdBQUcsSUFBSSxnREFBd0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUU1RCxPQUFPLEdBQUcscUJBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNuQyxNQUFNLFFBQVEsR0FBRyxzQkFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1lBQ25ELE1BQU0sUUFBUSxHQUFHLHNCQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDN0MsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXZDLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMscUVBQXFFLEVBQUUsR0FBRyxFQUFFO1lBQzdFLE1BQU0sTUFBTSxHQUFHLElBQUkseUNBQWlCLEVBQUUsQ0FBQztZQUN2QyxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVqQyxNQUFNLE9BQU8sR0FBRyxJQUFJLG1DQUFtQixDQUFDO2dCQUN0QyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87Z0JBQ3RCLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUM7WUFDSCxNQUFNLEdBQUcsR0FBRyxJQUFJLGdEQUF3QixFQUFFLENBQUM7WUFFM0MsT0FBTyxHQUFHLHFCQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsc0JBQUksQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQy9DLE1BQU0sUUFBUSxHQUFHLHNCQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN4RCxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFdkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtRQUMvQixFQUFFLENBQUMsMkVBQTJFLEVBQUUsR0FBRyxFQUFFO1lBQ25GLE1BQU0sWUFBWSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pELE1BQU0sbUJBQW1CLEdBQTBCLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMvRSxNQUFNLE1BQU0sR0FBRyxJQUFJLHVDQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUN4RCxNQUFNLE9BQU8sR0FBRyxJQUFJLDhDQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3pELE1BQU0sVUFBVSxHQUFHLElBQUksa0JBQVUsRUFBRSxDQUFDO1lBQ3BDLE1BQU0sS0FBSyxHQUFHLElBQUkseUJBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUNsRixNQUFNLGNBQWMsR0FBRyxJQUFJLHlCQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxZQUFZLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUUvRSxPQUFPLEdBQUcscUJBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNuQyxNQUFNLFFBQVEsR0FBRyxzQkFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sUUFBUSxHQUFHLHNCQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7WUFDOUYsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXpDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsb0VBQW9FLEVBQUUsR0FBRyxFQUFFO1lBQzVFLE1BQU0sbUJBQW1CLEdBQTBCLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLENBQUM7WUFDakYsTUFBTSxNQUFNLEdBQUcsSUFBSSx1Q0FBZSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDeEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFakMsTUFBTSxPQUFPLEdBQUcsSUFBSSxtQ0FBbUIsQ0FBQztnQkFDdEMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUN0QixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsUUFBUSxFQUFFLEtBQUs7YUFDaEIsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSw4Q0FBc0IsRUFBRSxDQUFDO1lBRXpDLE9BQU8sR0FBRyxxQkFBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sUUFBUSxHQUFHLHNCQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMvQyxNQUFNLFFBQVEsR0FBRyxzQkFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDeEQsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXpDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7UUFDbEMsRUFBRSxDQUFDLDhFQUE4RSxFQUFFLEdBQUcsRUFBRTtZQUN0RixNQUFNLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqRCxNQUFNLE1BQU0sR0FBRyxJQUFJLDBDQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3BELE1BQU0sVUFBVSxHQUFHLElBQUksa0JBQVUsRUFBRSxDQUFDO1lBQ3BDLE1BQU0sT0FBTyxHQUFHLElBQUksaURBQXlCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUQsTUFBTSxLQUFLLEdBQUcsSUFBSSx5QkFBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBRWxGLE9BQU8sR0FBRyxxQkFBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sUUFBUSxHQUFHLHNCQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDakQsTUFBTSxRQUFRLEdBQUcsc0JBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDMUUsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXpDLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsdUVBQXVFLEVBQUUsR0FBRyxFQUFFO1lBQy9FLE1BQU0sWUFBWSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pELE1BQU0sTUFBTSxHQUFHLElBQUksMENBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDcEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFakMsTUFBTSxPQUFPLEdBQUcsSUFBSSxtQ0FBbUIsQ0FBQztnQkFDdEMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUN0QixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsUUFBUSxFQUFFLEtBQUs7YUFDaEIsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxpREFBeUIsRUFBRSxDQUFDO1lBRTVDLE9BQU8sR0FBRyxxQkFBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sUUFBUSxHQUFHLHNCQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMvQyxNQUFNLFFBQVEsR0FBRyxzQkFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDeEQsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXpDLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7UUFDbEMsRUFBRSxDQUFDLG1FQUFtRSxFQUFFLEdBQUcsRUFBRTtZQUMzRSxNQUFNLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqRCxNQUFNLE1BQU0sR0FBRyxJQUFJLDBDQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3BELE1BQU0sT0FBTyxHQUFHLElBQUksaURBQXlCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUQsTUFBTSxLQUFLLEdBQUcsSUFBSSx5QkFBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ2xGLE1BQU0sVUFBVSxHQUFHLElBQUksa0JBQVUsRUFBRSxDQUFDO1lBRXBDLE9BQU8sR0FBRyxxQkFBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sUUFBUSxHQUFHLHNCQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDakQsTUFBTSxRQUFRLEdBQUcsc0JBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDM0UsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXpDLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsc0VBQXNFLEVBQUUsR0FBRyxFQUFFO1lBQzlFLE1BQU0sWUFBWSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pELE1BQU0sTUFBTSxHQUFHLElBQUksMENBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDcEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFakMsTUFBTSxPQUFPLEdBQUcsSUFBSSxtQ0FBbUIsQ0FBQztnQkFDdEMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUN0QixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsUUFBUSxFQUFFLEtBQUs7YUFDaEIsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxpREFBeUIsRUFBRSxDQUFDO1lBRTVDLE9BQU8sR0FBRyxxQkFBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sUUFBUSxHQUFHLHNCQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMvQyxNQUFNLFFBQVEsR0FBRyxzQkFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDeEQsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXpDLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=