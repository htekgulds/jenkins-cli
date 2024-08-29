import chalk from 'chalk'
import { createStandardTable } from '../../lib/table/standard-table'
import getJenkinsJobs from '../../lib/jenkins/getJenkinsJobs'

function prettyStatus (status) {
  if (!status) return '-'
  if (status === 'success') return chalk.green(status)
  if (status === 'error') return chalk.red(status)
  return chalk.gray(status)
}

export default async function jobs () {
  const jobs = await getJenkinsJobs()
  const table = createStandardTable({
    head: ['Name', 'Status'],
    items: jobs.map(i => [i.name, prettyStatus(i.status)])
  })
  console.log(table.toString())
}
