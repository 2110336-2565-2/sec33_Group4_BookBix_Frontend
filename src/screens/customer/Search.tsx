import React from 'react'
import { searchForm } from '../../components/SearchPage'
import { Button, Form, Row } from 'react-bootstrap'
import { useState } from 'react'

export default function SearchPage() {
  const url = import.meta.env.VITE_API_URL
  const [location, setLocation] = useState<string>('')

  // handle submit
  const handleSummit = (e) => {
    e.preventDefault()
    // console.log(location)
    // search location by name
    try {
      const response = fetch(`${url}locations/search?location=${location}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  // slider

  function controlFromInput(
    fromSlider: HTMLInputElement,
    fromInput: HTMLInputElement,
    toInput: HTMLInputElement,
    controlSlider: HTMLInputElement,
  ) {
    const [from, to] = getParsed(fromInput, toInput)
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider)
    if (from > to) {
      fromSlider.value = to.toString()
      fromInput.value = to.toString()
    } else {
      fromSlider.value = from.toString()
    }
  }

  function controlToInput(
    toSlider: HTMLInputElement,
    fromInput: HTMLInputElement,
    toInput: HTMLInputElement,
    controlSlider: HTMLInputElement,
  ) {
    const [from, to] = getParsed(fromInput, toInput)
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider)
    setToggleAccessible(toInput)
    if (from <= to) {
      toSlider.value = to.toString()
      toInput.value = to.toString()
    } else {
      toInput.value = from.toString()
    }
  }

  function controlFromSlider(
    fromSlider: HTMLInputElement,
    toSlider: HTMLInputElement,
    fromInput: HTMLInputElement,
  ) {
    const [from, to] = getParsed(fromSlider, toSlider)
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider)
    if (from > to) {
      fromSlider.setAttribute('value', to.toString())
      fromInput.setAttribute('value', to.toString())
    } else {
      fromInput.setAttribute('value', from.toString())
    }
  }

  function controlToSlider(
    fromSlider: HTMLInputElement,
    toSlider: HTMLInputElement,
    toInput: HTMLInputElement,
  ) {
    const [from, to] = getParsed(fromSlider, toSlider)
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider)
    setToggleAccessible(toSlider)
    if (from <= to) {
      toSlider.value = to.toString()
      toInput.value = to.toString()
    } else {
      toInput.value = from.toString()
      toSlider.value = from.toString()
    }
  }

  function getParsed(
    currentFrom: HTMLInputElement,
    currentTo: HTMLInputElement,
  ) {
    const from = parseInt(currentFrom.value, 10)
    const to = parseInt(currentTo.value, 10)
    return [from, to]
  }

  function fillSlider(
    from: HTMLInputElement,
    to: HTMLInputElement,
    sliderColor: string,
    rangeColor: string,
    controlSlider: HTMLInputElement,
  ) {
    console.log(
      from.getAttribute('value')?.valueOf(),
      to.getAttribute('min')?.valueOf(),
      sliderColor,
      rangeColor,
      controlSlider,
    )
    const rangeDistance =
      Number(to.getAttribute('max')?.valueOf()) -
      Number(to.getAttribute('min')?.valueOf())
    const fromPosition =
      Number(from.getAttribute('value')?.valueOf()) -
      Number(to.getAttribute('min')?.valueOf())
    const toPosition =
      Number(to.getAttribute('value')?.valueOf()) -
      Number(to.getAttribute('min')?.valueOf())
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%,
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%,
      ${sliderColor} 100%)`
  }

  function setToggleAccessible(currentTarget: HTMLInputElement) {
    const toSlider = document.querySelector('#toSlider') as HTMLInputElement
    if (Number(currentTarget.value) <= 0) {
      toSlider.style.zIndex = '2'
    } else {
      toSlider.style.zIndex = '0'
    }
  }
  // const fromSlider = document.querySelector('#fromSlider') as HTMLInputElement
  // const toSlider = document.querySelector('#toSlider') as HTMLInputElement
  // const fromInput = document.querySelector('#fromInput') as HTMLInputElement
  // const toInput = document.querySelector('#toInput') as HTMLInputElement
  // fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider)
  // setToggleAccessible(toSlider)
  // fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput)
  // toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput)
  // fromInput.oninput = () =>
  //   controlFromInput(fromSlider, fromInput, toInput, toSlider)
  // toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider)
  return (
    <div className="search-page">
      <div className="fill bg-dark  justify-content-center d-flex pt-5">
        <div>
          <h1>Let us help you find your</h1>
          <Form onSubmit={handleSummit}>
            <Form.Group controlId="formLocationName">
              <Form.Control
                onChange={(e) => {
                  setLocation(e.target.value)
                }}
                type="text"
                placeholder="Enter location"
              />
            </Form.Group>
            <div className="range_container">
              <div className="sliders_control">
                <input
                  id="fromSlider"
                  type="range"
                  value="10"
                  min="0"
                  max="100"
                />
                <input
                  id="toSlider"
                  type="range"
                  value="40"
                  min="0"
                  max="100"
                />
              </div>
              <div className="form_control">
                <div className="form_control_container">
                  <div className="form_control_container__time">Min</div>
                  <input
                    className="form_control_container__time__input"
                    type="number"
                    id="fromInput"
                    value="10"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="form_control_container">
                  <div className="form_control_container__time">Max</div>
                  <input
                    className="form_control_container__time__input"
                    type="number"
                    id="toInput"
                    value="40"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="search-btn submit">
              Search
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
