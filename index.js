document.addEventListener('DOMContentLoaded', async() => {
  // console.log('DOMContentLoaded');

  //================================================================================ CONSTANS
  const LIMIT = 100;
  const SELECT = 'username,age,gender,email,phone,address';
  const URL_FAKE_API = `https://dummyjson.com/users?limit=${LIMIT}&select=${SELECT}`;
  const ITEMS_PER_PAGE = 8;
  let pagination = document.querySelector('.pagination');
  let paginationButtons = document.querySelector('.pagination__buttons');
  let paginationText = document.querySelector('.pagination__text');
  let users = [];
  let filteredUsers = [];
  let table = document.getElementById('table');
  let tableBody = document.getElementById('table__body');
  let searchInput = document.getElementById('sort-and-search__form-search');
  let totalPages = 0;

  let currentPage = 0;

  const firstDotsSpan = document.createElement('span');
  firstDotsSpan.classList.add('pagination__span');
  firstDotsSpan.textContent = '...';

  const lastDotsSpan = document.createElement('span');
  lastDotsSpan.classList.add('pagination__span');
  lastDotsSpan.textContent = '...';

  //================================================================================ FUNCTIONS
  //------------------------------------------------------------------ log
  const log = console.log;

  //------------------------------------------------------------------ generateTableRow
  const generateTableRow = (user) => {
    const tableRow = document.createElement('tr');
    tableRow.classList = 'table__row';
    const username = document.createElement('td');
    username.textContent = user.username;
    username.classList = 'table__cell table__cell--body';
    tableRow.appendChild(username);
    const gender = document.createElement('td');
    gender.classList = 'table__cell table__cell--body';
    gender.textContent = user.gender;
    tableRow.appendChild(gender);
    const email = document.createElement('td');
    email.classList = 'table__cell table__cell--body';
    email.textContent = user.email;
    tableRow.appendChild(email);
    const phone = document.createElement('td');
    phone.classList = 'table__cell table__cell--body';
    phone.textContent = user.phone;
    tableRow.appendChild(phone);
    const city = document.createElement('td');
    city.classList = 'table__cell table__cell--body';
    city.textContent = user.address.city;
    tableRow.appendChild(city);
    const status = document.createElement('td');
    status.textContent = user.age <= 30 ? 'Active' : 'Inactive';
    status.classList = user.age <= 30 ? 'table__cell table__cell--active' : 'table__cell table__cell--inactive'
    tableRow.appendChild(status);
    return tableRow;
  }

  //------------------------------------------------------------------ renderTablePage
  const renderTablePage = (arr, firstIndex, lastIndex) => {
    tableBody.remove();

    tableBody = document.createElement('tbody');
    tableBody.classList = 'table__body';
    for (let i = firstIndex; i <= lastIndex; i++) {
      tableBody.appendChild(generateTableRow(arr[i]))
    }
    log(tableBody)
    table.appendChild(tableBody)
  }

  const createPageButton = (text, styles, clickHandler) => {
    const pageButton = document.createElement('button');
    pageButton.classList.add(styles);
    pageButton.textContent = text;
    pageButton.addEventListener('click', clickHandler);
    return pageButton;
  }

  const defaultPageButtonHandler = (pos) => {
    paginationButtons.remove();
    currentPage = pos;
    const firstIndex = currentPage * ITEMS_PER_PAGE;
    let lastIndex = 0;
    if (currentPage === totalPages - 1) {
      lastIndex = filteredUsers.length - 1;
    } else {
      lastIndex = firstIndex + ITEMS_PER_PAGE - 1;
    }
    paginationText.textContent = `Показаны данные с ${firstIndex + 1} по ${lastIndex + 1} из ${LIMIT} записей`;
    renderTablePage(filteredUsers, firstIndex, lastIndex);
    displayPageButtons();
  };


  //-------------------------------------------------------------------------- MAIN
  try {
    let response = await fetch(URL_FAKE_API);
    // если HTTP-статус в диапазоне 200-299
    if (response.ok) { 
      // получаем тело ответа (см. про этот метод ниже)
      result = await response.json();
      users = result.users;
      filteredUsers = [...users];
      totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
    } else {
      log("Ошибка HTTP: " + response.status);
    }
  } catch (error) {
    log('ERROR: ', error)
  }

  log('users = ',users)

  renderTablePage(filteredUsers, currentPage * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE - 1);
  paginationText.textContent = `Показаны данные с ${1} по ${ITEMS_PER_PAGE} из ${LIMIT} записей`;

  // +++ Функция для поиска данных
  const searchData = (pagination) => {
    paginationButtons.remove();
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm === '') {
      filteredUsers = [...users];
    }

    filteredUsers = users.filter(item => {
      return Object.values(item).some(value => String(value).toLowerCase().includes(searchTerm));
    });

    if (filteredUsers.length) {
      currentPage = 0;
      totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);;
      const firstIndex = currentPage * ITEMS_PER_PAGE;
      let lastIndex = 0;
      if (currentPage === totalPages - 1) {
        lastIndex = filteredUsers.length - 1;
      } else {
        lastIndex = firstIndex + ITEMS_PER_PAGE - 1;
      }
      paginationText.textContent = `Показаны данные с ${firstIndex + 1} по ${lastIndex + 1} из ${LIMIT} записей`;
      renderTablePage(filteredUsers, firstIndex, lastIndex);
      displayPageButtons();
    } else {
      tableBody.remove()
    }
  }

  searchInput.addEventListener('input', searchData);

  const displayPageButtons = () => {
    paginationButtons = document.createElement('div');
    const paginationDiv = pagination.appendChild(paginationButtons);
    paginationButtons.classList.add('pagination__buttons');

    const buttonPrev = createPageButton('<', 'pagination__button', () => {
      if (currentPage) {
        paginationButtons.remove()
        currentPage = currentPage - 1;
        const firstIndex = currentPage * ITEMS_PER_PAGE;
        let lastIndex = 0;
        if (currentPage === totalPages - 1) {
          lastIndex = filteredUsers.length - 1;
        } else {
          lastIndex = firstIndex + ITEMS_PER_PAGE - 1;
        }
        paginationText.textContent = `Показаны данные с ${firstIndex + 1} по ${lastIndex + 1} из ${LIMIT} записей`;
        renderTablePage(filteredUsers, firstIndex, lastIndex);
        displayPageButtons();
      }
    });
    paginationDiv.appendChild(buttonPrev);

    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i++) {
        const pageButton = createPageButton(`${i + 1}`, 'pagination__button', () => defaultPageButtonHandler(i, paginationButtons));
        paginationDiv.appendChild(pageButton);
      }
    } else {
      const firstPageButton = createPageButton(1, 'pagination__button', () => defaultPageButtonHandler(0, paginationButtons));
      const lastPageButton = createPageButton(totalPages, 'pagination__button', () => defaultPageButtonHandler(totalPages - 1, paginationButtons));
      switch (currentPage) {
        case 0:
        case 1:
        case 2: 
          for (let i = 0; i <= 4; i++) {
            const pageButton = createPageButton(`${i + 1}`, 'pagination__button', () => defaultPageButtonHandler(i, paginationButtons));
            paginationDiv.appendChild(pageButton);
          }
          paginationDiv.appendChild(lastDotsSpan);
          paginationDiv.appendChild(lastPageButton);
          break;

        case totalPages - 1:
        case totalPages - 2:
        case totalPages - 3:
          paginationDiv.appendChild(firstPageButton);
          paginationDiv.appendChild(firstDotsSpan);
          for (let i = totalPages - 5; i < totalPages; i++) {
            const pageButton = createPageButton(`${i + 1}`, 'pagination__button', () => defaultPageButtonHandler(i, paginationButtons));
            paginationDiv.appendChild(pageButton);
          }
          break;

        default:
          paginationDiv.appendChild(firstPageButton);
          paginationDiv.appendChild(firstDotsSpan);
          for (let i = currentPage - 1; i < currentPage + 2; i++) {
            const pageButton = createPageButton(`${i + 1}`, 'pagination__button', () => defaultPageButtonHandler(i, paginationButtons));
            paginationDiv.appendChild(pageButton);
          }
          paginationDiv.appendChild(lastDotsSpan);
          paginationDiv.appendChild(lastPageButton);
          break;
      }
    }

    const buttonNext = createPageButton('>', 'pagination__button', () => {
      if (currentPage < totalPages - 1) {
        paginationButtons.remove();
        currentPage = currentPage + 1;
        const firstIndex = currentPage * ITEMS_PER_PAGE;
        let lastIndex = 0;
        if (currentPage === totalPages - 1) {
          lastIndex = filteredUsers.length - 1;
        } else {
          lastIndex = firstIndex + ITEMS_PER_PAGE - 1;
        }
        paginationText.textContent = `Показаны данные с ${firstIndex + 1} по ${lastIndex + 1} из ${LIMIT} записей`;
        renderTablePage(filteredUsers, firstIndex, lastIndex);
        displayPageButtons();
      }
    });
    paginationDiv.appendChild(buttonNext);

    updateActiveButtonStates();
  }

  const updateActiveButtonStates = () => {
    const pageButtons = Array.from(document.querySelectorAll('.pagination__button')).slice(1, -1);
    pageButtons.forEach(button => {
      if (+button.textContent - 1 === currentPage) {
        button.classList.add('pagination__button--active');
      } else {
        button.classList.remove('pagination__button--active');
      }
    });
  }

  displayPageButtons();
});
