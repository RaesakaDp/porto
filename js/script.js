// navbar
$(".expandHome").mouseover(function () {
  $(".sub-home").css({
    display: "block",
  });
});

$("#trapezoid")
  .mouseleave(function () {
    $("#trapezoid").css({
      "margin-top": "-50px",
    });
    $(".sub-home").css({
      display: "none",
    });
  })
  .mouseenter(function () {
    $("#trapezoid").css({
      "margin-top": "0px",
    });
  });

/**
 * Hero type effect
 */
const typed = select(".typed");
if (typed) {
  let typed_strings = typed.getAttribute("data-typed-items");
  typed_strings = typed_strings.split(",");
  new Typed(".typed", {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
  });
}
