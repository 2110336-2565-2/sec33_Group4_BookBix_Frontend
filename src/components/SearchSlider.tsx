import { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { SearchInterface } from '../interfaces/search.interfaces'

export const SearchForm = ({ onChange }: SearchInterface) => {
  return (
    <div>
      <h1>Let us help you find your place</h1>
      <Form>
        <Row>
          <Form.Group controlId="formLocationName">
            <Form.Control
              // value={location}
              onChange={(e) => onChange({ location: e.target.value })}
              type="text"
              placeholder="Enter location"
            />
          </Form.Group>
        </Row>
        <Row className="pt-3">
          <Col>
            <Form.Group controlId="formLocationType">
              <Form.Control
                // value={location_type}
                onChange={(e) => onChange({ location_type: e.target.value })}
                as="select"
              >
                <option value="">Location type</option>
                <option value="Hotel">Hotel</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Bar">Bar</option>
                <option value="">Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formLocationFunction">
              <Form.Control
                // value={location_function}
                onChange={(e) => onChange({ location_function: e.target.value })}
                as="select"
              >
                <option value="">Location function</option>
                <option value="Wedding">Wedding</option>
                <option value="Party">Party</option>
                <option value="Meeting">Meeting</option>
                <option value="">Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export const PriceSlider = ({ onChange }: SearchInterface) => {
  const [value, setValue] = useState<{ min: number; max: number }>({ min: 10, max: 1000 })
  // Create a range slider
  const fromSlider = document.querySelector('#fromSlider') as HTMLInputElement
  const toSlider = document.querySelector('#toSlider') as HTMLInputElement
  const fromInput = document.querySelector('#fromInput') as HTMLInputElement
  const toInput = document.querySelector('#toInput') as HTMLInputElement

  const controlSlider = document.querySelector('.sliders_control')

  function controlFromInput(e: React.FormEvent) {
    const eventTarget = e.target as HTMLInputElement
    const from: number = Math.max(Number(eventTarget.value), 0)
    const to = value.max
    fillSlider('#C6C6C6', '#25daa5')
    if (from > to) {
      setValue({ min: to, max: to })
    } else {
      setValue({ min: from, max: to })
    }
  }

  function controlToInput(e: React.FormEvent) {
    const eventTarget = e.target as HTMLInputElement
    const from = value.min
    const to: number = Math.min(Number(eventTarget.value), 1000)
    fillSlider('#C6C6C6', '#25daa5')
    setToggleAccessible(e)
    if (from <= to) {
      setValue({ min: from, max: to })
    } else {
      setValue({ min: from, max: from })
    }
  }

  function controlFromSlider(e: React.FormEvent) {
    const eventTarget = e.target as HTMLInputElement
    const from: number = Math.max(Number(eventTarget.value), 0)
    const to = value.max
    fillSlider('#C6C6C6', '#25daa5')
    if (from > to) {
      setValue({ min: to, max: to })
    } else {
      setValue({ min: from, max: to })
    }
  }

  function controlToSlider(e: React.FormEvent) {
    const from = value.min
    const eventTarget = e.target as HTMLInputElement
    const to: number = Math.min(Number(eventTarget.value), 1000)
    fillSlider('#C6C6C6', '#25daa5')
    setToggleAccessible(e)
    if (from <= to) {
      setValue({ min: from, max: to })
    } else {
      setValue({ min: from, max: from })
    }
  }
  function fillSlider(sliderColor: string, rangeColor: string) {
    const from = value.min
    const to = value.max
    //
    //Default function if needed,you can change the constant variables
    //
    const rangeDistance = 100
    const fromPosition = from
    const toPosition = to
    // controlSlider.style.background = `linear-gradient(
    //   to right,
    //   ${sliderColor} 0%,
    //   ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
    //   ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
    //   ${rangeColor} ${(toPosition / rangeDistance) * 100}%,
    //   ${sliderColor} ${(toPosition / rangeDistance) * 100}%,
    //   ${sliderColor} 100%)`
  }

  function setToggleAccessible(e?: React.FormEvent) {
    //
    //I don't know what this function actually do than I will skip this function
    //
    if (e) {
      // console.log(e.target.value)
    }
    // if (Number(currentTarget.value) <= 0) {
    //   toSlider.style.zIndex = '2'
    // } else {
    //   toSlider.style.zIndex = '0'
    // }
  }

  fillSlider('#C6C6C6', '#25daa5')
  setToggleAccessible()
  return (
    <div className="range_container">
      <div className="sliders_control">
        <h1 className="w-auto">Your budget (per hour)</h1>
        <input
          id="fromSlider"
          type="range"
          value={value.min}
          min="0"
          max="1000"
          onInput={(e: React.FormEvent) => controlFromSlider(e)}
          onChange={(e) => onChange({ min_price: Number(e.target.value) })}
        />
        <input
          id="toSlider"
          type="range"
          value={value.max}
          min="0"
          max="1000"
          onInput={(e: React.FormEvent) => controlToSlider(e)}
          onChange={(e) => onChange({ max_price: Number(e.target.value) })}
        />
      </div>
      <div className="form_control">
        <div className="form_control_container">
          <div className="form_control_container__time">Min</div>
          <input
            className="form_control_container__time__input"
            type="number"
            id="fromInput"
            value={value.min}
            min="0"
            max="1000"
            onInput={(e: React.FormEvent) => controlFromInput(e)}
            onChange={(e) => onChange({ min_price: Number(e.target.value) })}
          />
        </div>
        <div className="form_control_container">
          <div className="form_control_container__time">Max</div>
          <input
            className="form_control_container__time__input"
            type="number"
            id="toInput"
            value={value.max}
            min="0"
            max="1000"
            onInput={(e: React.FormEvent) => controlToInput(e)}
            onChange={(e) => onChange({ max_price: Number(e.target.value) })}
          />
        </div>
      </div>
    </div>
  )
}
