
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