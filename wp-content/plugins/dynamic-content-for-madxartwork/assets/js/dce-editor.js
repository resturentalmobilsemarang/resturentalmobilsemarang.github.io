/*
 * DCE EDITOR
 * dynamic.ooo
 */

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

var dce_model_cid = null;
jQuery(window).on('load', function () {
    madxartwork.hooks.addAction('panel/open_editor/section', function (panel, model, view) {
        var cid = model.cid;
        dce_model_cid = cid;
    });
    madxartwork.hooks.addAction('panel/open_editor/column', function (panel, model, view) {
        var cid = model.cid;
        dce_model_cid = cid;
    });
    madxartwork.hooks.addAction('panel/open_editor/widget', function (panel, model, view) {
        var cid = model.cid;
        dce_model_cid = cid;
    });
});
function dce_get_element_id_from_cid(cid) {
    var iFrameDOM = jQuery("iframe#madxartwork-preview-iframe").contents();
    var eid = iFrameDOM.find('.madxartwork-element[data-model-cid=' + cid + ']').data('id');
    return eid;
}

function dce_disable_save_button() {
// enable save buttons
    jQuery('#madxartwork-panel-saver-button-publish, #madxartwork-panel-saver-button-save-options, #madxartwork-panel-saver-menu-save-draft').addClass('madxartwork-saver-disabled').prop('disabled', true);
    return true;
}

function dce_enable_save_button() {
// enable save buttons
//console.log('enable save button');
    jQuery('#madxartwork-panel-saver-button-publish, #madxartwork-panel-saver-button-save-options, #madxartwork-panel-saver-menu-save-draft').removeClass('madxartwork-saver-disabled').removeClass('madxartwork-disabled').prop('disabled', false).removeProp('disabled');
    return true;
}

function dce_get_setting_name(einput) {
    if (einput.hasClass('madxartwork-input')) {
        if (einput.data('setting') == 'url') {
//console.log(einput.closest('.madxartwork-control').attr('class'));
            var settingName = '';
            jQuery.each(einput.closest('.madxartwork-control').attr('class').split(' '), function (index, element) {
                //console.log(index);
                //console.log(element);
                if (index == 1) {
                    settingName = element.replace('madxartwork-control-', '');
                    return false;
                }
            });
            //console.log(settingName);
            if (settingName) {
                return settingName;
            }
        }
    }
    return einput.data('setting');
}
function dce_toBase64(url, callback) {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}
function dce_getimageSizes(url, callback) {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
        var sizes = {};
        sizes.height = this.height;
        sizes.width = this.width;
        sizes.coef = sizes.height / sizes.width;
        callback(sizes);
    };
    img.src = url;
}
/*
 function dce_popup_toggle(cid, navigator) {
 var settings = madxartworkFrontend.config.elements.data[cid].attributes;
 if (change_data) {
 if (settings['show_popup_editor']) {
 madxartworkFrontend.config.elements.data[cid].attributes['show_popup_editor'] = '';
 } else {
 madxartworkFrontend.config.elements.data[cid].attributes['show_popup_editor'] ='yes';
 }
 }
 //dce_menu_list_item_toggle(cid);
 if (navigator) {
 madxartwork_navigator_element_toggle(cid);
 }
 var eid = dce_get_element_id_from_cid(cid);
 return true;
 }
 */

/******************************************************************************/

// RAW PHP
jQuery(window).load(function () {
    var iFrameDOM = jQuery("iframe#madxartwork-preview-iframe").contents();
    //console.log(madxartwork);
    if (jQuery('#madxartwork-preview-iframe').length) {
        setInterval(function () {
            if (iFrameDOM.find("div.madxartwork-widget-dce-rawphp").length) {
                if (iFrameDOM.find("div.madxartwork-widget-dce-rawphp.madxartwork-loading").length) {
//&& iFrameDOM.find("div[data-id=<?php echo $this->get_id(); ?>]").hasClass('madxartwork-loading')) {
                    dce_disable_save_button();
                    jQuery('#madxartwork-panel-saver-button-publish').addClass('madxartwork-saver-disabled-dce');
                    jQuery('.dce-notice-phpraw').slideDown();
                    //console.log('errore');
                } else {
                    if (jQuery('#madxartwork-panel-saver-button-publish').hasClass('madxartwork-saver-disabled-dce')) {
                        dce_enable_save_button();
                        jQuery('#madxartwork-panel-saver-button-publish').removeClass('madxartwork-saver-disabled-dce');
                    }
                    jQuery('.dce-notice-phpraw').slideUp();
                }
            }
//console.log('controllato php_raw');
        }, 1000);
    }
});

