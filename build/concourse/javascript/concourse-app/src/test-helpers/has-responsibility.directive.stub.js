"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const feature_flag_facade_1 = require("@concourse/core/feature-flags/state/feature-flag.facade");
const auth_facade_1 = require("@concourse/store/auth/state/auth.facade");
const groupFaker = require("@concourse/store/group/services/group.faker");
const surface_layer_facade_1 = require("@concourse/store/surface-layer/state/surface-layer.facade");
const surfaceFaker = require("@concourse/store/surface/services/surface.faker");
const surface_facade_1 = require("@concourse/store/surface/state/surface.facade");
const userFaker = require("@concourse/store/user/services/user.faker");
const user_facade_1 = require("@concourse/store/user/state/user.facade");
const test_1 = require("@concourse/test");
/**
 * TODO: Instead of importing all of these mocks into every component,
 * we should create mock directives that replace the ones we have built, for tests.
 * They would have no logic in them, but would take parameters that would allow us to build the proper test cases.
 */
exports.directiveProviders = [
    test_1.mockFacade(feature_flag_facade_1.FeatureFlagFacade),
    test_1.mockFacade(auth_facade_1.AuthFacade, {
        userPermissions$: new rxjs_1.BehaviorSubject({
            authoritiesBySurfaceLayerId: {},
            authoritiesByInstitutionId: {},
            authoritiesBySurfaceId: {}
        })
    }),
    test_1.mockFacade(surface_layer_facade_1.SurfaceLayerFacade),
    test_1.mockFacade(surface_facade_1.SurfaceFacade, {
        selectedWithRelated$: new rxjs_1.BehaviorSubject(Object.assign(Object.assign({}, surfaceFaker.fakeOne()), { surfaceLayerIds: [123, 456] }))
    }),
    test_1.mockFacade(user_facade_1.UserFacade, {
        authenticatedUser$: new rxjs_1.BehaviorSubject(userFaker.fakeOne(1010, groupFaker.fakeMany()))
    })
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzLXJlc3BvbnNpYmlsaXR5LmRpcmVjdGl2ZS5zdHViLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvdGVzdC1oZWxwZXJzL2hhcy1yZXNwb25zaWJpbGl0eS5kaXJlY3RpdmUuc3R1Yi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUF1QztBQUV2QyxpR0FBNEY7QUFDNUYseUVBQXFFO0FBQ3JFLDBFQUEwRTtBQUMxRSxvR0FBK0Y7QUFDL0YsZ0ZBQWdGO0FBQ2hGLGtGQUE4RTtBQUM5RSx1RUFBdUU7QUFDdkUseUVBQXFFO0FBQ3JFLDBDQUE2QztBQUU3Qzs7OztHQUlHO0FBQ1UsUUFBQSxrQkFBa0IsR0FBRztJQUNoQyxpQkFBVSxDQUFDLHVDQUFpQixDQUFDO0lBQzdCLGlCQUFVLENBQUMsd0JBQVUsRUFBRTtRQUNyQixnQkFBZ0IsRUFBRSxJQUFJLHNCQUFlLENBQUM7WUFDcEMsMkJBQTJCLEVBQUUsRUFBRTtZQUMvQiwwQkFBMEIsRUFBRSxFQUFFO1lBQzlCLHNCQUFzQixFQUFFLEVBQUU7U0FDM0IsQ0FBQztLQUNILENBQUM7SUFDRixpQkFBVSxDQUFDLHlDQUFrQixDQUFDO0lBQzlCLGlCQUFVLENBQUMsOEJBQWEsRUFBRTtRQUN4QixvQkFBb0IsRUFBRSxJQUFJLHNCQUFlLGlDQUNwQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQ3pCLGVBQWUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFDM0I7S0FDSCxDQUFDO0lBQ0YsaUJBQVUsQ0FBQyx3QkFBVSxFQUFFO1FBQ3JCLGtCQUFrQixFQUFFLElBQUksc0JBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUN4RixDQUFDO0NBQ0gsQ0FBQyJ9