import axios from 'axios';
const form: HTMLFormElement = document.querySelector('form');
const adressInput = <HTMLInputElement>document.getElementById('address');
const submitBtn = <HTMLInputElement>document.getElementById('submit');

const GOOGLE_API_KEY = 'AIzaSyDJ0YOFWs7NlvL0deAbxXme8imkyZD5yzI';
const GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

type GoogleGeocodingResponse = {
  results: {
    geometry: {
      location: {
        lat: number,
        lng: number
      }
    }
  }[],
  status: 'OK' | 'ZERO_RESULTS'
}

const searchAddress = async (event: Event) => {
  event.preventDefault();
  const address = adressInput.value;
  try {
    const { data } = await axios.get<GoogleGeocodingResponse>(`${GOOGLE_API_URL}=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`)
    if (data.status !== 'OK') throw Error('Could not fetch location');

    const coords = data.results[0].geometry.location;
    const map = new google.maps.Map(document.getElementById('app'), {
      center: coords,
      zoom: 16
    });

    const marker = new google.maps.Marker({
      position: coords,
      map,
      title: 'HYYYY',
      animation: google.maps.Animation.DROP,
    });
    marker.setMap(map);
  } catch (error) {

  }
}

form!.addEventListener('submit', searchAddress);


