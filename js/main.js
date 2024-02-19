const area = document.querySelector(".playing_area");
const wrapper = document.querySelector(".wrapper");
const shotAudio = document.querySelector(".shot-audio");
const overshootAudio = document.querySelector(".overshoot-audio");
const piggyAudio = document.querySelector(".piggy-audio");
const killAudio = document.querySelector(".kill-audio");
const boomTank = document.querySelector(".boom-audio");
const badaboomAudio = document.querySelector(".badaboom-audio");
const gameOverAudio = document.querySelector(".gameover-audio");
const scoreOrcs = document.querySelector(".score_orcs");
const scoreTanks = document.querySelector(".score_tanks");
const playArea = document.querySelector(".playing_area");

let bestNickName = document.querySelector(".nick-name");
let bestKill = document.querySelector(".best-kill");
let nickName = "";
let stopGame = false;
let interval;
let timer = 4000;
let count = 0;
let score = 0;
let tankScore = 0;
let bestScore = 0;
let targetsCount = 0;
let rank = "рядовий";
let moreKill = score + tankScore;

const targets = [
   "orc_1",
   "orc_2",
   "orc_3",
   "orc_4",
   "orc_5",
   "orc_6",
  "tank",
  "kozak",
  "kozak2",
];

const targetAnimation = [
   "animation_orc_1",
   "animation_orc_2",
   "animation_orc_1",
   "animation_orc_1",
   "animation_orc_5",
   "animation_orc_6",
  "tank_animation",
  "animation_kozak",
  "animation_kozak",
];

//Start the game

function showGeneral(firstText, secondText, thitdText) {
  const divForGeneral = document.createElement("div");
  divForGeneral.classList.add("genelal");
  wrapper.append(divForGeneral);

  setTimeout(() => {
    divForGeneral.style.transform = "translateX(600px)";
  }, 400);

  const generalText = document.createElement("div");
  divForGeneral.append(generalText);

  generalText.classList.add("general-text");
  setTimeout(() => {
    generalText.style.opacity = "1";
  }, 1500);

  setTimeout(
    () => (generalText.innerText = `${firstText} ${rank} ${nickName}!`),
    2500
  );

  setTimeout(() => (generalText.innerText = `${secondText}`), 5000);

  setTimeout(() => (generalText.innerText = `${thitdText}`), 8000);
  const btnStart = document.createElement("button");

  setTimeout(() => {
    btnStart.classList.add("btn-start");
    btnStart.innerText = "моя русофобія недостатня!";
    wrapper.append(btnStart);
  }, 11000);

  btnStart.addEventListener("click", () => {
    divForGeneral.remove();
    btnStart.remove();
    wrapper.style.cursor = 'url("./img/curs.png"), auto';
    stopGame = false;
    periodicCreationTargets();
    wrapper.addEventListener("click", shot);
  });
}
function createStartWindow() {
  const divForStartGame = document.createElement("div");
  divForStartGame.classList.add("start-game");
  wrapper.append(divForStartGame);

  const enterName = document.createElement("p");
  enterName.innerText = "ВВЕДІТЬ СВОЄ ІМ'Я:";
  enterName.classList.add("start-title");
  divForStartGame.append(enterName);

  const inputName = document.createElement("input");
  inputName.classList.add("nick");
  divForStartGame.append(inputName);

  const btnSaveNick = document.createElement("button");
  btnSaveNick.classList.add("btn-for-nick");
  btnSaveNick.innerText = "ok";
  divForStartGame.append(btnSaveNick);

  function saveNick() {
    let inputValue = inputName.value;
    if (inputValue != "") {
      inputName.style.background = "#9ced5a";
      nickName = inputValue;
      setTimeout(() => divForStartGame.remove(), 600);
      showGeneral(
        "Здоров'я бажаю",
        "На тебе чекає просте, але важливе завдання...",
        "МОЧИТИ РУСНЮ!!! Хай прибуде з тобою F16!"
      );
    } else {
      inputName.style.background = "#ff0000";
    }
  }

  btnSaveNick.addEventListener("click", saveNick);
}

function startGame() {
  setTimeout(createStartWindow, 2000);
}
startGame();

// END Start the game

