function destroyedTarget() {
  shotAudio.play();
  e.target.style.background = 'url("../img/head_shot.png")';
  e.target.style.backgroundSize = "cover";
  e.target.style.zIndex = "20";
  e.target.style.scale = "1.6";

  let leftValue = window.getComputedStyle(e.target).left;
  let topValue = window.getComputedStyle(e.target).top;
  killAudio.play();
  score++;
  scoreOrcs.innerHTML = score;

  setTimeout(() => {
    e.target.remove();
  }, 300);
  const sunflower = document.createElement("div");
  function showFlower() {
    sunflower.classList.add("flower");
    area.append(sunflower);
    sunflower.classList.add("show-flower");
    sunflower.style.top = topValue;
    sunflower.style.left = leftValue;
  }

  showFlower();

  setTimeout(() => {
    sunflower.remove();
  }, 15000);
}
