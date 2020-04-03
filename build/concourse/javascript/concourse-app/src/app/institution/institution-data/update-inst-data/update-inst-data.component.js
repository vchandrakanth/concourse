"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faTrashAlt_1 = require("@fortawesome/free-solid-svg-icons/faTrashAlt");
let UpdateInstDataComponent = class UpdateInstDataComponent {
    constructor(modalFacade, instFacade) {
        this.modalFacade = modalFacade;
        this.instFacade = instFacade;
        this.isLoaded$ = this.instFacade.isLoaded$;
        this.instData$ = this.instFacade.selected$;
        this.icons = { faTrashAlt: faTrashAlt_1.faTrashAlt };
    }
    delete(data) {
        this.modalFacade.confirmDeleteModal('Institution Data', data.name, () => this.instFacade.delete({ dataDomain: 'INSTITUTION' }, data.uri));
    }
};
UpdateInstDataComponent = __decorate([
    core_1.Component({
        selector: 'app-update-inst-data',
        templateUrl: './update-inst-data.component.html',
        styleUrls: ['./update-inst-data.component.scss']
    })
], UpdateInstDataComponent);
exports.UpdateInstDataComponent = UpdateInstDataComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWluc3QtZGF0YS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvaW5zdGl0dXRpb24vaW5zdGl0dXRpb24tZGF0YS91cGRhdGUtaW5zdC1kYXRhL3VwZGF0ZS1pbnN0LWRhdGEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTBDO0FBQzFDLDZFQUEwRTtBQVUxRSxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQU1sQyxZQUNtQixXQUE2QixFQUM3QixVQUFpQztRQURqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0IsZUFBVSxHQUFWLFVBQVUsQ0FBdUI7UUFQcEQsY0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQ3RDLGNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUU3QixVQUFLLEdBQUcsRUFBRSxVQUFVLEVBQVYsdUJBQVUsRUFBRSxDQUFDO0lBTWhDLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBcUI7UUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FDakMsa0JBQWtCLEVBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUN0RSxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFuQlksdUJBQXVCO0lBTG5DLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFdBQVcsRUFBRSxtQ0FBbUM7UUFDaEQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7S0FDakQsQ0FBQztHQUNXLHVCQUF1QixDQW1CbkM7QUFuQlksMERBQXVCIn0=