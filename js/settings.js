function toggle(e) {
    e.preventDefault();

    var modalTitleBlock = $("#settingModal").find(".modal-title");
    var activeBtn = $(".settingsBtnGroup > button.active");
    var activeText = activeBtn.text();
    if(activeText == "Change Email") {
        $(".settings_email").hide();
    }
    else if(activeText == "Change Password") {
        $(".settings_password").hide();
    }
    activeBtn.removeClass('active');
    $(this).addClass('active');
    var clickedText = $(this).text();
    if(clickedText == "Change Email") {
        modalTitleBlock[0].innerHTML = "Change Email";
        $(".settings_email").show();
    }
    else if(clickedText == "Change Password") {
        modalTitleBlock[0].innerHTML = "Change Password";
        $(".settings_password").show();
    }
}
