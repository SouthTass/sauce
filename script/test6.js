let url = 'https://g.qll-times.com/api/ticket/x/J2DTGPP65R43L1MN28'
let path = /\/api\/ticket\//.test(url)? `pages/index/index?url=${url}` : `pages/index/index?url=https://g.qll-times.com/api/cdk/o/cdkey/${url.substr(url.lastIndexOf("/", url.lastIndexOf("/") - 1) + 1)}`;

console.log(path)