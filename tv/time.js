function Time() {
    // Creating object of the Date class
    var date = new Date();
    // Get current hour
    var hour = date.getHours();
    // Get current minute
    var minute = date.getMinutes();

    hour = update(hour);
    minute = update(minute);
    // Adding time elements to the div
    let clock = document.getElementById("digital-clock");
    let saverClock = document.querySelector(".saver-clock");
    clock.innerText = hour + ":" + minute;
    saverClock.innerText = hour + ":" + minute;
    // Set Timer to 1 sec (1000 ms)
    setTimeout(Time, 10000);
   }
    // Function to update time elements if they are less than 10
    // Append 0 before time elements if they are less than 10
   function update(t) {
    if (t < 10) {
    return "0" + t;
    }
    else {
    return t;
    }
   }
   Time();