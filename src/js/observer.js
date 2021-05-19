import { refs } from './get-refs';
import ApiService from './apiService';
import imagesTpl from '../templetes/card.hbs';

const apiServiceImages = new ApiService();

const options = {};

export const observer = new IntersectionObserver(onEntry, options);

export function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('в полі зору');

      apiServiceImages.fetchImage().then(images => {
        fetchImages(images);
      });
    }
  });
}

// observer.observe(refs.sentinel);

// function clearImagesGallery() {
//   refs.markup.innerHTML = '';
// }

function fetchImages(images) {
  renderImages(images);
}

function renderImages(item) {
  refs.markup.insertAdjacentHTML('beforeend', imagesTpl(item));
}
