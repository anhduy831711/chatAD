function toggleResetPswd(e) {
  e.preventDefault();
  $('#logreg-forms .form-signin').toggle() // display:block or none
  $('#logreg-forms .form-reset').toggle() // display:block or none
}

function toggleSignUp(e) {
  e.preventDefault();
  $('#logreg-forms .form-signin').toggle(); // display:block or none
  $('#logreg-forms .form-signup').toggle(); // display:block or none
}

$(() => {
  // Login Register Form
  $('#logreg-forms #forgot_pswd').click(toggleResetPswd);
  $('#logreg-forms #cancel_reset').click(toggleResetPswd);
  $('#logreg-forms #btn-signup').click(toggleSignUp);
  $('#logreg-forms #cancel_signup').click(toggleSignUp);
})

$("#frmLogin").on("submit", (e) => {
  let item = e.currentTarget;

  let value = $(item).serializeArray();
  let data = {};

  value.forEach(element => {
    if (element.name) {
      data[element.name] = element.value;
    }
  });

  $.ajax({
    url: "/api/login",
    method: "POST",
    data,
    success: (data) => {
      localStorage.setItem("token", `Bearer ${data.token}`);
      window.location.href = "/chat"
    },
    error: (error) => {
      console.log(error);
    }
  })
  return false;
})