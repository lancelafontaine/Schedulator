//Preload the page
$(window).load(function() {
        $('#page-loader').fadeOut(1400);
    })
    // Sidebar collapse/open
$('#sidebar-collapse-div').click(function() {
    if ($('#sidebar-collapse').attr('class').search('right') === -1) {
        // To collapse
        $('#sidebar-collapse').removeClass('fa-angle-double-left').addClass('fa-angle-double-right');
        $('#sidebar').animate({
            width: '80px'
        }, 300, function() {
            computeContentWidth()
        });
        $('#settings-content-wrapper').animate({
            left: '80px'
        }, 299, function() {});
        $('.sidebar-separator').css('display', 'none');
        $('#sidebar-links').find('span').css('display', 'none');
        $('#sidebar-links').find('.fa').animate({
            padding: '0 15px 0 30px'
        }, 300, function() {});
    } else {
        //To open
        $('#sidebar-collapse').removeClass('fa-angle-double-right').addClass('fa-angle-double-left');
        $('#sidebar').animate({
            width: '300px'
        }, 300, function() {
            computeContentWidth();
        });
        300
        $('#settings-content-wrapper').animate({
            left: '300px'
        }, 299, function() {});
        $('.sidebar-separator').css('display', 'block');
        $('#sidebar-links').find('span').css('display', 'inline');
        $('#sidebar-links').find('.fa').animate({
            padding: '0 15px 0 10px'
        }, 300, function() {});
    }
});

// UI fixes
$('#sidebar-collapse-div').hover(function() {
    $('#sidebar-collapse').addClass('sidebar-collapse-bigger')
}, function() {
    $('#sidebar-collapse').removeClass('sidebar-collapse-bigger')
});

$('.sidebar-link').hover(function() {
    $(this).find('.fa').css('font-size', '23px');
    $(this).find('span').css('font-size', '17px');
}, function() {
    $(this).find('.fa').css('font-size', '20px');
    $(this).find('span').css('font-size', '15px');
});

// Computing heights
var computePageHeight = function() {
    var windowHeight = $(window).height();
    var headerHeight = $('#setting-header').height();
    $('#settings-content-wrapper').height(windowHeight - headerHeight);
    $('#sidebar').height(windowHeight - headerHeight);
};
var computeContentWidth = function() {
    var windowWidth = $(window).width();
    var sidebarWidth = $('#sidebar').width();
    $('#settings-content-wrapper').width(windowWidth - sidebarWidth)
};
computePageHeight()
computeContentWidth()

// showing containers by clicking on link
$('.containerq').css('display', 'none');
$('#schedule-container').css('display', 'block');

var showContainer = function(string) {
    var containerId = '#' + string + '-container';
    $('.containerq').css('display', 'none');
    $(containerId).fadeIn(500);
    $(containerId).css('display', 'block');
}

$('.modal-coming-soon').click(function(i) {
    alert('Feature coming soon!')
});