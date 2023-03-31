import React from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { useState } from 'react'
import { PromotionInterface } from '../../interfaces/promotion.interface'
const url = import.meta.env.VITE_API_URL

// page for update user info firstname, lastname, sex, birthdate, email]

// const DiscountForm: React.FC<>{} = ({ discountType = '', setPromotion = () => {} }) => {
//   console.log(discountType)
//   if (discountType == 'Percentage') {
//     return (
//       <>
//         <Form.Label>Percentage</Form.Label>
//         <Form.Control
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//             setPromotion({ ...promotion, amountOff: null, percentOff: e.target.value })
//           }
//           type="text"
//           placeholder="Enter Percentage to discount"
//         />
//       </>
//     )
//   }
//   return (
//     <>
//       <Form.Label>Amount of Discount</Form.Label>
//       <Form.Control
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//           setPromotion({ ...promotion, amountOff: e.target.value, percentOff: null })
//         }
//         type="text"
//         placeholder="Enter Amount of Discount"
//       />
//     </>
//   )
// }

export default function CreatePromotion() {
  const [error, setError] = useState<string>('')
  const [promotion, setPromotion] = useState<PromotionInterface>({
    name: '',
    percentOff: '',
    amountOff: '',
    locationName: '',
    maxRedemptions: '',
  })

  const [discountType, setDiscountType] = useState<string>('')

  const discountForm = (discountType: string) => {
    console.log(discountType)
    if (discountType == 'Percentage') {
      return (
        <>
          <Form.Label>Percentage</Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPromotion({ ...promotion, amountOff: null, percentOff: e.target.value })
            }
            type="text"
            placeholder="Enter Percentage to discount"
          />
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
          type="text"
          placeholder="Enter Amount of Discount"
        />
      </>
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch(`${url}/stripe/create-promotion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promotion),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message)
        return
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
              <Form.Control
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPromotion({ ...promotion, locationName: e.target.value })
                }
                type="text"
                placeholder="Enter Location"
              />
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
                type="text"
                placeholder="Enter Max Redemptions"
              />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>
            {error && <div className="alert alert-danger">{error}</div>}
            <Button variant="dark" type="submit" className="primary col-5 ">
              Create
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