jQuery(document).ready(function () {

    jQuery(document).on('mousedown', '.madxartwork-control-show_points', function (e) {
        console.log(e);
    });
    jQuery(document).on('mousedown', '.madxartwork-control-repeater_shape_path .madxartwork-repeater-fields, .madxartwork-control-repeater_shape_polyline .madxartwork-repeater-fields', function () {
        var repeater_index = jQuery(this).index();
        //alert('shape'+repeater_index);
        // ------------
        var eid = dce_get_element_id_from_cid(dce_model_cid);
        var iFrameDOM = jQuery("iframe#madxartwork-preview-iframe").contents();
        var morphed = iFrameDOM.find('.madxartwork-element[data-id=' + eid + '] svg.dce-svg-morph');
        // ------------
        //morphed.trigger('changeDataMorph',[repeater_index]);
        if (morphed.attr('data-run') == 'paused')
            morphed.attr('data-morphid', repeater_index);
        //scambiaSVGmorphing();
        //morphed.data('changeDataMorph')();
        //morphed.data("morphid", repeater_index).trigger('changeDataMorph');

        //alert(morphed.attr('class')+repeater_index);
        //alert(eid);
        //alert( $(this).index() );
    });
    jQuery(document).on('change', '.madxartwork-control-playpause_control', function () {
        var runAnimation = madxartworkFrontend.config.elements.data[dce_model_cid].attributes['playpause_control'];
        // ------------
        var eid = dce_get_element_id_from_cid(dce_model_cid);
        var iFrameDOM = jQuery("iframe#madxartwork-preview-iframe").contents();
        var morphed = iFrameDOM.find('.madxartwork-element[data-id=' + eid + '] #dce-svg-' + eid);
        // ------------
        morphed.attr('data-run', runAnimation);
        //morphed.data("run", runAnimation).trigger('changeData');
        //alert(morphed.attr('class')+repeater_index);
        //alert(eid);
        //alert( runAnimation );
    });
    //@P ---- global settings -----
    //class="madxartwork-control madxartwork-control-dce_smoothtransition_class_controller madxartwork-control-type-hidden madxartwork-label-inline madxartwork-control-separator-default"
    var inputSelector = ".madxartwork-control-selector_wrapper.madxartwork-control-type-text input, .madxartwork-control-selector_header.madxartwork-control-type-text input";
    // 
    var detect_contet_frame = function ($content) {

        var iFrameDOM = jQuery("iframe#madxartwork-preview-iframe").contents();
        var classController = ".madxartwork-control-dce_smoothtransition_class_controller input, .madxartwork-control-dce_trackerheader_class_controller input";
        const queryCheck = s => document.createDocumentFragment().querySelector(s);
        const isSelectorValid = selector => {
            try { queryCheck(selector) } catch { return false }
            return true
        };
        if (isSelectorValid($content) && typeof $content !== "undefined") {

            var sectorList = $content.split(',');
            var sectorListLength = sectorList.length;
            var countSelectorValid = 0;
            sectorList.forEach(selectotIteration);
            function selectotIteration(value) {
                value = value.trim();
                if (iFrameDOM.find(value).length && value.length > 1 && (value.substring(0, 1) == '.' || value.substring(0, 1) == '#')) {
                    countSelectorValid++;
                }
            }

            if (countSelectorValid >= sectorListLength) {
                jQuery(".dce-class-debug").text('Detected').addClass('detected');
                jQuery(classController).val('detected').trigger('input');
                //jQuery(".madxartwork-control-dce_smoothtransition_class_controller input").trigger('input');
            } else {
                jQuery(".dce-class-debug").text('No matches').removeClass('detected');
                jQuery(classController).val('').trigger('input');
                ;
                //jQuery(".madxartwork-control-dce_smoothtransition_class_controller input").trigger('input');
            }

        }
    }
    var detect_from_text = function ($target) {
        var selectorVal = $target;
        detect_contet_frame(selectorVal);
    }
    jQuery(document).on('mousedown', '#madxartwork-panel-dynamicooo-settings, .madxartwork-panel-menu-item-undefined', function (e) {
        setTimeout(function () {
            detect_from_text(jQuery(inputSelector).val());
        }, 200);
        detect_from_text(jQuery(inputSelector).val());
    });
    jQuery(document).on("input", inputSelector, function () {
        detect_from_text(jQuery(this).val());
    });
});

