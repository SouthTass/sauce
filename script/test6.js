async function forwardMessageToParticularUserAndGroup(message, text, bot){
  let checkUserList = [
    { name: '山顶动人', id: 'out-man1992'},
    { name: '远大师', id: 'wxid_y9sdsrm8yw9a22'},
    { name: 'mary姐', id: 'wxid_91mpeutpvaeh12'},
    { name: '一梦', id: 'zhangming6877'},
    { name: '期货', id: '25984984104824210@openim'}]

  let keywordsList = ['碳酸锂', '鸡蛋', '苯乙烯', '豆油', '油脂']
  let sendUserList = ['woxinfeixiangdeg']

  let userIndex = 3

  for(let i = 0; i < sendUserList.length; i++){
    if(checkUserList[userIndex].name == '期货'){
      if(keywordsList.some(e => text.includes(e))) {
        console.log(1)
      }
    }else{
      console.log(2)
    }
  }
}

forwardMessageToParticularUserAndGroup({}, '碳酸的价格', {})