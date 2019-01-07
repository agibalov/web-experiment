"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page");
var shared_1 = require("shared");
var AppComponent = (function () {
    function AppComponent(page, calculator) {
        this.page = page;
        this.calculator = calculator;
    }
    AppComponent.prototype.addNumbers = function () {
        var numberATextField = this.page.getViewById('numberATextField');
        var numberBTextField = this.page.getViewById('numberBTextField');
        var numberA = parseInt(numberATextField.text, 10);
        var numberB = parseInt(numberBTextField.text, 10);
        var result = this.calculator.addNumbers(numberA, numberB);
        var message = numberA + " + " + numberB + " = " + result;
        console.log(message);
        alert(message);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            template: "\n        <ActionBar title=\"Calculator\" class=\"action-bar\"></ActionBar>\n        <StackLayout orientation=\"vertical\">\n            <TextField id=\"numberATextField\" hint=\"Number A\" padding=\"10\"></TextField>\n            <TextField id=\"numberBTextField\" hint=\"Number B\" padding=\"10\"></TextField>\n            <Button text=\"Add Numbers\" (tap)=\"addNumbers()\"></Button>\n        </StackLayout>\n    "
        }),
        __metadata("design:paramtypes", [page_1.Page,
            shared_1.Calculator])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0M7QUFDeEMsaURBQThDO0FBRTlDLGlDQUFrQztBQWFsQztJQUNJLHNCQUNZLElBQVUsRUFDVixVQUFzQjtRQUR0QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUNsQyxDQUFDO0lBRUQsaUNBQVUsR0FBVjtRQUNJLElBQU0sZ0JBQWdCLEdBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM5RSxJQUFNLGdCQUFnQixHQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFOUUsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUU1RCxJQUFNLE9BQU8sR0FBTSxPQUFPLFdBQU0sT0FBTyxXQUFNLE1BQVEsQ0FBQztRQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBakJRLFlBQVk7UUFYeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxrYUFPVDtTQUNKLENBQUM7eUNBR29CLFdBQUk7WUFDRSxtQkFBVTtPQUh6QixZQUFZLENBa0J4QjtJQUFELG1CQUFDO0NBQUEsQUFsQkQsSUFrQkM7QUFsQlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7UGFnZX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtZmllbGRcIjtcbmltcG9ydCB7Q2FsY3VsYXRvcn0gZnJvbSBcInNoYXJlZFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8QWN0aW9uQmFyIHRpdGxlPVwiQ2FsY3VsYXRvclwiIGNsYXNzPVwiYWN0aW9uLWJhclwiPjwvQWN0aW9uQmFyPlxuICAgICAgICA8U3RhY2tMYXlvdXQgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPlxuICAgICAgICAgICAgPFRleHRGaWVsZCBpZD1cIm51bWJlckFUZXh0RmllbGRcIiBoaW50PVwiTnVtYmVyIEFcIiBwYWRkaW5nPVwiMTBcIj48L1RleHRGaWVsZD5cbiAgICAgICAgICAgIDxUZXh0RmllbGQgaWQ9XCJudW1iZXJCVGV4dEZpZWxkXCIgaGludD1cIk51bWJlciBCXCIgcGFkZGluZz1cIjEwXCI+PC9UZXh0RmllbGQ+XG4gICAgICAgICAgICA8QnV0dG9uIHRleHQ9XCJBZGQgTnVtYmVyc1wiICh0YXApPVwiYWRkTnVtYmVycygpXCI+PC9CdXR0b24+XG4gICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgY2FsY3VsYXRvcjogQ2FsY3VsYXRvcikge1xuICAgIH1cblxuICAgIGFkZE51bWJlcnMoKSB7XG4gICAgICAgIGNvbnN0IG51bWJlckFUZXh0RmllbGQgPSA8VGV4dEZpZWxkPnRoaXMucGFnZS5nZXRWaWV3QnlJZCgnbnVtYmVyQVRleHRGaWVsZCcpO1xuICAgICAgICBjb25zdCBudW1iZXJCVGV4dEZpZWxkID0gPFRleHRGaWVsZD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ251bWJlckJUZXh0RmllbGQnKTtcblxuICAgICAgICBjb25zdCBudW1iZXJBID0gcGFyc2VJbnQobnVtYmVyQVRleHRGaWVsZC50ZXh0LCAxMCk7XG4gICAgICAgIGNvbnN0IG51bWJlckIgPSBwYXJzZUludChudW1iZXJCVGV4dEZpZWxkLnRleHQsIDEwKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jYWxjdWxhdG9yLmFkZE51bWJlcnMobnVtYmVyQSwgbnVtYmVyQik7XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGAke251bWJlckF9ICsgJHtudW1iZXJCfSA9ICR7cmVzdWx0fWA7XG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICBhbGVydChtZXNzYWdlKTtcbiAgICB9XG59XG4iXX0=