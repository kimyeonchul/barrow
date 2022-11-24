/*
  datepicker 사용
*/
$.datepicker.setDefaults({
  dateFormat: 'yy-mm-dd',
  prevText: '이전 달',
  nextText: '다음 달',
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
  showMonthAfterYear: true,
  yearSuffix: '년',
});

$(function(){
  $('.datepicker').datepicker({
    beforeShowDay: disableDates,
  });
});

function getDates() { //시작일과 마감일 사이 날짜 배열에 넣기
	const dateRange = [];
	let startDate = new Date("2022-11-22");
  let endDate = new Date("2022-12-5");
  //11.22 부터 12.4까지 선택 못함!
  
	while(startDate <= endDate) {
		dateRange.push(startDate.toISOString().split('T')[0]);
		startDate.setDate(startDate.getDate() + 1);
	}
	return dateRange;
}

function disableDates(date){ //배열 내 날짜 disable
  var dateRange = getDates();

  var m = date.getMonth() + 1;
  var d = date.getDate();
  var y = date.getFullYear();
  for (i = 0; i < dateRange.length; i++) {
    if ($.inArray(y + '-' + m.toString().padStart(2,'0') + '-' + d.toString().padStart(2,'0'), dateRange) != -1) {
      return [false];
      }
  }
    return [true];
}

/*
  체크박스 하나만 선택
*/
function checkOnlyOne(element) {
  const checkboxes = document.getElementsByName("type");

  checkboxes.forEach((cb) => {
    cb.checked = false;
  })
  element.checked = true;
}

/*
  가격 계산
*/
function getDateDiff(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  
  const diffDate = date1.getTime() - date2.getTime();
  
  return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
}

$(function(){
  var price_per = 7; //week이라고 치자
  var delivery_charge = 1350; //배달료 천삼백오십원이라고 치자
  var price_unit = parseInt(price / price_per); //1일당 대여비
  var lentDays = getDateDiff(lentStartDay, lentEndDay) + 1; //대여일 수
  var lent_price = price_unit * lentDays;

  $("#lent_price").text(lent_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
  $('#total_price').text((lent_price + delivery_charge).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

});

