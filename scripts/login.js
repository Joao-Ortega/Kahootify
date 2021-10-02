import { getToken, loadGenres } from '../script.js';

const inputID = document.querySelector('#clientID');
const inputSecret = document.querySelector('#clientSecret');
const saveBtn = document.querySelector('#save-login-btn');
const frontPage = document.getElementById('front-page');
const loginPage = document.getElementById('login-page');

let CLIENT_ID;
let CLIENT_SECRET;

const getDataFromStorage = () => {
  const loginData = localStorage.getItem('Kahootify Login')
  if (!loginData) return;
  return loginData.split('-');
};

const IdAndSecret = getDataFromStorage();

const saveData = (id, secret) => {
  localStorage.setItem('Kahootify Login', `${id}-${secret}`)
}

const checkLogin = (id, secret) => {
  const isValid = true;
  const regEx = /[!@#$%^&*(),.?"':{}|<>\s]/g;
  if (id.length !== 32 || secret.length !== 32) return false;
  if (regEx.test(`${id}${secret}`)) return false;

  return isValid;
}

const getIdAndSecret = () => ({
  id: inputID.value,
  secret: inputSecret.value
});

const loadFrontPage = async (id, secret) => {
  CLIENT_ID = id;
  CLIENT_SECRET = secret;

  loginPage.style.display = 'none';
  frontPage.style.display = 'flex';

  await getToken();
  await loadGenres();
}

const login = (event) => {
  event.preventDefault();

  const { id, secret } = getIdAndSecret();

  if (checkLogin(id, secret)) {
    saveData(id, secret);
    loadFrontPage(id, secret);
  } else {
    alert('Invalid Client ID and/or Client Secret');
  }
}

saveBtn.addEventListener('click', login);

if (IdAndSecret) {
  loadFrontPage(IdAndSecret[0], IdAndSecret[1]);
};

export { CLIENT_ID, CLIENT_SECRET };