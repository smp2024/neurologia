
function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
        $('#eye_').removeClass('fal fa-eye');
        $('#eye_').addClass('fal fa-eye-slash');
    } else {
        x.type = "password";
        $('#eye_').removeClass('fal fa-eye-slash');
        $('#eye_').addClass('fal fa-eye');
    }
}

var datetimeValue = document.querySelector('#datetimeValue');
var datetime = document.querySelector('#datetime_j');
var $d=  new Date();


function setDateTimeValue() {
  var $d=  new Date();

  var text = new Date($d).toLocaleDateString('es', { dateStyle: 'long' });
  $("#datetimeValue").text(text_);

}

jQuery(function() {
  $('.calendar-day').on('click', function () {
    // Obtiene el valor del atributo "data-day"
    var dataDay = $(this).data('day');

    $("#datetime_j").val(text_);
    // Imprime el valor en la consola
    console.log('Valor de data-day:', dataDay);
  });
});
