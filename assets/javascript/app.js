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
    let trainTime = $("#time-input").val().trim();
    let trainFreq = $("#frequency-input").val().trim();

    // Push to Firebase
    database.ref().push({
        name: trainName,
        destination: trainDest,
        time: trainTime,
        frequency: trainFreq
    });

    // Debug
    // console.log(trainName);
    // console.log(trainDest);
    // console.log(trainTime);
    // console.log(trainFreq);
    // alert('Train Added');

    // Clear Input Boxes
    $('#train-name-input').val('');
    $('#destination-input').val('');
    $('#time-input').val('');
    $('#frequency-input').val('');
});

// Creates the Table
database.ref().on('child_added', childSnapshot => {
    console.log(childSnapshot.val());

    let trainTime = childSnapshot.val().time;
    let userTime = moment();
    let trainMoment = moment(trainTime, 'HH:mm');
    let trainFreq = childSnapshot.val().frequency;

    console.log(trainMoment + ' ' + userTime);

    let timeDiff = userTime.diff(trainMoment, 'minutes');
    console.log(timeDiff);

    let freqDiff = timeDiff % trainFreq;
    console.log(freqDiff);
    
    let nextTrain = trainFreq - freqDiff;
    console.log(nextTrain);

    let nextTime = userTime.add(nextTrain, 'minutes');
    console.log(nextTime);

    let stationTime = nextTime.format('hh:mm A');
    
    let tableRow = `
        <tr>
            <td>${childSnapshot.val().name}</td>
            <td>${childSnapshot.val().destination}</td>
            <td>${childSnapshot.val().frequency}</td>
            <td>${stationTime}</td>
            <td>${nextTrain}</td>
        </tr>`

    $('tbody').prepend(tableRow);
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});