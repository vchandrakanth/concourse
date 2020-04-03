"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const testing_1 = require("@angular/core/testing");
const page_actions_component_1 = require("@concourse/shared/components/page-actions/page-actions.component");
const search_actions_component_1 = require("@concourse/shared/components/search-actions/search-actions.component");
const test_components_helper_1 = require("./test-components.helper");
exports.configureTests = (configure, compilerOptions = {}) => {
    const compilerConfig = Object.assign({ preserveWhitespaces: false }, compilerOptions);
    const configuredTestBed = testing_1.TestBed.configureCompiler(compilerConfig);
    configure(configuredTestBed);
    return configuredTestBed
        .overrideComponent(page_actions_component_1.PageActionsComponent, {
        set: { template: test_components_helper_1.TestComponents.pageActionsTestComponent }
    })
        .overrideComponent(search_actions_component_1.SearchActionsComponent, {
        set: { template: test_components_helper_1.TestComponents.pageSearchTestComponent }
    })
        .compileComponents()
        .then(() => configuredTestBed);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1jb25maWcuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvdGVzdC1oZWxwZXJzL3Rlc3QtY29uZmlnLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9CQUFvQjtBQUNwQixtREFBZ0Q7QUFFaEQsNkdBQXdHO0FBQ3hHLG1IQUE4RztBQUM5RyxxRUFBMEQ7QUFTN0MsUUFBQSxjQUFjLEdBQUcsQ0FDNUIsU0FBc0IsRUFDdEIsa0JBQW1DLEVBQUUsRUFDckMsRUFBRTtJQUNGLE1BQU0sY0FBYyxtQkFDbEIsbUJBQW1CLEVBQUUsS0FBSyxJQUN2QixlQUFlLENBQ25CLENBQUM7SUFFRixNQUFNLGlCQUFpQixHQUFHLGlCQUFPLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDcEUsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFFNUIsT0FBTyxpQkFBaUI7U0FDckIsaUJBQWlCLENBQUMsNkNBQW9CLEVBQUU7UUFDdkMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLHVDQUFjLENBQUMsd0JBQXdCLEVBQUU7S0FDM0QsQ0FBQztTQUNELGlCQUFpQixDQUFDLGlEQUFzQixFQUFFO1FBQ3pDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSx1Q0FBYyxDQUFDLHVCQUF1QixFQUFFO0tBQzFELENBQUM7U0FDRCxpQkFBaUIsRUFBRTtTQUNuQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNuQyxDQUFDLENBQUMifQ==