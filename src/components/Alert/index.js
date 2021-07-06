import React from 'react'

import './Alert.css'
import {
  CheckIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon
} from 'icons'

const classesMap = {
  warning: 'Alert-warning',
  error: 'Alert-error',
  info: 'Alert-info',
  success: 'Alert-success'
}

const iconsMap = {
  warning: <WarningIcon color='#ff9800' />,
  error: <ErrorIcon color='#f44336'/>,
  success: <CheckIcon color='#4caf50' />,
  info: <InfoIcon color='#2196f3'/>
}

export default function Alert ({ title, children, severity, action }) {
  const componentIcon = iconsMap[severity]
  return (
    <div className={`Alert-root ${classesMap[severity]}`}>
      {severity &&
        <div className='Alert-icon'>
          {componentIcon}
        </div>
      }
      <div className='Alert-message'>
        {title &&
          <div className='Alert-title'>
            {title}
          </div>
        }
        {children}
      </div>
      {action && <div className='Alert-action'>{action}</div>}

    </div>
  )
}
