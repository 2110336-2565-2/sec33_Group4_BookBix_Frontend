import React from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { PromotionInterface } from '../../interfaces/promotion.interface'
const url = import.meta.env.VITE_API_URL
import { AccessTokenInterface } from '../../interfaces/authentication.interface'
import { useTokenContext } from '../../hooks/CustomProvider'
import { setMaxIdleHTTPParsers } from 'http'
import jwt_decode from 'jwt-decode'
import { useCookies } from 'react-cookie'

import { LocationInterface } from '../../interfaces/location.interfaces'

export default function CreatePromotion() {
  const [locations, setLocations] = useState<LocationInterface[]>([])

  const [error, setError] = useState<string>('')
  let accessToken: AccessTokenInterface
  const { currentToken, setCurrentToken } = useTokenContext()
  const [cookies, setCookie] = useCookies(['access_token'])
  const [promotion, setPromotion] = useState<PromotionInterface>({
    name: '',
    percentOff: '50',
    amountOff: '',
    locationName: 'all',
    maxRedemptions: '',
  })
  useEffect(() => {
    try {
      accessToken = jwt_decode(cookies.access_token)
    } catch (error) {
      return
    }
    if (accessToken) {
      setCurrentToken(accessToken)
    }
  }, [])
  const initialRange = '50'

  const [discountType, setDiscountType] = useState<string>('')

  const discountForm = (discountType: string) => {
    // console.log(discountType)
    if (discountType == 'Percentage') {
      return (
        <>
          <Form.Label>Percentage</Form.Label>
          <Form.Range
            defaultValue={initialRange}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPromotion({ ...promotion, amountOff: null, percentOff: e.target.value })
              console.log(promotion.percentOff)
            }}
          />
          <h6>{promotion.percentOff}%</h6>
        </>
      )
    }
    return (
      <>
        <Form.Label>Amount of Discount</Form.Label>
        <Form.Control
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPromotion({ ...promotion, amountOff: e.target.value, percentOff: null })
          }
          type="number"
          placeholder="Enter Amount of Discount"
        />
      </>
    )
  }

  const fetchLocationofProvider = async () => {
    try {
      const response = await fetch(`${url}/providers/locations/${currentToken?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      setLocations(data)
      if (!response.ok) {
        setError(data.message)
        return
      }
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }

  useEffect(() => {
    fetchLocationofProvider()
  }, [])

  const locationOption = (locations: LocationInterface[]) => {
    if (locations) {
      return (
        <>
          <option value="">Choose ...</option>
          {locations.map((location, idx) => {
            return <option value={location.name}>{location.name}</option>
          })}
        </>
      )
    }
    return <div></div>
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let bodyData = {}
    let newData1 = {
      name: promotion.name,
      percentOff: promotion.percentOff,
      maxRedemptions: promotion.maxRedemptions,
      locationName: promotion.locationName,
    }
    let newData2 = {
      name: promotion.name,
      amountOff: promotion.amountOff,
      maxRedemptions: promotion.maxRedemptions,
      locationName: promotion.locationName,
    }
    if (promotion.amountOff === null) {
      bodyData = newData1
    }
    if (promotion.percentOff === null) {
      bodyData = newData2
    }
    try {
      setError('')
      const response = await fetch(`${url}/stripe/create-coupon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message)
        return
      } else {
        window.alert('The promotion Created')
      }
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }

  return (
    <div className="promotion">
      <div className="container-fluid text-light fill bg-dark">
        <div className=" d-flex align-items-center justify-content-center pt-5">
          <Form className="row col-8 col-md-6 managePromotion py-5 mb-5" onSubmit={handleSubmit}>
            <h1 className=" row mb-3 col-md-8 justify-content-center  d-flex align-items-center justify-content-center">
              Create Promotion
            </h1>
            <Form.Group
              className=" row mb-3 col-md-8 justify-content-center  justify-content-center "
              controlId="formPromotionCode"
            >
              <Form.Label>Promotion Code</Form.Label>
              <Form.Control
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPromotion({ ...promotion, name: e.target.value })
                }
                type="text"
                placeholder="Enter Promotion Code"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className=" row mb-3 col-md-8 justify-content-center " controlId="formDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setDiscountType(e.target.value)
                }}
                aria-label="Default select example"
                placeholder="Enter Discount Type"
              >
                <option value="">Choose...</option>
                <option value="Baht">Baht</option>
                <option value="Percentage">Percentage</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className=" row mb-3 col-md-8 justify-content-center justify-content-center"
              controlId="formDiscountType"
            >
              {discountForm(discountType)}
            </Form.Group>

            <Form.Group
              className=" row mb-3 col-md-8 justify-content-center justify-content-center "
              controlId="formLocation"
            >
              <Form.Label>Location</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setPromotion({ ...promotion, locationName: e.target.value })
                }}
                aria-label="Default select example"
                placeholder="Enter Location name"
              >
                {locationOption(locations)}
              </Form.Select>
            </Form.Group>

            <Form.Group
              className=" row mb-3 col-md-8 justify-content-center justify-content-center  "
              controlId="formMaxRedemptions"
            >
              <Form.Label>Max Redemptions</Form.Label>
              <Form.Control
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPromotion({ ...promotion, maxRedemptions: e.target.value })
                }
                type="number"
                min="0"
                placeholder="Enter Max Redemptions"
              />
            </Form.Group>
            {error && (
              <div className="alert alert-danger row mb-3 col-md-8 justify-content-center justify-content-center">
                {error}
              </div>
            )}
            <br></br>
            <Button variant="dark" type="submit" className="primary col-5 CreateButton">
              Create
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
