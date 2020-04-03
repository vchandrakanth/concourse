"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fakeAttributeTags = require("@concourse/store/attribute-tag/services/attribute-tag.faker");
const fakeGroups = require("@concourse/store/group/services/group.faker");
const fakeAssets = require("../services/asset.faker");
const asset_actions_1 = require("./asset.actions");
const asset_reducer_1 = require("./asset.reducer");
describe('Asset Reducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = {};
            const result = asset_reducer_1.reducer(asset_reducer_1.initialState, action);
            expect(result).toEqual(asset_reducer_1.initialState);
        });
    });
    describe('LoadAssets/LoadAssetsByType Actions', () => {
        describe('LoadAssets (Primer)', () => {
            it('should be loading to true', () => {
                const action = new asset_actions_1.LoadAssets();
                const result = asset_reducer_1.reducer(asset_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('LoadAssetsByType (Applications)', () => {
            const group = fakeGroups.fakeOne();
            const applications = fakeAssets.fakeManyApplications(2, group);
            const action = {
                type: asset_actions_1.AssetsActionTypes.LoadAssetsByTypeSuccess,
                payload: {
                    type: 'application',
                    assets: applications
                }
            };
            const entities = applications.reduce((acc, app) => (Object.assign(Object.assign({}, acc), { [`application-${app.id}`]: app })), {});
            const ids = applications.map(a => `application-${a.id}`);
            const result = asset_reducer_1.reducer(asset_reducer_1.initialState, action);
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
        describe('LoadAssetsByType (Enclaves)', () => {
            const attributeTags = fakeAttributeTags.fakeMany();
            const group = fakeGroups.fakeOne();
            const enclaves = fakeAssets.fakeManyEnclaves(attributeTags, group, 2);
            const action = {
                type: asset_actions_1.AssetsActionTypes.LoadAssetsByTypeSuccess,
                payload: {
                    type: 'enclave',
                    assets: enclaves
                }
            };
            const entities = enclaves.reduce((acc, app) => (Object.assign(Object.assign({}, acc), { [`enclave-${app.id}`]: app })), {});
            const ids = enclaves.map(a => `enclave-${a.id}`);
            const result = asset_reducer_1.reducer(asset_reducer_1.initialState, action);
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
    }); // LoadAssets Actions
    describe('LoadAsset Actions', () => {
        describe('LoadAsset (Application)', () => {
            it('should set loading to true', () => {
                const group = fakeGroups.fakeOne();
                const asset = fakeAssets.fakeOneApplication(1, group);
                const action = {
                    type: asset_actions_1.AssetsActionTypes.LoadAsset,
                    payload: {
                        id: asset.id,
                        type: 'application'
                    }
                };
                const result = asset_reducer_1.reducer(asset_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('LoadAssetSuccess (Application)', () => {
            const group = fakeGroups.fakeOne();
            const application = fakeAssets.fakeOneApplication(1, group);
            const action = {
                type: asset_actions_1.AssetsActionTypes.LoadAssetSuccess,
                payload: {
                    type: 'application',
                    asset: application
                }
            };
            const entities = {
                [`application-${application.id}`]: application
            };
            const result = asset_reducer_1.reducer(asset_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to false', () => {
                expect(result.loaded).toBe(true);
            });
            it('should have one entity', () => {
                expect(Object.keys(result.entities).length).toBe(1);
                expect(result.entities).toEqual(entities);
            });
            it('should have one id', () => {
                expect(result.ids.length).toBe(1);
            });
        });
        describe('LoadAsset (Enclave)', () => {
            it('should set loading to true', () => {
                const group = fakeGroups.fakeOne();
                const asset = fakeAssets.fakeOneApplication(1, group);
                const action = {
                    type: asset_actions_1.AssetsActionTypes.LoadAsset,
                    payload: {
                        id: asset.id,
                        type: 'enclave'
                    }
                };
                const result = asset_reducer_1.reducer(asset_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('LoadAssetSuccess (Enclave)', () => {
            const group = fakeGroups.fakeOne();
            const enclave = fakeAssets.fakeOneEnclave([], group);
            const action = {
                type: asset_actions_1.AssetsActionTypes.LoadAssetSuccess,
                payload: {
                    type: 'enclave',
                    asset: enclave
                }
            };
            const entities = {
                [`enclave-${enclave.id}`]: enclave
            };
            const result = asset_reducer_1.reducer(asset_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to false', () => {
                expect(result.loaded).toBe(true);
            });
            it('should have one entity', () => {
                expect(Object.keys(result.entities).length).toBe(1);
                expect(result.entities).toEqual(entities);
            });
            it('should have one id', () => {
                expect(result.ids.length).toBe(1);
            });
        });
    }); // LoadAsset Actions
}); // Asset Reducer
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQucmVkdWNlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2Fzc2V0L3N0YXRlL2Fzc2V0LnJlZHVjZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlHQUFpRztBQUNqRywwRUFBMEU7QUFDMUUsc0RBQXNEO0FBQ3RELG1EQU15QjtBQUN6QixtREFBd0Q7QUFFeEQsUUFBUSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7SUFFN0IsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtRQUM5QixFQUFFLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxFQUFFO1lBQ3pDLE1BQU0sTUFBTSxHQUFHLEVBQVMsQ0FBQztZQUV6QixNQUFNLE1BQU0sR0FBRyx1QkFBTyxDQUFDLDRCQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyw0QkFBWSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxxQ0FBcUMsRUFBRSxHQUFHLEVBQUU7UUFFbkQsUUFBUSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtZQUNuQyxFQUFFLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO2dCQUNuQyxNQUFNLE1BQU0sR0FBRyxJQUFJLDBCQUFVLEVBQUUsQ0FBQztnQkFDaEMsTUFBTSxNQUFNLEdBQUcsdUJBQU8sQ0FBQyw0QkFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgs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