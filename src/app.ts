const form: HTMLFormElement = document.querySelector('form');
const adressInput = <HTMLInputElement>document.getElementById('address');
const submitBtn = <HTMLInputElement>document.getElementById('submit');

const searchAddress = (event: Event) => {
  event.preventDefault();
  const address = adressInput.value;
}

form!.addEventListener('submit', searchAddress);
