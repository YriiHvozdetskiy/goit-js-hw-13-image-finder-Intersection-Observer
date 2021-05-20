import { refs } from './get-refs';
import imagesTpl from '../templetes/card.hbs';
import ApiService from './apiService';
import { instance } from './components/basicLightbox';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/PNotify.css';

const myError = error;

refs.input.addEventListener('submit', onSearch);
refs.markup.addEventListener('click', onMarkup);

const apiServiceImages = new ApiService();

function onMarkup(e) {
  if (e.target.classList.contains('photo-image')) {
    instance.show();
    const largeImage = document.querySelector('.large-image');
    largeImage.src = e.target.dataset.source;
  }
}

function onSearch(e) {
  e.preventDefault();
  apiServiceImages.query = e.currentTarget.elements.query.value;
  apiServiceImages.resetPage();
  observer.observe(refs.sentinel);

  apiServiceImages.fetchImage().then(images => {
    if (images.length === 0 || apiServiceImages.searchQuery === '') {
      return myError({
        text: 'Your search did not match any pictures. Please enter a more specific query!',
        delay: 3500,
      });
    }
    clearImagesGallery();
    fetchImages(images);
  });

  e.currentTarget.reset();
}

const options = {
  rootMargin: '200px',
};

const observer = new IntersectionObserver(onEntry, options);

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && apiServiceImages.query !== '') {
      apiServiceImages.fetchImage().then(images => {
        fetchImages(images);
      });
    }
  });
}

observer.observe(refs.sentinel);

function fetchImages(images) {
  renderImages(images);
}

function clearImagesGallery() {
  refs.markup.innerHTML = '';
}

function renderImages(item) {
  refs.markup.insertAdjacentHTML('beforeend', imagesTpl(item));
}
