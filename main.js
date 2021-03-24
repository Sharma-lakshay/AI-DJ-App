song= "";
leftWrist_x= 0;
leftWrist_y= 0;
rightWrist_x= 0;
rightWrist_y= 0;
scoreleftWrist= 0;
scorerightWrist= 0;


function preload(){
 song= loadSound("music.mp3");
}

function setup(){
    canvas= createCanvas(600, 500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill('#FF0000');
    stroke('#FF0000');

    if(scorerightWrist > 0.2){
    circle(rightWrist_x, rightWrist_y, 20);

    if(rightWrist_y > 0 && rightWrist_y <=100 ){
        document.getElementById("speed").innerHTML= "Speed= 0.5x";
        song.rate(0.5);
    }

    else if(rightWrist_y > 100 && rightWrist_y <=200 ){
        document.getElementById("speed").innerHTML= "Speed= 1x";
        song.rate(1);
    }

    else if(rightWrist_y > 200 && rightWrist_y <=300 ){
        document.getElementById("speed").innerHTML= "Speed= 1.5x";
        song.rate(1.5);
    }

    else if(rightWrist_y > 300 && rightWrist_y <=400 ){
        document.getElementById("speed").innerHTML= "Speed= 2x";
        song.rate(2);
    }

    else if(rightWrist_y > 400 && rightWrist_y <=500 ){
        document.getElementById("speed").innerHTML= "Speed= 2.5x";
        song.rate(2.5);
    }    
    }

    if(scoreleftWrist > 0.2){
    circle(leftWrist_x, leftWrist_y, 20);
    InNumberleftWristY= Number(leftWrist_y);
    remove_decimals= floor(InNumberleftWristY);
    volume= remove_decimals/500;
    console.log("Volume= " + volume);
    document.getElementById("volume").innerHTML= "Volume= " + volume;
    song.setVolume(volume);
    }
}

function play(){
song.play();
song.setVolume(1);
song.rate(1);
}

function modelLoaded(){
    console.log("Posenet is intialized");
}

function gotPoses(results){
if(results.length > 0)
    console.log(results);
    scoreleftWrist= results[0].pose.keypoints[9].score;
    scorerightWrist= results[0].pose.keypoints[10].score;
    console.log("Score of Left Wrist=" + scoreleftWrist);
    leftWrist_x= results[0].pose.leftWrist.x;
    leftWrist_y= results[0].pose.leftWrist.y;
    console.log("Left Wrist X= " + leftWrist_x + "Left Wrist Y= " + leftWrist_y);
    rightWrist_x= results[0].pose.rightWrist.x;
    rightWrist_y= results[0].pose.rightWrist.y;
    console.log("Right Wrist X= " + rightWrist_x + "Right Wrist Y= " + rightWrist_y);
}
