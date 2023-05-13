module.exports = [{
  script: 'app.js',
  name: 'events-posting-backend',
  exec_mode: 'cluster',
  instances: 2
}, {
  script: 'worker.js',
  name: 'worker'
}]
