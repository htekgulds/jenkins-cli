import { COLORS, createClient } from '../../lib/jenkins/config'
import { createStandardTable } from '../../lib/table/standard-table'

function mapJob (job) {
  return {
    name: job.name,
    status: COLORS[job.color]
  }
}

export default async function jobs () {
  const jenkins = createClient()
  const res = await jenkins.get('/api/json')
  const jobs = res.data?.jobs?.map(mapJob)
  const table = createStandardTable({
    head: ['Name', 'Status'],
    items: jobs.map(i => [i.name, i.status])
  })
  console.log(table.toString())
}
