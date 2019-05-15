const tetris = document.querySelector('#tetris');
const blockArr = [
  ['red', true, [
    [1, 1],
    [1, 1],
  ]],
  ['blue', true, [
    [0, 2, 0],
    [2, 2, 2],
  ]],
  ['orange', true, [
    [3, 3, 0],
    [0, 3, 3],
  ]],
  ['skyblue', true, [
    [0, 4, 4],
    [4, 4, 0]
  ]],
  ['yellowgreen', true, [
    [5, 5, 5],
    [5, 0, 0]
  ]],
  ['pink', true, [
    [6, 6, 6],
    [0, 0, 6],
  ]],
  ['yellow', true, [
    [7, 7, 7, 7],
  ]],
];
const blockDict = {
  0: 'white',
  1: ['red', true, [
    [1, 1],
    [1, 1],
  ]],
  2: ['blue', true, [
    [0, 1, 0],
    [1, 1, 1],
  ]],
  3: ['orange', true, [
    [1, 1, 0],
    [0, 1, 1],
  ]],
  4: ['skyblue', true, [
    [0, 1, 1],
    [1, 1, 0]
  ]],
  5: ['yellowgreen', true, [
    [1, 1, 1],
    [1, 0, 0]
  ]],
  6: ['pink', true, [
    [1, 1, 1],
    [0, 0, 1],
  ]],
  7: ['yellow', true, [
    [1, 1, 1, 1],
  ]],
  10: ['red', false, []],
  20: ['blue', false, []],
  30: ['orange', false, []],
  40: ['skyblue', false, []],
  50: ['yellowgreen', false, []],
  60: ['pink', false, []],
  70: ['yellow', false, []],
}
let tetrisData = [];
let stopDown = false;

// 함수
function createCell(){
  let fragment = document.createDocumentFragment();
  for(let i=0; i<20; i++){
    let tr = document.createElement('tr');
    let arr = [];
    tetrisData.push(arr);
    fragment.appendChild(tr);
    for(let i=0; i<10; i++){
      let td = document.createElement('td');
      tr.appendChild(td);
      arr.push(0);
    }
  }
  console.log(tetrisData);
  tetris.appendChild(fragment);
}

function render(){
  tetrisData.forEach((tr, i)=>{
    tr.forEach((td, j)=>{
      console.log(td);
      tetris.children[i].children[j].className = blockDict[td][0];
    });
  });
};

function createBlock(){
  stopDown = false;
  let block = blockArr[Math.floor( Math.random() * 7 )][2];
  console.log('가져온 블럭', block);
  block.forEach((tr, i)=>{
    tr.forEach((td, j)=>{
      tetrisData[i][j + 3] = td;
    });
  });
  render();
};

function drop_block(){
  for(let i= tetrisData.length - 1; i>=0; i--){
    tetrisData[i].forEach((td, j)=>{
      if( td > 0 && td < 10 ){
        if(tetrisData[i + 1] && !stopDown ){
          // 다음번 칸이 있으며, 빈칸0인 경우 
          tetrisData[i + 1][j] = td;
          tetrisData[i][j] = 0;
        }else{
          // 땅끝에 닿은경우
          stopDown = true;
          tetrisData[i][j] = td * 10;
        }
      }
    });
  }

  if(stopDown) createBlock();
  render();
};

// 이벤트
window.addEventListener('keydown', (e)=>{
  switch(e.code){
    case 'ArrowRight' : 
      break;
    case 'ArrowLeft' : 
      break;
    case 'ArrowDown' : 
      break;
    default :  // if문의 else 같은 역할
      break;
  }
});
window.addEventListener('keyup', (e)=>{
  switch(e.code){
    case 'Space' : 
      break;
    case 'ArrowUp' : 
      break;
    default :  // if문의 else 같은 역할
      break;
  }
});

createCell();
createBlock();
setInterval(()=>{
  drop_block();
}, 300)