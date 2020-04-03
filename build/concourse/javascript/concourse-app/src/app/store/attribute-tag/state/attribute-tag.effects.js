"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const effects_1 = require("@ngrx/effects");
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
const modal_1 = require("@concourse/core/modal");
const router_actions_1 = require("@concourse/core/router/router.actions");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const asset_actions_1 = require("@concourse/store/asset/state/asset.actions");
const policy_group_actions_1 = require("@concourse/store/policy-group/state/policy-group.actions");
const attribute_tag_actions_1 = require("./attribute-tag.actions");
let AttributeTagEffects = class AttributeTagEffects {
    constructor(actions$, attributeTagApi, attributeTagFacade) {
        this.actions$ = actions$;
        this.attributeTagApi = attributeTagApi;
        this.attributeTagFacade = attributeTagFacade;
        this.loadAttributeTags$ = this.actions$.pipe(effects_1.ofType(attribute_tag_actions_1.AttributeTagActionTypes.LoadAttributeTags), operators_2.switchMap(_ => this.attributeTagApi.list().pipe(operators_2.map(tags => new attribute_tag_actions_1.LoadAttributeTagsSuccess(tags)), operators_1.handleError('toast', new attribute_tag_actions_1.LoadAttributeTagsFailure()))));
        this.loadAttributeTagsByPagination$ = this.actions$.pipe(effects_1.ofType(attribute_tag_actions_1.AttributeTagActionTypes.LoadAttributeTagsByPagination), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.attributeTagApi.paginatedList(payload.size, payload.page).pipe(operators_2.map(tags => new attribute_tag_actions_1.LoadAttributeTagsByPaginationSuccess(tags)), operators_1.handleError('toast', new attribute_tag_actions_1.LoadAttributeTagsByPaginationFailure()))));
        this.loadAttributeTag$ = this.actions$.pipe(effects_1.ofType(attribute_tag_actions_1.AttributeTagActionTypes.LoadAttributeTag), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.attributeTagApi.get(payload).pipe(operators_2.map(tag => new attribute_tag_actions_1.LoadAttributeTagSuccess(tag)), operators_1.handleError('toast', new attribute_tag_actions_1.LoadAttributeTagFailure()))));
        this.createAttributeTag$ = this.actions$.pipe(effects_1.ofType(attribute_tag_actions_1.AttributeTagActionTypes.CreateAttributeTag), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.attributeTagApi.create(payload).pipe(operators_2.mergeMap(data => [
            new attribute_tag_actions_1.CreateAttributeTagSuccess(data),
            new toast_actions_1.OpenToast({ message: 'Attribute Tag Created', type: 'success' }),
            new modal_1.CloseModal(),
            new router_actions_1.RouterGo({ path: [`/attribute-tags/${data.id}`] })
        ]), operators_1.handleError('form', new attribute_tag_actions_1.CreateAttributeTagFailure()))));
        this.updateAttributeTag$ = this.actions$.pipe(effects_1.ofType(attribute_tag_actions_1.AttributeTagActionTypes.UpdateAttributeTag), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.attributeTagApi.update(payload).pipe(operators_2.mergeMap(data => [
            new attribute_tag_actions_1.UpdateAttributeTagSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Attribute Tag Updated', type: 'success' })
        ]), operators_1.handleError('form', new attribute_tag_actions_1.UpdateAttributeTagFailure()))));
        this.deleteAttributeTag$ = this.actions$.pipe(effects_1.ofType(attribute_tag_actions_1.AttributeTagActionTypes.DeleteAttributeTag), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.attributeTagApi.delete(payload).pipe(operators_2.mergeMap(_ => [
            new attribute_tag_actions_1.DeleteAttributeTagSuccess(payload),
            new toast_actions_1.OpenToast({ message: 'Attribute Tag Deleted', type: 'success' }),
            new modal_1.CloseModal(),
            new router_actions_1.RouterGo({ path: ['/attribute-tags'] })
        ]), operators_1.handleError('form', new attribute_tag_actions_1.DeleteAttributeTagFailure()))));
        this.searchAttributeTags = this.actions$.pipe(effects_1.ofType(attribute_tag_actions_1.AttributeTagActionTypes.SearchAttributeTags), operators_2.map((action) => action.payload), operators_2.map(searchText => searchText.toLocaleLowerCase()), operators_2.withLatestFrom(this.attributeTagFacade.list$), operators_2.map(([searchText, attributeTags]) => attributeTags.filter(at => at.name.toLocaleLowerCase().includes(searchText)).map(at => at.id)), operators_2.map(searchResults => new attribute_tag_actions_1.SearchAttributeTagsSuccess(searchResults)));
        this.loadListOnNav$ = this.actions$.pipe(operators_1.ofRoute(['/attribute-tags']), operators_2.mergeMap(_ => [
            // new LoadAttributeTags(),
            new attribute_tag_actions_1.LoadAttributeTagsByPagination({ page: '0', size: '200' }),
            new policy_group_actions_1.LoadPolicyGroups(),
            new asset_actions_1.LoadAssets(),
            new attribute_tag_actions_1.SelectAttributeTag(undefined)
        ]));
        // routing attribute-tags
        this.loadAttributeTagNav$ = this.actions$.pipe(operators_1.ofRoute(['/attribute-tags/:id']), operators_2.map((action) => action.payload), operators_2.mergeMap(route => [
            new attribute_tag_actions_1.LoadAttributeTag(+route.params['id']),
            new attribute_tag_actions_1.SelectAttributeTag(+route.params['id'])
        ]));
    }
};
__decorate([
    effects_1.Effect()
], AttributeTagEffects.prototype, "loadAttributeTags$", void 0);
__decorate([
    effects_1.Effect()
], AttributeTagEffects.prototype, "loadAttributeTagsByPagination$", void 0);
__decorate([
    effects_1.Effect()
], AttributeTagEffects.prototype, "loadAttributeTag$", void 0);
__decorate([
    effects_1.Effect()
], AttributeTagEffects.prototype, "createAttributeTag$", void 0);
__decorate([
    effects_1.Effect()
], AttributeTagEffects.prototype, "updateAttributeTag$", void 0);
__decorate([
    effects_1.Effect()
], AttributeTagEffects.prototype, "deleteAttributeTag$", void 0);
__decorate([
    effects_1.Effect()
], AttributeTagEffects.prototype, "searchAttributeTags", void 0);
__decorate([
    effects_1.Effect()
], AttributeTagEffects.prototype, "loadListOnNav$", void 0);
__decorate([
    effects_1.Effect()
], AttributeTagEffects.prototype, "loadAttributeTagNav$", void 0);
AttributeTagEffects = __decorate([
    core_1.Injectable()
], AttributeTagEffects);
exports.AttributeTagEffects = AttributeTagEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlLXRhZy5lZmZlY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2F0dHJpYnV0ZS10YWcvc3RhdGUvYXR0cmlidXRlLXRhZy5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBaUU7QUFFakUsOENBT3dCO0FBR3hCLGlEQUFtRDtBQUNuRCwwRUFBK0U7QUFDL0UsdUVBQWdFO0FBQ2hFLDhFQUF3RTtBQUN4RSxtR0FBNEY7QUFFNUYsbUVBdUJpQztBQUlqQyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQWtIOUIsWUFDbUIsUUFBaUIsRUFDakIsZUFBb0MsRUFDcEMsa0JBQXNDO1FBRnRDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsb0JBQWUsR0FBZixlQUFlLENBQXFCO1FBQ3BDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFuSC9DLHVCQUFrQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDbkUsZ0JBQU0sQ0FBQywrQ0FBdUIsQ0FBQyxpQkFBaUIsQ0FBQyxFQUNqRCxxQkFBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQzlCLGVBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksZ0RBQXdCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDL0MsdUJBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxnREFBd0IsRUFBRSxDQUFDLENBQ3JELENBQ0YsQ0FDRixDQUFDO1FBR1EsbUNBQThCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUMvRSxnQkFBTSxDQUFDLCtDQUF1QixDQUFDLDZC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