export const STATUS_NEW = 'STATUS_NEW'
export const STATUS_IN_PROGRESS = 'STATUS_IN_PROGRESS'
export const STATUS_DONE = 'STATUS_DONE'

export const formatStatus = (status) => {
  return {
    [STATUS_NEW]: 'New',
    [STATUS_IN_PROGRESS]: 'In Progress',
    [STATUS_DONE]: 'Done'
  }[status]
}

export const formatClassName = (status) => {
  return {
    [STATUS_NEW]: 'label-default',
    [STATUS_IN_PROGRESS]: 'label-warning',
    [STATUS_DONE]: 'label-success'
  }[status]
}
