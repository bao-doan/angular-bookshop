// Bootstrap 4 Carousel
$(document).ready(function () {
  $('.carousel').carousel({ interval: 0 });

});
// Jumptop button
var windowHeight = $(window).height() / 4;

$(window).on('scroll', function () {
  if ($(this).scrollTop() > windowHeight) {
      $("#myJumptop").css('display', 'block');
  } else {
      $("#myJumptop").css('display', 'none');
  }
});

$('#myJumptop').on("click", function () {
  $('html, body').animate({ scrollTop: 0 }, 300);
});
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
// Ekko Lightbox
$(document).on("click", '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});