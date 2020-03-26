// Global Variables
var name;
var destination;
var firstArrival;
var frequency;
var database;
var trainFbData;
var time;
var clock;

$(document).ready(function () {

    // Set up clock to run at top
    function runningClock() {
        time = moment().format("HH:mm:ss A");
        $("#time").text(time);
    }

    // Call function with setInterval
    clock = setInterval(runningClock , 1000);

    // Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyAyZQ8vXyHUuPeN0QiApLnFnXZ4A6xV51g",
        authDomain: "train-scheduler-87b1f.firebaseapp.com",
        databaseURL: "https://train-scheduler-87b1f.firebaseio.com",
        projectId: "train-scheduler-87b1f",
        storageBucket: "train-scheduler-87b1f.appspot.com",
        messagingSenderId: "501679113064",
        appId: "1:501679113064:web:d086f5a4b93b282b6dccdd"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    database = firebase.database();

    // Capture Button Click
    $("#submitButton").on("click", function (event) {

        event.preventDefault();

        //  Code in the logic for storing and retrieving the most recent input from form.
        // Provide initial data to your Firebase database.
        name = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstArrival = $("#firstTrainTimeInput").val().trim();
        frequency = $("#frequencyInput").val().trim();

        //push data to Firebase
        database.ref().push({
            DatatrainName: name,
            Datadest: destination,
            DatafirstArrival: firstArrival,
            Datafrequency: frequency,
            TimeStamp: firebase.database.ServerValue.TIMESTAMP
        });

        // Clear input fields for new entry after the train is added
        clear();

    });

    //Firebase watcher + initial value
    database.ref().on("child_added", function (childSnapshot) {
        //  make variables for easier references when table is amended
        var snapName = childSnapshot.val().DatatrainName;
        var snapDest = childSnapshot.val().Datadest;
        var snapFreq = childSnapshot.val().Datafrequency;
        var snapArrival = childSnapshot.val().DatafirstArrival;

        //  Current Time
        var timeIs = moment();
        //  Convert Time and configure for Future use by pushing firstArrival back 1 year
        var firstArrivalConverted = moment(snapArrival , "HH:mm A").subtract(1, "years");
        //  Calculate now vs First Arrival
        var diff = moment().diff(moment(firstArrivalConverted) , "minutes");
        var left = diff % snapFreq;
        //  Calculate how much time till train arrives
        var timeLeft = snapFreq - left;
        var newArrival = moment().add(timeLeft , "m").format("HH:mm A");

        $("#table-info").append("<tr><td>" + snapName +"</td><td>" + snapDest + "</td><td>" + snapFreq + "</td><td>" + newArrival + "</td><td>" + timeLeft + "</td></tr>");
        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    function clear() {
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainTimeInput").val("");
        $("#frequencyInput").val("");
    }

});