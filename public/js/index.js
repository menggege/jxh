$(function() {
    $("#btndown").click(function() {
        $('html,body').animate({
            scrollTop: '700px'
        }, 800);
    })


    var aSection = $('.zone');
    var clientH = document.documentElement.clientHeight;
    $(window).scroll(scroll);

    function scroll() {
        var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
        for (var i = 0; i < aSection.length; i++) {
            if (scrollH + clientH > aSection.eq(i).offset().top + 500 && !aSection.eq(i).hasClass("loaded")) {
                aSection.eq(i).addClass("loaded");
                if (i == 3){
                    $("div .part", aSection.eq(i)).addClass("pulse");
                }
            }
        }
    }

    if($(".flexslider").length>0)
    $(".flexslider").flexslider({
         animation: "slide",
        easing: "swing",
        animationLoop: true,
        itemWidth: 1,
        itemMargin: 1,
        minItems: 2,
        maxItems: 5,
        controlNav: false,
        directionNav: false,
        move: 1
}); 
});

var rootPath = "http://www.jxh01.com";
//新闻分类下新闻列表
function initNewsByType($container, typeId) {

    var pathName = rootPath + "/GetNewsByType?typeId=" + typeId + "&count=10";
    $.ajax({
        type: 'get',
        url: pathName,
        success: function(data) {

            var newsList = JSON.parse(data)
            var html = "";
            $(newsList).each(function(i, item) {
                html += '<li class="item"><a href="/newsdetail.html?newsID=' + item.id + '">' + item.title + '</a></li>';
            });
            $container.html(html);
        }
    });
}