import Table from 'cli-table3'

export function createStandardTable ({ head, items }) {
  const table = new Table({
    style: { head: [], border: [] },
    head
  })

  table.push(...items)

  return table
}
