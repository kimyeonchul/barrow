const bottomVector = document.querySelector(".bottomVector");
const nav_realtimesearch = document.querySelector(".nav_realtimesearch");
const input_search = document.querySelector(".input_search");
const recentSearchContainer = document.querySelector(".recentSearchContainer");
const categoryClick = document.querySelector(".categoryClick");
let view = "visible";
let viewstatus = 'show';
let inout = 'in';
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


function circleMove(item) {
  console.log(item);
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
