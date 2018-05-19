// initialize firebase
var config = {
    apiKey: "AIzaSyCqsS5sTEC0b68kp0weoSFaNAHHSie3gVA",
    authDomain: "train-schedule-fdf1e.firebaseapp.com",
    databaseURL: "https://train-schedule-fdf1e.firebaseio.com",
    projectId: "train-schedule-fdf1e",
    storageBucket: "",
    messagingSenderId: "674349539169"
};
firebase.initializeApp(config);

// references database
var database = firebase.database();

$("#add-train-btn").on("click", function(event){
	event.preventDefault();

	// pulls user input
	var trainName = $("#name-input").val().trim();
	var destinationName = $("#destination-input").val().trim();
	var firstTrain = moment($("#first-input").val().trim(), "HH:mm").format("X");	
	var frequency = $("#frequency-input").val().trim();

	// temporarily holds user input
	var newTrain = {
		name: trainName,
		destination: destinationName,
		firstTrain: firstTrain,
		frequency: frequency
	};

	// log new train object to the console 
	console.log(newTrain);
	
	// pushes new train object into 
	database.ref().push(newTrain); 

	// clears text boxes
	$("#name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");

  // keeps on same page
  return false;

});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // adds snapshot to firebase 	
  console.log(childSnapshot.val());

  // stores the property values into variables 
  var trainName = childSnapshot.val().name;
  var destinationName = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  // logs to the console 
//   console.log(trainName);
//   console.log(destinationName);
//   console.log(firstTrain);
//   console.log(frequency);

  // current time via moment
  var current = moment();

  // logs formatted version of current time 
  console.log("The current time is " + moment(current).format("HH:mm"));  

  // formats first train time value
  var firstTrainTime = moment.unix(firstTrain).format("HH:mm");
  // logs result to console
  console.log("The first train is at " + firstTrainTime);

  // diff between time in minutes   
  var difference = moment().diff(moment(firstTrainTimeConverted), "minutes");
  
  // the remaining time when time diff is divided by the frequency
  var remainder = difference % frequency;
  
  // the remainder is subtracted from the frequency and stored in minutesAway
  var minutesAway = frequency - remainder;
  console.log("The next train is " + minutesAway + " minutes away");
  
  // minutesAway is added to the current time and stored in the nextArrival variable 
  var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
  console.log("The next train arrives at " + nextArrival);
 
  // When a user submits a new train the information populates the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationName + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway );
});