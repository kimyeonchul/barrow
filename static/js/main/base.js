const bottomVector = document.querySelector(".bottomVector");
const nav_realtimesearch = document.querySelector(".nav_realtimesearch");
const input_search = document.querySelector(".input_search");
const recentSearchContainer = document.querySelector(".recentSearchContainer");
const categoryClick = document.querySelector(".categoryClick");
const transferdata = document.querySelector(".transferdata");
const circle = document.querySelector(".circle");

let view = "visible";
let viewstatus = 'show';
let inout = 'in';
var staticlat = 0;
var staticlon = 0;



function realtimeViewVisible(e) {
  console.log(e);
    if (view === "visible") {
        nav_realtimesearch.style="visibility:visible";
        view = "hidden";
    }
    else {
        nav_realtimesearch.style = "visibility:hidden";
        view = "visible";
    }

}
document.addEventListener('mouseup', (e) => {
  // let e.target.closest('.recentSearchContainer').className
  let tgE1 = e.target;
  let recent = tgE1.closest('.nav_realtimesearch');

    if(!recent){
      nav_realtimesearch.style = "visibility:hidden";
       viewstatus = "show";

    }

})
//외부영역 클릭시 최근검색창 닫기===========================================================
input_search.addEventListener('click', (e) => {
  // console.log(e.target.parentNode);
    if(viewstatus === 'show'){
      recentSearchContainer.style = "visibility:visible";
      viewstatus = "hide";
    }
})
document.addEventListener('mouseup', (e) => {
  // let e.target.closest('.recentSearchContainer').className
  let tgE1 = e.target;
  let recent = tgE1.closest('.recentSearchContainer');
    if(!recent){
      recentSearchContainer.style = "visibility:hidden";
       viewstatus = "show";

    }

})
//현재 클릭한 요소의 타겟의 조상 .closest('.recentSearchContainer')이 없다면 null return ========================
function categoryBox(e){
  if (viewstatus === "show") {
    categoryClick.style="visibility:visible";
    viewstatus = "hide";
  }
  else{
    categoryClick.style = "visibility:hidden";
    viewstatus = "show";
  }
}
document.addEventListener('mouseup', (e) => {
  // let e.target.closest('.recentSearchContainer').className
  let tgE1 = e.target;
  let recent = tgE1.closest('.categoryClick');
    if(!recent){
      categoryClick.style = "visibility:hidden";
       viewstatus = "show";

    }

})

const linkcolors = document.querySelectorAll('dt>a');


function circleMove(item) {
  console.log(item);
    if (view === "visible") {
      circle.style="animation-name:circleleft";
      circle.style=`transform:translate(-18px, 5px)`;
        view = "hidden";
        $.ajax({
          url: 'http://127.0.0.1:8000/search/is_save/', //request 보낼 서버의 경로
          type: 'post', // 메소드(get, post, put 등)
          data: JSON.stringify({
              "user":user_id,
              "is_save": false
          }), //보낼 데이터
          success: function (data) {
              //서버로부터 정상적으로 응답이 왔을 때 실행
              $("#keyword").css("display","none");


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
    else{
      circle.style="animation-name:circleright"
        view = "visible";
        $.ajax({
          url: 'http://127.0.0.1:8000/search/is_save/', //request 보낼 서버의 경로
          type: 'post', // 메소드(get, post, put 등)
          data: JSON.stringify({
              "user":user_id,
              "is_save": true
          }), //보낼 데이터
          success: function (data) {
              //서버로부터 정상적으로 응답이 왔을 때 실행
              $("#keyword").css("display","block");
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
}




// ============================================================================
const outers = document.querySelector('.nav_realmenu_box');
const innerLists = document.querySelector('.nav_realmenu_left');
const innerss = document.querySelectorAll('.nav_inner');
// const imgs = document.querySelectorAll('img');
let currentIndexs = 0; // 현재 슬라이드 화면 인덱스

innerss.forEach((inner) => {
    inner.style.width = `${innerLists.clientWidth}px`; // inner의 width를 모두 outer의 width로 만들기
    inner.style.height = `${innerLists.clientHeight}px`;
})
innerLists.style.height = `${outers.clientHeight * innerss.length}px`;


const getIntervals = () => {
    return setInterval(() => {
        currentIndexs++;
        currentIndexs = currentIndexs >= innerss.length ? 0 : currentIndexs;
        innerLists.style.marginTop = `-${outers.clientHeight * currentIndexs}px`;
    }, 4000);
}

let intervalz = getIntervals(); // interval 등록

const newP = document.createElement('p');
const newinput = document.createElement('p');
newP.innerHTML = "<input type='text' value={staticlat} style='display:none'> ";
newinput.innerHTML = "<input type='text' value={staticlon} style='display:none'> ";
transferdata.appendChild(newP);
transferdata.appendChild(newinput);

function geoFindMe() {
    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');

    mapLink.href = '';
    mapLink.textContent = '';
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      staticlat = latitude;
      staticlon = longitude;
      status.textContent = '';
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }

    function error() {
      status.textContent = 'Unable to retrieve your location';
    }

    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
    // gido();
  }
    // document.querySelector('#find-me').addEventListener('click', geoFindMe);



function gido(){
    console.log(staticlat);
    console.log(staticlon);
  var mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(staticlat, staticlon), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };
            console.log(mapOption.center);
        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();
        // var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다
        //     imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
        //     imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        // var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
        //     markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

        // // 마커를 생성합니다
        // var marker = new kakao.maps.Marker({
        //     position: markerPosition,
        //     image: markerImage // 마커이미지 설정
        // });

        // var markerImage2 = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
        //     markerPosition2 = new kakao.maps.LatLng(37.54695, 127.09598); // 마커가 표시될 위치입니다

        // var marker2 = new kakao.maps.Marker({
        //     position: markerPosition2,
        //     image: markerImage2 // 마커이미지 설정
        // });

        // // 마커가 지도 위에 표시되도록 설정합니다

        geocoder.addressSearch('서울특별시 종로구 홍지문2길 20', function(result, status) {

            // 정상적으로 검색이 완료됐으면
             if (status === kakao.maps.services.Status.OK) {

                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
                var mylocationmarker = new kakao.maps.Marker({
                    map: map,
                    position: mapOption.center
                });
                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
                });

                var myinfowindow = new kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">내 위치</div>'
                });
                myinfowindow.open(map, mylocationmarker);
                infowindow.open(map, marker);

                mylocationmarker.setMap(map);
                // marker.setMap(map);

                map.setCenter(mapOption.center);
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                // map.setCenter(coords);
            }
        });
    }
geoFindMe();

console.log($(".nav_gido > a"));
$(".nav_gido > a").click(function(){
  $("#cur_posx").val(staticlon);
  $("#cur_posy").val(staticlat);
  console.log(staticlon, staticlat)
  $("#submit").trigger("click");
});