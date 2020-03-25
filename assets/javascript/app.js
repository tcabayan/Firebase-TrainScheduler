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

});