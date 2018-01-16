"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page");
var AppComponent = (function () {
    function AppComponent(page) {
        this.page = page;
    }
    AppComponent.prototype.addNumbers = function () {
        var numberATextField = this.page.getViewById('numberATextField');
        var numberBTextField = this.page.getViewById('numberBTextField');
        var numberA = parseInt(numberATextField.text, 10);
        var numberB = parseInt(numberBTextField.text, 10);
        var result = numberA + numberB;
        alert(numberA + " + " + numberB + " = " + result);
        console.log(numberA + " + " + numberB + " = " + result);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            template: "\n        <ActionBar title=\"Calculator\" class=\"action-bar\"></ActionBar>\n        <StackLayout orientation=\"vertical\">\n            <TextField id=\"numberATextField\" hint=\"Number A\" padding=\"10\"></TextField>\n            <TextField id=\"numberBTextField\" hint=\"Number B\" padding=\"10\"></TextField>\n            <Button text=\"Add Numbers\" (tap)=\"addNumbers()\"></Button>\n        </StackLayout>\n    "
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0M7QUFDeEMsaURBQThDO0FBYzlDO0lBQ0ksc0JBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQzlCLENBQUM7SUFFRCxpQ0FBVSxHQUFWO1FBQ0ksSUFBTSxnQkFBZ0IsR0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlFLElBQU0sZ0JBQWdCLEdBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUU5RSxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEQsSUFBTSxNQUFNLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUVqQyxLQUFLLENBQUksT0FBTyxXQUFNLE9BQU8sV0FBTSxNQUFRLENBQUMsQ0FBQztRQUU3QyxPQUFPLENBQUMsR0FBRyxDQUFJLE9BQU8sV0FBTSxPQUFPLFdBQU0sTUFBUSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQWZRLFlBQVk7UUFYeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxrYUFPVDtTQUNKLENBQUM7eUNBRTRCLFdBQUk7T0FEckIsWUFBWSxDQWdCeEI7SUFBRCxtQkFBQztDQUFBLEFBaEJELElBZ0JDO0FBaEJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1BhZ2V9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxBY3Rpb25CYXIgdGl0bGU9XCJDYWxjdWxhdG9yXCIgY2xhc3M9XCJhY3Rpb24tYmFyXCI+PC9BY3Rpb25CYXI+XG4gICAgICAgIDxTdGFja0xheW91dCBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCI+XG4gICAgICAgICAgICA8VGV4dEZpZWxkIGlkPVwibnVtYmVyQVRleHRGaWVsZFwiIGhpbnQ9XCJOdW1iZXIgQVwiIHBhZGRpbmc9XCIxMFwiPjwvVGV4dEZpZWxkPlxuICAgICAgICAgICAgPFRleHRGaWVsZCBpZD1cIm51bWJlckJUZXh0RmllbGRcIiBoaW50PVwiTnVtYmVyIEJcIiBwYWRkaW5nPVwiMTBcIj48L1RleHRGaWVsZD5cbiAgICAgICAgICAgIDxCdXR0b24gdGV4dD1cIkFkZCBOdW1iZXJzXCIgKHRhcCk9XCJhZGROdW1iZXJzKClcIj48L0J1dHRvbj5cbiAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgfVxuXG4gICAgYWRkTnVtYmVycygpIHtcbiAgICAgICAgY29uc3QgbnVtYmVyQVRleHRGaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKCdudW1iZXJBVGV4dEZpZWxkJyk7XG4gICAgICAgIGNvbnN0IG51bWJlckJUZXh0RmllbGQgPSA8VGV4dEZpZWxkPnRoaXMucGFnZS5nZXRWaWV3QnlJZCgnbnVtYmVyQlRleHRGaWVsZCcpO1xuXG4gICAgICAgIGNvbnN0IG51bWJlckEgPSBwYXJzZUludChudW1iZXJBVGV4dEZpZWxkLnRleHQsIDEwKTtcbiAgICAgICAgY29uc3QgbnVtYmVyQiA9IHBhcnNlSW50KG51bWJlckJUZXh0RmllbGQudGV4dCwgMTApO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBudW1iZXJBICsgbnVtYmVyQjtcblxuICAgICAgICBhbGVydChgJHtudW1iZXJBfSArICR7bnVtYmVyQn0gPSAke3Jlc3VsdH1gKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhgJHtudW1iZXJBfSArICR7bnVtYmVyQn0gPSAke3Jlc3VsdH1gKTtcbiAgICB9XG59XG4iXX0=