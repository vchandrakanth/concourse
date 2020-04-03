"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const policy_template_actions_1 = require("./policy-template.actions");
const query = require("./policy-template.selectors");
let PolicyTemplateFacade = class PolicyTemplateFacade {
    constructor(store) {
        this.store = store;
        this.list$ = this.store.pipe(store_1.select(query.getAll));
        this.listByCategory$ = this.store.pipe(store_1.select(query.getByCategory));
        this.selected$ = this.store.pipe(store_1.select(query.getCategory));
    }
    getPolicyTemplatesByCategory(category) {
        this.store.dispatch(new policy_template_actions_1.GetPolicyTemplatesByCategory(category));
    }
    searchPolicyTemplate(name) {
        this.store.dispatch(new policy_template_actions_1.SearchPolicyTemplate(name));
    }
    resetSearchResults() {
        this.store.dispatch(new policy_template_actions_1.ResetPolicyTemplateResults());
    }
};
PolicyTemplateFacade = __decorate([
    core_1.Injectable()
], PolicyTemplateFacade);
exports.PolicyTemplateFacade = PolicyTemplateFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXRlbXBsYXRlLmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktdGVtcGxhdGUvc3RhdGUvcG9saWN5LXRlbXBsYXRlLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFFNUMsdUVBSW1DO0FBRW5DLHFEQUFxRDtBQUdyRCxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQUsvQixZQUNtQixLQUFtQjtRQUFuQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBTHRDLFVBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDOUMsb0JBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDL0QsY0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUluRCxDQUFDO0lBRUwsNEJBQTRCLENBQUMsUUFBZ0I7UUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxzREFBNEIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxJQUFZO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksOENBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksb0RBQTBCLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDRixDQUFBO0FBcEJZLG9CQUFvQjtJQURoQyxpQkFBVSxFQUFFO0dBQ0Esb0JBQW9CLENBb0JoQztBQXBCWSxvREFBb0IifQ==