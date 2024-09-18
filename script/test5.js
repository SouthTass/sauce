let checkUserList = [
  { name: '远大师', id: 'wxid_y9sdsrm8yw9a22'},
  { name: 'mary姐', id: 'dafterglow'}]
let checkRoomList = [
  { name: '远大师', id: 'wxid_y9sdsrm8yw9a22'},
  { name: 'mary姐', id: 'dafterglow'}]
let sendUserList = ['woxinfeixiangdeg', '_Moon_77']

let allTalker = {}
allTalker.id = 'dafterglow'

let index = checkUserList.findIndex(e => e.id == allTalker.id)
if(index < 0) return
for(let i = 0; i < sendUserList.length; i++){
  console.log(`${checkUserList[index].name}: 123`)
}