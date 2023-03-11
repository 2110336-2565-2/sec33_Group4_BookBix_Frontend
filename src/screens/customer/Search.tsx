import React from 'react'
import { SearchForm, PriceSlider } from '../../components/SearchSlider'
import { SearchCard } from '../../components/SearchCard'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'
import { useState } from 'react'

const URL = import.meta.env.VITE_API_URL

const SearchPage: React.FC = () => {
  return (
    <Container fluid className="search-page bg-dark">
      <div className="align-content-center fill">
        <Row className="pt-5 to_center">
          <SearchForm />
        </Row>
        <Row className="p-3 to_center">
          <PriceSlider />
        </Row>
        <Button variant="primary" type="submit" className="search-btn to_center">
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
