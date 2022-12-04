
console.log("hi");
var staticlat = 0;
var staticlon = 0;



// nextPageBtn.addEventListener('click',() => {
//   let nextPageNum = pageActiveIdx;
//   displayRow(nextPageNum);
//   ++pageActiveIdx;
// });
// prevPageBtn.addEventListener('click',() => {
//   let nextPageNum = pageActiveIdx;
//   displayRow(nextPageNum);
//   --pageActiveIdx;
// });
 
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
    gido();
  }
    // document.querySelector('#find-me').addEventListener('click', geoFindMe);
$(document).ready(function(){
  geoFindMe();
});


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
        for(let product of products){
          geocoder.addressSearch(product["address"], function(result, status) {
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
                    content: '<img src = '+product["image"]+' style = "width:150px;text-align:center;padding:6px 0;">'
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
        
    }

//페이지네이션 ----------------------------------------------------------------------

const rowsPerPage = 20;
const rows = document.querySelectorAll('.bestitem');
const rowsCount = rows.length; //100/8  12.9 -> 13
const pageCount = Math.ceil(item_num/20);
const numbers = document.querySelector('#numbers');
console.log(`itemnum:${item_num}`);
const prevPageBtn = document.querySelector('.prevPageBtns');
const nextPageBtn = document.querySelector('.nextPageBtns');
console.log(pageCount);

let pageActiveIdx = 0; //현재 보고 있는 페이지 그룹 번호
let currentPageNum = 0; //현재 보고 있는 페이지 번호
let maxPageNum = 9; //페이지그룹 최대 개수
console.log(numbers);
if(rows === 0){
       numbers.innerHTML += `<li><a href="">${1}</a></li>`;
}
for(let i=1; i<=pageCount; i++){
   numbers.innerHTML += `<li><a href="">${i}</a></li>`;
}

const numberBtn = numbers.querySelectorAll('a');
console.log(numberBtn);

for(nb of numberBtn){
  nb.style.display="none";
}

numberBtn.forEach((item,idx) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
      for(nb of numberBtn){
        nb.classList.remove('active');
      }
      e.target.classList.add('active');
      displayRow(idx);
    });
});
function displayRow(idx){
  let start = idx*rowsPerPage;
  let end = start+rowsPerPage;

  let rowsArray = [...rows];

  for(ra of rowsArray){
    ra.style.display = 'none';
  }

  let newRows = rowsArray.slice(start,end);
  for(nr of newRows){
    nr.style.display = '';
  }
  for(nb of numberBtn){
    nb.classList.remove('active');
  }
  console.log(numberBtn[idx]);
  numberBtn[idx].classList.add('active');
}

displayRow(0);

//페이지네이션 그룹 표시 함수
function displayPage(num){
  //페이지네이션 번호 감추기
  for(nb of numberBtn){
    nb.style.display ='none';
  }
  let totalPageCount = Math.ceil(pageCount/maxPageNum);
  console.log(totalPageCount);
  console.log(pageActiveIdx);
  let pageArr = [...numberBtn];
  let start = num*maxPageNum;
  let end = start+maxPageNum;
  let pageListArr = pageArr.slice(start, end);

  for(let item of pageListArr){
    item.style.display="block";
  }

  if(pageActiveIdx == 0) {
    prevPageBtn.style.display = 'none'
  } else {
    prevPageBtn.style.display = 'flex'
  }
  if(pageActiveIdx == totalPageCount -1) {
    nextPageBtn.style.display = 'none'
  } else {
    nextPageBtn.style.display = 'flex'
  }
}
displayPage(0);
const dLeftVector = document.querySelector(".dLeftVector");
const dRightVector = document.querySelector(".dRightVector");
if(pageActiveIdx !== 0) {
  dRightVector.addEventListener('click', () => {
    let nextPageNum = pageActiveIdx * maxPageNum + maxPageNum;
    displayRow(nextPageNum);
    ++pageActiveIdx;
    displayPage(pageActiveIdx);
  });
  dLeftVector.addEventListener('click', () => {
    let nextPageNum = pageActiveIdx * maxPageNum - maxPageNum;
    displayRow(nextPageNum);
    --pageActiveIdx;
    displayPage(pageActiveIdx);
  });
}

nextPageBtn.addEventListener('click', () => {
  pageActiveIdx++;
  displayRow(pageActiveIdx);
  displayPage(pageActiveIdx);
});

prevPageBtn.addEventListener('click', () => {
  pageActiveIdx--;
  displayRow(pageActiveIdx);
  displayPage(pageActiveIdx);
});