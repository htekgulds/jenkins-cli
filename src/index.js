import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import jobs from './commands/jobs'
import pkgJson from '../package.json'
import login from './commands/login'

export default async function main () {
  await yargs(hideBin(process.argv))
    .usage('KUllanım: $0 <command>')
    .command('login [url]', 'Jenkins uygulamasına bağlantı ayarlarını kaydetmek için', {}, login)
    .command('jobs', 'Jenkins işleri', {}, jobs)
    /**
     * option: --jenkins-url, --url
     * env: JENKINS_URL
     */
    .option('jenkins-url', {
      alias: 'url',
      describe: 'Jenkins uygulamasının adresi (ör. https://jenkins.mycompany.com)'
    })
    /**
     * option: --jenkins-username, --username
     * env: JENKINS_USERNAME
     */
    .option('jenkins-username', {
      alias: 'username',
      describe: 'Yetkili jenkins kullanıcı adı'
    })
    /**
     * option: --jenkins-password, --password
     * env: JENKINS_PASSWORD
     */
    .option('jenkins-password', {
      alias: 'password',
      describe: 'Yetkili jenkins kullanıcısı için şifre ya da api key'
    })
    .alias('help', 'h')
    .describe('help', 'Bu yardım metnini göster')
    .version('version', 'Sürüm numarasını göster', pkgJson.version)
    // .middleware(setupJenkinsClient)
    // .middleware(setupArguments)
    .demandCommand(1) // 1 command required
    .wrap(120)
    .strict()
    .parse()
}
