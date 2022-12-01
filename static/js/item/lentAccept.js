$(function(){
  getPrice();
});

//세자리수마다 콤마찍기
function getPrice() {
  $("#price_font").text(itemPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
}

$("#accept").click(function(){
  $("#submit").trigger("click");
});