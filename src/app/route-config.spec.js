describe('route config', function () {
    beforeEach(module('PhotoDiscovery'));

    var state;

    beforeEach(inject(
        function (_$state_) {
            state = _$state_;
        }
    ));

    it('should map routes to controllers', function () {
        expect(state.get('index').controller).not.toBe(null);
    });
});
