const bcrypt = require('bcryptjs')
const User = require('../user')
const Record = require('../record')
const Category = require('../category')
const userSeed = require('./user.json')
const recordSeed = require('./record.json')
const db = require('../../config/mongoose')

db.once('open', async () => {
  try {
    // 把 record.json 裡的 categoryId 換成 mongoDB 的 _id
    const categoryList = await Category.find().lean()
    recordSeed.forEach(item => {
      item.categoryId = categoryList.find(element => element.name === item.categoryId)._id
    })
    // 建立使用者
    await Promise.all(
      userSeed.map(async (user, userIndex) => {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        const userData = await User.create({
          name: user.name,
          email: user.email,
          password: hash
        })
        // 建立支出項目
        const userRecord = []
        recordSeed.forEach((record, recordIndex) => {
          if (Math.floor(recordIndex / 3) === userIndex) {
            record.userId = userData._id
            userRecord.push(record)
          }
        })
        await Record.create(userRecord)
      })
    )
    console.log('Seed users and records have been created')
    process.exit()
  }
  catch (error) { console.log(error) }
})