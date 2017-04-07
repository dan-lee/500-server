const assert = require('assert')
const http = require('http')
const { spawn } = require('child_process')

describe('500 server', function () {
  let server
  let serverPromise

  before(function () {
    serverPromise = new Promise((resolve, reject) => {
      server = spawn('node', ['index.js', '5000'])
      server.stdout.on('data', (data) => {
        resolve(`${data}`)
      })
      server.stderr.on('data', (data) => {
        console.log(`ERR  ${data}`)
        reject(new Error(`${data}`))
      })
    })
  })

  it('should return status code 500', function (done) {
    serverPromise
      .then(function () {
        http.get('http://localhost:5000', function (res) {
          assert.equal(500, res.statusCode)
          done()
        })
      })
      .catch(function (err) {
        console.error(err)
      })
  })

  after(function () {
    server.stdin.pause()
    server.kill()
  })
})
