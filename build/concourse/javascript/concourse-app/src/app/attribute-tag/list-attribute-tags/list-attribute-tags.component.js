"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faPlus_1 = require("@fortawesome/free-solid-svg-icons/faPlus");
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
const modal_1 = require("@concourse/core/modal");
const search_actions_component_1 = require("@concourse/shared/components/search-actions/search-actions.component");
let ListAttributeTagsComponent = class ListAttributeTagsComponent {
    constructor(attributeTagFacade, modalStoreFacade) {
        this.attributeTagFacade = attributeTagFacade;
        this.modalStoreFacade = modalStoreFacade;
        this.attributeTags$ = this.attributeTagFacade.list$;
        this.attributeTag$ = this.attributeTagFacade.selected$;
        this.isUpdating$ = this.attributeTagFacade.isUpdating$;
        this.isLoaded$ = this.attributeTagFacade.isLoaded$;
        this.hasNextLink$ = this.attributeTagFacade.hasNextLink$;
        this.page = 0;
        this.icons = { faPlus: faPlus_1.faPlus };
    }
    ngOnInit() {
        this.searchComponent.searchField.valueChanges.pipe(operators_2.filter(s => s.length > 2 || s.length === 0), operators_2.debounceTime(search_actions_component_1.SEARCH_DEBOUNCE_TIME), operators_1.untilDestroy(this)).subscribe(searchText => {
            this.attributeTagFacade.resetSearch();
            if (searchText.length) {
                this.attributeTagFacade.search(searchText);
            }
        });
    }
    ngOnDestroy() {
        this.attributeTagFacade.resetSearch();
    }
    trackItems(_index, attributeTag) {
        return attributeTag.id;
    }
    newAttributeTagModal() {
        this.attributeTagFacade.resetSearch();
        this.modalStoreFacade.openModal({
            component: modal_1.CreateAttributeTagComponent,
            id: 'create-attribute-tag'
        });
    }
    onScrollEnd(hasNextLink, isLoaded) {
        if (hasNextLink && isLoaded) {
            this.page++;
            this.attributeTagFacade.getPaginatedList(this.page, 200);
        }
    }
};
__decorate([
    core_1.ViewChild(search_actions_component_1.SearchActionsComponent)
], ListAttributeTagsComponent.prototype, "searchComponent", void 0);
ListAttributeTagsComponent = __decorate([
    core_1.Component({
        selector: 'app-list-attribute-tags',
        templateUrl: './list-attribute-tags.component.html',
        styleUrls: ['./list-attribute-tags.component.scss']
    })
], ListAttributeTagsComponent);
exports.ListAttributeTagsComponent = ListAttributeTagsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1hdHRyaWJ1dGUtdGFncy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvYXR0cmlidXRlLXRhZy9saXN0LWF0dHJpYnV0ZS10YWdzL2xpc3QtYXR0cmlidXRlLXRhZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXdFO0FBQ3hFLHFFQUFrRTtBQUVsRSx5REFBeUQ7QUFDekQsOENBQXNEO0FBRXRELGlEQUFvRTtBQUVwRSxtSEFBb0k7QUFRcEksSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFVckMsWUFDbUIsa0JBQXNDLEVBQ3RDLGdCQUFrQztRQURsQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFWckQsbUJBQWMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDO1FBQy9DLGtCQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztRQUNsRCxnQkFBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7UUFDbEQsY0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7UUFDOUMsaUJBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDO1FBQ3BELFNBQUksR0FBRyxDQUFDLENBQUM7UUFDQSxVQUFLLEdBQUcsRUFBRSxNQUFNLEVBQU4sZUFBTSxFQUFFLENBQUM7SUFLeEIsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUNoRCxrQkFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFDM0Msd0JBQVksQ0FBQywrQ0FBb0IsQ0FBQyxFQUNsQyx3QkFBWSxDQUFDLElBQUksQ0FBQyxDQUNuQixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdEMsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUNyQixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzVDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQWMsRUFBRSxZQUEwQjtRQUNuRCxPQUFPLFlBQVksQ0FBQyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQztZQUM5QixTQUFTLEVBQUUsbUNBQTJCO1lBQ3RDLEVBQUUsRUFBRSxzQkFBc0I7U0FDM0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUdELFdBQVcsQ0FBQyxXQUFvQixFQUFFLFFBQWlCO1FBQ2pELElBQUksV0FBVyxJQUFJLFFBQVEsRUFBRTtZQUMzQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztTQUMxRDtJQUNILENBQUM7Q0FDRixDQUFBO0FBbERvQztJQUFsQyxnQkFBUyxDQUFDLGlEQUFzQixDQUFDO21FQUF5QztBQURoRSwwQkFBMEI7SUFMdEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx5QkFBeUI7UUFDbkMsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxTQUFTLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztLQUNwRCxDQUFDO0dBQ1csMEJBQTBCLENBbUR0QztBQW5EWSxnRUFBMEIifQ==