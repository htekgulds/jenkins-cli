import chalk from 'chalk'
import { COLORS, createClient } from '../../lib/jenkins/config'
import { createStandardTable } from '../../lib/table/standard-table'

function mapJob (job) {
  return {
    name: job.name,
    status: COLORS[job.color]
  }
}

function prettyStatus (status) {
  if (!status) return '-'
  if (status === 'success') return chalk.green(status)
  if (status === 'error') return chalk.red(status)
  return chalk.gray(status)
}

export default async function jobs () {
  const jenkins = createClient()
  const res = await jenkins.get('/api/json')
  const jobs = res.data?.jobs?.map(mapJob)
  const table = createStandardTable({
    head: ['Name', 'Status'],
    items: jobs.map(i => [i.name, prettyStatus(i.status)])
  })
  console.log(table.toString())
}
