require('../src/db/mongoose')
const Task = require('../src/models/task')
const User = require('../src/models/user')
// Task.findByIdAndDelete('5f3f3a66962f26181086a2d5').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => console.log(e))

// User.findByIdAndUpdate('5f3d3962522fff37247b2c5f', {age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

// const updateAgeAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate(id, {age})
//     const count = await User.countDocuments({age})
//     return count
// }

// updateAgeAndCount('5f3d3962522fff37247b2c5f', 20).then((result) => console.log(result)).catch(e => console.log(e))

const deleteTaskAndCount = async(id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}
deleteTaskAndCount('5f3f3a57962f26181086a2d4').then((count) => {
    console.log(count)
}).catch(e => console.log(e))