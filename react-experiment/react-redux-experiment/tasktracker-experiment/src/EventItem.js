import React from 'react'

import {
  EVENT_TYPE_CREATED,
  EVENT_TYPE_STATUS_CHANGE,
  EVENT_TYPE_UPDATE
} from './TaskEventType'

import {CreatedEventItem} from './CreatedEventItem'
import {StatusChangeEventItem} from './StatusChangeEventItem'
import {UpdateEventItem} from './UpdateEventItem'
import {UnknownEventItem} from './UnknownEventItem'

export const EventItem = ({event}) => {
  const eventType = event.type
  const eventTime = event.createdAt
  let eventContent
  if (eventType === EVENT_TYPE_CREATED) {
    eventContent = <CreatedEventItem time={eventTime}/>
  } else if (eventType === EVENT_TYPE_STATUS_CHANGE) {
    eventContent = <StatusChangeEventItem oldStatus={event.oldStatus} newStatus={event.newStatus} time={eventTime}/>
  } else if (eventType == EVENT_TYPE_UPDATE) {
    eventContent = <UpdateEventItem text={event.text} time={eventTime}/>
  } else {
    eventContent = <UnknownEventItem type={event.type} time={eventTime}/>
  }

  return <li>{eventContent}</li>
}
