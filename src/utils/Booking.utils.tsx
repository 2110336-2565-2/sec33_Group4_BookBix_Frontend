import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/**
 * Return various component which is separated by component 
 * @param status status of booking
 * @param component type of component
 * @param locationId identifier of location
 * @returns status-text which is separated by status
 *          progress-circle which is separated by status
 *          action-btn which is separated by status and locationId
 */
export function statusSelector(status: string, component: string, locationId: string) {
  switch (component) {
    case 'progress-circle':
      return (
        <div className={`outer-progress-circle ${status}`}>
          <div className="inner-progress-circle"></div>
        </div>
      )
    case 'status-text':
      return <div className={`status-text ${status}`}>{status}</div>
    case 'action-btn':
      if (status === 'canceled') {
        return <div></div>
      } else if (status === 'pending') {
        return (
          <Link to={`/payment`}>
            <Button className={`action-btn ${status} text-dark`}>Payment</Button>
          </Link>
        )
      } else if (status === 'confirmed') {
        return (
          <Link to={`/location/${locationId}/review`}>
            <Button className={`action-btn ${status} text-dark`}>Review</Button>
          </Link>
        )
      }
    default:
      return ''
  }
}
