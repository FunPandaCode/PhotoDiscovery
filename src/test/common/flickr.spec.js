describe('Flick', function () {
    var module;
    beforeEach(function () {
        module = angular.module('app.Services');
    });

    it('should be registered', function () {
        expect(module).not.toBe(null);
    });
});

describe('Flick Constant', function () {
    beforeEach(module('app.Services'));

    var FlickrConstants;

    beforeEach(inject(function (_FlickrConstants_) {
        FlickrConstants = _FlickrConstants_;
    }));

    it('api key should exists', function () {
        expect(FlickrConstants.KEY).not.toBe(null);
    });

    it('api secret should exists', function () {
        expect(FlickrConstants.SECRET).not.toBe(null);
    });

    it('rest url should exists', function () {
        expect(FlickrConstants.REST_URL).not.toBe(null);
    });
});
