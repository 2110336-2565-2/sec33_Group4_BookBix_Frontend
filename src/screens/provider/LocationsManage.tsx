import LocationCard from '../../components/CustomCard'
import { locationInterface } from '../../interfaces/location.interfaces'
import { Container } from 'react-bootstrap'

export default function LocationsManage() {
  const testLocations: locationInterface[] = [
    {
      _id: '000000000004000000000001',
      name: 'CU Sport complex',
      address: 'จุฬาลงกรณ์มหาวิทยาลัย ซอย จุฬาลงกรณ์ 5 Wang Mai',
      description: 'Designed for sport activity',
      url: 'http://www.google.com ',
      images: [
        'https://lh5.googleusercontent.com',
        'https://lh5.googleusercontent.com',
        'https://lh5.googleusercontent.com',
      ],
      time: {
        open_time: '9:00',
        close_time: '17:00',
      },
      available_days: ['Monday', 'Wednesday', 'Friday'],
      price: 200,
    },
    {
      _id: '000000000004000000000002',
      name: 'Eiffel Tower',
      address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
      description:
        "The Eiffel Tower is an iron tower located on the Champ de Mars in Paris, France. It was built as the entrance arch to the 1889 World's Fair.",
      url: 'test',
      images: [
        'https://www.travelandleisure.com/thmb/SPUPzO88ZXq6P4Sm4mC5Xuinoik=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde.jpg',
        'https://media.istockphoto.com/photos/eiffel-tower-in-spring-picture-id1297043676?b=1&k=20&m=1297043676&s=170667a&w=0&h=kXklVKUeWIw7UWDDYnxMzB3uXS9prFiea3RaRPyB5M0=',
      ],
      time: { open_time: '08:00', close_time: '16:00' },
      available_days: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
      price: 150,
    },
    {
      _id: '000000000004000000000003',
      name: 'Central Park',
      address: 'New York, NY 10022',
      description: 'A large urban park in the heart of New York City',
      url: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.066385305769!2d-73.96777208496323!3d40.78255467932428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2589a018531e3%3A0xb9df1f7387a94119!2sCentral%20Park!5e0!3m2!1sen!2sth!4v1675496921164!5m2!1sen!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      images: [
        'https://ohny.org/wp-content/uploads/2022/09/Harry_Gillen_via_Unsplash.jpeg',
        'https://mymodernmet.com/wp/wp-content/uploads/2020/12/central-park-new-york-city-frederick-law-olmsted-2.jpg',
        'https://www.planetware.com/photos-large/USNY/new-york-city-central-park-1.jpg',
      ],
      time: { open_time: '10:00', close_time: '16:00' },
      available_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      price: 250,
    },
  ]

  const LocationCards = testLocations.map(
    ({ _id, name, address, description, url, images, time, available_days, price }) => {
      return (
        <LocationCard
          _id={_id}
          name={name}
          address={address}
          description={description}
          url={url}
          images={images}
          time={time}
          available_days={available_days}
          price={price}
        />
      )
    },
  )

  return (
    <>
      <section className="location-manage bg-dark">
        <Container className="py-1">
          <h1 className="h1 text-center fw-bold text-uppercase" id="header">
            Your locations
          </h1>
          {LocationCards}
        </Container>
      </section>
    </>
  )
}
