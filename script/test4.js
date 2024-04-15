const axios = require('axios')
const https = require('https')

let list = []
 
// 创建一个保持连接开启的 axios 实例
const axiosInstance = axios.create({
  // httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
})
 
// 调用返回 text/event-stream 类型响应的 API
const streamResponse = axiosInstance.get('https://11.futsseapi.eastmoney.com/sse/114_jdm_mx/?token=1101ffec61617c99be287c1bec3085ff', {
  responseType: 'stream', // 设置响应类型为流
})
 
streamResponse.then(response => {
  const res = response.data;
 
  // 处理服务器推送的事件
  res.on('data', (chunk) => {
    const buffer = Buffer.from(chunk)
    const jsonString = buffer.toString().trim()
    if(jsonString){
      console.log(jsonString)
    }else{
      console.log(1)
    }
    // 
    // if(jsonString){
    //   jsonObject = JSON.parse(jsonString)
    //   console.log(jsonObject)
    // }
  })
 
  res.on('error', (error) => {
    console.error('Stream error:', error)
  })
 
  res.on('end', () => {
    console.log('Stream ended.')
  })
})