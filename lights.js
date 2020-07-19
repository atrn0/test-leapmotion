const axios = require("axios");

// URLs for the API
const URL_ROOT = "https://house.camph.net";

// BASIC Authentication
const AUTH_CONFIG = {
  username: process.env.AUTH_USERNAME,
  password: process.env.AUTH_PASSWORD,
};

const HUE_USERNAME = process.env.HUE_USERNAME;
const HUE_LIGHT_IDS = [1, 2, 3];
const LIGHTS_ENDPOINT = `/camphor_lights/api/${HUE_USERNAME}/lights/`;
const ON_STATE = JSON.stringify({ on: true, sat: 120, hue: 12000, bri: 254 });
const OFF_STATE = JSON.stringify({ on: false });

const houseAPI = axios.create({
  auth: AUTH_CONFIG,
  baseURL: URL_ROOT,
});

/**
 *
 * @param {boolean} lightsOn
 */
exports.controlLights = async function (lightsOn) {
  for (lightId of HUE_LIGHT_IDS) {
    const lightUrl = `${LIGHTS_ENDPOINT}${lightId}/state`;
    const state = lightsOn ? ON_STATE : OFF_STATE;
    try {
      const result = await houseAPI.put(lightUrl, state);
      console.log(result.data);
    } catch (e) {
      console.error(e);
    }
  }
};
