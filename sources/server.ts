import * as express from 'express'
import * as formidable from 'express-formidable'

import db from './query-functions'

const app = express()
const port = process.env.PORT || 3000

app.use(formidable())

app.get('/', (request, response) => response.status(200).send({
    info: `API`
}))

app.post('/sign-in', db.signIn)
app.post('/submit-status', db.submitStatus)
app.get('/get-statuses', db.getStatuses)

app.listen(port, () => console.log(`App running on port ${port}.`))