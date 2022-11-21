const bottomVector = document.querySelector(".bottomVector");
const nav_realtimesearch = document.querySelector(".nav_realtimesearch");
const input_search = document.querySelector(".input_search");
const recentSearchContainer = document.querySelector(".recentSearchContainer");

let view = "visible"
function viewvisible(e) {
  console.log(e);
    if (view === "visible") {
        nav_realtimesearch.style="visibility:visible"
        view = "hidden";
    }
    else{
        nav_realtimesearch.style = "visibility:hidden"
        view = "visible";
    }   
}

function searchViewVisible(e) {
  console.log(e);
    if (view === "visible") {
      recentSearchContainer.style="visibility:visible"
        view = "hidden";
    }
    else{
      recentSearchContainer.style = "visibility:hidden"
        view = "visible";
    }   
}
/*
  div사이즈 동적으로 구하기
*/
const index_now = document.querySelector('.index_now');
const index_all = document.querySelector('.index_all');
const outer = document.querySelector('.outer');
const innerList = document.querySelector('.inner-list');
const inners = document.querySelectorAll('.inner');
const imgs = document.querySelectorAll('.slideimg');
const circle = document.querySelector(".circle");
let currentIndex = 0; // 현재 슬라이드 화면 인덱스

function circleMove(e) {
    if (view === "visible") {
      circle.style="animation-name:circleleft";
      circle.style=`transform:translate(-18px,0)`;
        view = "hidden";
    }
    else{
      circle.style="animation-name:circleright"
        view = "visible";

    }   
}

inners.forEach((inner) => {
  inner.style.width = `${outer.clientWidth}px`; // inner의 width를 모두 outer의 width로 만들기
})

imgs.forEach((img) => {
    img.style.width = `${outer.clientWidth}px`;
    img.style.height = `${outer.clientHeight}px`;
})
innerList.style.width = `${outer.clientWidth * inners.length}px`; // innerList의 width를 inner의 width * inner의 개수로 만들기

/*
  버튼에 이벤트 등록하기
*/
const buttonLeft = document.querySelector('.button-left');
const buttonRight = document.querySelector('.button-right');

buttonLeft.addEventListener('click', () => {
  currentIndex--;
  currentIndex = currentIndex < 0 ? 0 : currentIndex; // index값이 0보다 작아질 경우 0으로 변경
  Indexvalue();
  innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
  clearInterval(interval); // 기존 동작되던 interval 제거
  interval = getInterval(); // 새로운 interval 등록
});

buttonRight.addEventListener('click', () => {  
  currentIndex++;
  currentIndex = currentIndex >= inners.length ? inners.length - 1 : currentIndex; // index값이 inner의 총 개수보다 많아질 경우 마지막 인덱스값으로 변경
  Indexvalue();
  innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
  clearInterval(interval); // 기존 동작되던 interval 제거
  interval = getInterval(); // 새로운 interval 등록
});
function Indexvalue(){
    index_now.innerHTML = `${currentIndex}`;
    index_all.innerHTML = `${inners.length}`;
  }
/*
  주기적으로 화면 넘기기
*/
const getInterval = () => {
  return setInterval(() => {
    currentIndex++;
    Indexvalue();
    currentIndex = currentIndex >= inners.length ? 0 : currentIndex;
    innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;
  }, 2000);
}

let interval = getInterval(); // interval 등록

/*
  이미지 좌우로 넘기기
*/
