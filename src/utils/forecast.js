const request = require("request");

const forcast = (latitude, longitude, callback) => {
  const urldark =
    "https://api.darksky.net/forecast/38adaa3b5b3d6443760e037c15be31b6/" +
    longitude +
    "," +
    latitude +
    "?units=si";

  request({ url: urldark, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("unable to find weather. try another search.", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          "It is currently " +
          body.currently.temperature +
          " degree out .there is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = forcast;
