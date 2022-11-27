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

/*
폼 유효성 검사
*/
$(function(){
  var now_utc = Date.now()
  var timeOff = new Date().getTimezoneOffset()*60000;
  var today = new Date(now_utc-timeOff).toISOString().split("T")[0];
  document.getElementById("start_date").setAttribute("min", today);
  document.getElementById("end_date").setAttribute("min", today);
  //오늘 이후로만 선택
});


function checkForm() {
  console.log("submit");
  checkTitle(item_register.title.value);
  checkArea(item_register.area.value, item_register.area_detail.value);
  checkPrice(item_register.price.value);
  checkDate(item_register.start_date.value, item_register.end_date.value);
  checkCategory(item_register.category.value);
  checkMemo(item_register.memo.value);
  //함수 실행되는지 테스트용, true 결과일 때 만 폼 제출하도록함
}


//공백 확인
function checkExistData(value, dataName) {
  //console.log(value);
  if (value == ""){
    alert(dataName + " 입력해주세요!");
    return false;
  }
  return true;
}

//제목 확인
function checkTitle(title){
  if(!checkExistData(title, "제목을")){
    return false;
  }
}

//거래지역 확인
function checkArea(area, area_detail){
  if (!checkExistData(area, "거래지역을"))
    return false;
  if (!checkExistData(area_detail, "상세 주소를")) {
    return false;
  }
}

//가격 확인
function checkPrice(price){
  if (!checkExistData(price, "가격을")) {
    return false;
  }
}

//대여기간 확인
function checkDate(start_date, end_date){
  if (!checkExistData(start_date, "시작 날짜를")){
    return false;
  }
  if (!checkExistData(end_date, "반납 날짜를")) {
    return false;
  }

  //반납 날짜보다 시작 날짜가 빠를 때
  if (start_date >= end_date) {
    alert("반납 날짜는 시작 날짜보다 빠를 수 없습니다.");
  }

  //반납 날짜 = 시작 날짜 일때 
}

//카테고리 확인
function checkCategory(category){
  return (category == "선택" ? alert("카테고리를 입력해주세요!") : false)

}

//상세설명 확인
function checkMemo(memo){
  if (!checkExistData(memo, "상세 설명을")){
    return false;
  }
}

//사진 개수 확인
function checkImgNum(){
  if ($('#img_upload')[0].files.length > 6){
    return false;
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
const imageTag = document.getElementById('img_upload');
const pic_box = document.querySelector('.pic_box');

imageTag.addEventListener('change', function () {
    rmChilderen();
    console.log('파일선택');
    loadImg(this);
});

//썸네일, 리스트 생성
function loadImg(img){
  if (img.files.length > 5) {
    alert("이미지는 최대 5개까지 업로드 가능합니다.");
    return;
  } else {
    for (let i=0; i<img.files.length; i++){
      console.log("업로드");
      let reader = new FileReader();
      var name = document.getElementById('img_upload').files[i].name;
      console.log(name);

      var node = document.createElement('li');
      var tmp = `
          <img src="" class="uploadimage">
          <p>${name}</p>
          <input type="button" class="img_remove" value="X">

      `
      node.innerHTML = tmp;
      document.querySelector('.pic_box').appendChild(node);
      
      var liArr = $('.pic_box li').get();
      reader.onload = function(e) {
        liArr[i].querySelector('img').setAttribute('src', e.target.result);
      }
      reader.readAsDataURL(img.files[i]);

      liArr[i].querySelector('.img_remove').addEventListener("click", (e)=>{
        liArr[i].remove();
        removeImg(i);
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
