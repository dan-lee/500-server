#!/usr/bin/env node
const port = process.argv[2] || 5000

if (!port) {
  console.log('Usage: 500-server [PORT]')
  process.exit(1)
}

require('http')
  .createServer((req, res) => {
    res.statusCode = 500
    res.end()
  })
  .listen(port, () => console.log(`The 500-server is running at localhost:${port}`))
