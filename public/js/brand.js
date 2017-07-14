$(function () {
    var scrolling=false;
    $(window).scroll(function () {
        if(scrolling)
        {  
            return false;
        }

        var s = $(document).scrollTop(),
            t = $('.container').position().top;
        
        if (s > 0) {
            $('.shortcut .gotop').slideDown()
        } else {
            $('.shortcut .gotop').slideUp()
        } if (s - $('.container').position().top >= -119) {
            $('#container-nav').addClass('container-fixed')
        } else {
            $('#container-nav').removeClass('container-fixed')
        } if (s - $('.footer').position().top >= -400) {
            $('#container-nav').removeClass('container-fixed')
        }
        if (s >= 55) {
            $('#container-nav li').removeClass('current');
            $('.container-item h2').removeClass('current');
        }
        if (s >= 55 && s < 1140) {
            $('#container-nav li[data-node="hyjy"]').addClass('current');
            $('.container-item h2[data-node="hyjy"]').addClass('current');
        } else if (s - t >= 1150 && s - t < 2160) {
            $('#container-nav li[data-node="glzk"]').addClass('current');
            $('.container-item h2[data-node="glzk"]').addClass('current');
        } else if (s - t >= 2160 && s - t < 3480) {
            $('#container-nav li[data-node="glgj"]').addClass('current');
            $('.container-item h2[data-node="glgj"]').addClass('current');
        } else if (s - t >= 3480 && s - t < 4631) {
            $('#container-nav li[data-node="xwbd"]').addClass('current');
            $('.container-item h2[data-node="xwbd"]').addClass('current');
        } else if (s - t >= 4631 && s - t < 5881) {
            $('#container-nav li[data-node="jxhy"]').addClass('current');
            $('.container-item h2[data-node="jxhy"]').addClass('current');
        } else if (s - t >= 5881 && s - t < 7134) {
            $('#container-nav li[data-node="cwhy"]').addClass('current');
            $('.container-item h2[data-node="cwhy"]').addClass('current');
        } else if (s - t >= 7134 && s - t < 8315) {
            $('#container-nav li[data-node="wfhy"]').addClass('current');
            $('.container-item h2[data-node="wfhy"]').addClass('current');
        }
    });
    $('#container-nav li').click(function () {
        scrolling=true;
        $('#container-nav li').removeClass('current');
        $(this).addClass('current');
        $("html, body").animate({ scrollTop: $(this).attr('data-top') }, 400,function(){scrolling=false;});
       // $(document).scrollTop($(this).attr('data-top'))
    });
});