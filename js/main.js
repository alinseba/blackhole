/* =========================================================================
   jQuery Functions and Plugins
   ========================================================================= */

// Helpers
// Browser Detection - Internal Function
var BrowserDetect = {
    init: function () 
        {
            this.browser = this.searchString(this.dataBrowser) || "Other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        },
    searchString: function (data) 
    {
        for (var i = 0 ; i < data.length; i++)   
        {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) != -1)
            {
                return data[i].identity;
            }
        }
    },
    searchVersion: function (dataString) 
    {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: 
    [
        { string: navigator.userAgent, subString: "Chrome",  identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE",    identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari",  identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera",   identity: "Opera" }
    ]
};
BrowserDetect.init();
// BrowserDetect.version <= 9;
$('body').addClass(BrowserDetect.browser.toLowerCase());

// Main Object
var framework = {

    // Functions called on init()
    // Initialization
    init: function() {
        // These functions are frequently used so we call them from the start every time
        this.preventDefaults();
        this.toTopPlugin();
        this.slidings();
        this.boxBehavior();
        // These commented functions must be activated (decommented) only when you want to make use of them; you can find the components that have JS functionality in the Component Manager and which functions they use, so you will know exactly what you need
        // Do not decomment the calling lines in here, please copy the call line and paste it at the end of your <body> tag (where you have that execution area of JS functions), in your HTML file
        // this.fixedElementPlugin();
        // this.docking();
        // this.processing();
        // this.showContent();
        // this.dateTime();
        // this.revealPlugin();
        // this.legacyModal();
        // this.uiKitAnimations();
        // this.uiKitNotify();
        // this.uiKitScrollspyNav();
    },

    // Anchor Prevent Default
    preventDefaults: function() {
        $('a[href$="#"], .trigger, a.trigger').click(function(e) {
            e.preventDefault();
        });
    },

    // Processing Effect
    processing: function() {
        $('.processing').on('click', function() {
            $(this).addClass('active');
        });
    },

    // Custom Functions
    showContent: function() {
        // Show All
        $(document).ready(function() {
            var element = $('.show-all');
            var contentList = $('.show-all > .list');
            var contentHeight = contentList.outerHeight();
            element.css('max-height', '' + contentHeight / 2 + 'px');
            $('.show-all').css('max-height', '' + contentHeight / 2 + 'px');     
        });
        var c = false;
        $('.show-all > .trigger').on('click', function() {
            if (!c) {
                $(this).parents('.show-all').addClass('active').css({'max-height': 'inherit', 'height': 'auto'});
                $(this).attr('title', 'Hide the Visible Content').html('hide content');
                c = true;
            }
            else {
                var element = $(this).parent();
                var contentList = $(this).parents('.show-all').find('> .list');
                var contentHeight = contentList.outerHeight();
                element.css('max-height', '' + contentHeight / 2 + 'px');
                $(this).parents('.show-all').removeClass('active').css('max-height', '' + contentHeight / 2 + 'px');
                $(this).attr('title', 'Show the Hidden Content').html('show content');
                c = false;
            }
        });
        // Show More
        var d = false;
        $('.show-more > .trigger').on('click', function() {
            if (!d) {
                $(this).parent().find('.item.hidden').slideDown(300).removeClass('hidden');
                $(this).attr('title', 'Hide the Visible Content').html('hide content');
                d = true;
            }
            else {
                $(this).parent().find('.item:last-child').slideUp(300).addClass('hidden');
                $(this).attr('title', 'Show the Hidden Content').html('show content');
                d = false;
            }
        });
    },

    // Datetime
    dateTime: function() {
        // Time
        function startTime() {
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);
            $('.time').html(h + ":" + m + ":" + s);
            t = setTimeout(function() { startTime() }, 500);
        }

        function checkTime(i) {
            if (i < 10) {
              i = "0" + i;
            }
            return i;
        }
        startTime();

        // Date
        function getTheDate() {
            var currentDate = new Date();
            var month = currentDate.getMonth() + 1;
            var day = currentDate.getDate();
            var year = currentDate.getFullYear();
            if (month && day < 10) {
                month = '0' + month;
                day = '0' + day;
            }
            $('.date').html(day + '&ndash;' + month + '&ndash;' + year);
        }
        getTheDate();
    },

    // To Top - Internal Function
    toTopPlugin: function() {
        $(window).scroll(function(){
            if ($(this).scrollTop() > 100) {
                $('.scrollup').fadeIn();
            } else {
                $('.scrollup').fadeOut();
            }
            if ($(window).scrollTop() + $(window).height() == $(document).height() - $('#main-footer').outerHeight()) {
                $('.scrollup').addClass('bottom');
            }
            else {
                $('.scrollup').removeClass('bottom');
            }
        });

        $('.scrollup').click(function() {
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });
    },

    // Fixed Element
    fixedElementPlugin: function() {
        var fixedElement = $('.fixed-element');
        var topDistance = $('.fixed-element').offset().top;
        $(window).scroll(function() {
            if ($(this).scrollTop() > topDistance) {
                fixedElement.addClass('fixed');
            }
            else {
                fixedElement.removeClass("fixed");
            }
            if (fixedElement.hasClass('non-fixed')) {
                fixedElement.removeClass('fixed');
            }
        });
    },

    // Menu Sliding
    slidings: function() {
        $(".slide > .slide-content, .slide > .content, .slide > .menu, .slide > .submenu, .slide-sliding > .slide-content, .slide-sliding > .content, .slide-sliding > .menu, .slide-sliding > .submenu, .fade > .content, .collapsable > .content, .collapsable > .list").hide();
        $(".slide.active > .slide-content, .slide.active > .content, .slide.active > .menu, .slide.active > .submenu, .slide-sliding.active > .slide-content, .slide-sliding.active > .content, .slide-sliding.active > .menu, .slide-sliding.active > .submenu, .fade.active > .content, .collapsable.active > .content, .collapsable.active > .list").show();
        $(".slide > * > .icon.trigger, .slide > * > .trigger, .collapsable .collapse").on('click', function(e) {
            e.preventDefault();
            if ($(this).parent().parent().hasClass('active')) {
                $(this).attr('title', 'Expand this Box');
            }
            else {
                $(this).attr('title', 'Collapse this Box');
            }
            $(this).parent().next().slideToggle('fast');
            $(this).parent().parent().toggleClass('active');
        });
        $(".slide, .collapsable").on('click', '> .trigger, .collapse', function(e) {
            e.preventDefault();
            if ($(this).parent().hasClass('active')) {
                $(this).attr('title', 'Expand this Box');
            }
            else {
                $(this).attr('title', 'Collapse this Box');
            }
            $(this).find('+ .slide-content, + .content').slideToggle('fast');
            $(this).parent().toggleClass('active');
            $(this).parent().parent().toggleClass('active-slide');
        });
        $(".slide > * > .controls-horizontal .trigger").on('click', function(e) {
            e.preventDefault();
            if ($(this).parent().parent().parent().parent().hasClass('active')) {
                $(this).attr('title', 'Expand this Box');
            }
            else {
                $(this).attr('title', 'Collapse this Box');
            }
            $(this).parent().parent().parent().next().slideToggle('fast');
            $(this).parent().parent().parent().parent().toggleClass('active');
        });
    },

    // Box Behavior
    boxBehavior: function() {
        $('.close').on('click', function() {
            $(this).parents('.closable').addClass('closed');
        });
    },

    // Docking
    docking: function() {
        $('.docking > .trigger').click(function(e) {
            e.preventDefault();
            if ($(this).parent().parent().parent().hasClass('docked')) {
                $(this).attr('title', 'Dock this');
                $(this).parent().parent().parent().removeClass('docking');
            }
            else {
                $(this).attr('title', 'Undock this');
                $(this).parent().parent().parent().addClass('docking');
            }
            $(this).parent().parent().parent().toggleClass('docked').css('transition', 'width 0.2s linear');
            if ($(this).parent().parent().parent().hasClass('docked')) {
                $(this).parent().parent().parent().css('width', '33.3333%');
            }
            else {
                $(this).parent().parent().parent().css('width', '100%');
            }
        });
    },

    // Reveal Slide
    revealPlugin: function() {
        var g = false;
        $('.reveal > * > .trigger').on('click', function() {
            if (!g) {
                $(this).attr('title', 'Hide Code');
                $(this).find('.title').html('Hide Code');
                $(this).parents('.reveal').find('.visible-element').css('width', '50%');
                $(this).parents('.reveal').find('.hidden-element').fadeIn(300);
                g = true;
            }
            else {
                $(this).attr('title', 'View Code');
                $(this).find('.title').html('View Code');
                $(this).parents('.reveal').find('.visible-element').css('width', '100%');
                $(this).parents('.reveal').find('.hidden-element').fadeOut(300);
                g = false;
            }
        });
    },

    // Legacy Modal
    legacyModal: function() {
        $(".modal .tooltip, .message .tooltip, .message-modal .tooltip").click(function() {
            $(this).parent().fadeOut(300);
        });
        $(".autoclose").delay(10000).fadeOut();
    },

    // AJAX Loader
    ajaxLoader: function() {    
        var hash = window.location.hash.substr(1); 
        var href = $('.ajax-trigger').attr('href');
        if (hash == href.substr(0, href.length - 5)) {
            var toLoad = hash + '.html #ajax-content';
            $('#ajax-content').load(toLoad);
        }
        $('.ajax-trigger').click(function() {
            var toLoad = $(this).attr('href') + ' #ajax-content';
            var parent = $(this).parent();
            parent.find('#ajax-content').hide('fast', loadContent);
            parent.find('.load').remove();
            parent.append('<span class="load"><span class="icon"></span></span>');
            parent.find('.load').fadeIn(300);
            window.location.hash = $(this).attr('href').substr(0 , $(this).attr('href').length - 5);
            function loadContent() {
                parent.find('#ajax-content').load(toLoad, '', showNewContent())
            }
            function showNewContent() {
                parent.find('#ajax-content').show('normal', hideLoader());
            }
            function hideLoader() {
                parent.find('.load').fadeOut(300);
            }
            return false;
        });
    },

    // Upload File
    uploadFile: function() {
        $(".file + input").on('change', function() {
            var fileName = $(this).val();
            $(this).parent().children('input.text').attr('value', fileName).removeAttr("disabled");
        });
    },

    // UIKit Addons
    uiKitAnimations: function() {
        $(function(){
            $(document).on('click', '[data-docs-animation]', function() {
                var element = $(this),
                    animation = element.data("docsAnimation");

                if(element.data("anim-idle")) {
                    clearTimeout(element.data("anim-idle"));
                }

                element.removeClass(animation);

                setTimeout(function(){
                    element.addClass(animation);

                    element.data("anim-idle", setTimeout(function(){
                        element.removeClass(animation);
                        element.data("anim-idle", false);
                    }, 500));
                }, 50);
            });
        });
    },

    uiKitNotify: function() {
        $("body").on("click", ".button.notify[data-message]", function(e){
            e.preventDefault();
            $.UIkit.notify($(this).data());
        });
        $("body").on("click", ".button.sticky-notify[data-message]", function(e){
            e.preventDefault();
            $.UIkit.notify($(this).data(), {timeout: 0});
        });
        $("body").on("click", ".button.delay-notify[data-message]", function(e){
            e.preventDefault();
            $.UIkit.notify($(this).data(), {timeout: 10000});
        });
        $("body").on("click", ".button.notify-info[data-message]", function(e){
            e.preventDefault();
            $.UIkit.notify($(this).data(), {status: 'info'});
        });
        $("body").on("click", ".button.notify-success[data-message]", function(e){
            e.preventDefault();
            $.UIkit.notify($(this).data(), {status: 'success'});
        });
        $("body").on("click", ".button.notify-warning[data-message]", function(e){
            e.preventDefault();
            $.UIkit.notify($(this).data(), {status: 'warning'});
        });
        $("body").on("click", ".button.notify-danger[data-message]", function(e){
            e.preventDefault();
            $.UIkit.notify($(this).data(), {status: 'danger'});
        });
    },

    uiKitUpload: function() {
        $(function(){

            var progressbar = $("#progressbar"),
                bar         = progressbar.find('.uk-progress-bar'),
                settings    = {

                action: '', // upload url, default = ''

                allow : '*.(jpg|jpeg|gif|png)', // allow only images, default = *.*
                // other properties available: - single (boolean, default = true) - send each file one by one
                //                             - param (string, default = files[]) - post query name
                //                             - params (JSON Object, default = {}) - additional request parameters
                //                             - type (text/JSON, default = text) - response type from server

                loadstart: function() {
                    bar.css("width", "0%").text("0%");
                    progressbar.removeClass("uk-hidden");
                },

                progress: function(percent) {
                    percent = Math.ceil(percent);
                    bar.css("width", percent+"%").text(percent+"%");
                },

                allcomplete: function(response) { // options available: before (settings, files), progress (percent), complete (response, xhr), allcomplete (response, xhr), notallowed (file, settings), loadstart (event), load (event), loadend (event), error (event), abort (event), readystatechange (event)

                    bar.css("width", "100%").text("100%");

                    setTimeout(function(){
                        progressbar.addClass("uk-hidden");
                    }, 250);

                    alert("Upload Completed")
                }
            };

            var select = $.UIkit.uploadSelect($("#upload-select"), settings),
                drop   = $.UIkit.uploadDrop($("#upload-drop"), settings);
        });
    },

    uiKitScrollspyNav: function() {
        // Remove this functionality on mobile since it's not working that well
        $(window).on('resize', function() {
            if ($(window).width() < 800) {
                $('.scrollspy-nav .dotted-scrollspy-nav').hide();
            }
            else {
                $('.scrollspy-nav .dotted-scrollspy-nav').show();
            }
        });
        if ($(window).width() < 800) {
            $('*').attr('data-uk-scrollspy', '');
            $('*').prop('data-uk-scrollspy', '');
            $('.scrollspy-nav .dotted-scrollspy-nav').hide();
        }
        else {
            $('.scrollspy-nav .dotted-scrollspy-nav').show();
        }
    }

}

// Object Methods Initialisation
framework.init();