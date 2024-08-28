import chalk from 'chalk'
import { createClient } from '../../lib/jenkins/config'
import prettyMilliseconds from 'pretty-ms'
import { createStandardTable } from '../../lib/table/standard-table'

function mapRun (run) {
  return {
    id: run.id,
    status: run.status,
    startTimeMillis: run.startTimeMillis,
    endTimeMillis: run.endTimeMillis,
    durationMillis: run.durationMillis,
    stages: run.stages.map(stage => ({
      id: stage.id,
      name: stage.name,
      status: stage.status,
      startTimeMillis: stage.startTimeMillis,
      durationMillis: stage.durationMillis
    }))
  }
}

function getPrettyValue (stage) {
  if (!stage) return '-'
  if (stage.status === 'NOT_EXECUTED') return '-'

  const prettyms = prettyMilliseconds(stage.durationMillis, { compact: true })

  if (stage.status === 'SUCCESS') return chalk.green(prettyms)
  if (stage.status === 'FAILED') return chalk.red(prettyms)
  return chalk.gray(prettyms)
}

function extendArray (arr, length) {
  return [...arr, ...new Array(length - arr.length)]
}

export default async function status (argv) {
  const jenkins = createClient()
  const res = await jenkins.get(`job/${argv.name}/wfapi/runs?fullStages=true`)
  const runs = res.data.map(mapRun)

  if (runs.length === 0) {
    console.log('İşle ilgili durum bilgisi bulunamadı')
    return
  }

  const maxStages = Math.max(...runs.map(i => i.stages.length))
  const stages = (runs.find(i => i.stages.length === maxStages))?.stages.map(i => i.name)
  const cells = runs.map(run => [
    run.id,
    ...extendArray(run.stages, stages.length).map(stage => getPrettyValue(stage))
  ])

  const table = createStandardTable({
    head: ['Id', ...stages],
    items: cells
  })

  console.log(table.toString())
}
