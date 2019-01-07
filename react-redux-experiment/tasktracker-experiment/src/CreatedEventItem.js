import React from 'react'
import {formatTime} from './presentationConcerns'

export const CreatedEventItem = (time) => <span>
  <span className="label label-success">Created</span> {formatTime(time)}
</span>
