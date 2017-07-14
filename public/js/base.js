if (!IsPC())
    window.location.replace("http://m.jxh01.com/");

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

var ScrollToTop = ScrollToTop || {
    setup: function() {
        var a = $(window).height() / 2;
        $(window).scroll(function() {
            (window.innerWidth ? window.pageYOffset : document.documentElement.scrollTop) >= a ? $("#ScrollToTop").removeClass("Offscreen") : $("#ScrollToTop").addClass("Offscreen")
        });
        $("#ScrollToTop").click(function() {
            $("html, body").animate({
                scrollTop: "0"
            }, 400);
            return false;
        });
    }
};

$(function() {
    ScrollToTop.setup();
    initSendMsg();
    var $navbar = $(".navbar");
    var pathname = window.location.pathname.replace("/", "").toLowerCase();
    var navcss = ['navbar-base', 'navbar-float', 'navbar-float1'];

    if (pathname === "index.html" || pathname == "") {
        $(window).scroll(function() {
            var scrollH = document.documentElement.scrollTop || document.body.scrollTop;

            if (scrollH > 50 && scrollH < 3500) {
                $navbar.removeClass(navcss[0] + " " + navcss[2]).addClass(navcss[1]);
            } else if (scrollH > 3500) {
                $navbar.removeClass(navcss[0] + " " + navcss[1]).addClass(navcss[2]);
            } else if (scrollH < 50) {
                $navbar.removeClass(navcss[1] + " " + navcss[2]).addClass(navcss[0]);
            }
        });
    }

})

function initSendMsg() {
    var txtEmail = $("#email");
    if (txtEmail.length == 0) return;
    var txtName = $("#name");
    var txtTel = $("#tel");
    var txtMsg = $("#msg");
    var btnOK = $("#btnOK");
    var btnReset = $("#btnReset");

    txtEmail.on('focus', function() {
            txtEmail.popover("hide");
        }).on('blur', function() {
            validate();
        })
        .popover({
            trigger: 'manual',
            placement: 'left',
            title: '',
            content: '不是有效Email地址'
        });
    btnReset.on('click', function() {
        txtName.val('');
        txtEmail.val('');
        txtMsg.val('');
        txtTel.val('');
    });

    btnOK.on('click', function() {
        var name = txtName.val();
        var email = txtEmail.val();
        var msg = txtMsg.val();
        var tel = txtTel.val();

        if (!validate()) {
            return;
        }
        btnOK.attr("disabled", true);
        //http://www.jxh01.com/ContactUs?name=%E5%A7%93%E5%90%8D&phone=15773002352&email=email&comments=%E7%95%99%E8%A8%80           
        var data = {
            name: name,
            phone: tel,
            email: email,
            comments: msg
        }
        $.post("http://www.jxh01.com/ContactUs?r=" + Math.random(), data, function(e) {
            if (e === "") {
                $('#myModal').modal('show');
            }
            btnOK.attr("disabled", false);
            txtName.val('');
            txtEmail.val('');
            txtMsg.val('');
        });
    })

    function validate() {
        //email
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(txtEmail.val())) {
            txtEmail.popover("show");
            return false;
        }
        return true;
    }

}