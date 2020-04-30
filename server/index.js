const express = require('express')
const app = express()

const PORT = process.env.PORT || process.argv[2] || 5000


app.get('/', (req, res) => {
    res.json({
        success: true
    })
})


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))