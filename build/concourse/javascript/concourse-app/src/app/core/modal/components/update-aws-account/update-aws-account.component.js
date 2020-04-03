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
const basic_modal_1 = require("../basic-modal");
let UpdateAwsAccountComponent = class UpdateAwsAccountComponent extends basic_modal_1.BasicModal {
    constructor(fb, awsAccountFacade) {
        super();
        this.fb = fb;
        this.awsAccountFacade = awsAccountFacade;
    }
    ngOnInit() {
        this.createForm();
    }
    createForm() {
        this.form = this.fb.group({
            name: [this.account.name, [forms_1.Validators.required, forms_1.Validators.maxLength(128)]],
            description: [this.account.description, [forms_1.Validators.required, forms_1.Validators.maxLength(1024)]]
        });
    }
    onSubmit() {
        this.awsAccountFacade.update(this.account.copyWith(this.form.value));
    }
};
UpdateAwsAccountComponent = __decorate([
    core_1.Component({
        selector: 'app-update-aws-account',
        templateUrl: './update-aws-account.component.html',
        styleUrls: ['./update-aws-account.component.scss']
    })
], UpdateAwsAccountComponent);
exports.UpdateAwsAccountComponent = UpdateAwsAccountComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWF3cy1hY2NvdW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvdXBkYXRlLWF3cy1hY2NvdW50L3VwZGF0ZS1hd3MtYWNjb3VudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFFbEQsMENBQW9FO0FBR3BFLGdEQUE0QztBQU81QyxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUEwQixTQUFRLHdCQUFVO0lBUXZELFlBQ21CLEVBQWUsRUFDZixnQkFBa0M7UUFFbkQsS0FBSyxFQUFFLENBQUM7UUFIUyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUdyRCxDQUFDO0lBQ0QsUUFBUTtRQUNOLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDeEIsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsRUFBRSxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNFLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLEVBQUUsa0JBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUMzRixDQUFDLENBQUM7SUFFTCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBRXZFLENBQUM7Q0FFRixDQUFBO0FBL0JZLHlCQUF5QjtJQUxyQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHdCQUF3QjtRQUNsQyxXQUFXLEVBQUUscUNBQXFDO1FBQ2xELFNBQVMsRUFBRSxDQUFDLHFDQUFxQyxDQUFDO0tBQ25ELENBQUM7R0FDVyx5QkFBeUIsQ0ErQnJDO0FBL0JZLDhEQUF5QiJ9