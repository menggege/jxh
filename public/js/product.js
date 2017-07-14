$(function() {
     $(".part-software").addClass("loaded");
      

    var aSection = $('.zone');
    var clientH = document.documentElement.clientHeight;
    $(window).scroll(scroll);

    function scroll() {
        var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
        for (var i = 0; i < aSection.length; i++) {
            if (scrollH + clientH > aSection.eq(i).offset().top + 600 && !aSection.eq(i).hasClass("animated")) {
                //aSection.eq(i).find(".col-area").css("background","#cef");
                var areas=aSection.eq(i).find(".col-area");
                $.each(areas,function(){
                    var area=$(this);
                    var areaAnimateName=area.attr("amt-name");
                    var areaAnimateDelay=area.attr("amt-delay");
                    area.css("animation-delay",areaAnimateDelay).addClass(areaAnimateName+" animated");
                })
               
                
            }
        }
    }
    aSection.find(".col-area").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).addClass("loaded");
    });
});
