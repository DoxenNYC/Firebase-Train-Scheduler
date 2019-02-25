 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCOm3Oywhd0ZFYPw-8PCao6KSvfjI8tcJ8",
    authDomain: "train-scheduler-7c9ca.firebaseapp.com",
    databaseURL: "https://train-scheduler-7c9ca.firebaseio.com",
    projectId: "train-scheduler-7c9ca",
    storageBucket: "train-scheduler-7c9ca.appspot.com",
    messagingSenderId: "197061842905"
  };
  firebase.initializeApp(config);
  var trainId = firebase.database();

  //info going to the firebase
  trainInfo.ref().push({
    name: trainName,
    time: trainTime,
    destination: trainDest,
    frequency: trainFreq,
    currentTime: currentTime,
    trainArrive: trainArrive,
    nextTrain: nextTrain
  });

var trainTime = "";
var trainName = "";
var trainDest = "";
var trainFreq = "";

//on Click function
$("#submit-here").on("click", function(event) {
    var trainName = $("#trainInput")
      .val()
      .trim();
    var trainDest = $("#destinationInput")
      .val()
      .trim();
    var trainTime = moment(
      $("#timeInput")
        .val()
        .trim(),
      "HH:mm Military Time"
    ).format("LT");
    var trainFreq = $("#frequencyInput")
      .val()
      .trim();
   
      event.preventDefault();
  
   var currentTime = moment().format("HH:mm");

   var firstTrainConverted = moment().subtract(trainTime, "minutes");
 
   var timeRemaining = firstTrainConverted % trainFreq;
 
   var trainArrive = trainFreq - timeRemaining;
 
   var nextTrain = moment()
     .add(trainArrive, "minutes")
     .format("HH:mm");

    if (trainName === "") {
    alert("Enter Train Here:");
    return false;
    }
    if (trainTime === "") {
    alert("Train Time");
    return false;
    }
    if (trainDest === "") {
    alert("Train Destination");
    return false;
    }
    if (trainFreq === "") {
    alert("Train Frequency");
    return false;
    }

  console.log(trainName);
  console.log(trainFreq);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainArrive);
  console.log(timeRemaining);
  console.log(firstTrainConverted);
  console.log(nextTrain);
  console.log(currentTime);
});

trainInfo.ref().on(
    "child_added",
    function(snapshot) {
      var capture = snapshot.val();

      console.log(capture.trainName);
      console.log(capture.trainTime);
      console.log(capture.trainDest);
      console.log(capture.trainFreq);
      console.log(capture.nextTrain);
    
      $("#train-schedule").append(
        "<tr>" +
          "<td>" + capture.trainName + "</td>" +
          "<td>" + capture.trainDest + "</td>" +
          "<td>" + capture.trainFreq + " min" + "</td>" +
          "<td>" + capture.nextTrain + "</td>" +
          "<td>" + capture.trainArrive + "</td>" + "</tr>"
      );
});