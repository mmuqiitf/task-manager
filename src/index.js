const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const jwt = require('jsonwebtoken')
const myF = async () => {
    // const token = jwt.sign({ _id: 'avc123' }, 'XkeGwksQoPwzV1JDFs6JMZBmNU7DrD3Zg6', {expiresIn: '7 days'})
    // console.log(token)
    // const data = jwt.verify(token, 'XkeGwksQoPwzV1JDFs6JMZBmNU7DrD3Zg6')
    // console.log(data)
}

myF()