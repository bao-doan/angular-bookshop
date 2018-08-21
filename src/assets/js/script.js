// Bootstrap 4 Carousel
$(document).ready(function () {
  // For Carousel
  $('.carousel').carousel({ interval: 0 });
  // For Dropdown-menu with .keep-open will not close on click
  $('.dropdown-menu.keep-open').on('click', function (e) {
    e.stopPropagation();
  });

  if (1) {
    $('body').attr('tabindex', '0');
  }
  else {
    alertify.confirm().set({ 'reverseButtons': true });
    alertify.prompt().set({ 'reverseButtons': true });
  }
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
$(document).on("click", '[data-toggle="lightbox"]', function (event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

