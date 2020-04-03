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
const selectors_1 = require("@concourse/store/selectors");
const attribute_tag_actions_1 = require("./attribute-tag.actions");
const query = require("./attribute-tag.selectors");
let AttributeTagFacade = class AttributeTagFacade {
    constructor(store) {
        this.store = store;
        this.list$ = this.store.pipe(store_1.select(query.getAll));
        this.selected$ = this.store.pipe(store_1.select(query.getSelected));
        this.selectedWithRelated$ = this.store.pipe(store_1.select(selectors_1.getSelectedAttributeTagWithRelated));
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.isUpdating$ = this.store.pipe(store_1.select(query.getIsUpdating));
        this.hasNextLink$ = this.store.pipe(store_1.select(query.hasNextLink));
    }
    create(payload) {
        this.store.dispatch(new attribute_tag_actions_1.CreateAttributeTag(payload));
    }
    update(attributeTag) {
        this.store.dispatch(new attribute_tag_actions_1.UpdateAttributeTag(attributeTag));
    }
    delete(attributeTag) {
        this.store.dispatch(new attribute_tag_actions_1.DeleteAttributeTag(attributeTag.id));
    }
    search(searchText) {
        this.store.dispatch(new attribute_tag_actions_1.SearchAttributeTags(searchText));
    }
    resetSearch() {
        this.store.dispatch(new attribute_tag_actions_1.ResetAttributeTagSearch());
    }
    getPaginatedList(page, size) {
        this.store.dispatch(new attribute_tag_actions_1.LoadAttributeTagsByPagination({ page: page.toString(), size: size.toString() }));
    }
};
AttributeTagFacade = __decorate([
    core_1.Injectable()
], AttributeTagFacade);
exports.AttributeTagFacade = AttributeTagFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlLXRhZy5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvYXR0cmlidXRlLXRhZy9zdGF0ZS9hdHRyaWJ1dGUtdGFnLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFHNUMsMERBQWdGO0FBQ2hGLG1FQU9pQztBQUVqQyxtREFBbUQ7QUFHbkQsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFRN0IsWUFDbUIsS0FBbUI7UUFBbkIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQVJ0QyxVQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzlDLGNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDdkQseUJBQW9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLDhDQUFrQyxDQUFDLENBQUMsQ0FBQztRQUNuRixjQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELGdCQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQzNELGlCQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBSXRELENBQUM7SUFFTCxNQUFNLENBQUMsT0FBWTtRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDBDQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELE1BQU0sQ0FBQyxZQUEwQjtRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDBDQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELE1BQU0sQ0FBQyxZQUEwQjtRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDBDQUFrQixDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxNQUFNLENBQUMsVUFBa0I7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwyQ0FBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwrQ0FBdUIsRUFBRSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELGdCQUFnQixDQUFDLElBQVksRUFBRSxJQUFZO1FBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUkscURBQTZCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0csQ0FBQztDQUNGLENBQUE7QUFuQ1ksa0JBQWtCO0lBRDlCLGlCQUFVLEVBQUU7R0FDQSxrQkFBa0IsQ0FtQzlCO0FBbkNZLGdEQUFrQiJ9