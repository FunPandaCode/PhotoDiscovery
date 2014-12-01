describe("Flick", function () {
    var module;
    beforeEach(function () {
        module = angular.module("app.Services");
    });

    it("should be registered", function () {
        expect(module).not.toBe(null);
    });
});

describe("Flick Constant", function () {
    beforeEach(module("app.Services"));

    var apiKey, apiSecret, flickrRestUrl;

    beforeEach(inject(function (_apiKey_, _apiSecret_, _flickrRestUrl_) {
        apiKey = _apiKey_;
        apiSecret = _apiSecret_;
        flickrRestUrl = _flickrRestUrl_;
    }));

    it("api key should exists", function () {
        expect(apiKey).not.toBe(null);
    });

    it("api secret should exists", function () {
        expect(apiSecret).not.toBe(null);
    });

    it("rest url should exists", function () {
        expect(flickrRestUrl).not.toBe(null);
    });
});
