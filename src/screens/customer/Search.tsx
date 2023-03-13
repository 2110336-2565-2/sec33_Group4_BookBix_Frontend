import React from 'react'
import { SearchForm, PriceSlider } from '../../components/SearchSlider'
import { SearchCard } from '../../components/SearchCard'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'
import { useState } from 'react'

const URL = import.meta.env.VITE_API_URL

const SearchPage: React.FC = () => {
  const GetSearchValue = () => {
    //   const [location, setLocation] = useState<string>('')
    //   const [locationType, setLocationType] = useState<string>('')
    //   const [locationFunction, setLocationFunction] = useState<string>('')
    //   const [price, setPrice] = useState<{ min: number; max: number }>({ min: 10, max: 1000 })
    //   const handleSummit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     // search location by name
    //     try {
    //       const response = fetch(`${URL}locations/search?location=${location}`, {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       })
    //       console.log(response)
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    //   return {
    //     location,
    //     locationType,
    //     locationFunction,
    //     price,
    //     setLocation,
    //     setLocationType,
    //     setLocationFunction,
    //     setPrice,
    //     handleSummit,
    //   }
  }

  const [state, setState] = useState(false)

  return (
    <Container fluid className="search-page bg-dark">
      <div className="align-content-center fill">
        <Row className="pt-5 to_center">
          <SearchForm />
        </Row>
        <Row className="p-3 to_center">
          <PriceSlider />
        </Row>
        <Button
          onSubmit={() => {
            setState(!state)
          }}
          variant="primary"
          type="submit"
          className="search-btn to_center"
        >
          Search
        </Button>
        <div className="to_center">
          <SearchCard state={state} />
        </div>
      </div>
    </Container>
  )
}

export default SearchPage
