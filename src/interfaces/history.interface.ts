export interface HistoriesInterface {
  histories: HistoryInterface[]
}

export interface HistoryInterface {
  date: string
  ip: string
  device: string
}

export const historyTitle = ['Lastest Login Update', 'Device Type', 'IP Address']
