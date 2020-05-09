// Small issue with the updateCounts(), it seems to be one step behind...
// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image Classification using Feature Extraction with MobileNet and four classes
=== */

let featureExtractor;
let classifier;
// let modelURL = "https://ciid.s3-us-west-2.amazonaws.com/09_machine_learning/model.json";
// let hogeURL = "https://teachablemachine.withgoogle.com/models/TH7p858Kc/model.json";
let video;
let classificationResult = "";
let previousResult = "";
let confidence;

let myClassNames = ["One", "Two", "Three", "Four", "Five", "Nothing"]; //Add as many classes as you wish
let DoSound;
let ReSound;
let MiSound;
let FaSound;
let SolSound;

function preload() {
  DoSound = loadSound("1 Position.m4a");
  ReSound = loadSound("2 Position.m4a");
  MiSound = loadSound("3 Position.m4a");
  FaSound = loadSound("4 Position.m4a");
  SolSound = loadSound("5 Position.m4a");
}

function modelReady() {
  console.log('model ready!');
  console.log(classifier);
  classifier.load('model.json', () => console.log('load!')); // classifir が promise
}

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  classifier = featureExtractor.classification(video, () => console.log('video ready'));
  classify();

  fill(0, 255, 0);
  textSize(36);
  textAlign(CENTER);
}

function draw() {
  background(122);
  image(video, 0, 0);

  text(classificationResult, width / 2, height / 2);

  //Make specific things happen when specific classes are detected
  if (classificationResult == myClassNames[0] && previousResult != myClassNames[0]) {
    DoSound.play();
    ReSound.stop();
    MiSound.stop();
    FaSound.stop();
    SolSound.stop();
  } else if (classificationResult == myClassNames[1] && previousResult != myClassNames[1]) {
    DoSound.stop();
    ReSound.play();
    MiSound.stop();
    FaSound.stop();
    SolSound.stop();
  } else if (classificationResult == myClassNames[2] && previousResult != myClassNames[2]) {
    DoSound.stop();
    ReSound.stop();
    MiSound.play();
    FaSound.stop();
    SolSound.stop();
  } else if (classificationResult == myClassNames[3] && previousResult != myClassNames[3]) {
    DoSound.stop();
    ReSound.stop();
    MiSound.stop();
    FaSound.play();
    SolSound.stop();
  } else if (classificationResult == myClassNames[4] && previousResult != myClassNames[4]) {
    DoSound.stop();
    ReSound.stop();
    MiSound.stop();
    FaSound.stop();
    SolSound.play();
  } else if (classificationResult == myClassNames[5]) {
    //don't do anything on this label
  }
}

// Classify the current frame.
function classify() {
  classifier.classify(video, gotResults);
}

// Show the results
function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }
  select('#result').html(result[0].label);
  select('#confidence').html(nf(result[0].confidence, 0, 2));

  previousResult = classificationResult;
  classificationResult = result[0].label;
  confidence = result[0].confidence;
  // console.log(confidence);

  classify();
};
