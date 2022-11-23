$(function(){
  create_picBtn();
  img_slide();
  getPrice();
});

/*
  상품이미지 슬라이드 기능
*/
//불러온 이미지 개수에 맞춰서 동그라미 버튼 생성하기
function create_picBtn() {
  var pics_count = $('.pics').length;
  //console.log(pics_count);
  for (var i=0; i<pics_count; i++){
    $('.pic_btns').append('<div class="pic_btn"></div>');
  }
}

//동그라미 index에 따라 이미지 보이기 & 색 지정
function img_slide() {
  var item_pic = $('.item_pic .pics').get();
  var pic_btn = $('.pic_btns .pic_btn').get();

  pic_btn[0].classList.add('selected');
  item_pic[0].classList.remove('pics');

  for (var i = 0; i < pic_btn.length; i++) {
    pic_btn[i].addEventListener("click", (e)=>{
      var btn_index = Array.from(pic_btn).indexOf(e.currentTarget);

      for (var j=0; j<pic_btn.length; j++){
        if (j == btn_index) {
          pic_btn[j].classList.add('selected');
          item_pic[j].classList.remove('pics');
        } else {
          pic_btn[j].classList.remove('selected');
          item_pic[j].classList.add('pics');
        }
      }
    });
  }
  
}

function getPrice() {
  $("#price_font").text(itemPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
}
