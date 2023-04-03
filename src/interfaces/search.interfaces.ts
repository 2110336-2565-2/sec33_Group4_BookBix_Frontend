export interface SearchInterface {
  location?: string
  location_type?: string
  location_function?: string
  min_price?: number
  max_price?: number
  onChange: (newData: Partial<SearchInterface>) => void
}
