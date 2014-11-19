describe("Main app module", function() {
    var module;
    beforeEach(function() {
        module = angular.module("PhotoDiscovery");
    });

    it("should be registered", function() {
        expect(module).not.toBe(null);
    });
});

describe("Main app module", function() {
    beforeEach(module("PhotoDiscovery"));

    var appName;

    beforeEach(inject(function (_appName_) {
        appName = _appName_;
    }));

    it("app name should be", function() {
        expect(appName).toMatch('Photo Discovery');
    });
});
