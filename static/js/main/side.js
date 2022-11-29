
const rowsPerPages = 2;
const rowss = document.querySelectorAll('.recentItem');
const rowsCounts = rowss.length; //100/8  12.9 -> 13
const pageCounts = Math.ceil(rowsCounts/rowsPerPages);
console.log(`pageCounts : ${pageCounts}`)
const prevPageBtns = document.querySelector('.prevPageBtn');
const nextPageBtns = document.querySelector('.nextPageBtn');
let pageActiveIdxs = 1; //현재 보고 있는 페이지 그룹 번호
const recentitembox = document.querySelector('.recentitembox');
const paginationz = document.querySelector('.paginations');
if(pageCounts === 0){
   let noneitem = document.createElement("p");
        noneitem.innerHTML = `최근 본 상품이 <br/> 
        없습니다.`;
        // newDiv.setAttribute("id", "Ndiv");
        noneitem.style.fontsize = "20px";
        // let par = document.getElementsByTagName("h2")[0];
        recentitembox.appendChild(noneitem);
        recentitembox.style.marginTop ="30px";
        paginationz.style.display="none";
}
function displayRows(idx){
  let idxz = idx-1;
  console.log(idx);
  let start = idxz*rowsPerPages;
  let end = start+rowsPerPages;

  let rowsArray = [...rowss];

  for(ra of rowsArray){
    ra.style.display = 'none';
  }

  let newRows = rowsArray.slice(start,end);
  for(nr of newRows){
    nr.style.display = '';
  }
}
displayRows(1);

nextPageBtns.addEventListener('click', ()=>{
  let nextPageNum = pageActiveIdxs;
  if(pageActiveIdxs >= pageCounts){
    pageActiveIdxs = pageActiveIdxs;
  }
  else{
    ++pageActiveIdxs;
  }
  nextPageNum = pageActiveIdxs;
  // displayRows(nextPageNum-1);
  displayRows(nextPageNum);
  currentPage.innerHTML=`${nextPageNum}`;
  allPage.innerHTML=`${pageCounts}`;

});
prevPageBtns.addEventListener('click', ()=>{
  let nextPageNum = pageActiveIdxs;
  if(pageActiveIdxs <= 1){
    pageActiveIdxs = pageActiveIdxs;
  }
  else{
    --pageActiveIdxs;
  }
  nextPageNum = pageActiveIdxs;
  displayRows(nextPageNum);
  currentPage.innerHTML=`${nextPageNum}`;
  allPage.innerHTML=`${pageCounts}`;


});
const currentPage = document.querySelector('.currentPage');
const allPage = document.querySelector('.allPage');
currentPage.innerHTML=`${pageActiveIdxs}`;
allPage.innerHTML=`${pageCounts}`;
function pagenum(nextPageNum){
  console.log(nextPageNum);

}