"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NgxDataTable {
    constructor(router) {
        this.router = router;
        this.pagesLoaded = 0;
        this.rows = [];
        this.headerHeight = 56;
        this.footerHeight = 54;
        this.rowHeight = 44;
        this.rowsHeight = this.rowHeight * this.rows.length;
        this.pageLimit = 200;
    }
    ngOnInit() {
        this.getData();
    }
    onActivate($event) {
        if ($event.type === 'click') {
            this.router.navigate($event.row.routerLink);
        }
    }
    // TODO: figure out a way to create a load page fn that calls a service? maybe this will work with the NGRX implementation
    // loadPage(serviceApi): void {
    //   console.log('TCL: NgxDataTable -> serviceApi', serviceApi);
    //   this.isLoading = true;
    //   console.log('load the page');
    //   this.pagesLoaded++;
    //   const page = this.pagesLoaded.toString();
    //   serviceApi('200', page).subscribe(results => {
    //     console.log(results);
    //     let rows = [...this.rows, ...results];
    //     rows = this.removeDuplicates(rows, 'id');
    //     this.rows = rows;
    //     this.isLoading = false;
    //   });
    // }
    removeDuplicates(myArr, prop) {
        // tslint:disable-next-line:arrow-return-shorthand
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }
}
exports.NgxDataTable = NgxDataTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGF0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvY2xhc3Nlcy9uZ3gtZGF0YXRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsTUFBc0IsWUFBWTtJQWdCaEMsWUFDUyxNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQWZ2QixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRVYsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRS9DLGNBQVMsR0FBRyxHQUFHLENBQUM7SUFVaEIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQU9ELFVBQVUsQ0FBQyxNQUFNO1FBQ2YsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQztJQUVELDBIQUEwSDtJQUMxSCwrQkFBK0I7SUFDL0IsZ0VBQWdFO0lBQ2hFLDJCQUEyQjtJQUMzQixrQ0FBa0M7SUFFbEMsd0JBQXdCO0lBQ3hCLDhDQUE4QztJQUU5QyxtREFBbUQ7SUFDbkQsNEJBQTRCO0lBQzVCLDZDQUE2QztJQUM3QyxnREFBZ0Q7SUFFaEQsd0JBQXdCO0lBQ3hCLDhCQUE4QjtJQUM5QixRQUFRO0lBQ1IsSUFBSTtJQUVKLGdCQUFnQixDQUFDLEtBQVksRUFBRSxJQUFZO1FBQ3pDLGtEQUFrRDtRQUNsRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3BDLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBRUY7QUEvREQsb0NBK0RDIn0=