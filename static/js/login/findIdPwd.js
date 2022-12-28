let varifyNum;
let varifyflag = false;
let constid;

$(document).ready(function () {
    setFindIdMainpage();
    setToggleFindIdPwd();
});

// main findid page setting
function setFindIdMainpage() {
    var container = $('.main_main_sec')
    $(container).empty();

    //form 생성
    var findid_form = document.createElement('form');
    $(findid_form).addClass('form_IdPwd');
    container.append(findid_form);

    //name input div 생성
    var findid_inputname_wrap = document.createElement('div');
    $(findid_inputname_wrap).addClass('input_name_wrap');
    findid_form.append(findid_inputname_wrap);

    //name input label 생성
    var findid_inputname_label = document.createElement('label');
    $(findid_inputname_label).text('이름');
    findid_inputname_wrap.append(findid_inputname_label);

    //name input 생성
    var findid_inputname = document.createElement('input');
    $(findid_inputname).addClass('input_name');
    $(findid_inputname).prop('placeholder', ' name');
    findid_inputname_wrap.append(findid_inputname);

    //name input err msg 생성
    var findid_inputname_err_msg = document.createElement('p');
    $(findid_inputname_err_msg).addClass('name_err_msg');
    $(findid_inputname_err_msg).text('이름을 다시 확인해주세요.');
    findid_inputname_wrap.append(findid_inputname_err_msg);

    //phone_num input div 생성
    var findid_inputphonenum_wrap = document.createElement('div');
    $(findid_inputphonenum_wrap).addClass('input_phone_num_wrap');
    findid_form.append(findid_inputphonenum_wrap);

    //phone_num input label 생성
    var findid_inputphonenum_label = document.createElement('label');
    $(findid_inputphonenum_label).text('핸드폰번호');
    findid_inputphonenum_wrap.append(findid_inputphonenum_label);

    //phone_num input 생성
    var findid_inputphonenum = document.createElement('input');
    $(findid_inputphonenum).addClass('input_phone_num');
    $(findid_inputphonenum).prop("type", "tel");
    $(findid_inputphonenum).prop('placeholder', ' - 없이 입력하세요.');
    findid_inputphonenum_wrap.append(findid_inputphonenum);

    //phone_num input err msg 생성
    var findid_inputphonenum_err_msg = document.createElement('p');
    $(findid_inputphonenum_err_msg).addClass('phone_num_err_msg');
    $(findid_inputphonenum_err_msg).text('전화번호를 다시 확인해주세요.');
    findid_inputphonenum_wrap.append(findid_inputphonenum_err_msg);

    //조회하기 버튼 생성
    var findid_findid_btn = document.createElement('input');
    $(findid_findid_btn).addClass('inquire_btn_id');
    $(findid_findid_btn).prop('type', 'button');
    $(findid_findid_btn).val('조회하기');
    container.append(findid_findid_btn);

    // setting js code
    setFindIdInput();
    setFindIdBtn();
    setInputPhoneNum();
}

function setInputPhoneNum() {
    $(".input_phone_num").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3").replace("--", "-"));
    });
}

function setFindIdInput() {
    setInput($('.input_name'), $('.name_err_msg'));
    setInput($('.input_phone_num'), $('.phone_num_err_msg'));
}

