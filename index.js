let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
// setting value for turnover player as true/false
let turn0 = true;
let count = 0;
const winpattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = ()=>{
    turn0 = true;
    EnableBoxes();
    msgContainer.classList.add("hide");
}
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0 === true) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    count ++;
    let isWinner = winnerCheck();
    if(count == 9 && !isWinner){
        gameDraw();
    }
    winnerCheck();
  });
});

const gameDraw = ()=>{
    msg.innerText = "Game was a Draw."
    msgContainer.classList.remove("hide");
    boxes.disabled = true;
}

const disabledBoxes =()=>{
    for(let box of boxes){
        box.disabled =true;
    }
}

const EnableBoxes =()=>{
    for(let box of boxes){
        box.disabled =false;
        box.innerText = ""; 
    }
}

const showWinner =(winner)=>{
    msg.innerText= `Congratulation. The winner is ${winner}`;
    msgContainer.classList.remove("hide");
}

const winnerCheck = () => {
  for (let pattern of winpattern) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != 0) {
      if (pos1val == pos2val && pos2val == pos3val) {
        disabledBoxes();
        resetBtn.disabled = true;
        showWinner(pos1val);
      }
    }
  }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);