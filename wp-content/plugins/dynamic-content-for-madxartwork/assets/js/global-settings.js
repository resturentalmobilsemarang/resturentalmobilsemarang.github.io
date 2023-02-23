//var settings_global = {};
//var settings_page = {};
var is_animsition = false;
var is_trackerheader = false;
(function ($) {
    //
    //jQuery('body').addClass('dce-animsition');
    var structure_wrapper = '';
    var structure_header = '';
    //var structure_mainContent = '#main';
    //var structure_footer = '#footer';

    var settings_page = null;
    var settings_global = null;

    // TrackerHeader
    var headroom = null;
    var trackerHeader_element = null;
    var viewport = 'window';
    var is_overlay = '';

    // smoothTransition
    var loading_mode = '';
    var loading_style = '';
    var enable_loading = false;

    // -----------
    var initWrapping = function () {
        if (!$('.animsition').length) {
            $('#main').wrapInner('<div class="animsition" data-animsition-in-class="fade-in" data-animsition-in-duration="1000" data-animsition-out-class="fade-out" data-animsition-out-duration="800"></div>');
        }
    }
    //initWrapping();
    var trackerHeaderHandler = function ( ) {
        structure_header = settings_global.selector_header || '';
        // in futuro la classe header comprenderà il wrapper di vari elementi, tipo la top-bar la header
        // e altri elementi che vogliono far parte del trackerHeader.
        is_overlay = Boolean(settings_global.trackerheader_overlay) || false;
        //
        var THoptions = {
            // vertical offset in px before element is first unpinned
            offset: 0,
            // scroll tolerance in px before state changes
            //tolerance : 0,
            // or you can specify tolerance individually for up/down scroll
            tolerance: {
                up: 5,
                down: 0
            },

            // element to listen to scroll events on, defaults to `window`
            scroller: viewport,
            // callback when pinned, `this` is headroom object
            onPin: function () {},
            // callback when unpinned, `this` is headroom object
            onUnpin: function () {},
            // callback when above offset, `this` is headroom object
            onTop: function () {},
            // callback when below offset, `this` is headroom object
            onNotTop: function () {},
            // callback when at bottom of page, `this` is headroom object
            onBottom: function () {},
            // callback when moving away from bottom of page, `this` is headroom object
            onNotBottom: function () {}
        };
        //alert(structure_header);
        // body.dce-trackerheader #masthead
        //
        // pass options as the second argument to the constructor
        // supplied options are merged with defaults
        trackerHeader_element = $(structure_header);
        //alert(structure_header+' '+trackerHeader_element.length);
        if (trackerHeader_element.length > 1) {
            if ($('#trackerheader-wrap').length)
                trackerHeader_element.unwrap();
            trackerHeader_element.wrapAll("<div id='trackerheader-wrap' />");
            trackerHeader_element = $('#trackerheader-wrap');
        }
        if (trackerHeader_element !== null && trackerHeader_element.length) {

            headroom = new Headroom(trackerHeader_element[0], {
                tolerance: {
                    down: 5,
                    up: 10
                },
                offset: 10,
                classes: {
                    // when element is initialised
                    initial: "trackerheader",
                    // when scrolling up
                    pinned: "trackerheader--pinned",
                    // when scrolling down
                    unpinned: "trackerheader--unpinned",
                    // when above offset
                    top: "trackerheader--top",
                    // when below offset
                    notTop: "trackerheader--not-top",
                    // when at bottom of scoll area
                    bottom: "trackerheader--bottom",
                    // when not at bottom of scroll area
                    notBottom: "trackerheader--not-bottom",
                    // when frozen method has been called
                    frozen: "trackerheader--frozen"
                },
            });
            headroom.init();
            is_trackerheader = true;
        }
        //

        if (is_overlay) {
            generete_overlay();
        } else {
            remove_overlay();
        }
    }
    var trackerHeaderHandler_remove = function () {

        if (trackerHeader_element !== null && trackerHeader_element.length) {
            headroom.destroy();
            generete_overlay();
            is_trackerheader = false;
        }
    }
    var resizeHandle = function () {
        var headHeight = trackerHeader_element.outerHeight();
        //alert(headHeight);
        if ($('body.admin-bar').length) {
            //headHeight += 32;
            trackerHeader_element.css('top', 32);
        }
        $('body').css('padding-top', headHeight);
    }
    var remove_overlay = function ( ) {
        //alert('removeResize');
        is_overlay = false;
        resizeHandle();
        $(window).on('resize', resizeHandle);
    }
    var generete_overlay = function ( ) {
        //alert('addResize');
        is_overlay = true;
        $(window).off('resize', resizeHandle);
        $('body').css('padding-top', 0);
    }
    var smoothTransitionHandler = function ( ) {

        // --------------------------------------------------------
        //console.log(madxartwork.settings.page.model.attributes);
        // --------------------------------------------------------
        //console.log(settings_global);
        //alert('smoothTransitionHandler');

        structure_wrapper = settings_global.selector_wrapper || '#wrap';

        var speed_in = Number(settings_global.smoothtransition_speed_in.size) || 500;
        var speed_out = Number(settings_global.smoothtransition_speed_out.zize) || 500;
        var smoothtransition_timingFuncion_in = settings_global.smoothtransition_timingFuncion_in || 'ease-in-out';
        var smoothtransition_timingFuncion_out = settings_global.smoothtransition_timingFuncion_out || 'ease-in-out';

        var smoothtransition_loading_mode = settings_global.smoothtransition_loading_mode || 'circle';
        var smoothtransition_loading_style = settings_global.smoothtransition_loading_style || 'fade';
        //alert(speed_in+ ' ' +speed_out)
        var a_class = settings_global.a_class || 'a:not([target="_blank"]):not([href=""]):not([href^="uploads"]):not([href^="#"]):not([href^="mailto"]):not([href^="tel"]):not(.no-transition):not(.gallery-lightbox):not(.madxartwork-clickable):not(.oceanwp-lightbox):not(.is-lightbox):not(.madxartwork-icon):not(.download-link):not([href^="madxartwork-action"])';
        if (typeof madxartworkFrontend !== "undefined" && madxartworkFrontend.isEditMode()) {
            a_class = 'a.smoothtransition-enable';
        }

        // for enable or disable The Loading spin...
        enable_loading = true;
        if (smoothtransition_loading_mode == 'none') {
            enable_loading = false; //Boolean(settings_global.smoothtransition_enable_loading);
        }

        loading_mode = 'loading-mode-' + smoothtransition_loading_mode || 'circle';
        if (smoothtransition_loading_mode == 'image') {
            loading_style = 'loading-style-' + smoothtransition_loading_style || 'loading-style-rotate';
        }
        if (Boolean(settings_global.smoothtransition_enable_overlay)) {
            if (!$('body.smoothtransition-overlay').length)
                $('body').addClass('smoothtransition-overlay');
        }

        jQuery(a_class).each(function () {
            //console.log(jQuery._data( this, "events" ));
            /*if (!jQuery(this).closest('nav').length) {
             if (jQuery._data( this, "events" )) {
             //console.log(Object.keys(jQuery._data( this, "events" )));
             var a_events = Object.keys(jQuery._data( this, "events" ));
             if ( jQuery.inArray( "click", a_events ) >= 0 ) {
             return;
             }
             }
             }*/
            jQuery(this).addClass('animsition-link');
        });

        jQuery(structure_wrapper).animsition({
            inClass: 'dce-anim-style-in',
            outClass: 'dce-anim-style-out',

            inDuration: speed_in,
            outDuration: speed_out,

            linkElement: '.animsition-link',

            // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
            loading: true,
            loadingParentElement: 'body', //animsition wrapper element
            loadingClass: 'animsition-loading',
            loadingInner: '', // e.g '<img src="loading.svg" />'

            timeout: false,
            timeoutCountdown: 5000,
            onLoadEvent: true,
            browser: ['animation-duration', '-webkit-animation-duration'],
            // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
            // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".

            overlay: false,
            overlayClass: 'animsition-overlay',
            overlayParentElement: 'body',
            transition: function (url) {
                window.location.href = url;
            }
        });
        is_animsition = true;
        //$('.animsition-loading').addClass(loading_mode).addClass(loading_style);

        jQuery(structure_wrapper).on('animsition.outStart', function () {

            //if (!madxartworkFrontend.isEditMode()) {
            jQuery('html,body').addClass('dce-modal-open');
            //}
            jQuery('body.smoothtransition-overlay').addClass('overlay-out');
        });
        jQuery(structure_wrapper).on('animsition.inEnd', function () {

            //if (!madxartworkFrontend.isEditMode()) {
            jQuery('html,body').removeClass('dce-modal-open');
            //}
        });
        jQuery(structure_wrapper).on('animsition.inStart', function () {

        });
    };
    function handleLoadingMode(newValue) {

        if (newValue) {

            loading_style = 'loading-style-' + madxartwork.settings.dynamicooo.model.attributes.smoothtransition_loading_style;

            $('.animsition-loading').removeClass(loading_mode);
            $('.animsition-loading').removeClass(loading_style);
            // reset to default


            if (newValue == 'circle') {

            } else if (newValue == 'image') {

                $('.animsition-loading').addClass(loading_style);
            } else {

            }

            // SI
            // -----------
            loading_mode = 'loading-mode-' + newValue;
            $('.animsition-loading').addClass(loading_mode);

        } else {
            // NO
        }
    }
    function handleOverlay(newValue) {

        if (newValue) {
            // SI
            if (!$('body.smoothtransition-overlay').length)
                $('body').addClass('smoothtransition-overlay');

        } else {
            // NO
            $('body').removeClass('smoothtransition-overlay');

        }
    }
    function handleLoadingStyle(newValue) {

        if (newValue) {
            // SI
            $('.animsition-loading').removeClass(loading_style);
            loading_style = 'loading-style-' + newValue;
            $('.animsition-loading').addClass(loading_style);

        } else {
            // NO
        }
    }
    function handleAnimsition(newValue) {
        $('body').toggleClass('dce-smoothtransition');
        //
        if (newValue) {
            // SI

            if (is_animsition) {

            } else {
                settings_global = madxartwork.settings.dynamicooo.model.attributes;
            }

            var smoothtransitionClassController = settings_global.dce_smoothtransition_class_controller || '';
            if (smoothtransitionClassController)
                smoothTransitionHandler();

            //madxartwork.reloadPreview();

            // ...se lo spinner animsition-loading non esiste lo genero per poter controllare l'anteprima..
            if( !$('.animsition-loading').length ){
                var mainpagewrap = 'body';
                if('#outer-wrap'){
                    mainpagewrap = '#outer-wrap';
                }
                $(mainpagewrap).append('<div class="animsition-loading loading-mode-circle"></div>');
                
            }
        } else {
            // NO
            is_animsition = false;
            loading_mode = '';
            loading_style = '';
            $(structure_wrapper).animsition('destroy');
            $('.animsition-loading').remove();
            $('body').removeClass('smoothtransition-overlay');
        }
    }
    function handleHeaderTracker(newValue) {

        settings_global = madxartwork.settings.dynamicooo.model.attributes;

        if (newValue) {
            // SI
            /*if(!is_trackerheader){
             madxartwork.reloadPreview();
             }else{
             trackerHeaderHandler();
             }*/
            if (!$('body.dce-trackerheader').length)
                $('body').addClass('dce-trackerheader');
            trackerHeaderHandler();
        } else {
            // NO
            if ($('body.dce-trackerheader').length)
                $('body').removeClass('dce-trackerheader');
            trackerHeaderHandler_remove();
        }

    }
    function handleTrackerHeader_Overlay(newValue) {
        if (newValue) {
            // SI
            generete_overlay();
        } else {
            // NO
            remove_overlay();
        }
    }
    // Make sure you run this code under madxartwork..
    $(window).on('madxartwork/frontend/init', function () {

        // per il rendering della preview in EditMode
        if (madxartworkFrontend.isEditMode()) {
            madxartwork.once('preview:loaded', function () {
                // questo è il callBack di fine loading della preview

                /*console.log(madxartwork.settings.dynamicooo.model.attributes);
                 settings_global = madxartwork.settings.dynamicooo.model.attributes;
                 if(!$('body.dce-trackerheader').length) $('body').addClass('.dce-trackerheader');
                 trackerHeaderHandler();*/
            });

            //
            if (madxartwork.settings.dynamicooo) {
                madxartwork.settings.dynamicooo.addChangeCallback('enable_smoothtransition', handleAnimsition);
                madxartwork.settings.dynamicooo.addChangeCallback('dce_smoothtransition_class_controller', handleAnimsition);
                madxartwork.settings.dynamicooo.addChangeCallback('smoothtransition_enable_overlay', handleOverlay);
                madxartwork.settings.dynamicooo.addChangeCallback('smoothtransition_loading_mode', handleLoadingMode);
                madxartwork.settings.dynamicooo.addChangeCallback('smoothtransition_loading_style', handleLoadingStyle);
                //
                madxartwork.settings.dynamicooo.addChangeCallback('enable_trackerheader', handleHeaderTracker);
                madxartwork.settings.dynamicooo.addChangeCallback('dce_trackerheader_class_controller', handleHeaderTracker);
                madxartwork.settings.dynamicooo.addChangeCallback('trackerheader_overlay', handleTrackerHeader_Overlay);
            }
        }

    });
    $(document).on('ready', function () {

        //console.log( dceGlobalSettings );
        if (typeof madxartworkFrontendConfig !== "undefined") {
            settings_global = madxartworkFrontendConfig.settings.dynamicooo;
        } else {
            settings_global = dceGlobalSettings;
        }
        //settings_global = dceGlobalSettings;
        //settings_page = madxartworkFrontendConfig.settings.page;
        //
        if (settings_global) {

            // ------------------------------------------------
            var responsive_smothtransition = settings_global.responsive_smoothtransition || ['desktop', 'tablet', 'mobile'];
            var enableSmoothtransition = settings_global.enable_smoothtransition || '';
            var smoothtransitionClassController = settings_global.dce_smoothtransition_class_controller || '';

            var responsive_trackerheader = settings_global.responsive_trackerheadern || ['desktop', 'tablet', 'mobile'];
            var enableTrackerHeader = settings_global.enable_trackerheader || '';
            var trackerheaderClassController = settings_global.dce_trackerheader_class_controller || '';

            var deviceMode = $('body').attr('data-madxartwork-device-mode') || 'desktop';
            // ------------------------------------------------
            //
            if (enableSmoothtransition && $.inArray(deviceMode, responsive_smothtransition) >= 0 && smoothtransitionClassController)
                smoothTransitionHandler();

            if (enableTrackerHeader && $.inArray(deviceMode, responsive_trackerheader) >= 0 && trackerheaderClassController)
                trackerHeaderHandler();


        }

    });
})(jQuery);
