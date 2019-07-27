$(document).ready(function () {
    var numMinutes = 3;
    var display = $('.timerText');
    if (numMinutes < 10){
        display.text("Time remaining: " + "0" + numMinutes + ":00");
    }
    else display.text("Time remaining: " + "0" + numMinutes + ":00");

    function startTimer(duration, display) {
        var timer = duration,
            minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            console.log(minutes + ":" + seconds);
            display.text("Time remaining: " + minutes + ":" + seconds);

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }

    function callTimer(numMinutes) {
        var time = 60 * numMinutes,
            display = $('.timerText');
        startTimer(time, display);
    };

    callTimer(numMinutes);



});