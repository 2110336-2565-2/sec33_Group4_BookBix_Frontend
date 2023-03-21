import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ButtonReview } from '../components/CustomButton'
import { StatusType, ComponentType, StatusSelectorInterface } from '../interfaces/booking.interfaces'
import { RoutePath } from '../interfaces/route.interface'
/**
 * Return various React.FC<StatusSelectorInterface> which is separated by component
 * @param status StatusType of booking
 * @param component ComponentType of component
 * @param locationId identifier of location
 * @returns ComponentType.PROGRESS_CIRCLE which is separated by ComponentType
 *          ComponentType.ACTION_BUTTON which is separated by ComponentType and locationId
 */
export const StatusSelector: React.FC<StatusSelectorInterface> = ({ status, component, locationId }) => {
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
            <Link to={RoutePath.Payment}>
              <Button className={`action-btn ${status} text-dark`}>Payment</Button>
            </Link>
          )
        case StatusType.BUTTON_CONFIRMED:
          return <ButtonReview locationId={locationId} />
        default:
          return <></>
      }
    default:
      return <></>
  }
}
