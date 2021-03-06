/* eslint-disable no-unused-vars */
import path from 'path'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

process.env.GOOGLE_APPLICATION_CREDENTIALS = './HackathonApi-d7da1c3270d1.json';

/* istanbul ignore next */
// if (process.env.NODE_ENV !== 'production') {
//   const dotenv = require('dotenv-safe')
//   dotenv.load({
//     path: path.join(__dirname, '../.env'),
//     sample: path.join(__dirname, '../.env.example')
//   })
// }

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT ||9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '/api',
    masterKey:"pihcBbK5BG2uUqNxwYlZv5wJNhQVW1F0",
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    }
  },
  test: {
    mongo: {
      uri: 'mongodb://usthackathon:stimpacks@ds117878.mlab.com:17878/hackathon',
      options: {
        debug: false
      }
    }
  },
  development: {
    mongo: {
      uri: 'mongodb://usthackathon:stimpacks@ds117878.mlab.com:17878/hackathon',
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://usthackathon:stimpacks@ds117878.mlab.com:17878/hackathon'
    }
  }
}

module.exports = Object.assign(config.all, config[config.all.env])
export default module.exports
