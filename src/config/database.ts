import { openConnection } from '@database/index'

interface IInfo {
  host: string
  name: string
  port: string
}

const connectToDB = () => {
  openConnection()
    .then((info: IInfo) => {
      console.log(
        `Database connected to ${info.host}:${info.port}/${info.name}`
      )
    })
    .catch((err) => {
      console.log({ Error: err })
      console.log('Unable to connect to database')
      process.exit(1)
    })
}

export default connectToDB
