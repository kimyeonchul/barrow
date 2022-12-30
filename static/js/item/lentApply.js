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
  minDate : 0,
  beforeShowDay: availableDates,
});

$(function(){
  $('.datepicker').datepicker({
    onSelect: function() {
      try{
        var D1 = $.datepicker.formatDate("yy-mm-dd",$("#start_date").datepicker("getDate")); 
        var D2 = $.datepicker.formatDate("yy-mm-dd",$("#end_date").datepicker("getDate")); 
        setPrice(D1,D2)
      }
      catch{
        
      }
    }
  });
});

function availableDates(date){ //배열 내 날짜만 able
  var availableDates = getLentDates();
  var thisMonth = date.getMonth()+1;
  var thisDay = date.getDate();

  if(thisMonth<10){
    thisMonth = "0"+thisMonth;
  }

  if(thisDay<10){
    thisDay = "0"+thisDay;
  }

  ymd = date.getFullYear() + "-" + thisMonth + "-" + thisDay;

  if ($.inArray(ymd, availableDates) != -1) {
    return [true,"",""];
  } else {
    return [false,"",""];
  }

}

function getLentDates() { //시작일과 마감일 사이 날짜 배열에 넣기
	const dateRange = [];
  var startDate_str = lentStartYear.split(',')[1].trim() + "-" + lentStartDay.replace(" / ",'-');
  var endDate_str = lentEndYear.split(',')[1].trim() + "-" + lentEndDay.replace(" / ",'-');
	
  let startDate = new Date(startDate_str);
  let endDate = new Date(endDate_str);
  //11.22 부터 12.4까지 선택 못함!
  
	while(startDate <= endDate) {
		dateRange.push(startDate.toISOString().split('T')[0]);
		startDate.setDate(startDate.getDate() + 1);
	}
	return dateRange;
}

function LentDates(date){ //배열 내 날짜 disable
  var dateLentRange = getLentDates();
  var dateReservedRange = getReservedDates();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var y = date.getFullYear();
  if ($.inArray(y + '-' + m.toString().padStart(2,'0') + '-' + d.toString().padStart(2,'0'), dateReservedRange) != -1) {
    return [false];
  }
  else if ($.inArray(y + '-' + m.toString().padStart(2,'0') + '-' + d.toString().padStart(2,'0'), dateLentRange) != -1) {
    return [true];
  } 
  return [false];

}

function getReservedDates() { //시작일과 마감일 사이 날짜 배열에 넣기
	var dateRange = new Set();
  for(var date of dates){
    var startDate_str = date["start_date"].replaceAll(". ","-")
    var endDate_str = date["end_date"].replaceAll(". ","-")

	  let startDate = new Date(startDate_str);
    let endDate = new Date(endDate_str);

    while(startDate <= endDate) {
      dateRange.add(startDate.toISOString().split('T')[0]);
      startDate.setDate(startDate.getDate() + 1);
    }
  }
	return Array.from(dateRange);
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

function setPrice(D1,D2){
  var price_per;
  //var price_per_day = 7; //week이면
  if (price_per_day == 'MONTH') {
    price_per = 30;
  } else if (price_per_day == 'WEEK') {
    price_per = 7;
  } else {
    price_per = 1;
  }

  var delivery_charge = 1350; //배달료 천삼백오십원이라고 치자
  var price_unit = parseInt(price / price_per); //1일당 대여비
  var lentDays = getDateDiff(D1, D2) + 1; //대여일 수
  var lent_price = price_unit * lentDays;
  $("#lent_price").text(lent_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
  $('#total_price').text((lent_price + delivery_charge).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

}

/*
폼 유효성 검사
*/
function formCheck(frm) {
  console.log("폼체크");
  if (frm.start_date.value == "" || frm.end_date.value == "") {
    alert("날짜를 정확히 입력해 주세요");
    return false;
    }
  return true;
}

function submitForm() {
  if (!formCheck(lent_apply)) {
    return;
  } else {
    //alert("폼 제출");
    $("#form_submit_btn").trigger("click");
  }
}


