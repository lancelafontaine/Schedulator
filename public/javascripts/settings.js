// Sidebar collapse/open
$('#sidebar-collapse-div').click(function () {
  if ($('#sidebar-collapse').attr('class').search('right') === -1) {
    // To collapse
    $('#sidebar-collapse').removeClass('fa-angle-double-left').addClass('fa-angle-double-right');
    $('#sidebar').animate({width: '80px'}, 300, function(){
      computeContentWidth()
    });
    $('#settings-content-wrapper').animate({left: '80px'}, 299, function(){});
    $('.sidebar-separator').css('display', 'none');
    $('#sidebar-links').find('span').css('display', 'none');
    $('#sidebar-links').find('.fa').animate({padding: '0 15px 0 30px'}, 300, function () {});
  } else {
    //To open
    $('#sidebar-collapse').removeClass('fa-angle-double-right').addClass('fa-angle-double-left');
    $('#sidebar').animate({width: '300px'}, 300, function(){
      computeContentWidth();
    });300
    $('#settings-content-wrapper').animate({left: '300px'}, 299, function(){});
    $('.sidebar-separator').css('display', 'block');
    $('#sidebar-links').find('span').css('display', 'inline');
    $('#sidebar-links').find('.fa').animate({padding: '0 15px 0 10px'}, 300, function () {});  }
});

// UI fixes
$('#sidebar-collapse-div').hover(function () {
  $('#sidebar-collapse').addClass('sidebar-collapse-bigger')
}, function () {
  $('#sidebar-collapse').removeClass('sidebar-collapse-bigger')
});

$('.sidebar-link').hover(function () {
  $(this).find('.fa').css('font-size', '23px');
  $(this).find('span').css('font-size', '17px');
}, function () {
  $(this).find('.fa').css('font-size', '20px');
  $(this).find('span').css('font-size', '15px');});

// Computing heights
var computePageHeight = function () {
  var windowHeight = $(window).height();
  var headerHeight = $('#setting-header').height();
  $('#settings-wrapper').height(windowHeight - headerHeight);
  $('#sidebar').height(windowHeight - headerHeight);
};
var computeContentWidth = function () {
  var windowWidth = $(window).width();
  var sidebarWidth = $('#sidebar').width();
  $('#settings-content-wrapper').width(windowWidth - sidebarWidth)
};
computePageHeight()
computeContentWidth()

// showing containers by clicking on link
$('.container').css('display', 'none');
$('#schedule-container').css('display', 'block');

var showContainer = function (string) {
  var containerId = '#' + string + '-container';
  $('.container').css('display', 'none');
  $(containerId).css('display', 'block');
}


 //Login
 $("#modal_trigger").leanModal({top : 200, overlay : 0.6, closeButton: ".modal_close" });

    $(function(){
        // Calling Login Form
        $("#login_form").click(function(){
            $(".user_login").show(10000);
            return false;
        });

    

    })
    jQuery(function ($) {
    $.fn.extend({
        leanModal: function (options) {
            var defaults = {
                top: 100,
                overlay: 0.5,
                closeButton: null
            };
            var overlay = $("<div id='lean_overlay'></div>");
            $("body").append(overlay);
            options = $.extend(defaults, options);
            return this.each(function () {
                var o = options;
                var modal_id = $(this).attr("href");

                function showModal() {
                    $("#lean_overlay").click(function () {
                        close_modal(modal_id)
                    });
                    $(o.closeButton).click(function () {
                        close_modal(modal_id)
                    });

                    var modal_height = $(modal_id).outerHeight();
                    var modal_width = $(modal_id).outerWidth();

                    $("#lean_overlay").css({
                        "display": "block",
                        opacity: 0
                    });

                    $("#lean_overlay").fadeTo(200, o.overlay);

                    $(modal_id).css({
                        "display": "block",
                        "position": "fixed",
                        "opacity": 0,
                        "z-index": 11000,
                        "left": 50 + "%",
                        "margin-left": -(modal_width / 2) + "px",
                        "top": o.top + "px"
                    });

                    $(modal_id).fadeTo(200, 1);
                };

                $(document).ready(function () {
                    showModal();
                });

                $(this).click(function (e) {
                    showModal();
                    e.preventDefault()
                })
            });

            function close_modal(modal_id) {
                $("#lean_overlay").fadeOut(200);
                $(modal_id).css({
                    "display": "none"
                })
            }
        }
    })
});(jQuery);

  