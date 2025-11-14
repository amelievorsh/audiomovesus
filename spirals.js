let mic;
let audioStarted = false;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB);
  mic = new p5.AudioIn();

  // Wait for user gesture
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

  let amplitude = mic.getLevel() * 5;

  orbitControl();

  rotateX(PI * -0.9);
  rotateY(PI * 0.7);

  beginShape(QUAD_STRIP);
  for (let z = -1500; z < 1500; z += 3) {
    fill((z + frameCount) % 20, 150, 150);

    let endPoint = createVector(0, 20);
    endPoint.rotate((z + frameCount) * amplitude / 3);

    vertex(endPoint.x, endPoint.y - 5, z);
    vertex(endPoint.x, endPoint.y + 5, z);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
