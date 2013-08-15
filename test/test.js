var should      = require('should')
  , redis       = require('redis')
  , redisfirst = require('..')
  , uid         = require('uid');


var client = redis.createClient()
  , prefix = 'redis-first:';


describe('redis-first', function () {

  it('should store an unset value', function (done) {
    var key = prefix + uid()
      , val = 'xxx';

    redisfirst(client, key, val, function (err, res) {
      val.should.eql(res);
      redisfirst(client, key, val, function (err, res) {
        val.should.eql(res);
        done();
      });
    });
  });


  it('should not update an already set value', function (done) {
    var key = prefix + uid()
      , val = 'xxx';

    redisfirst(client, key, val, function (err, res) {
      should.not.exist(err);
      val.should.eql(res);
      redisfirst(client, key, 'zzz', function (err, res) {
        should.not.exist(err);
        val.should.eql(res);
        done();
      });
    });
  });


  it('should properly expire a value', function (done) {
    var key = prefix + uid();

    redisfirst(client, key, 'xxx', 1200, function (err, res) {
      should.not.exist(err);
      res.should.eql('xxx');
    });

    setTimeout(function () {
      redisfirst(client, key, 'yyy', function (err, res) {
        should.not.exist(err);
        res.should.eql('yyy');
        done();
      });
    }, 1300);
  });

});