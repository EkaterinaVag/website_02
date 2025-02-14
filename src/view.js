const render = (state) => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  if (state.errors !== '') {
    const p = document.createElement('p');
    p.textContent = state.errors;
    main.append(p);
    return;
  }

  if (state.products.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'По вашему запросу товаров не найдено';
    main.append(p);
    return;
  }

  main.classList.remove('main');

  const searchSection = document.createElement('section');
  searchSection.classList.add('search-results');
  searchSection.ariaLabelledby = 'search-results-heading';

  const searchTitle = document.createElement('h2');
  searchTitle.classList.add('search-results__title');
  searchTitle.id = 'search-results-heading';
  searchTitle.textContent = 'Результаты поиска';

  const cardList = document.createElement('div');
  cardList.classList.add('card-list');

  searchSection.append(searchTitle);
  searchSection.append(cardList);

  main.append(searchSection);

  state.products.forEach((product) => {
    const { title, image, price, hasSale, detailsUrl, id } = product;

    const card = document.createElement('article');
    card.classList.add('card-list__card');
    card.id = id;

    const cardPrice = document.createElement('div');
    if (hasSale) {
      cardPrice.classList.add('card-list__card-price-sale');
      cardPrice.style.setProperty('--original-price', `"${price.original} ₽"`);
    }
    cardPrice.classList.add('card-list__card-price');
    cardPrice.textContent = hasSale
      ? `${price.discounted} ₽`
      : `${price.original} ₽`;

    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-list__card-title');
    cardTitle.textContent = title;

    const cardImgContainer = document.createElement('div');
    cardImgContainer.classList.add('card-list__card-image-container');

    const cardImg = document.createElement('img');
    cardImg.classList.add('card-list__card-image');
    cardImg.src = image;
    cardImg.alt = title;

    cardImgContainer.append(cardImg);

    if (state.uiState.activeProductId === id) {
      const info = document.createElement('div');
      info.classList.add('card-list__info');

      const infoButton = document.createElement('a');
      infoButton.classList.add('card-list__info-button');
      infoButton.textContent = 'Подробнее';
      infoButton.href = detailsUrl;

      info.append(infoButton);
      cardImgContainer.append(info);
    }

    card.append(cardPrice);
    card.append(cardTitle);
    card.append(cardImgContainer);

    if (hasSale) {
      const cardSale = document.createElement('div');
      cardSale.classList.add('card-list__sale');
      cardSale.textContent = 'Акция';
      card.append(cardSale);
    }

    cardList.append(card);
  });
};

export default render;
