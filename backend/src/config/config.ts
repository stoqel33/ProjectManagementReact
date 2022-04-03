import dotenv from 'dotenv'

dotenv.config()

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const MONGO = process.env.MONGO_URL

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 8000

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
}

const config = {
    server: SERVER,
    mongo: MONGO,
    mongo_opts: MONGO_OPTIONS
}

export default config
