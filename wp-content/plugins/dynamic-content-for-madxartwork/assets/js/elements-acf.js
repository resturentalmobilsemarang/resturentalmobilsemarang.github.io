var isAdminBar = false,
        isEditMode = false;


(function ($) {
    var get_acf_ElementSettings = function ($element) {
        var elementSettings = {},
                modelCID = $element.data('model-cid');

        if (madxartworkFrontend.isEditMode() && modelCID) {
            var settings = madxartworkFrontend.config.elements.data[ modelCID ],
                    settingsKeys = madxartworkFrontend.config.elements.keys[ settings.attributes.widgetType || settings.attributes.elType ];

            jQuery.each(settings.getActiveControls(), function (controlKey) {
                if (-1 !== settingsKeys.indexOf(controlKey)) {
                    elementSettings[ controlKey ] = settings.attributes[ controlKey ];
                }
            });
        } else {
            elementSettings = $element.data('settings') || {};
        }
        return elementSettings;
    }
    //
    var dropCap = function ($target) {
        if ($target.length) {
            $first_p = $target.html().trim(); // removes any leading whitespace
            if ($first_p.charAt(0) != '<') {
                // not a html tag
                $target.html('<span class="madxartwork-drop-cap"><span class="madxartwork-drop-cap-letter">' + $first_p.charAt(0) + '</span></span>' + $first_p.substring(1));
            } else {
                //alert($target.find('*:first-child').text());
                $first_p = $target.find('*:first-child').html().trim();
                $target.find('*:first-child').html('<span class="madxartwork-drop-cap"><span class="madxartwork-drop-cap-letter">' + $first_p.charAt(0) + '</span></span>' + $first_p.substring(1));
            }
        }
    }
    var WidgetElementsACFDCEHandler = function ($scope, $) {

        var elementSettings = get_acf_ElementSettings($scope);
        //alert('acf');

        if (elementSettings.drop_cap) {
            var target = $scope.find('p:first');
            //alert(target.length);
            if (!target.length) {
                target = $scope.find('.edc-acf:first');
            }
            dropCap(target);

            /*$scope.find('p:first-child, p:first-child > *:first-letter').html(function (i, html)
             {
             return html.replace(/^[^a-zA-Z]*([a-zA-Z])/g, '<span class="madxartwork-drop-cap"><span class="madxartwork-drop-cap-letter">$1</span></span>');
             });*/
        }
        var bindEvents = function () {
            $scope.find('.madxartwork-custom-embed-image-overlay').on('click', handleVideo);
        };
        var handleVideo = function () {
            if (elementSettings.lightbox) {
                alert(elementSettings.lightbox);
                // var elementSettings = get_acf_ElementSettings(),
                // 	position = elementSettings.lightbox_content_position;
                /*
                 var options = {
                 type: 'video',
                 url: this.elements.$videoFrame.attr( 'src' ),
                 modalOptions: {
                 id: 'madxartwork-video-modal-' + this.getID(),
                 videoAspectRatio: elementSettings.aspect_ratio,
                 entranceAnimation: elementSettings.lightbox_content_animation,
                 position: {
                 my: position,
                 at: position
                 }
                 }
                 };*/

                //getLightBox().showModal( options );
            } else {
                //alert('sss');
                $(this).fadeOut(1000, function () {

                    $(this).remove();
                    playVideo();
                });


            }
        };
        var playVideo = function () {
            var $videoFrame = $scope.find('iframe'),
                    newSourceUrl = $videoFrame[0].src.replace('&autoplay=0', '');

            $videoFrame[0].src = newSourceUrl + '&autoplay=1';
        };
        bindEvents();




    };

    // Make sure you run this code under madxartwork..
    $(window).on('madxartwork/frontend/init', function () {
        madxartworkFrontend.hooks.addAction('frontend/element_ready/dyncontel-acf.default', WidgetElementsACFDCEHandler);
    });
})(jQuery);
