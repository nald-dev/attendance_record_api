import * as express from 'express'
import { Pool, PoolConfig } from 'pg'

type CustomPoolConfig = PoolConfig & { url: string }

const pool = new Pool({
  user: "envision",
  host: "localhost",
  database: "postgres",
  password: "",
  port: 5432,
  url: ""
} as CustomPoolConfig)

function giveResponse(
  response: express.Response,
  status: 'success' | 'created' | 'bad_request' | 'not_found',
  data: any,
  info?: string
) {
  let statusCode: number

  if(status == 'success') {
    statusCode = 200
  } else if(status == 'created') {
    statusCode = 201
  } else if(status == 'bad_request') {
    statusCode = 400
  } else if(status == 'not_found') {
    statusCode = 404
  }

  response.status(statusCode!).json({
    status,
    info,
    data
  })
}

const signIn = (req: express.Request, res: express.Response) => {
  const { username, password } = req.fields
  
  pool.query(
    `SELECT * FROM accounts WHERE username = $1`,
    [username],
    (err, results) => {
      if(err) {
        giveResponse(res, 'bad_request', {}, `${err.name} : ${err.message}`)
      } else {
        if(results.rows.length > 0) {
          if(password == results.rows[0].password) {
            const data = {
              ...results.rows[0],
              password: undefined
            }
  
            giveResponse(res, 'success', data, 'Berhasil login')
          } else {
            giveResponse(res, 'bad_request', {}, 'Password salah')
          }
        } else {
          giveResponse(res, 'not_found', {}, 'Tidak ditemukan akun dengan username tersebut')
        }
      }
    }
  )
}

export default {
  signIn,
}