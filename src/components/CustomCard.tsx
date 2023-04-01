import { locationInterface } from '../interfaces/location.interfaces'
import { FaMoneyBillAlt, FaBuilding, FaClock } from 'react-icons/fa'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'

const LocationCard: React.FC<locationInterface> = ({
  _id,
  name,
  address,
  description,
  url,
  images,
  time,
  available_days,
  price,
}) => {
  const availableDays = available_days.map((day, idx) => {
    return (
      <li key={idx} className="tag__item">
        <FaClock /> {day}
      </li>
    )
  })

  return (
    <>
      <article className="postcard dark blue">
        <Link to={url} className="nav-link postcard__img_link">
          <img className="postcard__img" src={`https://picsum.photos/1000/${1000 + price}`} alt={`${name} Image`} />
        </Link>
        <div className="postcard__text">
          <h1 className="postcard__title blue">
            <Link to="#" className="nav-link">
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
            {availableDays}
          </ul>
          <ul className="postcard__tagbox">
            <li className="tag__item play blue">
              <Link to={`${_id}`} className="nav-link">
                <MdEdit /> Edit
              </Link>
            </li>
            <li className="tag__item play red">
              <Link to={`#`} className="nav-link">
                <MdDelete /> Delete
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </>
  )
}

export default LocationCard
