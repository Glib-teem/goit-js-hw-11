import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');

// Перевірка наявності елементів
if (!galleryEl) {
  console.error(
    'Gallery element not found! Make sure you have element with class "gallery"'
  );
}

if (!loaderEl) {
  console.error(
    'Loader element not found! Make sure you have element with class "loader"'
  );
}

// Ініціалізую SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  if (!Array.isArray(images) || images.length === 0) {
    console.warn('No images to display');
    return;
  }

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" class="gallery-image" loading="lazy">
        </a>
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${likes}</p>
          <p class="info-item"><b>Views:</b> ${views}</p>
          <p class="info-item"><b>Comments:</b> ${comments}</p>
          <p class="info-item"><b>Downloads:</b> ${downloads}</p>
        </div>
      </li>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh(); // Оновлюю SimpleLightbox
}

export function clearGallery() {
  if (galleryEl) {
    galleryEl.innerHTML = '';
  }
}

export function showLoader() {
  if (loaderEl) {
    loaderEl.classList.remove('is-hidden');
  }
}

export function hideLoader() {
  if (loaderEl) {
    loaderEl.classList.add('is-hidden');
  }
}
