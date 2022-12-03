
/*
  우편번호 api 적용 함수
*/
function findAddr(){
  daum.postcode.load(function() {
  new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var jibunAddr = data.jibunAddress; // 지번 주소 변수
            //주소 정보를 해당 필드에 넣는다.
            if(roadAddr !== ''){
                document.getElementById("area").value = roadAddr;
            } 
            else if(jibunAddr !== ''){
                document.getElementById("area").value = jibunAddr;
            }
            document.getElementById("area_detail").focus();
        }
    }).open();
  });
}

$('#area').click(function(){
  findAddr();
});


$(function(){

  var now_utc = Date.now()
  var timeOff = new Date().getTimezoneOffset()*60000;
  var today = new Date(now_utc-timeOff).toISOString().split("T")[0];
  document.getElementById("start_date").setAttribute("min", today);
  document.getElementById("end_date").setAttribute("min", today);
  //오늘 이후로만 선택
});

/*
폼 유효성 검사
*/
function formCheck(frm) {
  if (frm.title.value == "") {
    alert("제목을 입력해 주세요");
    frm.title.focus();
    return false;
  }
  // if (frm.img[0].value == "") {
  //   alert("최소 한 장의 사진을 첨부해 주세요");
  //   return false;
  // }
  if (frm.area.value == "" || frm.area_detail.value == "") {
    alert("주소를 정확히 입력해 주세요");
    frm.area_detail.focus();
    return false;
  }
  if (frm.price.value == "") {
    alert("가격을 입력해 주세요");
    frm.price.focus();
    return false;
    }
  if (frm.start_date.value == "" || frm.end_date.value == "") {
    alert("날짜를 정확히 입력해 주세요");
    return false;
    }
  if (frm.memo.value == "") {
    alert("상세정보를 입력해 주세요");
    return false;
    }
  return true;
}

function submitForm() {
  if (!formCheck(item_register)) {
    return;
  } else {
    console.log("ㅎㅇ");
    $('#register_form').trigger('click');
    //realSubmit();
  }
}

/*
이미지 업로드 기능
*/
//label 클릭시 input클릭으로 
function img_click() {
  document.querySelector('.img_upload').click();  
}

//파일선택했을 때
$(document).ready(function(){
  const imageTag = document.getElementById('img_upload');
  const pic_box = document.querySelector('.pic_box');

  if(imageTag){
    imageTag.addEventListener('change', function () {
      rmChilderen();
      console.log('파일선택');
      loadImg(this);
    });
  }
  
})


//썸네일, 리스트 생성
function loadImg(img){
  if (img.files.length > 5) {
    alert("이미지는 최대 5개까지 업로드 가능합니다.");
    return;
  } else {
    for (let i=0; i<img.files.length; i++){
      console.log("업로드");
      let reader = new FileReader();
      var node = document.createElement('li');
      var tmp = `
          <img src="" class="uploadimage">  
          <input type="button" class="img_remove" value="X">
          <div id="captain">대표이미지<div>

      `
      node.innerHTML = tmp;
      document.querySelector('.pic_box').appendChild(node);
      
      var liArr = $('.pic_box li').get();
      reader.onload = function(e) {
        liArr[i].querySelector('img').setAttribute('src', e.target.result);
      }
      console.log(img.files[i])
      reader.readAsDataURL(img.files[i]);

      liArr[i].querySelector('.img_remove').addEventListener("click", (e)=>{
        var fileNum = Array.from(liArr).indexOf(e.currentTarget);
        liArr[i].remove();
        removeImg(fileNum);
      });
    }
  }
}

//리스트 삭제기능
function removeImg(fileNum){
  const dataTransfer = new DataTransfer();
  let files = $('#img_upload')[0].files;	
  let fileArray = Array.from(files);	//변수에 할당된 파일을 배열로 변환(FileList -> Array) 

  fileArray.splice(fileNum, 1);	//해당하는 index의 파일을 배열에서 제거
  fileArray.forEach(file => { 
    dataTransfer.items.add(file); 
  });
  $('#img_upload')[0].files = dataTransfer.files;	//제거 처리된 FileList를 돌려줌
}

//다시 업로드하면 리스트 초기화
function rmChilderen(){
  const parent = document.querySelector('.pic_box');
  while(parent.firstChild)  {
    parent.firstChild.remove()
  }
}
//사진 수정
$(".uploadimage").click(function(){
  $("#image_input"+$(this).attr("id")).trigger("click")
});
$(".img_input").change(function(){  
  let reader = new FileReader();
  if(!this.files.length) {
      return;
  }
  img_id = $(this).attr("id")
  img_id = img_id.replace("image_input","")

  reader.readAsDataURL(this.files[0]);
  reader.onload = function (e) {
    $("#"+img_id).attr("src",e.target.result)
  }
});
$(".img_remove").click(function(){
  img_id = $(this).attr("id").replace("image_remove","");
  $("#li"+img_id).remove();
})

