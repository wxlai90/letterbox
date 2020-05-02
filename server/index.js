const express = require('express')
const app = express()
const constants = require('./constants/constants')


const apiRouter = express.Router()
app.use('/api', apiRouter)


const PORT = process.env.PORT || process.argv[2] || 5000


apiRouter.get('/session/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).send({
            errors: [constants.INVALID_ID],
            success: false
        })
    }

    res.json({
        session: {
            id: 'sessionId',
            title: 'Dota 2 International',
            questions: [
                {
                    id: 1,
                    text: 'When is it held?',
                    comments: [
                        'How would I know?',
                        'Google it.'
                    ],
                    upvotes: 0
                },
                {
                    id: 2,
                    text: 'Some other question?',
                    comments: [
                        'No Idea'
                    ],
                    upvotes: 0
                },
                {
                    id: 3,
                    text: 'Another question?',
                    comments: [
                    ],
                    upvotes: 0
                }
            ]
        },
        result: [],
        success: true
    })
})


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))