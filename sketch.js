
// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/HzkDks6qz/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first

let sound1,sound2,sound3
function preload(){
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  sound1 = loadSound("mp3/1.mp3")
 sound2 = loadSound("mp3/2.mp3")
  sound3 = loadSound("mp3/3.mp3")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0,width,height);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  className = results[0].label;
  if(className=="Class 1"){
    label = "wild"
    if(!sound1.isPlaying()){
      sound1.loop()
    }   
     sound2.pause()
    sound3.pause()
  }else if(className=="Class 2"){
    label  = "Kongque"
    sound1.pause()
    if(!sound2.isPlaying()){
      sound2.loop()
    }
    sound3.pause()
  }else if(className=="Class 3"){
    label="owl"
    sound1.pause()
    sound2.pause()
    if(!sound3.isPlaying()){
      sound3.loop()
    }
  }else{
    label="empty"
    sound1.pause()
    sound2.pause()
    sound3.pause()
  }
  // Classifiy again!
  classifyVideo();
}