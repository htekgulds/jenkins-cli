import { COLORS, createClient } from './config'

function mapJob (job) {
  return {
    name: job.name,
    status: COLORS[job.color]
  }
}

export default async function getJenkinsJobs () {
  const jenkins = createClient()
  const res = await jenkins.get('/api/json')
  return res.data?.jobs?.map(mapJob)
}
