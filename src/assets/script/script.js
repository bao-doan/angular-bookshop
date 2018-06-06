$(document).ready(function () {
    $('.carousel').carousel({ interval: 0 });

});
/*[ Back to top ]
===========================================================*/
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
/*[ Google Map ]
===========================================================*/
function myMap() {
    var mapCanvas = document.getElementById("map");
    var myCenter = new google.maps.LatLng(51.508742, -0.120850);
    var mapOptions = { center: myCenter, zoom: 5 };
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({
        position: myCenter,
        animation: google.maps.Animation.BOUNCE
    });
    marker.setMap(map);
}
// Ekko Lightbox
$(document).on("click", '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
  });