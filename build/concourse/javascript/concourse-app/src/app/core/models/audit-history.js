"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const serde_1 = require("./serde");
class AuditHistory extends serde_1.Serde {
    serialize() {
        console.error('AuditHistory.serialize() not implemented');
    }
    populate({ userEntities }) {
        return this.copyWith(Object.assign({}, (!helpers_1.Util.isUndefined(this.updateBy) && !helpers_1.Util.isUndefined(userEntities) ? { updatedByUser: userEntities[this.updateBy] } : {})));
    }
}
exports.AuditHistory = AuditHistory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXQtaGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGVscy9hdWRpdC1oaXN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQWlEO0FBRWpELG1DQUFnQztBQUdoQyxNQUFhLFlBQWEsU0FBUSxhQUFtQjtJQVVuRCxTQUFTO1FBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxRQUFRLENBQUMsRUFBRSxZQUFZLEVBRXRCO1FBQ0MsT0FBTyxJQUFJLENBQUMsUUFBUSxtQkFDZixDQUFDLENBQUMsY0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUM5SCxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBckJELG9DQXFCQyJ9