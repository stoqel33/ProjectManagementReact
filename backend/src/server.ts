import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { auth, client, user, invoice, project, subcontractor, employee } from './routes'
import config from './config/config'

const app = express()

app.use(
    cors({
        origin: '*'
    })
)

main().catch((err) => console.log(err))

async function main() {
    await mongoose.connect(config.mongo as string, config.mongo_opts as object)
    console.log('db connected')
}

app.use(express.json())

app.use('/api/', auth)
app.use('/api/user', user)
app.use('/api/client', client)
app.use('/api/invoice', invoice)
app.use('/api/project', project)
app.use('/api/subcontractor', subcontractor)
app.use('/api/employee', employee)

app.listen(8000, () => {
    console.log('backend is run')
})
