import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const formEl = document.querySelector('.form');

// Перевірка наявності форми
if (!formEl) {
  console.error(
    'Form element not found! Make sure you have form with class "form"'
  );
}

// Налаштування iziToast
iziToast.settings({
  timeout: 5000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});

formEl?.addEventListener('submit', async event => {
  event.preventDefault();

  const searchInput = formEl.elements['search-text'];

  // Перевірка наявності поля вводу
  if (!searchInput) {
    console.error(
      'Search input not found! Make sure input has name="search-text"'
    );
    return;
  }

  const query = searchInput.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Search input must not be empty!',
      position: 'topRight',
    });
    return;
  }

  // Очищення галереї та показ лоадера
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'No Results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      createGallery(data.hits);

      // успішне повідомлення
      iziToast.success({
        title: 'Success',
        message: `Found ${data.totalHits} images`,
        position: 'topRight',
      });
    }
  } catch (error) {
    console.error('Search error:', error);

    iziToast.error({
      title: 'Error',
      message: `Something went wrong: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    formEl.reset();
  }
});

// функція для плавного скролу
export function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
