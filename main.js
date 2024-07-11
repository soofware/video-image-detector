objectDetector = "";
status = "";
img = "";
objects = [];



function preload(){
    img = loadImage('only_a_spoonful.jpg');
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "status = detecting...";
}

function modelLoaded(){
    console.log("coconutssd");
    status = true;
    
}



function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 640, 420)
    if(status !=""){
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);
        //rect(25, 25, 25, 25)
        for(var i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : object detected"

            fill(255, 0, 0)
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke(r, g, b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }   
    }
}



