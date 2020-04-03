"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const operators_1 = require("rxjs/operators");
const comment_box_form_component_1 = require("../../shared/comment-box-form/comment-box-form.component");
let ApprovalDetailsComponent = class ApprovalDetailsComponent {
    constructor(approvalFacade, userFacade) {
        this.approvalFacade = approvalFacade;
        this.userFacade = userFacade;
        this.approvalRequestDetails$ = this.approvalFacade.selectedWithRelated$;
        this.assigneeList$ = this.userFacade.list$.pipe(operators_1.map(users => users.map(u => ({ id: u.id, text: `${u.name} <${u.email}>` }))));
        this.isUpdating$ = this.approvalFacade.isUpdating$;
    }
    submit(action, approvalRequest) {
        const form = this.commentForm.commentForm;
        Object.values(form.controls).forEach(control => {
            control.clearValidators();
        });
        if (action === 'ASSIGN') {
            form.get('assignedUserId').setValidators([forms_1.Validators.required]);
        }
        if (action === 'COMMENT') {
            form.get('comment').setValidators([forms_1.Validators.required, forms_1.Validators.minLength(1)]);
        }
        Object.values(form.controls).forEach(control => {
            control.markAsDirty();
            control.updateValueAndValidity();
        });
        if (this.commentForm.valid) {
            const request = {
                type: action,
                comment: this.commentForm.value.comment,
                assignedUserId: this.commentForm.value.assignedUserId
            };
            this.approvalFacade.postAction(approvalRequest.id, request);
            this.isUpdating$.pipe(operators_1.skipWhile(updating => updating), operators_1.take(1)).subscribe(() => {
                this.commentForm.commentForm.reset();
                this.commentForm.commentForm.markAsPristine();
            });
        }
    }
};
__decorate([
    core_1.ViewChild(comment_box_form_component_1.CommentBoxFormComponent)
], ApprovalDetailsComponent.prototype, "commentForm", void 0);
ApprovalDetailsComponent = __decorate([
    core_1.Component({
        selector: 'app-approval-details',
        templateUrl: './approval-details.component.html',
        styleUrls: ['./approval-details.component.scss']
    })
], ApprovalDetailsComponent);
exports.ApprovalDetailsComponent = ApprovalDetailsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwcm92YWwtZGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvd29ya2Zsb3dzL2FwcHJvdmFsL2FwcHJvdmFsLWRldGFpbHMvYXBwcm92YWwtZGV0YWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBcUQ7QUFDckQsMENBQTRDO0FBRTVDLDhDQUFzRDtBQUl0RCx5R0FBbUc7QUFPbkcsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFRbkMsWUFDbUIsY0FBOEIsRUFDOUIsVUFBc0I7UUFEdEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFSekMsNEJBQXVCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQztRQUNuRSxrQkFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDeEMsZUFBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUM3RSxDQUFDO1FBQ0YsZ0JBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQztJQUsxQyxDQUFDO0lBRUwsTUFBTSxDQUFDLE1BQTBCLEVBQUUsZUFBZ0M7UUFDakUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFFMUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzdDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO1FBRUQsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsa0JBQVUsQ0FBQyxRQUFRLEVBQUUsa0JBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25GO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzdDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN0QixPQUFPLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDMUIsTUFBTSxPQUFPLEdBQUc7Z0JBQ2QsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU87Z0JBQ3ZDLGNBQWMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxjQUFjO2FBQ3RELENBQUM7WUFDRixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRTVELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUNuQixxQkFBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQy9CLGdCQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1IsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNoRCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztDQUVGLENBQUE7QUFsRHFDO0lBQW5DLGdCQUFTLENBQUMsb0RBQXVCLENBQUM7NkRBQXNDO0FBRDlELHdCQUF3QjtJQUxwQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxXQUFXLEVBQUUsbUNBQW1DO1FBQ2hELFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO0tBQ2pELENBQUM7R0FDVyx3QkFBd0IsQ0FtRHBDO0FBbkRZLDREQUF3QiJ9