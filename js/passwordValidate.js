$(document).ready(function(){
  $("#createBtn").click(function () {
      var password = $("#inputPassword").val();
      var confirmPassword = $("#inputPasswordConfirm").val();
      if (password != confirmPassword) {
          alert("Passwords do not match.");
          return false;
      }
      return true;
  });
});
