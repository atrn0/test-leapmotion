require("dotenv").config();

const Leap = require("leapjs");
const { controlLights } = require("./lights");

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
        controlLights(true);
      } else if (gesture.direction[1] < -0.2) {
        lastTriggerTime = now.getTime();
        controlLights(false);
      }
    }
  }
}
