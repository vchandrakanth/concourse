"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const action_button_maps_1 = require("../action-button-maps");
let CommentBoxFormComponent = class CommentBoxFormComponent {
    constructor(fb) {
        this.fb = fb;
        this.actionSubmit = new core_1.EventEmitter();
        this.commentForm = this.fb.group({
            assignedUserId: [undefined],
            comment: ['']
        });
    }
    set workflowStatus(status) {
        if (this.workflowType === 'policyViolation') {
            this.encouragedAction = action_button_maps_1.POLICY_VIOLATION_ENCOURAGED_ACTION[status];
            this.secondaryActions = action_button_maps_1.POLICY_VIOLATION_STATUS_ACTIONS[status];
        }
        if (this.workflowType === 'approval') {
            this.encouragedAction = action_button_maps_1.APPROVAL_ENCOURAGED_ACTION[status];
            this.secondaryActions = action_button_maps_1.APPROVAL_STATUS_ACTIONS[status];
        }
    }
    get value() {
        return this.commentForm.value;
    }
    get valid() {
        return this.commentForm.valid;
    }
    handleSubmit(action) {
        this.actionSubmit.emit(action);
    }
};
__decorate([
    core_1.Input()
], CommentBoxFormComponent.prototype, "assigneeList", void 0);
__decorate([
    core_1.Input()
], CommentBoxFormComponent.prototype, "workflowType", void 0);
__decorate([
    core_1.Input()
], CommentBoxFormComponent.prototype, "workflowStatus", null);
__decorate([
    core_1.Output()
], CommentBoxFormComponent.prototype, "actionSubmit", void 0);
CommentBoxFormComponent = __decorate([
    core_1.Component({
        exportAs: 'commentBoxForm',
        selector: 'app-comment-box-form',
        styleUrls: ['./comment-box-form.component.scss'],
        templateUrl: './comment-box-form.component.html'
    })
], CommentBoxFormComponent);
exports.CommentBoxFormComponent = CommentBoxFormComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC1ib3gtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvd29ya2Zsb3dzL3NoYXJlZC9jb21tZW50LWJveC1mb3JtL2NvbW1lbnQtYm94LWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBS3VCO0FBSXZCLDhEQUsrQjtBQVEvQixJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQStCbEMsWUFDbUIsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7UUFuQmYsaUJBQVksR0FBRyxJQUFJLG1CQUFZLEVBQVUsQ0FBQztRQUU3RCxnQkFBVyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQzFCLGNBQWMsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUMzQixPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDZCxDQUFDLENBQUM7SUFlQyxDQUFDO0lBOUJJLElBQUksY0FBYyxDQUFDLE1BQWM7UUFDeEMsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLGlCQUFpQixFQUFFO1lBQzNDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyx1REFBa0MsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsb0RBQStCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDakU7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssVUFBVSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRywrQ0FBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsNENBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDekQ7SUFDSCxDQUFDO0lBV0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBTUQsWUFBWSxDQUFDLE1BQWM7UUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNGLENBQUE7QUFyQ1U7SUFBUixZQUFLLEVBQUU7NkRBQXNCO0FBQ3JCO0lBQVIsWUFBSyxFQUFFOzZEQUFzQjtBQUNyQjtJQUFSLFlBQUssRUFBRTs2REFTUDtBQUNTO0lBQVQsYUFBTSxFQUFFOzZEQUFvRDtBQWJsRCx1QkFBdUI7SUFObkMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztRQUNoRCxXQUFXLEVBQUUsbUNBQW1DO0tBQ2pELENBQUM7R0FDVyx1QkFBdUIsQ0FzQ25DO0FBdENZLDBEQUF1QiJ9