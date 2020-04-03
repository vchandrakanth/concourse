"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RouterActionTypes;
(function (RouterActionTypes) {
    RouterActionTypes["Go"] = "[Router] Go";
    RouterActionTypes["Back"] = "[Router] Back";
    RouterActionTypes["Forward"] = "[Router] Forward";
    RouterActionTypes["Change"] = "[Router] Change";
})(RouterActionTypes = exports.RouterActionTypes || (exports.RouterActionTypes = {}));
class RouterGo {
    constructor(payload) {
        this.payload = payload;
        this.type = RouterActionTypes.Go;
    }
}
exports.RouterGo = RouterGo;
class RouterBack {
    constructor() {
        this.type = RouterActionTypes.Back;
    }
}
exports.RouterBack = RouterBack;
class RouterForward {
    constructor() {
        this.type = RouterActionTypes.Forward;
    }
}
exports.RouterForward = RouterForward;
class RouterChange {
    constructor(payload) {
        this.payload = payload;
        this.type = RouterActionTypes.Change;
    }
}
exports.RouterChange = RouterChange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9yb3V0ZXIvcm91dGVyLmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxJQUFZLGlCQUtYO0FBTEQsV0FBWSxpQkFBaUI7SUFDM0IsdUNBQWtCLENBQUE7SUFDbEIsMkNBQXNCLENBQUE7SUFDdEIsaURBQTRCLENBQUE7SUFDNUIsK0NBQTBCLENBQUE7QUFDNUIsQ0FBQyxFQUxXLGlCQUFpQixHQUFqQix5QkFBaUIsS0FBakIseUJBQWlCLFFBSzVCO0FBRUQsTUFBYSxRQUFRO0lBRW5CLFlBQW1CLE9BQXFCO1FBQXJCLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFEL0IsU0FBSSxHQUFHLGlCQUFpQixDQUFDLEVBQUUsQ0FBQztJQUNPLENBQUM7Q0FDOUM7QUFIRCw0QkFHQztBQUVELE1BQWEsVUFBVTtJQUF2QjtRQUNXLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7SUFDekMsQ0FBQztDQUFBO0FBRkQsZ0NBRUM7QUFFRCxNQUFhLGFBQWE7SUFBMUI7UUFDVyxTQUFJLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDO0lBQzVDLENBQUM7Q0FBQTtBQUZELHNDQUVDO0FBRUQsTUFBYSxZQUFZO0lBRXZCLFlBQW1CLE9BQXlCO1FBQXpCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBRG5DLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7SUFDTyxDQUFDO0NBQ2xEO0FBSEQsb0NBR0MifQ==