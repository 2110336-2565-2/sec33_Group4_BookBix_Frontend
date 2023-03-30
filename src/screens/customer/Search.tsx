import React from 'react'
import { SearchForm, PriceSlider } from '../../components/SearchSlider'
import { SearchCard } from '../../components/SearchCard'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'
import { useState } from 'react'
import { SearchInterface } from '../../interfaces/search.interfaces'

const URL = import.meta.env.VITE_API_URL

const SearchPage: React.FC = () => {
  const [formData, setFormData] = useState<SearchInterface>({
    location: '',
    location_function: '',
    location_type: '',
    max_price: 0,
    min_price: 0,
    onChange: () => {},
  })

  const handleSearchFormChange = (newData: Partial<SearchInterface>) => {
    setFormData({ ...formData, ...newData })
  }

  console.log(formData)
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
            console.log(formData)
          }}
        >
          Search
        </Button>
        <div className="to_center">
          <SearchCard />
        </div>
      </div>
    </Container>
  )
}

export default SearchPage
