import { Link } from 'react-router-dom'
import backToTheHomepage from '../assets/images/backToTheHomepage.webp'
import Delorean from '../assets/images/Delorean.webp'

export default function Home() {
  return (
    <div className="notFoundContainer">
      <section className="notFound">
        <div className="img">
          <img src={backToTheHomepage} alt="Back to the Homepage" />
          <img src={Delorean} alt="El Delorean, El Doc y Marti McFly" />
        </div>
        <div className="text">
          <h1>404</h1>
          <h2>PAGE NOT FOUND</h2>
          <h3>BACK TO HOME?</h3>
          <Link to="/" className="yes">
            YES
          </Link>
          <a href="https://www.youtube.com/watch?v=G3AfIvJBcGo">NO</a>
        </div>
      </section>
    </div>
  )
}
