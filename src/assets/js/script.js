$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

$('#myJumptop').on("click", function () {
  $('html, body').animate({ scrollTop: 0 }, 300);
});