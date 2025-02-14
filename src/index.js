import render from './render.js';

const state = {
  products: [],
  errors: '',
  uiState: {
    activeProductId: '',
  },
};

document.addEventListener('mouseover', (e) => {
  const imgContainer = e.target.closest('.card-list__card-image-container');
  if (imgContainer) {
    state.uiState.activeProductId = imgContainer.parentElement.id;
    render(state);
  }
});

document.addEventListener('mouseout', (e) => {
  const imgContainer = e.target.closest('.card-list__card-image-container');
  if (imgContainer) {
    state.uiState.activeProductId = '';
    render(state);
  }
});

const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(searchForm);
  const searchValue = formData.get('query');

  const url = 'data.json';
  const fetchData = async (value) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        state.errors = 'Ошибка при загрузке данных';
        render(state);
        return;
      }

      const data = await response.json();
      const products = data.products;
      const findedProducts = products.filter(
        (product) => product.category.toLowerCase() === value.toLowerCase()
      );
      state.products = [...findedProducts];
      state.errors = '';
      render(state);
    } catch (error) {
      state.errors =
        'Произошла непредвиденная ошибка. Попробуйте обновить страницу';
      render(state);
    }
  };
  fetchData(searchValue);
});
