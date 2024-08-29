import axios from 'axios'
import config from '../../config'
import { httpsAgent } from '../../lib/axios/instance'
import { logger } from '../../lib/logging'
import enquirer from 'enquirer'

const Input = enquirer.Input

export default async function login (argv) {
  if (!argv.url) {
    const input = new Input({ message: 'Jenkins adresini girin', initial: 'https://jenkins.mycompany.com' })
    const answer = await input.run()
    argv.url = answer
  }

  if (!argv.username) {
    const input = new Input({ message: 'Kullanıcı adını girin' })
    const answer = await input.run()
    argv.username = answer
  }

  if (!argv.password) {
    const input = new Input({ message: 'Kullanıcı şifresini girin' })
    const answer = await input.run()
    argv.password = answer
  }

  try {
    await axios.get(argv.url + '/api/json', {
      httpsAgent,
      auth: {
        username: argv.username,
        password: argv.password
      }
    })

    config.set('url', argv.url)
    config.set('username', argv.username)
    config.set('password', argv.password)
    logger.info('Jenkins bağlantı ayarları kaydedildi')
  } catch (err) {
    logger.warn('Jenkins uygulamasına bağlanılamadı')
    logger.error(err)
  }
}
