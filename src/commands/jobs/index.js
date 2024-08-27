import { COLORS, createClient } from '../../lib/jenkins/config'

function mapJob (job) {
  return {
    name: job.name,
    status: COLORS[job.color]
  }
}

export default async function jobs () {
  const jenkins = createClient()
  const res = await jenkins.get('/api/json')

  console.table(res.data?.jobs?.map(mapJob))
}
