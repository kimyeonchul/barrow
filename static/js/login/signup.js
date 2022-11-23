$(document).ready(function () {
    //* setting 
    setSelect();
    setAcodian();
    setCheckbox();
    setAllInput();
    setTextArea();
});

function setAllInput() {
    setInput($('#input_id'), $('.id_err_msg'));
    setInput($('#input_pwd'), $('.pwd_err_msg'));
    setInput($('#input_pwd'), $('.input_pwd_icon'));
    setInput($('#input_repwd'), $('.repwd_err_msg'));

}

function setInput($input, $target) {
    $($input).keyup(function () {
        $($target).css('visibility', 'hidden');
    });
}

function setCheckbox() {
    $('.check_all_btn').click(function () {
        var checked = $('.check_all_btn').is(':checked');
        if (checked) {
            $('.check').prop('checked', true);
            $('.check_err_msg').css('visibility', 'hidden');
        }
        else
            $('.check').prop('checked', false);
    });
    $('.check').click(function () {
        var all_checkbox = $('.check').length;
        var checked_checkbox = $("input:checkbox[name='check']:checked").length;
        if (all_checkbox == checked_checkbox) {
            $('.check_all_btn').prop('checked', true);
        } else {
            $('.check_all_btn').prop('checked', false);
        }
    });
}

function setAcodian() {
    var detail1 = true;
    var detail2 = true;
    $('.check_detail1').click(function () {
        if(detail1){
            $('.check_textarea1').slideDown();
            $('.check_textarea2').slideUp();
            detail1 = false;
            detail2 = true;
        }
        else{
            $('.check_textarea1').slideUp();
            detail1 = true;
        }
    });

    $('.check_detail2').click(function () {
        if(detail2){
            $('.check_textarea2').slideDown();
            $('.check_textarea1').slideUp();
            detail2 = false;
            detail1 = true;
        }
        else{
            $('.check_textarea2').slideUp();
            detail2 = true;
        }
    });

}

function setSelect() {
    var now = new Date();
    var year = now.getFullYear();
    console.log(year);
    for (var i = 1; i <= 12; i++) {
        $('#select_month').append("<option value='" + i + "'>" + i + "월</option>");
    }
    for (var i = 1; i <= 31; i++) {
        $('#select_date').append("<option value='" + i + "'>" + i + "일</option>");
    }
    for (var i = year - 50; i <= year; i++) {
        $('#select_year').append("<option value='" + i + "'>" + i + "년</option>");
    }
}

function setTextArea() {
    var t1 = "개인정보 1"
    var t2 = "위치정보 1"
    $('.check_textarea1').val(t1);
    $('.check_textarea2').val(t2);
}

//* sign up checking
$('.submit_btn').click(function () {
    if(checkID() && checkPwd() && checkRePwd() && checkName() && checkAddress() && checkCheckbox()){
        /*
    $.ajax({
        url:'', //request 보낼 서버의 경로
        type:'post', // 메소드(get, post, put 등)
        data:{'id':'admin'}, //보낼 데이터
        success: function(data) {
            //서버로부터 정상적으로 응답이 왔을 때 실행
        },
        error: function(err) {
            //서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
        }
    });
    */
    }
});

function checkID() {
    var checkid = $('#input_id').val();
    var regExp = /^[a-z]+[a-z0-9]{4,19}$/g;
    if (!regExp.test(checkid)) {
        $('.id_err_msg').css('visibility', 'visible');
        $('#input_id').focus();
        return false;
    }
}

function checkPwd() {
    var checkpwd = $('#input_pwd').val();
    var regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (!regExp.test(checkpwd)) {
        $('.pwd_err_msg').css('visibility', 'visible');
        $('.input_pwd_icon').css('visibility', 'visible');
        $('#input_pwd').focus();
        return false;
    }
}

function checkRePwd() {
    var checkpwd = $('#input_pwd').val();
    var checkrepwd = $('#input_repwd').val();
    if (checkpwd != checkrepwd) {
        $('.repwd_err_msg').css('visibility', 'visible');
        $('#input_repwd').focus();
        return false;
    }
}

function checkName() {
    var checkname = $('#input_name').val();
    var regExp = /[ㄱ-힣]/;
    if (!regExp.test(checkname)) {
        $('.name_err_msg').css('visibility', 'visible');
        $('#input_name').focus();
        return false;
    }
}

function checkAddress(){
    var checkpost = $('#member_post').val();
    var checkaddress = $('#member_addr').val();
    var checkdetailaddress = $('#member_detail').val();
    if(!checkpost || !checkaddress || !checkdetailaddress){
        $('.address_err_msg').css('visibility', 'visible');
        $('#member_detail').focus();
        return false
    }
}

function checkCheckbox() {
    var checked = $('.check_all_btn').is(':checked');
    if (!checked) {
        $('.check_err_msg').css('visibility', 'visible');
        return false;
    }
}
/* 주소정보 api*/
function findAddr() {
    new daum.Postcode({
        oncomplete: function (data) {

            console.log(data);

            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var jibunAddr = data.jibunAddress; // 지번 주소 변수
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('member_post').value = data.zonecode;
            if (roadAddr !== '') {
                document.getElementById("member_addr").value = roadAddr;
            }
            else if (jibunAddr !== '') {
                document.getElementById("member_addr").value = jibunAddr;
            }
        }
    }).open();
}