"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestComponents {
}
exports.TestComponents = TestComponents;
TestComponents.pageActionsTestComponent = `
    <div class="page-actions" id="page-actions-container"></div>
    <ng-template cdk-portal>
      <fa-icon *ngIf="isUpdating | async" [icon]="icons.faSpinner" [spin]="true"></fa-icon>
      <ng-content></ng-content>
    </ng-template>
  `;
TestComponents.pageSearchTestComponent = `
    <div id="page-search-actions-container"></div>
    <ng-template cdk-portal>
      <form class="form-inline" [formGroup]="form">
        <div class="search d-flex mr-3">
          <fa-icon [icon]="icons.faSearch" class="fa-search"></fa-icon>
          <input type="search" class="form-control border" formControlName="textSearch" placeholder="Search" />
        </div>
        <div class="input-group">
          <button class="btn btn-primary" (click)="openFilters()">
            <fa-icon [icon]="icons.faFilter"></fa-icon>
          </button>
        </div>
      </form>
      <div class="filter-actions">
        <ng-content></ng-content>
      </div>
    </ng-template>
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1jb21wb25lbnRzLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL3Rlc3QtaGVscGVycy90ZXN0LWNvbXBvbmVudHMuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsTUFBYSxjQUFjOztBQUEzQix3Q0E0QkM7QUEzQlEsdUNBQXdCLEdBQUc7Ozs7OztHQU1qQyxDQUFDO0FBRUssc0NBQXVCLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWtCbEMsQ0FBQyJ9