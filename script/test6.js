const fs = require("fs")
var echarts = require('echarts');
const { createCanvas } = require('canvas');

const canvas = createCanvas(800, 600);
let chart = echarts.init(canvas);

chart.setOption({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
});

const buffer = canvas.toBuffer('image/png')


fs.writeFile("testFile.png", buffer, function (err) {
  if (err) {
    console.log(err, "保存excel出错");
  } else {
    console.log("写入excel成功!!!");
  }
})