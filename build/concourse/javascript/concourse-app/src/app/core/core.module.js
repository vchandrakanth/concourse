"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const effects_1 = require("@ngrx/effects");
const router_store_1 = require("@ngrx/router-store");
const store_1 = require("@ngrx/store");
const store_devtools_1 = require("@ngrx/store-devtools");
const error_effects_1 = require("./error/state/error.effects");
const error_facade_1 = require("./error/state/error.facade");
const feature_flag_effects_1 = require("./feature-flags/state/feature-flag.effects");
const feature_flag_facade_1 = require("./feature-flags/state/feature-flag.facade");
const modal_effects_1 = require("./modal/state/modal.effects");
const notification_effects_1 = require("./notification/state/notification.effects");
const notification_facade_1 = require("./notification/state/notification.facade");
const reducers_1 = require("./reducers");
const router_effects_1 = require("./router/router.effects");
const toast_effects_1 = require("./toast/toast.effects");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const dropdown_1 = require("ngx-bootstrap/dropdown");
const ngx_cookie_service_1 = require("ngx-cookie-service");
const ngx_pipes_1 = require("ngx-pipes");
const ngx_toastr_1 = require("ngx-toastr");
const shared_module_1 = require("@concourse/shared/shared.module");
const store_module_1 = require("@concourse/store/store.module");
const feature_flag_service_1 = require("./feature-flags/services/feature-flag.service");
const guards_1 = require("./guards");
const interceptors_1 = require("./interceptors");
const modal_1 = require("./modal");
const notification_service_1 = require("./notification/services/notification.service");
const env_1 = require("@concourse/env");
const header_component_1 = require("./components/header/header.component");
const notification_bar_component_1 = require("./components/notification-bar/notification-bar.component");
const notification_icon_component_1 = require("./components/notification-icon/notification-icon.component");
const sidebar_component_1 = require("./components/sidebar/sidebar.component");
const surface_null_state_component_1 = require("./components/surface-null-state/surface-null-state.component");
const surface_switcher_component_1 = require("./components/surface-switcher/surface-switcher.component");
const exportedComponents = [
    header_component_1.HeaderComponent,
    sidebar_component_1.SidebarComponent,
    notification_bar_component_1.NotificationBarComponent,
    surface_switcher_component_1.SurfaceSwitcherComponent,
    surface_null_state_component_1.SurfaceNullStateComponent
];
// tslint:disable-next-line:only-arrow-functions typedef
function actionSanitizer(action, id) {
    if (action.type.includes('[CatalogService]')) {
        return {
            type: action.type,
            payload: 'Removed from DevTools to Preserve Memory'
        };
    }
    return action;
}
exports.actionSanitizer = actionSanitizer;
// tslint:disable-next-line:only-arrow-functions typedef
function stateSanitizer(state, index) {
    return Object.assign(Object.assign({}, state), { catalog: 'Removed to preserve memory' });
}
exports.stateSanitizer = stateSanitizer;
let CoreModule = CoreModule_1 = class CoreModule {
    static forRoot() {
        return {
            ngModule: CoreModule_1,
            providers: [
                ngx_cookie_service_1.CookieService,
                // These will execute in order that they are listed here
                { provide: http_1.HTTP_INTERCEPTORS, useClass: interceptors_1.SurfaceInterceptor, multi: true },
                { provide: http_1.HTTP_INTERCEPTORS, useClass: interceptors_1.ApiAuthInterceptor, multi: true },
                { provide: http_1.HTTP_INTERCEPTORS, useClass: interceptors_1.ApiPrefixInterceptor, multi: true }
            ]
        };
    }
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
};
CoreModule = CoreModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            http_1.HttpClientModule,
            router_1.RouterModule,
            forms_1.FormsModule,
            // do not change the order of the following store modules
            store_1.StoreModule.forRoot(reducers_1.reducers, { metaReducers: reducers_1.coreMetaReducers }),
            effects_1.EffectsModule.forRoot([
                error_effects_1.ApplicationErrorEffects,
                feature_flag_effects_1.FeatureFlagEffects,
                modal_effects_1.ModalEffects,
                notification_effects_1.NotificationEffects,
                router_effects_1.RouteEffects,
                toast_effects_1.ToastEffects
            ]),
            router_store_1.StoreRouterConnectingModule.forRoot(),
            !env_1.environment.production ? store_devtools_1.StoreDevtoolsModule.instrument({
                name: 'ConcourseUI',
                maxAge: 20,
                actionSanitizer,
                stateSanitizer,
                logOnly: true
            }) : [],
            // ok, you're good.
            dropdown_1.BsDropdownModule.forRoot(),
            angular_fontawesome_1.FontAwesomeModule,
            ngx_pipes_1.NgArrayPipesModule,
            ngx_pipes_1.NgDatePipesModule,
            ngx_toastr_1.ToastrModule.forRoot(),
            shared_module_1.SharedModule,
            modal_1.ModalModule,
            store_module_1.AppStoreModule
        ],
        providers: [
            error_facade_1.ApplicationErrorFacade,
            notification_facade_1.NotificationFacade,
            notification_service_1.NotificationService,
            guards_1.AuthGuard,
            guards_1.RoleGuard,
            feature_flag_facade_1.FeatureFlagFacade,
            feature_flag_service_1.FeatureFlagService,
            feature_flag_service_1.FeatureFlagService,
            guards_1.AuthGuard,
            guards_1.FeatureFlagGuard
        ],
        declarations: [
            ...exportedComponents,
            notification_icon_component_1.NotificationIconComponent
        ],
        exports: [...exportedComponents]
    }),
    __param(0, core_1.Optional()), __param(0, core_1.SkipSelf())
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBK0M7QUFDL0MsK0NBQTJFO0FBQzNFLHdDQUFrRjtBQUNsRiwwQ0FBNkM7QUFDN0MsNENBQStDO0FBRS9DLDJDQUE4QztBQUM5QyxxREFBaUU7QUFDakUsdUNBQTBDO0FBQzFDLHlEQUEyRDtBQUMzRCwrREFBc0U7QUFDdEUsNkRBQW9FO0FBQ3BFLHFGQUFnRjtBQUNoRixtRkFBOEU7QUFDOUUsK0RBQTJEO0FBQzNELG9GQUFnRjtBQUNoRixrRkFBOEU7QUFDOUUseUNBQXdEO0FBQ3hELDREQUF1RDtBQUN2RCx5REFBcUQ7QUFFckQsMEVBQXFFO0FBQ3JFLHFEQUEwRDtBQUMxRCwyREFBbUQ7QUFDbkQseUNBQWtFO0FBQ2xFLDJDQUEwQztBQUUxQyxtRUFBK0Q7QUFDL0QsZ0VBQStEO0FBQy9ELHdGQUFtRjtBQUNuRixxQ0FBa0U7QUFDbEUsaURBQThGO0FBQzlGLG1DQUFzQztBQUN0Qyx1RkFBbUY7QUFFbkYsd0NBQTZDO0FBRTdDLDJFQUF1RTtBQUN2RSx5R0FBb0c7QUFDcEcsNEdBQXVHO0FBQ3ZHLDhFQUEwRTtBQUMxRSwrR0FBeUc7QUFDekcseUdBQW9HO0FBRXBHLE1BQU0sa0JBQWtCLEdBQUc7SUFDekIsa0NBQWU7SUFDZixvQ0FBZ0I7SUFDaEIscURBQXdCO0lBQ3hCLHFEQUF3QjtJQUN4Qix3REFBeUI7Q0FDMUIsQ0FBQztBQUVGLHdEQUF3RDtBQUN4RCxTQUFnQixlQUFlLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFDeEMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQzVDLE9BQU87WUFDTCxJ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