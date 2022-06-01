import * as express from 'express'
import * as formidable from 'express-formidable'

import db from './query-functions'

const app = express()
const port = process.env.PORT || 3000

app.use(formidable())

app.get('/', (request, response) => response.status(200).send({
    info: `API`
}))

app.get('/accounts', db.getAccounts) //owner_id

app.listen(port, () => console.log(`App running on port ${port}.`))