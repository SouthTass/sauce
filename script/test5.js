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



// let allTalker = await message.talker()
// allTalker.id = ''
// if(allTalker.id == 'wxid_y9sdsrm8yw9a22'){
//   const contact = await bot.Contact.find({id: 'woxinfeixiangdeg'})
//   if(contact) await contact.say(`远大师：${text}`)

//   const contact1 = await bot.Contact.find({id: '_Moon_77'})
//   if(contact1) await contact1.say(`远大师：${text}`)
// }else if(allTalker.id == 'dafterglow'){
//   const contact = await bot.Contact.find({id: 'woxinfeixiangdeg'})
//   if(contact) await contact.say(`mary姐：${text}`)

//   const contact1 = await bot.Contact.find({id: '_Moon_77'})
//   if(contact) await contact1.say(`mary姐：${text}`)
// }