function setFindIdBtn() {
    //아이디 페이지에서 조회하기 버튼 클릭 시
    $('.inquire_btn_id').click(function () {
        if (checkName() && checkPhoneNum()) {
            var name = $('.input_name').val();
            var phoneNum = $('.input_phone_num').val();
            $.ajax({
                url: 'http://127.0.0.1:8000/account/findId/', //request 보낼 서버의 경로
                type: 'post', // 메소드(get, post, put 등)
                data: JSON.stringify({
                    "name": name,
                    "phoneNum": phoneNum
                }), //보낼 데이터
                success: function (data) {
                    //서버로부터 정상적으로 응답이 왔을 때 실행
                    if (data.user_id == null)
                        noMatchingInfomation('.main_main_sec');
                    else
                        matchingIdInfomation(data.user_id);
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
}

function setToggleFindIdPwd() {
    //아이디 toggle 버튼 클릭 시
    $('.selectId').click(function () {
        setFindIdMainpage();
        $('.selectId').css('backgroundColor', '#3D8361');
        $('.selectId').css('color', 'white');
        $('.selectPwd').css('backgroundColor', 'white');
        $('.selectPwd').css('color', 'black');

    });

    // 비밀번호 toggle 버튼 클릭 시
    $('.selectPwd').click(function () {
        setFindPwdMainpage();
        $('.selectPwd').css('backgroundColor', '#3D8361');
        $('.selectPwd').css('color', 'white');
        $('.selectId').css('backgroundColor', 'white');
        $('.selectId').css('color', 'black');
    });
}

// main find pwd page setting
function setFindPwdMainpage() {
    var container = $('.main_main_sec')
    $(container).empty();

    //form 생성
    var findpwd_form = document.createElement('form');
    $(findpwd_form).addClass('form_IdPwd');
    container.append(findpwd_form);

    //name input div 생성
    var findpwd_inputname_wrap = document.createElement('div');
    $(findpwd_inputname_wrap).addClass('input_name_wrap');
    findpwd_form.append(findpwd_inputname_wrap);

    //name input label 생성
    var findpwd_inputname_label = document.createElement('label');
    $(findpwd_inputname_label).text('이름');
    findpwd_inputname_wrap.append(findpwd_inputname_label);

    //name input 생성
    var findpwd_inputname = document.createElement('input');
    $(findpwd_inputname).addClass('input_name');
    $(findpwd_inputname).prop('placeholder', ' name');
    findpwd_inputname_wrap.append(findpwd_inputname);

    //name input err msg 생성
    var findpwd_inputname_err_msg = document.createElement('p');
    $(findpwd_inputname_err_msg).addClass('name_err_msg');
    $(findpwd_inputname_err_msg).text('이름을 다시 확인해주세요.');
    findpwd_inputname_wrap.append(findpwd_inputname_err_msg);

    //id input div 생성
    var findpwd_inputid_wrap = document.createElement('div');
    $(findpwd_inputid_wrap).addClass('input_id_wrap');
    findpwd_form.append(findpwd_inputid_wrap);

    //id input label 생성
    var findpwd_inputid_label = document.createElement('label');
    $(findpwd_inputid_label).text('아이디');
    findpwd_inputid_wrap.append(findpwd_inputid_label);

    //name input 생성
    var findpwd_inputnid = document.createElement('input');
    $(findpwd_inputnid).addClass('input_id');
    $(findpwd_inputnid).prop('placeholder', ' id');
    findpwd_inputid_wrap.append(findpwd_inputnid);

    //name input err msg 생성
    var findpwd_inputid_err_msg = document.createElement('p');
    $(findpwd_inputid_err_msg).addClass('id_err_msg');
    $(findpwd_inputid_err_msg).text('아이디를 다시 확인해주세요.');
    findpwd_inputid_wrap.append(findpwd_inputid_err_msg);

    //감싸는 submit div 생성
    var findpwd_submit_wrap = document.createElement('div');
    $(findpwd_submit_wrap).addClass('submit_wrap');
    findpwd_form.append(findpwd_submit_wrap);

    //input phoneNum label 생성
    var findpwd_inputPhoneNUm_label = document.createElement('label');
    $(findpwd_inputPhoneNUm_label).text('본인인증');
    findpwd_submit_wrap.append(findpwd_inputPhoneNUm_label);

    //name input err msg 생성
    var findpwd_inputPhoneNUm_err_msg = document.createElement('p');
    $(findpwd_inputPhoneNUm_err_msg).addClass('phonenum_err_msg');
    $(findpwd_inputPhoneNUm_err_msg).text('전화번호를 다시 확인해주세요.');
    findpwd_submit_wrap.append(findpwd_inputPhoneNUm_err_msg);

    //send_verification_wrap div 생성
    var findpwd_send_verification_wrap = document.createElement('div');
    $(findpwd_send_verification_wrap).addClass('send_verification_wrap');
    findpwd_submit_wrap.append(findpwd_send_verification_wrap);

    //input_phone_num input 생성
    var findpwd_input_phone_num = document.createElement('input');
    $(findpwd_input_phone_num).attr('id', 'input_phone_num');
    $(findpwd_input_phone_num).addClass('input_outer');
    $(findpwd_input_phone_num).addClass('input_phone_num');
    $(findpwd_input_phone_num).prop('placeholder', ' 전화번호');
    $(findpwd_input_verifyNum).prop('type', 'password');
    findpwd_send_verification_wrap.append(findpwd_input_phone_num);

    //send_verification_btn button 생성
    var findpwd_send_verification_btn = document.createElement('button');
    $(findpwd_send_verification_btn).attr('id', 'send_verification_btn');
    $(findpwd_send_verification_btn).addClass('submit_btn');
    $(findpwd_send_verification_btn).text('인증번호받기');
    $(findpwd_send_verification_btn).prop('type', 'button');
    findpwd_send_verification_wrap.append(findpwd_send_verification_btn);

    //verify_verification_wrap div 생성
    var findpwd_verify_verification_wrap = document.createElement('div');
    $(findpwd_verify_verification_wrap).addClass('verify_verification_wrap');
    findpwd_submit_wrap.append(findpwd_verify_verification_wrap);

    //input_verifyNum input 생성
    var findpwd_input_verifyNum = document.createElement('input');
    $(findpwd_input_verifyNum).attr('id', 'input_verifyNum');
    $(findpwd_input_verifyNum).addClass('input_outer');
    $(findpwd_input_verifyNum).prop('placeholder', ' 인증번호');
    $(findpwd_input_verifyNum).prop('type', 'password');
    findpwd_verify_verification_wrap.append(findpwd_input_verifyNum);

    //verify_verification_btn button 생성
    var findpwd_verify_verification_btn = document.createElement('button');
    $(findpwd_verify_verification_btn).attr('id', 'verify_verification_btn');
    $(findpwd_verify_verification_btn).text('인증하기');
    $(findpwd_verify_verification_btn).addClass('submit_btn');
    $(findpwd_verify_verification_btn).prop('type', 'button');
    findpwd_verify_verification_wrap.append(findpwd_verify_verification_btn);

    //재설정하기 버튼 생성
    var findpwd_findpwd_btn = document.createElement('input');
    $(findpwd_findpwd_btn).addClass('inquire_btn_pwd');
    $(findpwd_findpwd_btn).attr('id', 'inquire_btn_pwd');
    $(findpwd_findpwd_btn).prop('type', 'button');
    $(findpwd_findpwd_btn).val('재설정하기');
    container.append(findpwd_findpwd_btn);

    // setting js code
    setFindPwdInput();
    setFindPwdBtn();
    setInputPhoneNum();
    setsend_verification_btn();
    setverify_verification_btn();
}

function setFindPwdInput() {
    setInput($('.input_name'), $('.name_err_msg'));
    setInput($('.input_id'), $('.id_err_msg'));

}

function setsend_verification_btn() {
    $('#send_verification_btn').click(function () {
        if (!checkName() || !checkID() || !checkPhoneNum())
            return;
        let id = $('.input_id').val();
        let name = $('.input_name').val();
        let phonenum = $('#input_phone_num').val();
        let newPhoneNum = '';
        for (var i = 0; i < phonenum.length; i++) {
            if (phonenum[i] == '-')
                continue;
            newPhoneNum += phonenum[i];
        }
        $.ajax({
            url: 'http://127.0.0.1:8000/account/send_SMS/', //request 보낼 서버의 경로
            type: 'post', // 메소드(get, post, put 등)
            data: JSON.stringify({
                "from": "find",
                "id": id,
                "name": name,
                "phone_num": newPhoneNum
            }), //보낼 데이터
            success: function (data) {
                //서버로부터 정상적으로 응답이 왔을 때 실행
                console.log(data);
                console.log(id+name+newPhoneNum);
                if (data.is_send == true)
                    varifyNum = data.num;
                else
                    noMatchingInfomation('.main_main_sec');
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
        $("#input_verifyNum").attr("disabled", false);
        $("#verify_verification_btn").attr("disabled", false);
    });
}

function setverify_verification_btn() {
    $("#input_verifyNum").attr("disabled", true);
    $("#verify_verification_btn").attr("disabled", true);
    $('#verify_verification_btn').click(function () {
        checkVerify();
    });
}

function checkVerify() {
    let inputverify = $('#input_verifyNum').val();
    if (varifyNum == inputverify) {
        varifyflag = true;
        $("#input_phone_num").attr("disabled", true);
        $("#send_verification_btn").attr("disabled", true);
        $("#input_verifyNum").attr("disabled", true);
        $("#verify_verification_btn").attr("disabled", true);
        alert("인증 성공");
    }
    else
        alert("인증 실패");
}

function setFindPwdBtn() {
    //비밀번호 페이지에서 재설정하기 버튼 클릭 시
    $('#inquire_btn_pwd').click(function () {
        if (checkName() && checkID() && checkPhoneNum() && varifyflag) {
            constid = $('.input_id').val();
            setNewPasswordPage();
        }
    });
}


function noMatchingInfomation($nomatchingpage) {
    var container = $($nomatchingpage)
    $(container).empty();

    //* div 생성
    var noMatchingPage = document.createElement('div');
    $(noMatchingPage).addClass('noMatchingPage');
    container.append(noMatchingPage);
    //* p 생성
    var noMatchingPageText = document.createElement('p');
    $(noMatchingPageText).addClass('noMatchingPageText');
    $(noMatchingPageText).text('일치하는 정보가 없습니다.');
    noMatchingPage.append(noMatchingPageText);
    //* button 생성
    var buttonWrap = document.createElement('div')
    $(buttonWrap).addClass("buttonWrap");
    container.append(buttonWrap);

    var goFindId = document.createElement('button');
    $(goFindId).addClass('goFindIdBtn');
    $(goFindId).text('처음으로');
    buttonWrap.append(goFindId);

    var goSignup = document.createElement('button');
    $(goSignup).addClass('goSignupBtn');
    $(goSignup).text('회원가입');
    buttonWrap.append(goSignup);

    $('.goFindIdBtn').click(function () {
        setFindIdMainpage();
    })
}

function matchingIdInfomation(user_id) {
    var container = $('.main_main_sec')
    $(container).empty();
    //* div 생성
    var matchingPage = document.createElement('div');
    $(matchingPage).addClass('matchingPage');
    container.append(matchingPage);

    //* p 생성
    var matchingPageText = document.createElement('p');
    $(matchingPageText).addClass('matchingPageText');
    $(matchingPageText).text('회원님의 아이디는' + user_id + ' 입니다.');
    matchingPage.append(matchingPageText);

    //* button 생성
    var buttonWrap = document.createElement('div')
    $(buttonWrap).addClass("buttonWrap");
    container.append(buttonWrap);

    var goLogin = document.createElement('button');
    $(goLogin).addClass('goLoginBtn');
    $(goLogin).text('로그인');
    buttonWrap.append(goLogin);
}

function setNewPasswordPage() {
    var container = $('.main_main_sec')
    $(container).empty();

    var newpasswordpage = document.createElement('form');
    $(newpasswordpage).addClass('newpasswordpage');
    container.append(newpasswordpage);

    var input_new_pwd_wrap = document.createElement('div');
    $(input_new_pwd_wrap).addClass('input_new_pwd_wrap');
    newpasswordpage.append(input_new_pwd_wrap);

    var input_new_re_pwd_wrap = document.createElement('div');
    $(input_new_re_pwd_wrap).addClass('input_new_re_pwd_wrap');
    newpasswordpage.append(input_new_re_pwd_wrap);

    var input_new_pwd_icon = document.createElement('img');
    $(input_new_pwd_icon).addClass('input_new_pwd_icon');
    $(input_new_pwd_icon).attr('src', "/static/img/Lock.png");
    $(input_new_pwd_icon).attr('alt', "");
    input_new_pwd_wrap.append(input_new_pwd_icon);

    var input_new_pwd_label = document.createElement('label');
    $(input_new_pwd_label).addClass('input_new_pwd_label');
    $(input_new_pwd_label).text('새 비밀번호');
    input_new_pwd_wrap.append(input_new_pwd_label);

    var input_new_pwd = document.createElement('input');
    $(input_new_pwd).addClass('input_new_pwd');
    $(input_new_pwd).prop('placeholder', '8~16자 영문 대 소문자, 숫자, 특수문자 사용 가능');
    $(input_new_pwd).prop('type', 'password');
    input_new_pwd_wrap.append(input_new_pwd);

    var input_new_pwd_err = document.createElement('p');
    $(input_new_pwd_err).addClass('input_new_pwd_err');
    $(input_new_pwd_err).text('8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.');
    input_new_pwd_wrap.append(input_new_pwd_err);

    var input_new_re_pwd_label = document.createElement('label');
    $(input_new_re_pwd_label).addClass('input_new_re_pwd_label');
    $(input_new_re_pwd_label).text('새 비밀번호 확인');
    input_new_re_pwd_wrap.append(input_new_re_pwd_label);

    var input_new_re_pwd = document.createElement('input');
    $(input_new_re_pwd).addClass('input_new_re_pwd');
    $(input_new_re_pwd).prop('type', 'password');
    input_new_re_pwd_wrap.append(input_new_re_pwd);

    var input_new_re_pwd_err = document.createElement('p');
    $(input_new_re_pwd_err).addClass('input_new_re_pwd_err');
    $(input_new_re_pwd_err).text('비밀번호가 일치하지 않습니다.');
    input_new_re_pwd_wrap.append(input_new_re_pwd_err);

    var input_new_pwd_change_btn = document.createElement('input');
    $(input_new_pwd_change_btn).addClass('input_new_pwd_change_btn');
    $(input_new_pwd_change_btn).prop('type', 'button');
    $(input_new_pwd_change_btn).val('변경하기');
    newpasswordpage.append(input_new_pwd_change_btn);

    //setting
    setNewPasswordInput();
    setinput_new_pwd_change_btn();
}

function setNewPasswordInput() {
    setInput($('.input_new_pwd'), $('.input_new_pwd_err'));
    setInput($('.input_new_pwd'), $('.input_new_pwd_icon'));
    setInput($('.input_new_re_pwd'), $('.input_new_re_pwd_err'));
}

function setinput_new_pwd_change_btn() {
    //btn 클릭 시 check하고 넘어감
    $('.input_new_pwd_change_btn').click(function () {
        if (checkPwd() && checkRePwd()) {
            let id = constid;
            let newpwd = $('.input_new_pwd').val();
            let newrepwd = $('.input_new_re_pwd').val();
            $.ajax({
                url: 'http://127.0.0.1:8000/account/mypage/changePwd/', //request 보낼 서버의 경로
                type: 'post', // 메소드(get, post, put 등)
                data: JSON.stringify({
                    "id": id,
                    "pwd": {
                        "new_password1": newpwd,
                        "new_password2": newrepwd
                    }
                }), //보낼 데이터
                success: function (data) {
                    //서버로부터 정상적으로 응답이 왔을 때 실행
                    console.log(data)
                    alert("변경성공");
                    window.location.href = 'http://127.0.0.1:8000' + data["url"]
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
}

function setInput($input, $target) {
    $($input).keyup(function () {
        $($target).css('visibility', 'hidden');
    });
}

//* checking
function checkName() {
    var checkname = $('.input_name').val();
    var regExp = /[ㄱ-힣]/;
    if (!regExp.test(checkname)) {
        $('.name_err_msg').css('visibility', 'visible');
        $('#input_name').focus();
        return false;
    }
    return true;
}

function checkID() {
    var checkid = $('.input_id').val();
    var regExp = /^[a-z]+[a-z0-9]{4,19}$/g;
    if (!regExp.test(checkid)) {
        $('.id_err_msg').css('visibility', 'visible');
        $('.input_id').focus();
        return false;
    }
    return true;
}

function checkPwd() {
    var checkpwd = $('.input_new_pwd').val();
    var regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (!regExp.test(checkpwd)) {
        $('.input_new_pwd_err').css('visibility', 'visible');
        $('.input_new_pwd_icon').css('visibility', 'visible');
        $('#input_new_pwd').focus();
        return false;
    }
    return true;
}

function checkRePwd() {
    var checkpwd = $('.input_new_pwd').val();
    var checkrepwd = $('.input_new_re_pwd').val();
    if (checkpwd != checkrepwd) {
        $('.input_new_re_pwd_err').css('visibility', 'visible');
        $('.input_new_re_pwd').focus();
        return false;
    }
    return true;
}

function checkPhoneNum() {
    var checkphonenum = $('.input_phone_num').val();
    var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
    if (!regExp.test(checkphonenum)) {
        $('.phonenum_err_msg').css('visibility', 'visible');
        $('.input_phone_num').focus();
        return false;
    }
    return true;
}
