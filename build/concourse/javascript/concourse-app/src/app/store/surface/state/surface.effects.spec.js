"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@ngrx/effects/testing");
const jasmine_marbles_1 = require("jasmine-marbles");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const modal_1 = require("@concourse/core/modal");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const surface_layer_actions_1 = require("@concourse/store/surface-layer/state/surface-layer.actions");
const test_1 = require("@concourse/test");
const fakeSurface = require("../services/surface.faker");
const surface_service_1 = require("../services/surface.service");
const surface_actions_1 = require("./surface.actions");
const surface_effects_1 = require("./surface.effects");
const surface_facade_1 = require("./surface.facade");
describe('SurfaceEffects', () => {
    let actions;
    let effects;
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                surface_effects_1.SurfaceEffects,
                testing_2.provideMockActions(() => actions),
                {
                    provide: surface_service_1.SurfaceService,
                    useValue: {
                        list: jest.fn()
                    }
                },
                test_1.mockFacade(surface_facade_1.SurfaceFacade)
            ]
        });
        effects = testing_1.TestBed.get(surface_effects_1.SurfaceEffects);
        service = testing_1.TestBed.get(surface_service_1.SurfaceService);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('loadSurfaces$', () => {
        it('should return a loadSurfacesSuccess, with an array of Surfaces, on success', () => {
            const surfaces = fakeSurface.fakeMany();
            const sorted = surfaces.sort((a, b) => a.id - b.id);
            const first = sorted.filter(item => item.isAssociated).shift();
            const action = new surface_actions_1.LoadSurfaces();
            const outcome = new surface_actions_1.LoadSurfacesSuccess(sorted);
            const selectId = new surface_actions_1.SelectSurface(first.id);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: surfaces });
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: selectId });
            service.list = jest.fn(() => response);
            expect(effects.loadSurfaces$).toBeObservable(expected);
        });
        it('should return a LoadSurfacesFailure, with an error, on failure', () => {
            const action = new surface_actions_1.LoadSurfaces();
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const failureAction = new surface_actions_1.LoadSurfacesFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: failureAction });
            service.list = jest.fn(() => response);
            expect(effects.loadSurfaces$).toBeObservable(expected);
        });
    });
    describe('loadSurface$', () => {
        it('should return a LoadSurfaceSuccess, with a single Surface, on success', () => {
            const surface = fakeSurface.fakeOne();
            const action = new surface_actions_1.LoadSurface(surface.id);
            const outcome = new surface_actions_1.LoadSurfaceSuccess(surface);
            const selectId = new surface_actions_1.SelectSurface(surface.id);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: surface });
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: selectId });
            service.get = jest.fn(() => response);
            expect(effects.loadSurface$).toBeObservable(expected);
        });
        it('should return a LoadSurfaceFailure, with an error, on failure', () => {
            const action = new surface_actions_1.LoadSurface(1001);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const failureAction = new surface_actions_1.LoadSurfaceFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: failureAction });
            service.get = jest.fn(() => response);
            expect(effects.loadSurface$).toBeObservable(expected);
        });
    });
    describe('createSurface$', () => {
        it('should return a CreateSurfaceSuccess, with created Surface, on success', () => {
            const surface = fakeSurface.fakeOne();
            const newSurface = { name: surface.name };
            const action = new surface_actions_1.CreateSurface({ newSurface, createGroup: true });
            const selectId = new surface_actions_1.SelectSurface(surface.id);
            const outcome = new surface_actions_1.CreateSurfaceSuccess(surface);
            const loadSurfaceLayers = new surface_layer_actions_1.LoadSurfaceLayers();
            const openSuccessToaster = new toast_actions_1.OpenToast({ message: 'Surface Created Successfully', type: 'success' });
            const closeModel = new modal_1.CloseModal();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: surface });
            const expected = jasmine_marbles_1.cold('--(bcdef)', { b: selectId, c: outcome, d: loadSurfaceLayers, e: openSuccessToaster, f: closeModel });
            service.create = jest.fn(() => response);
            expect(effects.createSurface$).toBeObservable(expected);
        });
        it('should return a CreateSurfaceFailure, with an error, on failure', () => {
            const newSurface = { name: 'Surface Name' };
            const action = new surface_actions_1.CreateSurface({ newSurface, createGroup: true });
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const failureAction = new surface_actions_1.CreateSurfaceFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: failureAction });
            service.create = jest.fn(() => response);
            expect(effects.createSurface$).toBeObservable(expected);
        });
    });
    describe('updateSurface$', () => {
        it('should return a UpdateSurfaceSuccess, with a Surface, on success', () => {
            const surface = fakeSurface.fakeOne();
            const action = new surface_actions_1.UpdateSurface(surface);
            const outcome = new surface_actions_1.UpdateSurfaceSuccess(surface);
            const toast = new toast_actions_1.OpenToast({ message: 'Surface Updated Successfully', type: 'success' });
            const closeModel = new modal_1.CloseModal();
            const loadSurfaceLayers = new surface_layer_actions_1.LoadSurfaceLayers();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: surface });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: outcome, c: toast, d: loadSurfaceLayers, e: closeModel });
            service.update = jest.fn(() => response);
            expect(effects.updateSurface$).toBeObservable(expected);
        });
        it('should return a UpdateSurfaceFailure, with an error, on failure', () => {
            const surface = fakeSurface.fakeOne();
            const action = new surface_actions_1.UpdateSurface(surface);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const failureAction = new surface_actions_1.UpdateSurfaceFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: failureAction });
            service.update = jest.fn(() => response);
            expect(effects.updateSurface$).toBeObservable(expected);
        });
    });
    describe('deleteSurface$', () => {
        it('should return a DeleteSurfaceSuccess, with deleted Surface id, on success', () => {
            const { id } = fakeSurface.fakeOne();
            const action = new surface_actions_1.DeleteSurface(id);
            const outcome = new surface_actions_1.DeleteSurfaceSuccess(id);
            const openSuccessToaster = new toast_actions_1.OpenToast({ message: 'Surface Deleted Successfully', type: 'success' });
            const closeModal = new modal_1.CloseModal();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: id });
            const expected = jasmine_marbles_1.cold('--(bcd)', { b: outcome, c: openSuccessToaster, d: closeModal });
            service.delete = jest.fn(() => response);
            expect(effects.deleteSurface$).toBeObservable(expected);
        });
        it('should return a DeleteSurfaceFailure, with an error, on failure', () => {
            const action = new surface_actions_1.DeleteSurface(1001);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const failureAction = new surface_actions_1.DeleteSurfaceFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: failureAction });
            service.delete = jest.fn(() => response);
            expect(effects.deleteSurface$).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvc3VyZmFjZS9zdGF0ZS9zdXJmYWNlLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFnRDtBQUNoRCxtREFBMkQ7QUFFM0QscURBQTRDO0FBRzVDLDZFQUFnRjtBQUNoRixpREFBbUQ7QUFDbkQsdUVBQWdFO0FBQ2hFLHNHQUErRjtBQUMvRiwwQ0FBNkM7QUFDN0MseURBQXlEO0FBQ3pELGlFQUE2RDtBQUM3RCx1REFpQjJCO0FBQzNCLHVEQUFtRDtBQUNuRCxxREFBaUQ7QUFFakQsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtJQUM5QixJQUFJLE9BQXdCLENBQUM7SUFDN0IsSUFBSSxPQUF1QixDQUFDO0lBQzVCLElBQUksT0FBdUIsQ0FBQztJQUU1QixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixTQUFTLEVBQUU7Z0JBQ1QsZ0NBQWM7Z0JBQ2QsNEJBQWtCLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQztvQkFDRSxPQUFPLEVBQUUsZ0NBQWM7b0JBQ3ZCLFFBQVEsRUFBRTt3QkFDUixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtxQkFDaEI7aUJBQ0Y7Z0JBQ0QsaUJBQVUsQ0FBQyw4QkFBYSxDQUFDO2FBQzFCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLGlCQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFjLENBQUMsQ0FBQztRQUN0QyxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWMsQ0FBQyxDQUFDO0lBRXhDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG1C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