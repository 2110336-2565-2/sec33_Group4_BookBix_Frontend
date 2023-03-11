import { Button } from "react-bootstrap"

export function statusSelector(status: string, component: string) {
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
        }
        return <Button className={`action-btn ${status} text-dark`}>{status === 'pending' ? 'Payment' : 'Review'}</Button>
      default:
        return ''
    }
  }