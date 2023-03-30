import React from 'react'
import { SearchForm, PriceSlider } from '../../components/SearchSlider'
import { SearchCard } from '../../components/SearchCard'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'
import { useState } from 'react'
import { SearchInterface } from '../../interfaces/search.interfaces'
import { locationInterface } from '../../interfaces/location.interfaces'

const URL = import.meta.env.VITE_API_URL
const SearchPage: React.FC = () => {
  const [locations, setLocations] = useState<locationInterface[]>([])
  const [formData, setFormData] = useState<SearchInterface>({
    location: '',
    location_function: '',
    location_type: '',
    max_price: 1000,
    min_price: 0,
    onChange: () => {},
  })

  const handleSearchFormChange = (newData: Partial<SearchInterface>) => {
    setFormData({ ...formData, ...newData })
  }

  return (
    <Container fluid className="search-page bg-dark">
      <div className="align-content-center fill">
        <Row className="pt-5 to_center">
          <SearchForm onChange={handleSearchFormChange} />
        </Row>
        <Row className="p-3 to_center">
          <PriceSlider onChange={handleSearchFormChange} />
        </Row>
        <Button
          variant="primary"
          type="submit"
          className="search-btn to_center"
          onClick={(e) => {
            e.preventDefault()
            fetch(
              `${URL}/locations/search?location_name=${formData.location}&location_type=${formData.location_type}&location_function=${formData.location_function}&min_price=${formData.min_price}&max_price=${formData.max_price}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            )
              .then((res) => res.json())
              .then((data) => {
                setLocations(data.location)
              })
          }}
        >
          Search
        </Button>
        <div className="to_center">
          <SearchCard data={locations} />
        </div>
      </div>
    </Container>
  )
}

export default SearchPage
