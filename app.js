var config = {
    apiKey: "AIzaSyDb9xtX62xIUUjzm0Bs5S05TV3b-UI6qCQ",
    authDomain: "class2-456f1.firebaseapp.com",
    databaseURL: "https://class2-456f1.firebaseio.com",
    projectId: "class2-456f1",
    storageBucket: "",
    messagingSenderId: "4834097922"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").click(function () {

    var freq = $("#freq").val()

    // Time is 3:30 AM
    var time = $("#time").val()

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var arrival = moment(nextTrain).format("hh:mm")

    var name = $("#name").val().trim()
    var dest = $("#dest").val().trim()

    // var row = $('<tr>' +
    //     '<td scope="col-lg">' + name + '</td>' +
    //     '<td scope="col-lg">' + dest + '</td>' +
    //     '<td scope="col-lg">' + freq + '</td>' +
    //     '<td scope="col-lg">' + arrival + '</td>' +
    //     '<td scope="col-lg">' + tMinutesTillTrain + '</td>' +
    //     '</tr>');
    // $("#tbody").append(row)
    var data = {
        name: name,
        dest: dest,
        freq: freq,
        arrival: arrival,
        minutes: tMinutesTillTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
    database.ref().push(data);
})

database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
    // Change the HTML to reflect

    var row = $('<tr>' +
        '<td scope="col-lg">' + snapshot.val().name + '</td>' +
        '<td scope="col-lg">' + snapshot.val().dest + '</td>' +
        '<td scope="col-lg">' + snapshot.val().freq + '</td>' +
        '<td scope="col-lg">' + snapshot.val().arrival + '</td>' +
        '<td scope="col-lg">' + snapshot.val().minutes + '</td>' +
        '</tr>');
        $("#tbody").append(row)
    
  });