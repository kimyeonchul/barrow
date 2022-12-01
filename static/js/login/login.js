$(document).ready(function () {
    //* setting 
    setAllInput();
});

$('.login_btn').click(function () {
    if (checkID() && checkPwd()) {
        var username = $('#input_id').val();
        var password = $('#input_pwd').val();
        $.ajax({
            url: 'http://127.0.0.1:8000/account/login/', //request 보낼 서버의 경로
            type: 'post', // 메소드(get, post, put 등)
            data: JSON.stringify({
                "username": username,
                "password": password
            }), //보낼 데이터 //보낼 데이터
            success: function (data) {
            //서버로부터 정상적으로 응답이 왔을 때 실행
            //로그인 진행
            },
            error: function (xhr, textStatus, thrownError) {
                alert(
                    "Could not send URL to Django. Error: " +
                    xhr.status +
                    ": " +
                    xhr.responseText
                );
            },
        });
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