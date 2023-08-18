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
