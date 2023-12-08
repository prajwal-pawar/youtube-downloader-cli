const sanitizeName = require("sanitize-filename");

// this is documentation comment block
/**
 * Converts seconds into human readable time hh:mm:ss
 *
 * @param {number} seconds
 * @return {string}
 */

module.exports.convertToHumanTime = (seconds) => {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor(seconds / 60) % 60;
  let time;

  if (hours > 0) {
    time = hours + ":";

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
  } else {
    time = "";
  }

  let sec = seconds % 60;

  if (sec < 10) {
    sec = "0" + sec;
  }

  return time + minutes + ":" + sec;
};

/**
 * Converst bytes to human readable unit.
 *
 * @param {number} bytes
 * @return {string}
 */

const units = " KMGTPEZYXWVU";

module.exports.convertToReadableSize = (bytes) => {
  if (bytes <= 0) {
    return "0";
  }

  let t2 = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), 12);

  return (
    Math.round((bytes * 100) / Math.pow(1024, t2)) / 100 +
    units.charAt(t2).replace(" ", "") +
    "B"
  );
};

/**
 * Template a string with variables denoted by {prop}.
 *
 * @param {string} str
 * @param {Array.<Object>} objs
 * @return {string}
 */

module.exports.template = (str, objs) => {
  return str.replace(/\{([\w.-]+)\}/g, (match, prop) => {
    prop = prop.split(".");

    for (let result of objs) {
      let j = 0;
      let myprop = prop[j];

      while (myprop != null && result[myprop] != null) {
        result = result[myprop];

        if (prop.length === ++j) {
          return sanitizeName(result, { replacement: "-" });
        }

        myprop = prop[j];
      }
    }

    return match;
  });
};
