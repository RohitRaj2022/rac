document.addEventListener("DOMContentLoaded", function() {
    var e = document.querySelector(".summary3");
    e && e.addEventListener("click", function() {
        e.textContent = e.textContent === "more" ? "less" : "more"
    })
});
$(document).ready(function() {
    grecaptcha.ready(function() {
        grecaptcha.execute(reCAPTCHA_site_key, {
            action: "submit"
        }).then(function(e) {
            $("form").append('<input type="hidden" name="g-recaptcha-response" value="' + e + '">')
        })
    }),
    document.querySelectorAll(".youtube-facade").forEach(function(e) {
        e.addEventListener("click", function() {
            var t = this.getAttribute("data-video-id")
              , r = document.createElement("iframe");
            r.setAttribute("src", "https://www.youtube.com/embed/" + t + "?autoplay=1"),
            r.setAttribute("frameborder", "0"),
            r.setAttribute("allowfullscreen", "true"),
            r.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"),
            r.style.width = "100%",
            r.style.height = "100%",
            this.innerHTML = "",
            this.appendChild(r)
        })
    }),
    $(".read-more-btn").click(function() {
        $(".after-read-more").toggle("fast");
        var e = $(".after-read-more").is(":visible") ? "Read less" : "Read more";
        return $(this).text(e),
        !1
    })
});
function m() {
    $("#enquiry").hasClass("show") || $("#enquiry").modal("show")
}
setTimeout(function() {
    m()
}, 1e4);
jQuery(document).ready(function(e) {
    e("#coll-1").click(function(t) {
        e("#tab1").addClass("active"),
        e("#tab2").removeClass("active"),
        e("#coll-1").addClass("active"),
        e("#coll-2").removeClass("active")
    }),
    e("#coll-2").click(function(t) {
        e("#tab2").addClass("active"),
        e("#tab1").removeClass("active"),
        e("#coll-2").addClass("active"),
        e("#coll-1").removeClass("active")
    })
});
function c() {
    $(".main-menu li.dropdown ul").length && ($(".main-menu li.dropdown").append('<div class="dropdown-btn"></div>'),
    $(".main-menu li.dropdown .dropdown-btn").on("click", function() {
        $(this).prev("ul").slideToggle(500)
    }))
}
function d() {
    $(".scroll-to-target").length && $(".scroll-to-target").on("click", function() {
        var e = $(this).attr("data-target");
        $("html, body").animate({
            scrollTop: $(e).offset().top
        }, 1e3)
    })
}
function f() {
    $(".toggle-search").length && $(".toggle-search").on("click", function() {
        $(".header-search").slideToggle(300)
    })
}
function p() {
    $(".blog-carousel").length && $(".blog-carousel").owlCarousel({
        dots: !1,
        loop: !0,
        margin: 30,
        nav: !0,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        autoplayHoverPause: !1,
        autoplay: 6e3,
        smartSpeed: 1e3,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            800: {
                items: 2
            },
            1024: {
                items: 3
            },
            1100: {
                items: 3
            },
            1200: {
                items: 3
            }
        }
    })
}
function g() {
    $(".team-carousel").length && $(".team-carousel").owlCarousel({
        dots: !1,
        loop: !0,
        margin: 30,
        nav: !0,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        autoplayHoverPause: !1,
        autoplay: 6e3,
        smartSpeed: 1e3,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            800: {
                items: 2
            },
            1024: {
                items: 3
            },
            1100: {
                items: 4
            },
            1200: {
                items: 4
            }
        }
    })
}
function h() {
    $(".project-single-carousel").length && $(".project-single-carousel").owlCarousel({
        dots: !1,
        loop: !0,
        margin: 30,
        nav: !0,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        autoplayHoverPause: !1,
        autoplay: 6e3,
        smartSpeed: 1e3,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            800: {
                items: 1
            },
            1024: {
                items: 1
            },
            1100: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    })
}
function v() {
    $(".banner-carousel").length && $("#owl-slider").owlCarousel({
        items: 1,
        loop: !0,
        dots: !1,
        autoplay: !0,
        autoplayTimeout: 6e3,
        autoplayHoverPause: !0,
        nav: !1,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        autoplayHoverPause: !1,
        autoplay: 6e3,
        smartSpeed: 1e3,
        animateOut: "fadeOut",
        animateIn: "fadeIn",
        responsive: {
            0: {
                items: 1,
                padding: 50
            },
            600: {
                items: 1
            },
            800: {
                items: 1
            },
            1024: {
                items: 1
            },
            1100: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    })
}
$(document).ready(function() {
    $(".banner-carousel").carousel({
        interval: 6e3,
        pause: "hover",
        wrap: !0
    })
});
function y() {
    $(".choose-carousel").length && $(".choose-carousel").owlCarousel({
        dots: !0,
        loop: !0,
        margin: 30,
        nav: !1,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        autoplayHoverPause: !1,
        autoplay: !0,
        smartSpeed: 300,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 2
            },
            800: {
                items: 3
            },
            1024: {
                items: 3
            },
            1100: {
                items: 4
            },
            1200: {
                items: 4
            }
        }
    })
}
function b() {
    $(".brand").length && $(".brand").owlCarousel({
        dots: !1,
        loop: !0,
        margin: 30,
        nav: !0,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        autoplayHoverPause: !1,
        autoplay: !0,
        smartSpeed: 300,
        responsive: {
            0: {
                items: 3
            },
            600: {
                items: 2
            },
            800: {
                items: 3
            },
            1024: {
                items: 4
            },
            1100: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    })
}
function w() {
    $(".testimonial-carousel").length && $(".testimonial-carousel").owlCarousel({
        loop: !0,
        margin: 30,
        nav: !0,
        dots: !1,
        autoplayHoverPause: !1,
        autoplay: 6e3,
        smartSpeed: 700,
        navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            800: {
                items: 2
            },
            1024: {
                items: 2
            },
            1100: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    })
}
function P() {
    // $(".city-carousel").length && $(".city-carousel").owlCarousel({
    //     loop: !0,
    //     margin: 30,
    //     nav: !0,
    //     dots: !1,
    //     autoplayHoverPause: !1,
    //     autoplay: 6e3,
    //     smartSpeed: 700,
    //     navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
    //     responsive: {
    //         0: {
    //             items: 3
    //         },
    //         600: {
    //             items: 3
    //         },
    //         800: {
    //             items: 3
    //         },
    //         1024: {
    //             items: 4
    //         },
    //         1100: {
    //             items: 4
    //         },
    //         1200: {
    //             items: 4
    //         }
    //     }
    // })

    $(window).on("load", function() {
        $(".city-carousel").owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 1000,
            items: 4,
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 4 }
            }
        });
    });
    
}
$(document).ready(function() {
    $("#booking_form-m").length && $("#booking_form-m").validate({
        rules: {
            name: "required",
            phoneNo: {
                required: !0,
                digits: !0,
                minlength: 10,
                maxlength: 10
            },
            product: "required",
            message: {
                required: !0,
                maxlength: 70
            }
        },
        messages: {
            name: "Please enter your name",
            phoneNo: {
                required: "Please enter your phone number",
                digits: "Please enter only digits",
                minlength: "Phone number must be 10 digits",
                maxlength: "Phone number must be 10 digits"
            },
            product: "Please enter the subject",
            message: {
                required: "Please enter your message",
                maxlength: "Message should not exceed 70 characters"
            }
        },
        errorPlacement: function(t, r) {
            t.appendTo(r.parent())
        },
        submitHandler: function(t) {
            e(t)
        }
    }),
    $("#booking-form").length && $("#booking-form").validate({
        rules: {
            name: "required",
            phoneNo: {
                required: !0,
                digits: !0,
                minlength: 10,
                maxlength: 10
            },
            product: "required",
            message: {
                required: !0,
                maxlength: 70
            }
        },
        messages: {
            name: "Please enter your name",
            phoneNo: {
                required: "Please enter your phone number",
                digits: "Please enter only digits",
                minlength: "Phone number must be 10 digits",
                maxlength: "Phone number must be 10 digits"
            },
            product: "Please enter the subject",
            message: {
                required: "Please enter your message",
                maxlength: "Message should not exceed 70 characters"
            }
        },
        errorPlacement: function(t, r) {
            t.appendTo(r.parent())
        },
        submitHandler: function(t) {
            e(t)
        }
    });
    function e(t) {
        var r = $(t).find('button[type="submit"]')
          , o = "#form-result";
        $(o).remove(),
        r.before('<div id="form-result" class="alert alert-success" role="alert" style="display: none;"></div>');
        var s = r.html();
        r.html(r.prop("disabled", !0).data("loading-text")),
        $.ajax({
            url: $(t).attr("action"),
            type: $(t).attr("method"),
            data: $(t).serialize(),
            dataType: "json",
            success: function(a) {
                a.status ? (r.prop("disabled", !1).html(s),
                $("#enquiry").modal("hide"),
                $("#myBook").modal("hide"),
                l(a.message),
                t.reset()) : a.errors ? $.each(a.errors, function(u, n) {
                    let i = $('[name="' + u + '"]', t);
                    i.addClass("error"),
                    i.after($('<div class="alert alert-danger" role="alert">' + n[0] + "</div>"))
                }) : a.userIp && ($("#enquiry").modal("hide"),
                $("#myBook").modal("hide"),
                l(a.userIp, "Error", "error"))
            },
            error: function(a, u, n) {
                $("#enquiry").modal("hide"),
                $("#myBook").modal("hide");
                let i;
                a.responseJSON && a.responseJSON.errors && a.responseJSON.errors["g-recaptcha-response"] ? i = a.responseJSON.errors["g-recaptcha-response"][0] : a.responseJSON && a.responseJSON.error ? i = a.responseJSON.error : i = "An error occurred",
                l(i, "Error", "error")
            },
            complete: function() {
                r.prop("disabled", !1).html(s)
            }
        })
    }
});
function l(e, t="Success", r="success") {
    r === "error" ? Swal.fire({
        title: t,
        text: e,
        icon: r,
        confirmButtonText: "OK"
    }) : Swal.fire({
        title: t,
        text: e,
        icon: r,
        confirmButtonText: "OK"
    })
}
$(document).ready(function() {
    $("#contact-form").length && $("#contact-form").validate({
        rules: {
            name: "required",
            phoneNo: {
                required: !0,
                digits: !0,
                minlength: 10,
                maxlength: 10
            },
            subject: "required",
            product_id: "required",
            message: {
                required: !0,
                maxlength: 70
            }
        },
        messages: {
            name: "Please enter your name",
            phoneNo: {
                required: "Please enter your phone number",
                digits: "Please enter only digits",
                minlength: "Phone number must be 10 digits",
                maxlength: "Phone number must be 10 digits"
            },
            subject: "Please enter the subject",
            message: {
                required: "Please enter your message",
                maxlength: "Message should not exceed 70 characters"
            }
        },
        errorPlacement: function(e, t) {
            e.appendTo(t.parent())
        },
        submitHandler: function(e) {
            var t = $(e).find('button[type="submit"]')
              , r = "#form-result";
            $(r).remove(),
            t.before('<div id="form-result" class="alert alert-success" role="alert" style="display: none;"></div>');
            var o = t.html();
            t.html(t.prop("disabled", !0).data("loading-text")),
            $.ajax({
                url: $(e).attr("action"),
                type: $(e).attr("method"),
                data: $(e).serialize(),
                dataType: "json",
                success: function(s) {
                    s.status ? (t.prop("disabled", !1).html(o),
                    $("#enquiry").modal("hide"),
                    $("#myBook").modal("hide"),
                    l(s.message),
                    e.reset()) : s.errors ? $.each(s.errors, function(a, u) {
                        let n = $('[name="' + a + '"]', e);
                        n.addClass("error"),
                        n.after($('<div class="alert alert-danger" role="alert">' + u[0] + "</div>"))
                    }) : s.userIp && (l(s.userIp, "Error", "error"),
                    $("#enquiry").modal("hide"),
                    $("#myBook").modal("hide"))
                },
                error: function(s, a, u) {
                    $("#enquiry").modal("hide"),
                    $("#myBook").modal("hide");
                    let n;
                    s.responseJSON && s.responseJSON.errors && s.responseJSON.errors["g-recaptcha-response"] ? n = s.responseJSON.errors["g-recaptcha-response"][0] : s.responseJSON && s.responseJSON.error ? n = s.responseJSON.error : n = "An error occurred",
                    l(n, "Error", "error")
                },
                complete: function() {
                    t.prop("disabled", !1).html(o)
                }
            })
        }
    })
});
$("#add-comment-form").length && $("#add-comment-form").validate({
    submitHandler: function(e) {
        var t = $(e).find('button[type="submit"]')
          , r = "#form-result";
        $(r).remove(),
        t.before('<div id="form-result" class="alert alert-success" role="alert" style="display: none;"></div>');
        var o = t.html();
        t.html(t.prop("disabled", !0).data("loading-text")),
        $(e).ajaxSubmit({
            dataType: "json",
            success: function(s) {
                (s.status = "true") && $(e).find(".form-control").val(""),
                t.prop("disabled", !1).html(o),
                $(r).html(s.message).fadeIn("slow"),
                setTimeout(function() {
                    $(r).fadeOut("slow")
                }, 6e3)
            }
        })
    }
});
$("#appoinment-form").length && $("#appoinment-form").validate({
    submitHandler: function(e) {
        var t = $(e).find('button[type="submit"]')
          , r = "#form-result";
        $(r).remove(),
        t.before('<div id="form-result" class="alert alert-success" role="alert" style="display: none;"></div>');
        var o = t.html();
        t.html(t.prop("disabled", !0).data("loading-text")),
        $(e).ajaxSubmit({
            dataType: "json",
            success: function(s) {
                (s.status = "true") && $(e).find(".form-control").val(""),
                t.prop("disabled", !1).html(o),
                $(r).html(s.message).fadeIn("slow"),
                setTimeout(function() {
                    $(r).fadeOut("slow")
                }, 6e3)
            }
        })
    }
});
function S() {
    if ($(".wow").length) {
        var e = new WOW({
            mobile: !1
        });
        e.init()
    }
}
function T() {
    $(".tool_tip").length && $(".tool_tip").tooltip(),
    $
}
jQuery(document).on("ready", function() {
    (function(e) {
        v(),
        c(),
        f(),
        p(),
        g(),
        h(),
        S(),
        y(),
        b(),
        w(),
        P(),
        d(),
        T()
    }
    )(jQuery)
});
function C(e, t) {
    let r, o;
    return function() {
        const s = this
          , a = arguments;
        o ? (clearTimeout(r),
        r = setTimeout(function() {
            Date.now() - o >= t && (e.apply(s, a),
            o = Date.now())
        }, t - (Date.now() - o))) : (e.apply(s, a),
        o = Date.now())
    }
}
function x() {
    const e = $(".stricky")
      , t = $(".scroll-to-top");
    e.length && ($(window).scrollTop() > 100 ? (e.addClass("stricky-fixed"),
    t.is(":visible") || t.stop(!0, !0).fadeIn(500)) : (e.removeClass("stricky-fixed"),
    t.is(":visible") && t.stop(!0, !0).fadeOut(500)))
}
jQuery(window).on("scroll", C(x, 100));
