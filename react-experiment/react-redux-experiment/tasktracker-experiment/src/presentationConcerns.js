import moment from 'moment'

export const formatTime = (isoTime) =>
  moment(isoTime).format('[on] MMMM D YYYY [at] h:mm:ss A')