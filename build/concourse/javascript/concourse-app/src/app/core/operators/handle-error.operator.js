"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const helpers_1 = require("@concourse/shared/helpers");
const error_actions_1 = require("../error/state/error.actions");
const getErrorMessage = (response) => {
    const error = response instanceof http_1.HttpErrorResponse ? response.error : response;
    if (!helpers_1.Util.isNullOrUndefined(error) && !helpers_1.Util.isNullOrUndefined(error.message)) {
        return error.message;
    }
    if (!helpers_1.Util.isNullOrUndefined(error) && !helpers_1.Util.isNullOrUndefined(error.error_description)) {
        return error.error_description;
    }
    return `An unknown error occurred (${response['status']})`;
};
exports.handleError = (displayType = 'toast', stateHandlers, cb) => (source) => source.pipe(operators_1.catchError(errorResponse => {
    if (helpers_1.Util.isFunction(cb)) {
        cb(errorResponse);
    }
    return rxjs_1.of(new error_actions_1.AddApplicationError({
        message: getErrorMessage(errorResponse),
        displayType,
        rawError: errorResponse
    }), ...(helpers_1.Util.isArray(stateHandlers) ? stateHandlers : [stateHandlers]));
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlLWVycm9yLm9wZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvb3BlcmF0b3JzL2hhbmRsZS1lcnJvci5vcGVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUF5RDtBQUd6RCwrQkFBd0Q7QUFDeEQsOENBQTRDO0FBRTVDLHVEQUFpRDtBQUNqRCxnRUFBbUU7QUFHbkUsTUFBTSxlQUFlLEdBQUcsQ0FBQyxRQUFtQyxFQUFVLEVBQUU7SUFDdEUsTUFBTSxLQUFLLEdBQUcsUUFBUSxZQUFZLHdCQUFpQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDaEYsSUFBSSxDQUFDLGNBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDNUUsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO0tBQ3RCO0lBRUQsSUFBSSxDQUFDLGNBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsRUFBRTtRQUN0RixPQUFPLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztLQUNoQztJQUVELE9BQU8sOEJBQThCLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO0FBQzdELENBQUMsQ0FBQztBQUVXLFFBQUEsV0FBVyxHQUFHLENBQ3pCLGNBQWdDLE9BQU8sRUFDdkMsYUFBaUMsRUFDakMsRUFBaUMsRUFDQyxFQUFFLENBQ3BDLENBQUMsTUFBMEIsRUFBc0IsRUFBRSxDQUNqRCxNQUFNLENBQUMsSUFBSSxDQUNULHNCQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7SUFDekIsSUFBSSxjQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ3ZCLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUNuQjtJQUNELE9BQU8sU0FBRSxDQUNQLElBQUksbUNBQW1CLENBQUM7UUFDdEIsT0FBTyxFQUFFLGVBQWUsQ0FBQyxhQUFhLENBQUM7UUFDdkMsV0FBVztRQUNYLFFBQVEsRUFBRSxhQUFhO0tBQ3hCLENBQUMsRUFDRixHQUFHLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQ25FLENBQUM7QUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDIn0=