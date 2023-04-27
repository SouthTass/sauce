const redis = require('redis')
const redisClient = redis.createClient('63279', '101.43.217.166')
redisClient.on('error', err => {
  console.log(err)
})

redisClient.connect('6379', '101.43.217.166')
  .then(() => {
    redisClient.set('name', 'zhangsan')
      .then(val => {
        console.log(val)
      })
  })