// FILEBROWSER
jQuery(window).on('load', function () {
    jQuery(document).on("click", ".madxartwork-control-medias .remove_media", function () {
//alert("add3");
        var editorId = jQuery(this).data('editor');
        tinyMCE.editors[editorId].setContent('');
    });
    setInterval(function () {
        // add navigator element toggle
        jQuery(".madxartwork-control-medias .add_media").not('.has-remove-media').each(function () {
            jQuery(this).after('<button type="button" id="remove-media-button" class="madxartwork-button madxartwork-button-warning button remove_media" data-editor="' + jQuery(this).data('editor') + '"><span class="wp-media-buttons-icon dashicons dashicons-no-alt"></span> <small>Remove Media</small></button>');
            jQuery(this).addClass('has-remove-media');
        });
    }, 1000);
});

/******************************************************************************/

jQuery(window).on('madxartwork:init', function () {
// Query Control

    var DCEControlQuery = madxartwork.modules.controls.Select2.extend({

        cache: null,
        isTitlesReceived: false,
        getSelect2Placeholder: function getSelect2Placeholder() {
            var self = this;
            return {
                id: '',
                text: self.model.get('placeholder'), //'All',
            };
        },
        getSelect2DefaultOptions: function getSelect2DefaultOptions() {
            var self = this;
            return jQuery.extend(madxartwork.modules.controls.Select2.prototype.getSelect2DefaultOptions.apply(this, arguments), {
                ajax: {
                    transport: function transport(params, success, failure) {
                        var data = {
                            q: params.data.q,
                            query_type: self.model.get('query_type'),
                            object_type: self.model.get('object_type'),
                        };
                        return madxartworkCommon.ajax.addRequest('dce_query_control_filter_autocomplete', {
                            data: data,
                            success: success,
                            error: failure,
                        });
                    },
                    data: function data(params) {
                        return {
                            q: params.term,
                            page: params.page,
                        };
                    },
                    cache: true
                },
                escapeMarkup: function escapeMarkup(markup) {
                    return markup;
                },
                minimumInputLength: 1
            });
        },
        getValueTitles: function getValueTitles() {
            var self = this,
                    ids = this.getControlValue(),
                    queryType = this.model.get('query_type');
            objectType = this.model.get('object_type');
            if (!ids || !queryType)
                return;
            if (!_.isArray(ids)) {
                ids = [ids];
            }

            madxartworkCommon.ajax.loadObjects({
                action: 'dce_query_control_value_titles',
                ids: ids,
                data: {
                    query_type: queryType,
                    object_type: objectType,
                    unique_id: '' + self.cid + queryType,
                },
                success: function success(data) {
                    self.isTitlesReceived = true;
                    self.model.set('options', data);
                    self.render();
                },
                before: function before() {
                    self.addSpinner();
                },
            });
        },
        addSpinner: function addSpinner() {
            this.ui.select.prop('disabled', true);
            this.$el.find('.madxartwork-control-title').after('<span class="madxartwork-control-spinner dce-control-spinner">&nbsp;<i class="fa fa-spinner fa-spin"></i>&nbsp;</span>');
        },
        onReady: function onReady() {
            setTimeout(madxartwork.modules.controls.Select2.prototype.onReady.bind(this));
            if (this.ui.select) {
                var self = this,
                        ids = this.getControlValue(),
                        queryType = this.model.get('query_type');
                objectType = this.model.get('object_type');
                jQuery(this.ui.select).attr('data-query_type', queryType);
                if (objectType) {
                    jQuery(this.ui.select).attr('data-object_type', objectType);
                }
                dce_update_query_btn(this.ui.select);
            }

            if (!this.isTitlesReceived) {
                this.getValueTitles();
            }
        },
        onBeforeDestroy: function onBeforeDestroy() {
            if (this.ui.select.data('select2')) {
                this.ui.select.select2('destroy');
            }

            this.$el.remove();
        },
        /*destroy: function destroy() {            
         return true;            
         }*/

    });
    // Add Control Handlers
    madxartwork.addControlView('ooo_query', DCEControlQuery);
    jQuery(document).on('change', '.madxartwork-control-type-ooo_query select', function () {
        var eid = dce_get_element_id_from_cid(dce_model_cid);
        var iFrameDOM = jQuery("iframe#madxartwork-preview-iframe").contents();
        dce_update_query_btn(this);
    });
});
function dce_update_query_btn(ooo) {
    var setting = jQuery(ooo).data('setting'),
            query_type = jQuery(ooo).attr('data-query_type'),
            object_type = jQuery(ooo).attr('data-object_type');
    jQuery(ooo).siblings('.dce-madxartwork-control-quick-edit').remove();
    if (jQuery(ooo).val() && (!jQuery.isArray(jQuery(ooo).val()) || (jQuery.isArray(jQuery(ooo).val()) && jQuery(ooo).val().length == 1))) {
        var edit_link = '#';
        //console.log(madxartworkConfig);        
        switch (query_type) {
            case 'posts':
                if (!object_type || object_type != 'type') {
                    edit_link = madxartworkConfig.home_url + '/wp-admin/post.php?post=' + jQuery(ooo).val();
                    if (object_type == 'madxartwork_library') {
                        edit_link += '&action=madxartwork';
                    } else {
                        edit_link += '&action=edit';
                    }
                }
                break;
            case 'users':
                if (!object_type || object_type != 'role') {
                    edit_link = madxartworkConfig.home_url + '/wp-admin/user-edit.php?user_id=' + jQuery(ooo).val();
                }
                break;
            case 'terms':
                if (object_type) {
                    edit_link = madxartworkConfig.home_url + '/wp-admin/term.php?tag_ID=' + jQuery(ooo).val();
                    edit_link += '&taxonomy=' + object_type;
                }
                break;
        }
        if (edit_link != '#') {
            jQuery(ooo).parent().append('<div class="madxartwork-control-unit-1 tooltip-target dce-madxartwork-control-quick-edit" data-tooltip="Quick EDIT"><a href="' + edit_link + '" target="_blank" class="dce-quick-edit-btn"><i class="eicon-pencil"></i></a></div>');
        }
    } else {
        var new_link = '#';
        switch (query_type) {
            case 'posts':
                if (!object_type || object_type != 'type') {
                    new_link = madxartworkConfig.home_url + '/wp-admin/post-new.php';
                    if (object_type) {
                        new_link += '?post_type=' + object_type;
                        if (object_type == 'madxartwork_library') {
                            new_link = madxartworkConfig.home_url + '/wp-admin/edit.php?post_type=' + object_type + '#add_new';
                        }
                    }
                }
                break;
            case 'users':
                if (!object_type || object_type != 'role') {
                    new_link = madxartworkConfig.home_url + '/wp-admin/user-new.php';
                }
                break;
            case 'terms':
                new_link = madxartworkConfig.home_url + '/wp-admin/edit-tags.php';
                if (object_type) {
                    edit_link += '&taxonomy=' + object_type;
                }
                break;
        }
        if (new_link != '#') {
            jQuery(ooo).parent().prepend('<div class="madxartwork-control-unit-1 tooltip-target dce-madxartwork-control-quick-edit" data-tooltip="Add NEW"><a href="' + new_link + '" target="_blank" class="dce-quick-edit-btn"><i class="eicon-plus"></i></a></div>');
        }
    }
}


jQuery(window).on('load', function () {
//jQuery(window).on('preview:loaded', function () {
    //setTimeout(function() {  
    //console.log('load');
    if (jQuery('#madxartwork-preview-iframe').length) {
        var element = getUrlParam('element');
        //console.log(element);        
        if (element) {          
            var iFrame = jQuery("iframe#madxartwork-preview-iframe");
            var iFrameDOM = iFrame.contents();
            var thisTimeout = setInterval(function(){
                //console.log(thisTimeout);
                if (!jQuery('#madxartwork-loading:visible').length) {
                    //console.log('click');
                    iFrameDOM.find("div.madxartwork-element-" + element).trigger('click');
                    clearInterval(thisTimeout);
                }
            }, 1000);
        }
    }
    //}, 2000);
});
