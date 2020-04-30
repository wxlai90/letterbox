const express = require('express')
const app = express()

const apiRouter = express.Router()
app.use('/api', apiRouter)


const PORT = process.env.PORT || process.argv[2] || 5000


apiRouter.get('/isValidId', (req, res) => {
    res.json({
        result: [],
        success: true
    })
})


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))