import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export enum ComponentType {
  PROGRESS_CIRCLE = 'progress-circle',
  ACTION_BUTTON = 'action-btn',
}
export enum StatusType {
  BUTTON_PENDING = 'pending',
  BUTTON_CANCEL = 'canceled',
  BUTTON_CONFIRMED = 'confirmed',
}
interface StatusSelectorInterface {
  status: string
  component: string
  locationId: string
}

export const StatusSelector = ({ status, component, locationId }: StatusSelectorInterface) => {
  switch (component) {
    case ComponentType.PROGRESS_CIRCLE:
      return (
        <div className="progress-circle d-flex flex-column justify-content-center align-items-center">
          <div className={`status-text ${status}`}>{status}</div>
          <div className={`outer-progress-circle ${status}`}>
            <div className="inner-progress-circle"></div>
          </div>
        </div>
      )
    case ComponentType.ACTION_BUTTON:
      switch (status) {
        case StatusType.BUTTON_CANCEL:
          return <div></div>
        case StatusType.BUTTON_PENDING:
          return (
            <Link to={`/payment`}>
              <Button className={`action-btn ${status} text-dark`}>Payment</Button>
            </Link>
          )
        case StatusType.BUTTON_CONFIRMED:
          return (
            // <Link to={`/location/${locationId}/review`}>
            <Button className={`action-btn ${status} text-dark`}>Review</Button>
            // </Link>
          )
        default:
          return <></>
      }
    default:
      return <></>
  }
}
