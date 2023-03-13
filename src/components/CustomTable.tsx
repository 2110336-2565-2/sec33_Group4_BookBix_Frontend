import { Table } from 'react-bootstrap'
import { HistoryInterface, HistoriesInterface, historyTitle } from '../interfaces/history.interface'

export const HistoryTable = ({ histories }: HistoriesInterface) => {
  return (
    <Table borderless responsive="md">
      <HistoryTableHeader />
      {histories.map((history) => {
        return <HistoryTableBody key={history.date} date={history.date} device={history.device} ip={history.ip} />
      })}
    </Table>
  )
}
const HistoryTableHeader = () => {
  return (
    <thead className="table-dark">
      <tr>
        {historyTitle.map((header) => {
          return (
            <th key={header} scope="col">
              <h5 className="fw-bold">{header}</h5>
            </th>
          )
        })}
      </tr>
    </thead>
  )
}
const HistoryTableBody = ({ date, device, ip }: HistoryInterface) => {
  return (
    <tbody>
      <tr className="table-light">
        <td>
          <h5>{date}</h5>
        </td>
        <td>
          <h5>{device}</h5>
        </td>
        <td>
          <h5>{ip}</h5>
        </td>
      </tr>
    </tbody>
  )
}
