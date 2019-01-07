import React from 'react'
import { formatTime } from './presentationConcerns'

export const UpdateEventItem = ({ text, time }) => <span>
  <span className="label label-default">Status Update</span> {text} {formatTime(time)}
</span>
