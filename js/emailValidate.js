$(document).ready(function(){
    $("#emailChangeBtn").click(function () {
        var email = $("#settings-newEmail").val();
        var confirmEmail = $("#settings-newConfirmEmail").val();
        if (email != confirmEmail) {
            alert("Emails do not match.");
            return false;
        }
        return true;
    });
});
