///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////.  AJAX Modal System  ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
var urlAttuale;
var titoloAttuale;

var ajaxPage_init = function (elementSettings, scopeId) {
    
    var tid = elementSettings.ajax_page_template;
    if (jQuery('#dce-wrap').length == 0) {
        jQuery('body').addClass('dce-ajax-page-open');
        jQuery('body').wrapInner('<div id="dce-outer-wrap"><div id="dce-wrap"></div></div>');
    }
    jQuery('.ajax-open[data-id=' + scopeId + ']').on('click', '.dce-wrapper a', function (e) {

        urlAttuale = location.pathname;
        titoloAttuale = document.title;
        //console.log(location);
        //alert(titoloAttuale);
        jQuery('body').addClass('modal-p-' + scopeId);
        //
        var modale = '<div class="modals-p modals-p-' + scopeId + '"><div class="wrap-p"><div class="modal-p"></div><a href="' + urlAttuale + '" class="close"><span class="dce-quit-ics"></span></a></div></div>';
        var loading = '<div class="load-p"></div>';
        var linkHref = jQuery(this).attr('href');

        jQuery('body').append(modale).append(loading);

        newLocation = linkHref;
        //
        jQuery.ajax({
            url: dceAjaxPath.ajaxurl, //linkHref, //
            dataType: "html",
            type: 'POST',
            //context: document.body,
            data: {
                'action': 'modale_action',
                'post_href': linkHref,
                'template_id': tid
            },
            error: function () {
                erroreModale();
                //alert('error');
            },

            success: function (data, status, xhr) {
                //
                var $result = data; //$.parseHTML(xhr.responseText,true);
                //
                riempiModale($result, linkHref, scopeId);
            },

        });
        // -------------------------------------------------
        jQuery('.modals-p .wrap-p').find('.close').on('click', function (e) {
            var linkHref = jQuery(this).attr('href');
            chiudiModale(linkHref, scopeId);
            return false;
        });
        jQuery(document).on('keyup', function (e) {
            if (e.keyCode == 27) { // escape key maps to keycode `27`
                chiudiModale(urlAttuale, scopeId)
            }
        });
        //
        return false;
    });
}
/*if( window.history && window.history.pushState ){
 
   history.pushState( "nohb", null, "" );
   $(window).on( "popstate", function(event){
     if( !event.originalEvent.state ){
       history.pushState( "nohb", null, "" );
       return;
     }
   });
 }*/

function googleAnalytics_view(path, title, scopeId) {

    ga('set', {page: path, title: title});
    ga('send', 'pageview');
}
function riempiModale(data, url, scopeId) {
    if (0 != data) {
        var posScroll = jQuery('body').scrollTop();


        jQuery('.load-p').remove();
        var titoloPagina = jQuery(data).find('.titolo-nativo').text();

        var quelloCheVoglio = jQuery(data).filter('.content-p');//jQuery(data).find('.madxartwork-917');
        quelloCheVoglio.find('.titolo-nativo').remove();

        jQuery('body').addClass('modal-p-on');

        jQuery('.modals-p-' + scopeId + ' .modal-p').html(quelloCheVoglio); //.append(stili);

        //console.log(madxartworkFrontend);


        jQuery('body.modal-p-on.modal-p-' + scopeId + ' .wrap-p .modal-p').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (el) {

            //alert(posScroll);
            jQuery('html, body').addClass('no-scroll');
            jQuery('body').addClass('cancella-body');
        });

        var element_el = quelloCheVoglio.find('.madxartwork-element');
        element_el.each(function (i) {
            var el = jQuery(this).data('element_type');
            madxartworkFrontend.elementsHandler.runReadyTrigger(jQuery(this));
        });

        var stateObj = {url: "bar"};
        //window.history.pushState(stateObj, titoloPagina, url);
        if (url != window.location) {
            //alert(url);
            var elementSettings = get_Dyncontel_ElementSettings(jQuery(this));
            if (elementSettings.change_url) {
                window.history.pushState(null, null, url);
            }
            document.title = titoloPagina;
        }

    }


}

function chiudiModale(url, scopeId) {
    jQuery('html, body').removeClass('no-scroll');
    //
    jQuery('body').removeClass('modal-p-on cancella-body').addClass('modal-p-off');
    jQuery('body.modal-p-off.modal-p-' + scopeId + ' .wrap-p .modal-p').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (el) {
        //alert('fine');
        jQuery(document).off('keyup');
        jQuery('.modals-p .wrap-p').find('.close').off('click');
        jQuery('.modals-p-' + scopeId).remove();
        //
        jQuery(el.currentTarget).off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
        //
        if (url != window.location) {
            window.history.pushState(null, null, url);
            document.title = titoloAttuale;
        }
    });
    jQuery('body.modal-p-off.modal-p-' + scopeId + ' #dce-wrap').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (el) {
        //
        //console.log(el);
        //alert('fine');
        //
        //cancellaEventi(scopeId);
        jQuery('body').removeClass('modal-p-off modal-p-' + scopeId);

        jQuery(el.currentTarget).off('webkitAnimationEnd oanimationend msAnimationEnd animationend');

    });
}
function erroreModale() {
    jQuery('.modals-p').html('<p>An error has occurred</p>');
}
function requestContent(file) {
    jQuery('.content').load(file + ' .content');
}

/*window.addEventListener('popstate', function(e) {
 
 // var character = e.state;
 // alert(character);
 // console.log('state: '+character);
 
 // if (character == null) {
 // 	chiudiModale();
 // }else{
 
 // }
 
 
 
 // if (character == null) {
 //   removeCurrentClass();
 //   textWrapper.innerHTML = " ";
 //   content.innerHTML = " ";
 //   document.title = defaultTitle;
 // } else {
 //     updateText(character);
 //     requestContent(character + ".html");
 //     addCurrentClass(character);
 //     document.title = "Ghostbuster | " + character;
 // }
 });*/
//////////////////////////////////////////////////////////////////
( function( $ ) {
$( window ).on( 'madxartwork/frontend/init', function() {
    if (jQuery('.ajax-open').length > 0) {

        jQuery('.ajax-open').each(function (i, el) {
            var elementSettings_ajaxOpen = get_Dyncontel_ElementSettings(jQuery(this));
            //alert(jQuery(this).attr('data-id')+' '+elementSettings_ajaxOpen.ajax_page_template);
            ajaxPage_init(elementSettings_ajaxOpen, jQuery(this).attr('data-id'));
        });
    }
} );
} )( jQuery );
