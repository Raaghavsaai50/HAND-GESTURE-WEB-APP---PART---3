Prediction1="";
Prediction2="";
 
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function (Data_URI){
        document.getElementById("result").innerHTML="<img src="+Data_URI+" id='capture_image'>"
    });
}
console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/0yOxcWNUv/model.json",modelLoaded);
function modelLoaded(){
    console.log("model is loaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is "+Prediction1;
    speak_data_2="And the second prediction is "+Prediction2;
    var utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterthis);
}
function check(){
    img=document.getElementById("capture_image");
    classifier.classify(img,got_results);
}

function got_results(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result1_name").innerHTML=results[0].label;
        document.getElementById("result2_name").innerHTML=results[1].label;
        Prediction1=results[0].label;
        Prediction2=results[1].label;
        speak();
        if(results[0].label=="Amazing"){
            document.getElementById("result1_emoji").innerHTML="&#9996;";
        }
        if(results[0].label=="super"){
            document.getElementById("result1_emoji").innerHTML="&#128079;";
        }
        if(results[0].label=="victory"){
            document.getElementById("result1_emoji").innerHTML="&#128076;";
        }
        if(results[1].label=="Amazing"){
            document.getElementById("result2_emoji").innerHTML="&#9996;";
        }
        if(results[1].label=="super"){
            document.getElementById("result2_emoji").innerHTML="&#128079;";
        }
        if(results[1].label=="victory"){
            document.getElementById("result2_emoji").innerHTML="&#128076;";
        }
    }
}