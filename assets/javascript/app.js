// Firebase Config
var firebaseConfig = {
    apiKey: "AIzaSyBdYUM-D6CM-mty14a0kiw9v8S3Y2OvVjI",
    authDomain: "train-schedule-app-fec41.firebaseapp.com",
    databaseURL: "https://train-schedule-app-fec41.firebaseio.com",
    projectId: "train-schedule-app-fec41",
    storageBucket: "",
    messagingSenderId: "122282059066",
    appId: "1:122282059066:web:2349d89af726303a"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Assign the reference to the database to a variable named 'database'
let database = firebase.database();

// Button for Adding Trains
$('#add-train-btn').click(e => {
    e.preventDefault();

    // Grab User Input
    let trainName = $("#train-name-input").val().trim();
    let trainDest = $("#destination-input").val().trim();
    let trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
    let trainFreq = $("#frequency-input").val().trim();

    // Push to Firebase
    database.ref().push({
        name: trainName,
        destination: trainDest,
        time: trainTime,
        frequency: trainFreq
    });

    // Debug
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);
    alert('Train Added');

    // Clear Input Boxes
    $('#train-name-input').val('');
    $('#destination-input').val('');
    $('#time-input').val('');
    $('#frequency-input').val('');
});