export const EVENT_TYPE_CREATED = 'EVENT_TYPE_CREATED'
export const EVENT_TYPE_STATUS_CHANGE = 'EVENT_TYPE_STATUS_CHANGE'
export const EVENT_TYPE_UPDATE = 'EVENT_TYPE_UPDATE'

export const formatEventType = (eventType) => {
  return {
    [EVENT_TYPE_CREATED]: 'Created',
    [EVENT_TYPE_STATUS_CHANGE]: 'Status Change',
    [EVENT_TYPE_UPDATE]: 'Update'
  }[eventType]
}
