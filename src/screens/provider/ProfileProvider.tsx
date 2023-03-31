import LocationCard from '../../components/CustomCard'
import { locationInterface } from '../../interfaces/location.interfaces'

export default function ProfileProvider() {
  const testLocations: locationInterface[] = [
    {
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
    // {
    //   name: 'Eiffel Tower',
    //   address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    //   description:
    //     "The Eiffel Tower is an iron tower located on the Champ de Mars in Paris, France. It was built as the entrance arch to the 1889 World's Fair.",
    //   url: 'test',
    //   images: [
    //     'https://www.travelandleisure.com/thmb/SPUPzO88ZXq6P4Sm4mC5Xuinoik=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde.jpg',
    //     'https://media.istockphoto.com/photos/eiffel-tower-in-spring-picture-id1297043676?b=1&k=20&m=1297043676&s=170667a&w=0&h=kXklVKUeWIw7UWDDYnxMzB3uXS9prFiea3RaRPyB5M0=',
    //   ],
    //   time: { open_time: '08:00', close_time: '16:00' },
    //   available_days: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
    //   price: 200,
    // },
  ]
  return (
    <>
      <div>
        <h2 className="">Your locations</h2>
        {testLocations.map(({ name, address, description, url, images, time, available_days, price }) => {
          return (
            <LocationCard
              key={name}
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
        })}
      </div>
    </>
  )
}
