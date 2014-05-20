var baseUrl = 'file:///C:/Users/jtian/Documents/GitHub/TestingDemo/src/index.html';
var numDefaultCars = 23;

describe('AssetHubCloud homepage', function() {
    var homepage;

    beforeEach(function() {
        homepage = browser.driver.get(baseUrl);
    });

    describe('has a Search tab that', function() {
        it('should load the default cars', function() {
            //console.log on element(by.repeater('car in carListing').row(0)).getText() doesn't work
            expect(element(by.repeater('car in carListing').row(0)).getText()).toEqual('1984   Porsche 930  ');
        });

        it('should allow you to delete cars', function() {
            // we need to use WebDriver API since Protractor is a bit weird about rows and columns
            element(by.repeater('car in carListing').row(0)).findElement(By.css('input')).click();
            element(by.buttonText('Delete')).click();
            expect(element(by.repeater('car in carListing').row(0)).getText()).toEqual('2012   Acura TL  ');
        });

        it('should be filterable', function() {
            element(by.css('input[placeholder="Search cars..."]')).sendKeys('Ac');
            expect(element(by.repeater('car in carListing').row(0)).getText()).toEqual('2012   Acura TL  ');
        });
    });

    describe('has an Add tab that', function() {
        beforeEach(function() {
            element.all(by.css('a[ng-click="select()"')).then(function(arr){
                arr[1].click();
            });
        });

        it('should let you add cars', function() {
            element(by.model('tabs.newYear')).sendKeys('1999');
            element(by.model('tabs.newModel')).sendKeys('Toyota Camry');
            element(by.buttonText('+')).click();
            expect(element(by.repeater('car in carListing').row(numDefaultCars)).getText()).toEqual('1999   Toyota Camry  ');
        });

        it('should validate the year entry', function() {
            element(by.model('tabs.newYear')).sendKeys('199');
            element(by.model('tabs.newModel')).sendKeys('Toyota Camry');
            element(by.buttonText('+')).click();
            expect(element.all(by.repeater('car in carListing')).then(function(arr){return arr.length})).toEqual(numDefaultCars);
            element(by.model('tabs.newYear')).sendKeys('19999');
            element(by.buttonText('+')).click();
            expect(element.all(by.repeater('car in carListing')).then(function(arr){return arr.length})).toEqual(numDefaultCars);
        });
    });
});