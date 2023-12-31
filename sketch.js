let spheres = [];
const sphereRadius = 350;
const minSize = 5;
const maxSize = 20;
const numSpheres = 1000;
let camZ = 0;
let camY = 0;
const colors = ['#618C20', '#F2C029', '#F2CA7E', '#F28627', '#D94B18'];
let zoomAmount;
let rotationAmount;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noiseDetail(4, 0.4);
  zoomAmount = 20;
  rotationAmount = PI / 36; // Now defined inside setup
  for (let i = 0; i < numSpheres; i++) {
    addSphere();
  }
  noStroke();
}

function draw() {
  background(200);
  translate(0, 0, camZ);
  rotateX(frameCount * 0.005);
  rotateY(frameCount * 0.005 + camY);

  // Smooth rotation and zooming
  if (keyIsDown(UP_ARROW)) {
    camZ -= zoomAmount;
  }
  if (keyIsDown(DOWN_ARROW)) {
    camZ += zoomAmount;
  }
  if (keyIsDown(LEFT_ARROW)) {
    camY -= rotationAmount;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    camY += rotationAmount;
  }

  for (const sphere of spheres) {
    push();
    translate(sphere.x, sphere.y, sphere.z);
    fill(sphere.sphereColor);
    sphere.sphereShape();
    pop();
  }
}

function addSphere() {
  const size = random(minSize, maxSize);
  const theta = random(TWO_PI);
  const phi = random(PI);

  const x = sphereRadius * sin(phi) * cos(theta);
  const y = sphereRadius * sin(phi) * sin(theta);
  const z = sphereRadius * cos(phi);

  const sphereColor = color(random(colors));

  spheres.push({ x, y, z, size, sphereColor, sphereShape: () => sphere(size) });
}
