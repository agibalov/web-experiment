import React from 'react'
import classNames from 'classnames'

import {
  formatStatus,
  formatClassName
} from './TaskStatus'

import {formatTime} from './presentationConcerns'

export const StatusChangeEventItem = ({oldStatus, newStatus, time}) => {
  const makeStatusElement = (status) =>
    <span className={classNames('label', formatClassName(status))}>{formatStatus(status)}</span>
  const oldStatusElement = makeStatusElement(oldStatus)
  const newStatusElement = makeStatusElement(newStatus)
  return <span>
    <span className="label label-warning">Status Change</span>
    Status has changed from {oldStatusElement} to {newStatusElement} {formatTime(time)}
  </span>
}
