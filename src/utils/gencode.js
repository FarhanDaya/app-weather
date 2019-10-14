const request = require("request");

const gencode = (address, callback) => {
  const urlwebbox =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoiZmFyaGFuLWRheWEiLCJhIjoiY2sxZGwxbm5vMDFiYTNkbnl6OW9oMGIzZyJ9.2yub1NSlj9Xlc-lsxWaJRg&limit=1";
  request({ url: urlwebbox, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length == 0) {
      callback("unable to find location. try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = gencode;
