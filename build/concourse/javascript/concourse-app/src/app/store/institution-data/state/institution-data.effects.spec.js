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
const fakeInstitutionDatas = require("../services/institution-data.faker");
const institution_data_service_1 = require("../services/institution-data.service");
const institution_data_actions_1 = require("./institution-data.actions");
const institution_data_effects_1 = require("./institution-data.effects");
const institution_data_facade_1 = require("./institution-data.facade");
describe('InstitutionDataEffects', () => {
    let actions;
    let effects;
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                test_1.mockFacade(institution_data_facade_1.InstitutionDataFacade),
                institution_data_effects_1.InstitutionDataEffects,
                testing_2.provideMockActions(() => actions),
                {
                    provide: institution_data_service_1.InstitutionDataService,
                    useValue: {
                        list: jest.fn(),
                        get: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn()
                    }
                }
            ]
        });
        effects = testing_1.TestBed.get(institution_data_effects_1.InstitutionDataEffects);
        service = testing_1.TestBed.get(institution_data_service_1.InstitutionDataService);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('loadInstitutionDatas$', () => {
        const data = fakeInstitutionDatas.fakeMany();
        it('should return a LoadInstitutionDatasSuccess, with an array of InstitutionDatas, on success', () => {
            const action = new institution_data_actions_1.LoadInstitutionsData({ dataDomain: 'INSTITUTION' });
            const outcome = new institution_data_actions_1.LoadInstitutionsDataSuccess(data);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: data });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.list = jest.fn(() => response);
            expect(effects.loadInstitutionsData$).toBeObservable(expected);
        });
        it('should return a LoadInstitutionDatasFailure, with an error, on failure', () => {
            const action = new institution_data_actions_1.LoadInstitutionsData({ dataDomain: 'INSTITUTION' });
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const idError = new institution_data_actions_1.LoadInstitutionsDataFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: idError });
            service.list = jest.fn(() => response);
            expect(effects.loadInstitutionsData$).toBeObservable(expected);
            expect(service.list).toHaveBeenCalled();
        });
    });
    describe('loadInstitutionData$', () => {
        const data = fakeInstitutionDatas.fakeOne('NONE');
        it('should return a LoadInstitutionDataSuccess, with a single institution data, on success', () => {
            const action = new institution_data_actions_1.LoadInstitutionData({ params: { dataDomain: 'INSTITUTION' }, uri: data.name });
            const outcome = new institution_data_actions_1.LoadInstitutionDataSuccess(data);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: data });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.get = jest.fn(() => response);
            expect(effects.loadInstitutionData$).toBeObservable(expected);
            expect(service.get).toHaveBeenCalled();
        });
        it('should return a LoadInstitutionDataFailure, with an error, on failure', () => {
            const action = new institution_data_actions_1.LoadInstitutionData({ params: { dataDomain: 'INSTITUTION' }, uri: data.name });
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const idError = new institution_data_actions_1.LoadInstitutionDataFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: idError });
            service.get = jest.fn(() => response);
            expect(effects.loadInstitutionData$).toBeObservable(expected);
            expect(service.get).toHaveBeenCalled();
        });
    });
    describe('updateInstitutionData$', () => {
        it('should return UpdateInstitutionDataSuccess, on success', () => {
            const data = fakeInstitutionDatas.fakeOne('NONE');
            const action = new institution_data_actions_1.UpdateInstitutionData({ params: { dataDomain: 'INSTITUTION' }, data });
            const outcome = new institution_data_actions_1.UpdateInstitutionDataSuccess(data);
            const toast = new toast_actions_1.OpenToast({ message: 'Data Updated', type: 'success' });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: data });
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: toast });
            service.update = jest.fn(() => response);
            expect(effects.updateInstitutionData$).toBeObservable(expected);
            expect(service.update).toHaveBeenCalled();
        });
        it('should return UpdateInstitutionDataFailure, on failure', () => {
            const data = fakeInstitutionDatas.fakeOne('NONE');
            const action = new institution_data_actions_1.UpdateInstitutionData({ params: { dataDomain: 'INSTITUTION' }, data });
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const idError = new institution_data_actions_1.UpdateInstitutionDataFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: idError });
            service.update = jest.fn(() => response);
            expect(effects.updateInstitutionData$).toBeObservable(expected);
            expect(service.update).toHaveBeenCalled();
        });
    });
    describe('deleteInstitutionData$', () => {
        it('should return DeleteInstitutionDataSuccess, and redirect to list view, on success', () => {
            const action = new institution_data_actions_1.DeleteInstitutionData({ params: { dataDomain: 'INSTITUTION' }, uri: 'name' });
            const outcome = new institution_data_actions_1.DeleteInstitutionDataSuccess('name');
            const toast = new toast_actions_1.OpenToast({ message: 'Data Deleted', type: 'success' });
            const redirect = new router_actions_1.RouterGo({ path: ['/institution/data'] });
            const closeModal = new modal_1.CloseModal();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: undefined });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: outcome, c: toast, d: closeModal, e: redirect });
            service.delete = jest.fn(() => response);
            expect(effects.deleteInstitutionData$).toBeObservable(expected);
            expect(service.delete).toHaveBeenCalled();
        });
        it('should return DeleteInstitutionDataFailure, on failure', () => {
            const action = new institution_data_actions_1.DeleteInstitutionData({ params: { dataDomain: 'INSTITUTION' }, uri: 'name' });
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const idError = new institution_data_actions_1.DeleteInstitutionDataFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: idError });
            service.delete = jest.fn(() => response);
            expect(effects.deleteInstitutionData$).toBeObservable(expected);
            expect(service.delete).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24tZGF0YS5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvaW5zdGl0dXRpb24tZGF0YS9zdGF0ZS9pbnN0aXR1dGlvbi1kYXRhLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFnRDtBQUNoRCxtREFBMkQ7QUFFM0QscURBQTRDO0FBRzVDLDZFQUFnRjtBQUNoRixpREFBbUQ7QUFDbkQsMEVBQWlFO0FBQ2pFLHVFQUFnRTtBQUNoRSwwQ0FBNkM7QUFDN0MsMkVBQTJFO0FBQzNFLG1GQUE4RTtBQUM5RSx5RUFhb0M7QUFDcEMseUVBQW9FO0FBQ3BFLHVFQUFrRTtBQUVsRSxRQUFRLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO0lBQ3RDLElBQUksT0FBd0IsQ0FBQztJQUM3QixJQUFJLE9BQStCLENBQUM7SUFDcEMsSUFBSSxPQUErQixDQUFDO0lBRXBDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLCtDQUFxQixDQUFDO2dCQUNqQyxpREFBc0I7Z0JBQ3RCLDRCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakM7b0JBQ0UsT0FBTyxFQUFFLGlEQUFzQjtvQkFDL0IsUUFBUSxFQUFFO3dCQUNSLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO3dCQUNmLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO3dCQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO3dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtxQkFDbEI7aUJBQ0Y7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVI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