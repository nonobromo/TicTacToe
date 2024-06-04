const boxes = document.querySelectorAll(".box");
let gameState = document.querySelector("#para");


let gameover = false;

let turn = "X";

let xScore = 0;
let oScore = 0;

let wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!gameover && e.innerHTML === "") {
            e.innerHTML = turn;
            winnerCheck()
            checkDraw()
            changeTurn(e);
        }
    })
});

function changeTurn(e) {
    if (turn === "X") {
        e.classList.add("xSelect");
        turn = "O"
    } else {
        e.classList.add("oSelect");
        turn = "X";
    }


}

function winnerCheck() {
    for (let i = 0; i < wins.length; i++) {
        let b1 = boxes[wins[i][0]].innerHTML;
        let b2 = boxes[wins[i][1]].innerHTML;
        let b3 = boxes[wins[i][2]].innerHTML;
        if (b1 != "" && b1 === b2 && b1 === b3) {
            gameState.innerHTML = `${turn} Wins!`;
            gameover = true;
            document.getElementById("btn-reset").style.display = "block";
            if (turn === "X") {
                xScore++
                b1 = boxes[wins[i][0]].classList.add("xWinner");
                b2 = boxes[wins[i][1]].classList.add("xWinner");
                b3 = boxes[wins[i][2]].classList.add("xWinner");
                gameState.style.color = "#86CC2D";
                document.getElementById("xScore").innerHTML = xScore;
                document.getElementById("xScore").classList.add("xSelect");
            } else if (turn === "O") {
                oScore++;
                b1 = boxes[wins[i][0]].classList.add("oWinner");
                b2 = boxes[wins[i][1]].classList.add("oWinner");
                b3 = boxes[wins[i][2]].classList.add("oWinner");
                gameState.style.color = "#E42983";
                document.getElementById("oScore").innerHTML = oScore
                document.getElementById("oScore").classList.add("oSelect");
            }
        }


    }
}

function checkDraw() {
    if (!gameover) {
        let draw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") {
                draw = false;
            }
        })
        if (draw) {
            gameover = true;
            gameState.innerHTML = "Draw";
            document.getElementById("btn-reset").style.display = "block";
        }
    }
}

const btnR = document.getElementById("btn-reset");

btnR.addEventListener("click", () => {
    gameover = false;
    document.getElementById("btn-reset").style.display = "none";
    gameState.innerHTML = "";
    boxes.forEach(e => {
        e.innerHTML = "";
    })


    for (const box of boxes) {
        box.classList.remove("xWinner");
        box.classList.remove("xSelect");
        box.classList.remove("oWinner");
        box.classList.remove("oSelect");
    }

    if (turn === "O") {
        turn = "X"
    } else if (turn === "X") {
        turn = "O";
    }

})