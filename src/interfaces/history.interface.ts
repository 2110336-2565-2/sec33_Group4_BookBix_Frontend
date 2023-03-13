export interface HistoriesInterface {
  histories: HistoryInterface[]
}

export interface HistoryInterface {
  date: string
  device: string
  ip: string
}

export const historyTitle = ['Lastest Login Update', 'Device Type', 'IP Address']
