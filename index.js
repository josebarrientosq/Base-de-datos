$(function(){
  var l = new Login();




})


class Login {
  constructor() {
    this.submitEvent()
  }

  submitEvent(){
    $('form').submit((event)=>{
      event.preventDefault()
      this.sendForm()
    })
  }

  sendForm(){
    console.log("hooooollaaaa")
    let form_data = new FormData();
    form_data.append('username', $('#user').val())
    form_data.append('password', $('#password').val())
    $.ajax({
      url: '../server/check_login.php',
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
      data: form_data,
      type: 'POST',
      success: function(php_response){
        if (php_response.conexion == "OK") {
          console.log("conexion correcta")
          if (php_response.acceso== "concedido")
            console.log("Bienvenido usuario") 
           // window.location.href = 'main.html'
          //else
            //alert("Usuario o password incorrectos")
        }else {
          //alert(php_response.conexion);
        }
      },
      error: function(){
        alert("error en la comunicación con el servidor error graveeeeee");
      }
    })
  }
}
