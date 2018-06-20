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

var freq = "";
var time = "";


$("#submit").click(function () {

    freq = $("#freq").val()


    time = $("#time").val()



    var name = $("#name").val().trim()
    var dest = $("#dest").val().trim()


    var data = {
        name: name,
        time: time,
        dest: dest,
        freq: freq,

        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
    database.ref().push(data);
})

database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
    // Change the HTML to reflect
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(parseInt(snapshot.val().time), "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % snapshot.val().freq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = snapshot.val().freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var arrival = moment(nextTrain).format("hh:mm")

    var row = $('<tr>' +
        '<td scope="col-lg">' + snapshot.val().name + '</td>' +
        '<td scope="col-lg">' + snapshot.val().dest + '</td>' +
        '<td scope="col-lg">' + snapshot.val().freq + '</td>' +
        '<td scope="col-lg">' + arrival + '</td>' +
        '<td scope="col-lg">' + tMinutesTillTrain + '</td>' +
        '</tr>');
    $("#tbody").append(row)
 console.log(parseInt(snapshot.val().time))
});