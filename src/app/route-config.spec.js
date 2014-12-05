describe('route config', function () {
    beforeEach(module('PhotoDiscovery'));

    var route;

    beforeEach(inject(
        function (_$route_) {
            route = _$route_;
        }
    ));

    it('should map routes to controllers', function () {
        expect(route.routes['/'].controller).not.toBe(null);
    });
});
