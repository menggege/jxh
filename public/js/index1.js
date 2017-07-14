  $(window).load(function() {
        jQuery('#all').click();
        return false;
    });

$(function(){
    /*====================================
    banner slider
    ======================================*/
 $("#headslider").flexslider({
      directionNav: false
}); 
 $(".head-bgimg").css({position:'absolute'});
 $("#headslider").addClass("loaded");

    /* ==================================== /*
     * Smooth scroll / Scroll To Top
    /* ==================================== */
    $('a.page-scroll').bind("click", function (e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 1000);
        e.preventDefault();
    });

    /*====================================
    phone functions
    ======================================*/
$("#phoneslider").flexslider({
    controlNav: false, 
    start:function(slide){
         selectPhoneImg(slide.currentSlide);
    },
    before:function(slide){
         selectPhoneImg(slide.animatingTo);        
    },
    after:function(slide){
      
    }
}); 
    /*====================================
    partners slider
    ======================================*/
 $("#partners").flexslider({
     animation: "slide",
      directionNav: false
}); 

var phone=$("#phoneslider").data('flexslider');

$(".funlist").click(function(){
    var index=$(this).attr('data-img');
    phone.flexAnimate(index-1);  
    phone.pause();
})
function selectPhoneImg(index){
    index++;
    $(".funlist").removeClass("active");
    $(".funlist[data-img="+index+"]").addClass("active");
}
    /*====================================
    Portfolio Isotope Filter
    ======================================*/
  
    var container = $('#portfolio_wrapper');

    container.isotope({
        animationEngine: 'best-available',
        animationOptions: {
            duration: 200,
            queue: false
        },
        layoutMode: 'fitRows'
    });

    $('#filters a').click(function() {
        $('#filters a').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        container.isotope({
            filter: selector
        });
        setProjects();
        return false;
    });

    function splitColumns() {
        var winWidth = $(window).width(),
            columnNumb = 1;

        if (winWidth > 1024) {
            columnNumb = 4;
        } else if (winWidth > 900) {
            columnNumb = 2;
        } else if (winWidth > 479) {
            columnNumb = 2;
        } else if (winWidth < 479) {
            columnNumb = 1;
        }

        return columnNumb;
    }
	
    function setColumns() {
        var winWidth = $(window).width(),
            columnNumb = splitColumns(),
            postWidth = Math.floor(winWidth / columnNumb);

        container.find('.portfolio-item').each(function() {
            $(this).css({
                width: postWidth + 'px'
            });
        });
    }

    function setProjects() {
        setColumns();
        container.isotope('reLayout');
    }

    container.imagesLoaded(function() {
        setColumns();
    });


    $(window).bind('resize', function() {
        setProjects();
    });

})

    /*====================================
    WOW
    ======================================*/
wow = new WOW({
    animateClass: 'animated',
    offset: 100,
    callback:function(e)
    {
        
    }
});
wow.init();
