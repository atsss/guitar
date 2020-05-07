// Teachable Machine ml5 image example - modified from The Coding Train https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html
let video;
let label = "waiting...";
let displayLabel = "waiting...";
let previousLabel = "waiting...";
let confidence = 0.0;
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/mO0qQI9Mu/';
let DoSound;
let ReSound;
let MiSound;
let FaSound;
let SolSound;

// STEP 1: Load the model + sounds
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  DoSound = loadSound("1 Position.m4a");
  ReSound = loadSound("2 Position.m4a");
  MiSound = loadSound("3 Position.m4a");
  FaSound = loadSound("4 Position.m4a");
  SolSound = loadSound("5 Position.m4a");
}

function setup() {
  createCanvas(1200, 700);
  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();
}

function draw() {
  background(0);
  image(video, 0, 0);

  // STEP 4: Playback sound if there is a switch in labels
  if (label == "One" && previousLabel != "One") {
    DoSound.play();
    ReSound.stop();
    MiSound.stop();
    FaSound.stop();
    SolSound.stop();
  } else if (label == "Two" && previousLabel != "Two") {
    DoSound.stop();
    ReSound.play();
    MiSound.stop();
    FaSound.stop();
    SolSound.stop();
  } else if (label == "Three" && previousLabel != "Three") {
    DoSound.stop();
    ReSound.stop();
    MiSound.play();
    FaSound.stop();
    SolSound.stop();
  } else if (label == "Four" && previousLabel != "Four") {
    DoSound.stop();
    ReSound.stop();
    MiSound.stop();
    FaSound.play();
    SolSound.stop();
  } else if (label == "Five" && previousLabel != "Five") {
    DoSound.stop();
    ReSound.stop();
    MiSound.stop();
    FaSound.stop();
    SolSound.play();
  } else if (label == "nothing") {
    //don't do anything on this label
  }

  //Display current label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(displayLabel + " " + confidence, width / 2, height - 16);

  //Update previousLabel
  previousLabel = label;
}

// STEP 2: Do the classifying
function classifyVideo() {
  classifier.classify(video, gotResults);
}

// STEP 3: Get the classification
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again
  confidence = nf(results[0].confidence, 0, 2);
  //Small hack: Only update labels when confidence is high
  if (confidence > 0.8) {
    label = results[0].label;
    displayLabel = label;
  } else {
    displayLabel = "unsure";
  }
  classifyVideo();
}
