
module.exports = first;


/**
 * Attempts to set the value in redis. If the value already exists, returns the
 * existing value.
 *
 * @param {Redis}    redis     a node redis client
 * @param {String}   key
 * @param {String}   val
 * @param {Number}   ttl       time to live in milliseconds [optional]
 * @param {Function} callback  (err, result)
 */

function first (redis, key, val, ttl, callback) {
  if (typeof ttl === 'function') {
    callback = ttl;
    ttl = null;
  } else {
    ttl = Math.round(ttl / 1000); // convert ms to seconds
  }

  redis.setnx(key, val, function (err, set) {
    if (err) return callback(err);

    if (!set) {
      redis.get(key, function (err, res) {
        if (err || res) return callback(err, res);
        process.nextTick(function () {
          first(redis, key, val, ttl, callback);
        });
      });
      return;
    }

    if (ttl) redis.expire(key, ttl, function (err) { callback(err, val); });
    else callback(null, val);
  });
}