let gameSeqn = [];
let userSeqn = [];

let startBtn = document.getElementById("start-bx");

let btns = ["red", "green", "yellow", "blue"];
let level = 0;
let h2 = document.querySelector("h2");
let highScore = 0;
let highScoreDisplay = document.querySelector("h4");

let started = false;

startBtn.addEventListener("click", startGame);
startBtn.addEventListener("touchstart", startGame);

function startGame() {
    if (!started) {
        h2.innerText = `Game Started`;
        started = true;
        levelup();
    }
}
function flashButton(btn, className) {
    btn.classList.add(className);
    setTimeout(() => {
        btn.classList.remove(className);
    }, 200);
}

function levelup() {
    userSeqn = [];
    level++;
    startBtn.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); 
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeqn.push(randColor);
    flashButton(randBtn, "flash");

    if(level>highScore){
        highScore = level;
        highScoreDisplay.innerText = `HIGH SCORE :- ${highScore}`;
    }
}

function checkAns(idx) {
    if (userSeqn[idx] === gameSeqn[idx]) {
        if (userSeqn.length === gameSeqn.length) {  
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! <b>Your Score Was = ${level}</b>`;
        startBtn.innerText =`Re-Try`
        document.querySelector("body").style.backgroundColor = "#d81f54";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150)
        reset();
    }
}

function btnPress() {
    let btn = this;
    flashButton(btn, "userFlash"); 

    let userColor = btn.getAttribute("id");
    userSeqn.push(userColor);

    checkAns(userSeqn.length - 1);
}

let allBtns = document.querySelectorAll(".bx");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeqn = [];
    userSeqn = [];
    level = 0;
}

function checkOrientation() {
    if (screen.orientation.type.startsWith("landscape")) {
        alertUser();
    }
}

function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function checkOrientation() {
    if (isMobileDevice() && screen.orientation.type.startsWith("landscape")) {
        alertUser();
    }
}

function alertUser() {
    if (isMobileDevice() && screen.orientation.type.startsWith("landscape")) {
        alert("Please use portrait mode.");
        setTimeout(alertUser, 100);
        document.querySelector("body").style.display = 'none';
    } else {
        location.reload();
    }
}

if (isMobileDevice()) {
    screen.orientation.addEventListener("change", checkOrientation);
    checkOrientation();
}
