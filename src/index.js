import { fetchBreeds, getCatInfo } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import './sass/index.scss';

const refs = {
  selectBreed: document.querySelector('select.breed-select'),
  dataLoader: document.querySelector('.overlay'),
  catInfo: document.querySelector('.cat-info'),
};

function onLoad() {
  fetchBreeds()
    .then(r => {
      const markup = createMarkupSelect(r);
      addMarkup(refs.selectBreed, markup);
      new SlimSelect({
        select: 'select.breed-select',
      });
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      toggleHidden(refs.dataLoader);
    });
}

function createMarkupSelect(breeds = []) {
  return breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
}

function addMarkup(elem, markup) {
  elem.innerHTML = markup;
}

window.addEventListener('load', onLoad);
refs.selectBreed.addEventListener('change', onSelect);

function onSelect(e) {
  const value = e.target.value;
  toggleHidden(refs.dataLoader, 'remove');
  getCatInfo(value)
    .then(resp => {
      const markup = createCatMarkupInfo(resp[0]);
      addMarkup(refs.catInfo, markup);
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      toggleHidden(refs.dataLoader);
    });
}

function toggleHidden(elem, m = 'add') {
  elem.classList[m]('hidden');
}

function createCatMarkupInfo({
  url,
  breeds: [{ name, description, temperament }],
}) {
  const catMarkupInfo = `<div>
        <img
          src="${url}"
          width="400"
        />
      </div>
      <div>
        <div>
          <h1 class="title">${name}</h1>
          <p>${description}
            
          </p>
        </div>
        <p><b>Temperament: </b>${temperament}</p>
      </div>`;
  return catMarkupInfo;
}
