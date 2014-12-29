(function () {
    'use strict';

    angular
        .module('app.PhotoGrid')
        .directive('photoGallery', PhotoGallery);

    PhotoGallery.$inject = ['$log'];

    function PhotoGallery($log) {
        $log.info('PhotoGallery created');

        return {
            restrict: 'E',
            scope: {},
            link: link
        };

        function link() {
            (function ($, F) {
                F.transitions.resizeIn = function() {
                    var previous = F.previous,
                        current  = F.current,
                        startPos = previous.wrap.stop(true).position(),
                        endPos   = $.extend({opacity : 1}, current.pos);

                    startPos.width  = previous.wrap.width();
                    startPos.height = previous.wrap.height();

                    previous.wrap.stop(true).trigger('onReset').remove();

                    delete endPos.position;

                    current.inner.hide();

                    current.wrap.css(startPos).animate(endPos, {
                        duration : current.nextSpeed,
                        easing   : current.nextEasing,
                        step     : F.transitions.step,
                        complete : function() {
                            F._afterZoomIn();

                            current.inner.fadeIn('fast');
                        }
                    });
                };

            }(jQuery, jQuery.fancybox));

            $('.fancybox')
                .attr('rel', 'gallery')
                .fancybox({
                    padding : [15,0,8,0],
                    nextMethod : 'resizeIn',
                    nextSpeed  : 250,
                    prevMethod : false,
                    beforeShow: function () {
                        /* Disable right click */
                        $.fancybox.wrap.bind('contextmenu', function (e) {
                            return false;
                        });

                        /*
                         '<div class="pull-right" style="margin-right: 10px;">' +
                         '<i class="fa fa-camera-retro fa-2x" style="color: red;"></i>' +
                         '</div>' +
                         */
                        if(this.title) {
                            this.title =    '<div class="pull-left" style="margin-left: 10px;">' +
                                                '<span style="font-weight: bold;">' +this.title + '</span><br>' +
                                                '<span style="font-style: italic; font-size: smaller;">by ' + this.element.data('owner') + '</span>' +
                                            '</div>' +

                                            '<div class="clearfix">&nbsp;</div>';
                        }
                    },
                    helpers : {
                        title : {
                            type : 'inside'
                        }
                    }
                });
        }
    }
})();
