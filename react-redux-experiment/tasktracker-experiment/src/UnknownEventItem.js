import React from 'react'
import { formatTime } from './presentationConcerns'

export const UnknownEventItem = ({ type, time }) =>
  <span className="label label-danger">Unknown event type {type} {formatTime(time)}</span>
