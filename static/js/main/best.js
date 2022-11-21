const bottomVector = document.querySelector(".bottomVector");
const nav_realtimesearch = document.querySelector(".nav_realtimesearch");
const input_search = document.querySelector(".input_search");
const recentSearchContainer = document.querySelector(".recentSearchContainer");
let view = "visible"
function realtimeViewVisible(e) {
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

// -----------------------------------------------------------------
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


const header_top_menu = document.querySelector(".header_top_menu");
const logoutBtn = document.querySelector(".logoutBtn");
let loginstatus = "loginUser";
userLoginoutStatus();

function userLoginoutStatus(){
if(loginstatus === "loginUser"){
  login();
}
else{
  console.log('1');
  notlogin();
}
}
// ============================================================================

// logoutBtn.addEventListener('click', () => {
//   loginout();
// })

// if(loginstatus == "loginUser"){
//   loginout();
// }
function login() {

  let loginbox = document.createElement("div");
  loginbox.setAttribute("class", "loginbox");
  loginbox.style =`
  display: flex;
  align-items: center;
  `
  header_top_menu.appendChild(loginbox);

  let login_mypage = document.createElement("p");
  login_mypage.setAttribute("class", "login_mypage");
  login_mypage.innerText=`마이페이지`;
  login_mypage.style =
  `margin: 0px 11px 0px 0px;
  font-size:20px;`;
  
  let login_username = document.createElement("p");
  login_username.setAttribute("class", "login_username");
  login_username.innerHTML=`<strong>김지영</strong>님`;
  login_username.style =
  `margin: 0px 11px 0px 0px;
  font-size:20px;
  `

  let login_br1 = document.createElement("div");
  login_br1.setAttribute("class", "login_br");
  login_br1.style =
  `background-color: black;
  width: 1px;
  height: 30px;
  margin: 0px 11px 0px 0px;`

  let login_br2 = document.createElement("div");
  login_br2.setAttribute("class", "login_br");
  login_br2.style =
  `background-color: black;
  width: 1px;
  height: 30px;
  margin: 0px 11px 0px 0px;`
  let login_logoutBtn = document.createElement("button");
  login_logoutBtn.setAttribute("class", "logoutBtn");
  login_logoutBtn.innerHTML=`<p class="loginOutText">로그아웃</p>`;
  login_logoutBtn.style = 
  `width: 111px;
  height: 41px;
  background: #3D8361;
  border-radius: 15px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 10px;
  color: white;`

  loginbox.appendChild(login_mypage);
  loginbox.appendChild(login_br1);
  loginbox.appendChild(login_username);
  loginbox.appendChild(login_br2);
  loginbox.appendChild(login_logoutBtn);
  // loginbox.style=
  // `display: flex;
  // align-items: center;`;

  login_logoutBtn.addEventListener('click', () => {
    loginstatus = "notlogin";
    userLoginoutStatus();
    // loginbox.style="display:none";
    while(loginbox.hasChildNodes())  {
      loginbox.removeChild(loginbox.firstChild);
    }
    header_top_menu.removeChild(header_top_menu.firstChild);
  })
}



function notlogin() {
let loginbtn = document.createElement("button");
loginbtn.setAttribute("class", "logoutBtn");
loginbtn.innerHTML = '<p class="loginOutText">로그인</p>';


let regibtn = document.createElement("button");
regibtn.setAttribute("class","regiBtn");
regibtn.innerHTML = '<p class="loginOutText">회원가입</p>';


let loginbox = document.createElement("div");
  loginbox.setAttribute("class", "loginbox");
  loginbox.style =`
  display: flex;
  align-items: center;
  `
  header_top_menu.appendChild(loginbox);


  loginbtn.style = `width: 111px;  height: 41px; background: #3D8361;
  border-radius: 15px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 10px;
  color: white;
  margin : 0px 10px 0px 0px;
  `
  regibtn.style = `width: 111px;  height: 41px; background: #3D8361;
  border-radius: 15px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 10px;
  color: white;
  `

  
  loginbox.appendChild(loginbtn);
  loginbox.appendChild(regibtn);
  // loginbox.style=
  // `display: flex;
  // align-items: center;`;

  loginbtn.addEventListener('click', () => {
  loginstatus = "loginUser";
  userLoginoutStatus();
  // loginbox.style="display:none";
  while(loginbox.hasChildNodes())  {
    loginbox.removeChild(loginbox.firstChild);
  }
  header_top_menu.removeChild(header_top_menu.firstChild);
  
})
}
//페이지네이션 ----------------------------------------------------------------------
const rowsPerPage = 8;
const rows = document.querySelectorAll('.bestitem');
const rowsCount = rows.length; //100/8  12.9 -> 13
const pageCount = Math.ceil(100/rowsPerPage);
const numbers = document.querySelector('#numbers');

const prevPageBtn = document.querySelector('.prevPageBtn');
const nextPageBtn = document.querySelector('.nextPageBtn');
console.log(prevPageBtn);
let pageActiveIdx = 0; //현재 보고 있는 페이지 그룹 번호
let currentPageNum = 0; //현재 보고 있는 페이지 번호
let maxPageNum = 9; //페이지그룹 최대 개수
console.log(numbers);
for(let i=1; i<pageCount; i++){
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

nextPageBtn.addEventListener('click', ()=>{
  let nextPageNum = pageActiveIdx*maxPageNum+maxPageNum;
  displayRow(nextPageNum);
  ++pageActiveIdx;
  displayPage(pageActiveIdx);
});
prevPageBtn.addEventListener('click', ()=>{
  let nextPageNum = pageActiveIdx*maxPageNum-maxPageNum;
  displayRow(nextPageNum);
  --pageActiveIdx;
  displayPage(pageActiveIdx);
});