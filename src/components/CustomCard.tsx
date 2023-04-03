import { locationInterface } from '../interfaces/location.interfaces'
import { FaMoneyBillAlt, FaBuilding, FaClock, FaPlus, FaStar } from 'react-icons/fa'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { DeleteLocationModal } from '../components/CustomModal'
import { useState } from 'react'

export const LocationCard: React.FC<locationInterface> = ({
  _id,
  name,
  address,
  description,
  url,
  images,
  time,
  available_days,
  price,
  avg_rating,
}) => {
  const [show, setShow] = useState<boolean>(false)

  const availableDays = available_days.map((day, idx) => {
    return (
      <li key={idx} className="tag__item">
        <FaClock /> {day}
      </li>
    )
  })
  const imagePath = `${images[0]}`
  return (
    <>
      <article className="postcard dark blue">
        <Link to={url} className="nav-link postcard__img_link">
          <img className="postcard__img" src={imagePath} alt={`${name} Image`} />
        </Link>
        <div className="postcard__text">
          <h1 className="postcard__title blue">
            <Link to={`/location-booking/${_id}`} className="nav-link">
              {name}
            </Link>
          </h1>
          <div className="postcard__subtitle small">
            <p>
              <FaBuilding /> {address}
            </p>
            <p>
              {time.open_time} - {time.close_time}
            </p>
          </div>
          <div className="postcard__bar"></div>
          <div className="postcard__preview-txt">{description}</div>
          <ul className="postcard__tagbox">
            <li className="tag__item ">
              <FaMoneyBillAlt /> {price}&#3647;
            </li>
            <li className="tag__item ">
              <FaStar /> {avg_rating}
            </li>
            {availableDays}
          </ul>
          <ul className="postcard__tagbox">
            <li className="tag__item play blue">
              <Link to={`${_id}`} className="nav-link">
                <MdEdit /> Edit
              </Link>
            </li>
            <li className="tag__item play red">
              <Link
                to={`#`}
                className="nav-link"
                onClick={() => {
                  setShow(true)
                }}
              >
                <MdDelete /> Delete
              </Link>
            </li>
          </ul>
        </div>
        <DeleteLocationModal
          show={show}
          handleCancel={() => {
            setShow(false)
          }}
          locationID={_id}
          name={name}
        />
      </article>
    </>
  )
}

export const NewLocationCard: React.FC = () => {
  const imagePath = `https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.peerspace.com%2Fpages%2Flistings%2F6007407fe7bcbe000c9ef96d&psig=AOvVaw3Nebt0Xgm-bPvSWvFkkvOL&ust=1680618067985000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOC8s6n0jf4CFQAAAAAdAAAAABAE`
  const availableDays = ['Tuesday', 'Friday', 'Saturday'].map((day, idx) => {
    return (
      <li key={idx} className="tag__item">
        <FaClock /> {day}
      </li>
    )
  })
  return (
    <>
      <article className="postcard dark green new">
        <div className="postcard__cover">
          <Link to="create" className="nav-link postcard__img_link">
            <FaPlus />
          </Link>
        </div>
        <Link to="#" className="nav-link postcard__img_link">
          <img className="postcard__img" src={imagePath} alt="Template Image" />
        </Link>
        <div className="postcard__text">
          <h1 className="postcard__title blue">
            <Link to="#" className="nav-link">
              New Location
            </Link>
          </h1>
          <div className="postcard__subtitle small">
            <p>
              <FaBuilding /> Location Address here
            </p>
            <p>xx.xx - xx.xx</p>
          </div>
          <div className="postcard__bar"></div>
          <div className="postcard__preview-txt">Add your new Location description here</div>
          <ul className="postcard__tagbox">
            <li className="tag__item ">
              <FaMoneyBillAlt /> xxx &#3647;
            </li>
            {availableDays}
          </ul>
          <ul className="postcard__tagbox">
            <li className="tag__item green">
              <Link to="#" className="nav-link">
                <MdEdit /> Create
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </>
  )
}
