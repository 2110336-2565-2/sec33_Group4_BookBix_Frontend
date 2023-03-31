import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useState } from 'react'
const url = import.meta.env.VITE_API_URL

// page for update user info firstname, lastname, sex, birthdate, email
export default function CreatePromotion() {
  interface User {
    PromotionCode: string
    Discount: string
    AmountOfDiscount: string
    Location: string
    MaxRedemptions: string
  }
  const [error, setError] = useState<string>('')
  const [user, setUser] = useState<User>({
    PromotionCode: '',
    Discount: '',
    AmountOfDiscount: '',
    Location: '',
    MaxRedemptions: '',
  })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch(`${url}/stripe/create-promotion`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message)
        return
      }
      // Save the user information in local storage or in the state
      localStorage.setItem('user', JSON.stringify(data.user))

      // Redirect the user to the homepage
      window.location.href = '/home'
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }

  return (
    <div className="promotion">
      <div className="container-fluid text-light fill bg-dark">
        <div className=" d-flex align-items-center justify-content-center pt-5">
          <Form className="row col-8 col-md-6 managePromotion py-5 mb-5" onSubmit={handleSubmit}>
            <h1 className="d-flex align-items-center justify-content-center">
              Create Promotion
            </h1>
            <Form.Group className="justify-content-center " controlId="formPromotionCode">
              <Form.Label>Promotion Code</Form.Label>
              <Form.Control
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, PromotionCode: e.target.value })}
                type="text"
                placeholder="Enter Promotion Code"
              />
            </Form.Group>

            

            <Form.Group className="justify-content-center "  controlId="formDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setUser({ ...user, Discount: e.target.value })
                }}
                aria-label="Default select example"
                placeholder="Enter Discount Type"
              >
                <option value="">Choose...</option>
                <option value="Baht">Baht</option>
                <option value="Percantage">Percentage</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="justify-content-center" controlId="formLastname">
              <Form.Label>Amount of Discount</Form.Label>
              <Form.Control
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, AmountOfDiscount: e.target.value })}
                type="text"
                placeholder="Enter Amount of Discount"
              />
            </Form.Group>

            <Form.Group className="justify-content-center " controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, Location: e.target.value })}
                type="text"
                placeholder="Enter Location"
              />
            </Form.Group>

            <Form.Group className="justify-content-center  " controlId="formMaxRedemptions">
              <Form.Label>Max Redemptions</Form.Label>
              <Form.Control
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, MaxRedemptions: e.target.value })}
                type="text"
                placeholder="Enter Max Redemptions"
              />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>
            {error && <div className="alert alert-danger">{error}</div>}
            <Button variant="dark" type="submit" className="justify-content-center ">
              Create
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