// create a target
function createTarget() {
  let divForOrc = document.createElement("div");
  if (stopGame && count === 5) {
    return;
  } else {
    count++;
    let randomIndex = () => Math.floor(Math.random() * targets.length); //choose a random element from the target array and an animation
    let index = randomIndex();
    let [elem, anime] = [targets[index], targetAnimation[index]];
    
    function showTarget() {
      //display the target on the arena
      wrapper.append(divForOrc);
      divForOrc.setAttribute("data-index", elem);
      divForOrc.classList.add(elem);
      divForOrc.classList.add(anime);
      piggyAudio.play();
      return divForOrc;
    }
  }

  setTimeout(showTarget, 500);
  setTimeout(() => divForOrc.remove(), timer);
}
function periodicCreationTargets() {
  if (stopGame) {
    return;
  } else {
    interval = setInterval(function () {
      if (count === 5) {
        stopGame = true;
        clearInterval(interval);
        count = 0;
        timer -= 500;
        switch (timer) {
          case 4000:
            rank = "РЯДОВИЙ";
            break;
          case 3500:
            rank = "СЕРЖАНТ";
            break;
          case 3000:
            rank = "ЛЕЙТЕНАНТ";
            break;
          case 2500:
            rank = "КАПІТАН";
            break;
          case 2000:
            rank = "МАЙОР";
            break;
          case 1500:
            rank = "ПІДПОЛКОВНИК";
            break;
          case 1000:
            rank = "ПОЛКОВНИК";
            break;
          case 500:
            setTimeout(
              showGeneral(
                "Вітаю з перемогою!",
                "Завдяння виконане",
                "Держава в безпеці"
              ),
              2000
            );
            count = 0;
            timer = 4000;
            return;
        }

        if (timer > 500 && stopGame === true) {
          setTimeout(
            showGeneral(
              "Вітаю з новим званням",
              "Завдяння виконане",
              "Переходимо до наступного бою!"
            ),
            2000
          );
        }
      } else {
        createTarget();
      }
    }, timer);
  }
}
//  END create a target

//Shot
function shot(e) {
  function bloodShot() {
    shotAudio.play();
    e.target.style.background = 'url("../img/head_shot.png")';
    e.target.style.backgroundSize = "cover";
    e.target.style.zIndex = "20";
    e.target.style.scale = "1.6";
    killAudio.play();
    score++;
    scoreOrcs.innerHTML = score;

    setTimeout(() => {
      e.target.remove();
    }, 300);
  }
  if (stopGame) {
    return;
  } else {
    function destroyedTarget() {
      bloodShot();
      const sunflower = document.createElement("div");
      let leftValue = window.getComputedStyle(e.target).left;
      let topValue = window.getComputedStyle(e.target).top;
      sunflower.classList.add("flower");
      area.append(sunflower);
      sunflower.classList.add("show-flower");
      sunflower.style.top = topValue;
      sunflower.style.left = leftValue;

      setTimeout(() => {
        sunflower.remove();
      }, 15000);
    }

    let tankCount = 0;
    function destroyedTank() {
      shotAudio.play();
      tankCount++;
      let smoke = document.createElement("div");
      e.target.append(smoke);
      smoke.classList.add("tank-smoke");
      if (tankCount >= 2) {
        boomTank.play();
        tankScore++;
        scoreTanks.innerHTML = tankScore;
        smoke.classList.add("tank-killed");
        setTimeout(() => {
          e.target.remove();
        }, 600);

        tankCount = 0;
      }

      const tankElement = document.querySelector(".tank");
      tankElement.addEventListener("click", destroyedTank);
    }

    switch (e.target.dataset.index) {
      case "orc_1":
      case "orc_2":
      case "orc_3":
      case "orc_4":
      case "orc_5":
        destroyedTarget();
        break;
      case "orc_6":
        bloodShot();
        break;
      case "tank":
        destroyedTank();
        break;
      case "kozak":
      case "kozak2":
        gameOver();
        break;
      default:
        overshootAudio.play();
    }
  }
}
// END Shot

// Stop game

function gameOver() {
  gameOverAudio.play()
  stopGame = true;
  timer = 4000;
  clearInterval(interval); 
  const gameOverDiv = document.createElement("div");
  gameOverDiv.classList.add("game-over-div");
  wrapper.append(gameOverDiv);
  const textGameOver = document.createElement("div");
  textGameOver.classList.add("text-game-over");
  wrapper.append(textGameOver);

  setTimeout(() => (textGameOver.innerText = "Ти не впорався..."), 1000);

  setTimeout(() => (textGameOver.innerText = "Але не переймайся..."), 4000);

  setTimeout(
    () => (textGameOver.innerText = "Герої не вмирають! Забираємось звідси!"),
    7000
  );

  setTimeout(
    () => (textGameOver.innerText = "За тебе все зробить КИРИЛО!!!"),
    10000
  );

  setTimeout(() => {
    gameOverDiv.remove();
    textGameOver.remove();
    const wrapperBudanov = document.createElement("div");
    wrapperBudanov.classList.add("wrapper-budanov")
    wrapper.append(wrapperBudanov);
    wrapperBudanov.classList.add("wrapper-budanov-anime");

    setTimeout(() => {
      wrapperBudanov.remove();
      const badaBoom = document.createElement("div");
      wrapper.append(badaBoom);
      badaBoom.classList.add("badaboom");
      badaboomAudio.play();
      badaBoom.classList.add("badaboom-anime");
      setTimeout(() => badaBoom.remove(), 2000);


      if (score + tankScore > moreKill) {
        moreKill = score + tankScore;
        bestNickName.innerText = nickName;
        bestKill.innerText = `Знищено: ${moreKill}`;
      }

      tankScore = 0;
      score = 0;
      rank = "рядовий";
      scoreOrcs.innerText = score;
      scoreTanks.innerText = tankScore;
      startGame();
    }, 5000);
  }, 15000);
}

// END Stop game
