"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationsHelper {
    static get types() {
        return {
            field: 'Field',
            dropDown: 'Drop down',
            page: 'Page',
            button: 'Button',
            label: 'Label',
            image: 'Image',
            window: 'Window',
            notification: 'Notification',
            grid: 'Grid',
            menu: 'Menu',
            link: 'Link',
        };
    }
    static getOnlyOneRecordShouldBeDisplayed(type, title) {
        return `There should only be 1 record displayed in ${type} with title ${title}`;
    }
    static getFieldShouldHaveValueValidation(fieldLabel, value, name) {
        return this.getFieldValueValidation(fieldLabel, value, name);
    }
    static getFieldShouldNotHaveValueValidation(fieldLabel, value) {
        return this.getFieldValueValidation(fieldLabel, value, 'not');
    }
    static getFieldValueValidation(fieldLabel, value, status) {
        return `${this.types.field} ${fieldLabel} should ${status} have value as ${value}`;
    }
    static getNoOptionDisplayed(fieldLabel) {
        return `${this.types.dropDown} ${fieldLabel} should not have any option displayed`;
    }
    static getOptionDisplayed(fieldLabel, optionLabel) {
        return `${this.types.dropDown} ${fieldLabel} should display option with text ${optionLabel}`;
    }
    static getPageDisplayedValidation(name) {
        return `${this.types.page} ${this.getDisplayedValidation(name)}`;
    }
    static getFieldDisplayedValidation(name) {
        return `${this.types.field} ${this.getDisplayedValidation(name)}`;
    }
    static getButtonDisplayedValidation(name) {
        return `${this.types.button} ${this.getDisplayedValidation(name)}`;
    }
    static getButtonDisabledValidation(name) {
        return `${this.types.button} ${this.getDisabledValidation(name)}`;
    }
    static getMenuDisplayedValidation(name) {
        return `${this.types.menu} ${this.getDisplayedValidation(name)}`;
    }
    static getMenuShouldNotBeDisplayedValidation(name) {
        return `${this.types.menu} ${this.getNotDisplayedValidation(name)}`;
    }
    static getMenuExpandedValidation(name) {
        return `${this.types.menu} ${name} should be expanded`;
    }
    static getMenuCollapsedValidation(name) {
        return `${this.types.menu} ${name} should be shrinked`;
    }
    static getMenuShouldNotHaveChildValidation(name) {
        return `${this.types.menu} "${name}" should not have children`;
    }
    static getLabelDisplayedValidation(name) {
        return `${this.types.label} '${this.getDisplayedValidation(name)}'`;
    }
    static getImageDisplayedValidation(name) {
        return `${this.types.image} '${this.getDisplayedValidation(name)}'`;
    }
    static getGridDisplayedValidation(name) {
        return `${this.types.grid} ${this.getDisplayedValidation(name)}`;
    }
    static getDeletionConfirmationDisplayedValidation(recordText) {
        return `Confirmation box for deletion of record which contains ${this.getDisplayedValidation(recordText)}`;
    }
    static getRecordCreatedValidation(recordText) {
        return this.getRecordContainsMessage(this.getDisplayedValidation(recordText.join(',')));
    }
    static getRecordDeletedValidation(recordText) {
        return this.getRecordContainsMessage(`${recordText} has been deleted`);
    }
    static getRecordContainsMessage(message) {
        return `Record which contains ${message}`;
    }
    static getDisplayedValidation(name) {
        return `${name} should be displayed`;
    }
    static getSortedValidation(order, name) {
        return `Column ${name} must be sorted in ${order} order`;
    }
    static getAscendingSortedValidation(name) {
        return this.getSortedValidation(name, 'ascending');
    }
    static getDescendingSortedValidation(name) {
        return this.getSortedValidation(name, 'descending');
    }
    static getDisabledValidation(name) {
        return `${name} should be disabled`;
    }
    static getEnabledValidation(name) {
        return `${name} should be enabled`;
    }
    static getEnabledButtonValidation(name) {
        return `${name} should be enabled`;
    }
    static getNotEnabledButtonValidation(name) {
        return `${name} should not be enabled`;
    }
    static getDisabledButtonValidation(name) {
        return `${name} should be disabled`;
    }
    static getErrorDisplayedValidation(error) {
        return `Error ${this.getDisplayedValidation(error)}`;
    }
    static getErrorDisplayedValidationForField(field, error) {
        return `Error ${this.getDisplayedValidation(error)} for field ${field}`;
    }
    static getWindowShouldNotBeDisplayedValidation(name) {
        return `${this.types.window} ${this.getNotDisplayedValidation(name)}`;
    }
    static getNotificationDisplayedValidation(name) {
        return `${this.types.notification} ${this.getDisplayedValidation(name)}`;
    }
    static getHttpStatusCodeValidation(statusCode) {
        return `Http response code should be ${statusCode}`;
    }
    static getHttpResponseBodyValidation(content) {
        return `Http response body should contain ${content}`;
    }
    static getNotDisplayedValidation(name) {
        return `${name} should not be displayed`;
    }
    static getOnlyOneRecordShouldBeDisplayedInGrid(name) {
        return this.getOnlyOneRecordShouldBeDisplayed(this.types.dropDown, name);
    }
    static getOnlyOneRecordShouldBeDisplayedInDropDown(name) {
        return this.getOnlyOneRecordShouldBeDisplayed(this.types.grid, name);
    }
    static getMessageDisplayedValidation(msg) {
        return `Message ${this.getDisplayedValidation(msg)}`;
    }
    static getLinkDisplayedValidation(name) {
        return `${this.types.link} ${this.getDisplayedValidation(name)}`;
    }
    static getLinkNotDisplayedValidation(name) {
        return `${this.types.link} ${this.getNotDisplayedValidation(name)}`;
    }
    static getCheckedValidation(name) {
        return `${name} should be checked`;
    }
    static getElementDisplayedValidation(name) {
        return `${name} element should be displayed`;
    }
    static getIconDisplayedValidation(name) {
        return `Icon ${this.getDisplayedValidation(name)}`;
    }
    static getIconNotDisplayedValidation(name) {
        return `Icon ${this.getNotDisplayedValidation(name)}`;
    }
    static getFieldHasValueValidation(fieldLabel, value) {
        return `Field ${fieldLabel} has value as ${value}`;
    }
    static getFieldDoesNotHaveValueValidation(fieldLabel, value) {
        return `Field ${fieldLabel} does not have value as ${value}`;
    }
    static getAlertHasMessage(message) {
        return `Alert box has message ${message}`;
    }
    static getPresentValidation(name) {
        return `${name} should be present`;
    }
    static getNotPresentValidation(name) {
        return `${name} should not be present`;
    }
    static getSelectedValidation(name) {
        return `${name} should be selected`;
    }
    static getUnSelectedValidation(name) {
        return `${name} should be unselected`;
    }
    static getGreaterThanValidation(actualValue, expectedValue, elementName) {
        return `Field name - ${elementName} : ${actualValue} should be grater than ${expectedValue}`;
    }
    static getLessThanOrEqualToValidation(actualValue, expectedValue, elementName) {
        return `Field name - ${elementName} : ${actualValue} should be less than or equal ${expectedValue}`;
    }
    static getGreaterThanOrEqualToValidation(actualValue, expectedValue, elementName) {
        return `Field name - ${elementName} : ${actualValue} should be greater than or equal ${expectedValue}`;
    }
    static getEqualityValidation(actualValue, expectedValue, elementName) {
        return `Field name - ${elementName} : ${actualValue} should be equal to ${expectedValue}`;
    }
    static getInequalityValidation(actualValue, expectedValue, elementName) {
        return `Field name - ${elementName} : ${actualValue} should be not be equal to ${expectedValue}`;
    }
    static getContainsValidation(actualValue, expectedValue, elementName) {
        return `Field name - ${elementName} : ${actualValue} should contain ${expectedValue}`;
    }
    static getNotContainsValidation(actualValue, expectedValue, elementName) {
        return `Field name - ${elementName} : ${actualValue} should not contain ${expectedValue}`;
    }
}
exports.ValidationsHelper = ValidationsHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbkhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy92YWxpZGF0aW9uSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBYSxpQkFBaUI7SUFDMUIsTUFBTSxLQUFLLEtBQUs7UUFDWixPQUFPO1lBQ0gsS0FBSyxFQUFFLE9BQU87WUFDZCxRQUFRLEVBQUUsV0FBVztZQUNyQixJQUFJLEVBQUUsTUFBTTtZQUNaLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxNQUFNLEVBQUUsUUFBUTtZQUNoQixZQUFZLEVBQUUsY0FBYztZQUM1QixJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLE1BQU07U0FDZixDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sQ0FBQyxpQ0FBaUMsQ0FBQyxJQUFZLEVBQUUsS0FBYTtRQUNoRSxPQUFPLDhDQUE4QyxJQUFJLGVBQWUsS0FBSyxFQUFFLENBQUM7SUFDcEYsQ0FBQztJQUVELE1BQU0sQ0FBQyxpQ0FBaUMsQ0FBQyxVQUFrQixFQUFFLEtBQWEsRUFBRSxJQUFZO1FBQ3BGLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELE1BQU0sQ0FBQyxvQ0FBb0MsQ0FBQyxVQUFrQixFQUFFLEtBQWE7UUFDekUsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsTUFBTSxDQUFDLHVCQUF1QixDQUFDLFVBQWtCLEVBQUUsS0FBYSxFQUFFLE1BQWM7UUFDNUUsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLFVBQVUsV0FBVyxNQUFNLGtCQUFrQixLQUFL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