let mic;
let audioStarted = false;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB);

  mic = new p5.AudioIn();

  document.getElementById("startScreen").addEventListener("click", () => {
    userStartAudio().then(() => {
      mic.start();
      audioStarted = true;
      document.getElementById("startScreen").style.display = "none";
    });
  });
}

function draw() {
  background(0);

  if (!audioStarted) return;

  let amplitude = mic.getLevel() * 8;

  orbitControl();

  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  fill((frameCount * 2) % 360, 100, 100);
  torus(60, amplitude * 120, 20);

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
