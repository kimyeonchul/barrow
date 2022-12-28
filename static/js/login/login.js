$(document).ready(function () {
    //* setting 
    setAllInput();
});

$('.login_btn').click(function () {
    if (checkID() && checkPwd()) {
        $("#login_submit").trigger("click")
    }



});

function setAllInput() {
    setInput($('#input_id'), $('.id_error_msg'));
    setInput($('#input_pwd'), $('.pwd_error_msg'));
}

function setInput($input, $target) {
    $($input).keyup(function () {
        $($target).css('visibility', 'hidden');
    });
}

function checkID() {
    var checkid = $('#input_id').val();
    var regExp = /^[a-z]+[a-z0-9]{4,19}$/g;
    if (!regExp.test(checkid)) {
        $('.id_error_msg').css('visibility', 'visible');
        $('#input_id').focus();
        return false;
    }
    return true;
}

function checkPwd() {
    var checkpwd = $('#input_pwd').val();
    var regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (!regExp.test(checkpwd)) {
        $('.pwd_error_msg').css('visibility', 'visible');
        $('.input_pwd_icon').css('visibility', 'visible');
        $('#input_pwd').focus();
        return false;
    }
    return true;
}