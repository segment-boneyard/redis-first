
# redis-first

  The first redis write wins, the rest get that value. There can only be **one** until the write has expired.

## Quickstart

```javascript
var first = require('redis-first');


first(redis, key, 'xxx', 1000, function (err, res) {
  console.log(res); // 'xxx'
});

// ... 10 ms later

first(redis, key, 'zzz', function (err, res) {
  console.log(res); // 'xxx';
});

// ... 1 second later

first(redis, key, 'yyy', function (err, res) {
  console.log(res); // 'yyy'
});

```

## API

#### first(redis, key, value, [ttl], callback)

* **redis**     a node redis client
* **key**       the key string
* **value**     a value string
* **ttl**       time in _ms_
* **callback**  (err, value) the retrieved value


## License

(The MIT License)

Copyright (c) 2013 Segmentio &lt;friends@segment.io&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.