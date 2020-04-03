"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModalActionTypes;
(function (ModalActionTypes) {
    ModalActionTypes["OpenModal"] = "[Modal] Open Modal";
    ModalActionTypes["CloseModal"] = "[Modal] Close Modal";
    ModalActionTypes["OpenModalSuccess"] = "[Modal] Open Modal Success";
    ModalActionTypes["CloseModalSuccess"] = "[Modal] Close Modal Success";
})(ModalActionTypes = exports.ModalActionTypes || (exports.ModalActionTypes = {}));
class OpenModal {
    constructor(payload) {
        this.payload = payload;
        this.type = ModalActionTypes.OpenModal;
    }
}
exports.OpenModal = OpenModal;
class CloseModal {
    constructor() {
        this.type = ModalActionTypes.CloseModal;
    }
}
exports.CloseModal = CloseModal;
class OpenModalSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ModalActionTypes.OpenModalSuccess;
    }
}
exports.OpenModalSuccess = OpenModalSuccess;
class CloseModalSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ModalActionTypes.CloseModalSuccess;
    }
}
exports.CloseModalSuccess = CloseModalSuccess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL3N0YXRlL21vZGFsLmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxJQUFZLGdCQUtYO0FBTEQsV0FBWSxnQkFBZ0I7SUFDMUIsb0RBQWdDLENBQUE7SUFDaEMsc0RBQWtDLENBQUE7SUFDbEMsbUVBQStDLENBQUE7SUFDL0MscUVBQWlELENBQUE7QUFDbkQsQ0FBQyxFQUxXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBSzNCO0FBYUQsTUFBYSxTQUFTO0lBRXBCLFlBQW1CLE9BQXFCO1FBQXJCLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFEL0IsU0FBSSxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQztJQUNDLENBQUM7Q0FDOUM7QUFIRCw4QkFHQztBQUVELE1BQWEsVUFBVTtJQUF2QjtRQUNXLFNBQUksR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUM7SUFDOUMsQ0FBQztDQUFBO0FBRkQsZ0NBRUM7QUFFRCxNQUFhLGdCQUFnQjtJQUUzQixZQUFtQixPQUFxQjtRQUFyQixZQUFPLEdBQVAsT0FBTyxDQUFjO1FBRC9CLFNBQUksR0FBRyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNOLENBQUM7Q0FDOUM7QUFIRCw0Q0FHQztBQUVELE1BQWEsaUJBQWlCO0lBRTVCLFlBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRHpCLFNBQUksR0FBRyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQztJQUNiLENBQUM7Q0FDeEM7QUFIRCw4Q0FHQyJ9