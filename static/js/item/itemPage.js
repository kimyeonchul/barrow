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

//세자리수마다 콤마찍기
function getPrice() {
  $("#price_font").text(itemPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
}

/*
  모달 창 관련
*/
function modal(id) {
  var zIndex = 9999;
  var modal = $('#' + id);

  modal
      .css({
          position: 'fixed',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          zIndex: zIndex,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          msTransform: 'translate(-50%, -50%)',
          webkitTransform: 'translate(-50%, -50%)'
      })
      .show()
      .find('.modal_close_btn')
      .on('click', function() {
          modal.hide();
      });
}

/* 
  찜 버튼 클릭
*/
function getLove() {
  $('#love_btn').addClass('favorite');
  $.ajax({
    url: 'http://127.0.0.1:8000/product/set_favorite',
    type: "POST",
    dataType: "JSON",
    data: JSON.stringify({
      "product_id": product_id,
      "user_id" : user_id,
     }),
    headers: { "X-CSRFToken": "{{ csrf_token }}" },

    success: function(result){
      var favorite_num = result['favorite_num'];
      //console.log(favorite_num);  
      $('.favoriteNum').text(favorite_num);

    },

    error: function (xhr, textStatus, thrownError) {
      alert(
          "Could not send URL to Django. Error: " +
          xhr.status +
          ": " +
          xhr.responseText
      );
    },
  })
}

function takeAwayLove() {
  $('#love_btn').removeClass('favorite');
  $.ajax({
    url: 'http://127.0.0.1:8000/product/set_favorite',
    type: "DELETE",
    dataType: "JSON",
    data: JSON.stringify({
      "product_id": product_id,
      "user_id" : user_id,
     }),
    headers: { "X-CSRFToken": "{{ csrf_token }}" },

    success: function(result){
      var favorite_num = result['favorite_num'];
      //console.log(favorite_num);
      $('.favoriteNum').text(favorite_num);

    },

    error: function (xhr, textStatus, thrownError) {
      alert(
          "Could not send URL to Django. Error: " +
          xhr.status +
          ": " +
          xhr.responseText
      );
    },
  })
}

function showFavoriteNum() {
}

function love_btn(){
  if($("#love_btn").hasClass("favorite") === true) {
      takeAwayLove();
      showFavoriteNum();
      console.log("찜해제");
    } else {
      getLove();
      console.log("찜등록");
    }
}