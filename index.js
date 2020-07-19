const Leap = require("leapjs");

// Leap.loop(function (frame) {
//   console.log(frame.hands.length);
// });

const controller = new Leap.Controller();
controller.connect();

controller.on("gesture", onGesture);

let lastTriggerTime = 0;

function onGesture(gesture, frame) {
  if (gesture.type === "swipe") {
    const now = new Date();
    if (lastTriggerTime + 500 < now.getTime()) {
      if (gesture.direction[1] > 0.2) {
        lastTriggerTime = now.getTime();
        onTriggered(true);
      } else if (gesture.direction[1] < -0.2) {
        lastTriggerTime = now.getTime();
        onTriggered(false);
      }
    }
  }
}

function onTriggered(makeLightsOn) {
  console.log(makeLightsOn ? "on" : "off");
}
