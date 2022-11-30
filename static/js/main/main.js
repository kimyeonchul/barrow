console.log("main");


// 슬라이드 배너======================================================================================
const index_now = document.querySelector('.index_now');
const index_all = document.querySelector('.index_all');
const outer = document.querySelector('.outer');
const innerList = document.querySelector('.inner-list');
const inners = document.querySelectorAll('.inner');
const imgs = document.querySelectorAll('.slideimg');
const circle = document.querySelector(".circle");
let currentIndex = 0; // 현재 슬라이드 화면 인덱스

function Indexvalue(){
  console.log(currentIndex);
  if(currentIndex === 3){
    index_now.innerHTML = `${currentIndex-inners.length+1}`;
  }
  else{
   index_now.innerHTML = `${currentIndex+1}`;
  }
    index_all.innerHTML = `${inners.length}`;
  }
  Indexvalue();
const getInterval = () => {
  return setInterval(() => {
    currentIndex++;
    Indexvalue();
    currentIndex = currentIndex >= inners.length ? 0 : currentIndex;
    innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;
  }, 2000);
}

function circleMove(item) {
  console.log(item);
    if (view === "visible") {
      circle.style="animation-name:circleleft";
      circle.style=`transform:translate(-18px,40%)`;
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
  if(currentIndex < 0){

  currentIndex += inners.length;

  innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
  console.log(currentIndex)
  }

  else{
    innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;
     // index만큼 margin을 주어 옆으로 밀기
    console.log(currentIndex)
  }
Indexvalue();
  clearInterval(interval); // 기존 동작되던 interval 제거
  interval = getInterval(); // 새로운 interval 등록
});

buttonRight.addEventListener('click', () => {
  if (currentIndex <= inners.length - 1) {

  }
  currentIndex++;
  currentIndex = currentIndex >= inners.length ? 0 : currentIndex; // index값이 inner의 총 개수보다 많아질 경우 마지막 인덱스값으로 변경
  Indexvalue();
  innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
  clearInterval(interval); // 기존 동작되던 interval 제거
  interval = getInterval(); // 새로운 interval 등록
});

/*
  주기적으로 화면 넘기기
*/
let interval = getInterval(); // interval 등록



