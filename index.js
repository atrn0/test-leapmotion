const Leap = require("leapjs");

Leap.loop(function (frame) {
  console.log(frame.hands.length);
});
