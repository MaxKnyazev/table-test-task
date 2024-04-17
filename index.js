document.addEventListener('DOMContentLoaded', () => {
  const log = console.log;
  log('DOMContentLoaded');
  
  const h1 = document.getElementById('h1');
  log(h1);

  const content = document.querySelector('.content');
  const itemsPerPage = 1;
  let currentPage = 0;
  const items = Array.from(content.getElementsByTagName('tr')).slice(1);

  const firstDotsSpan = document.createElement('span');
  firstDotsSpan.classList.add('pagination__span');
  firstDotsSpan.textContent = '...';

  const lastDotsSpan = document.createElement('span');
  lastDotsSpan.classList.add('pagination__span');
  lastDotsSpan.textContent = '...';

  const showPage = page => {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    items.forEach((item, index) => {
      item.classList.toggle('hidden', index < startIndex || index >= endIndex);
    });
    updateActiveButtonStates();
  }
  

  // const createPageButtons = () => {
  //   const totalPages = Math.ceil(items.length / itemsPerPage);
  //   const paginationContainer = document.createElement('div');
  //   const paginationDiv = document.body.appendChild(paginationContainer);
  //   paginationContainer.classList.add('pagination');

  //   const buttonPrev = document.createElement('button');
  //   buttonPrev.classList.add('pagination__button');
  //   buttonPrev.textContent = '<';
  //   buttonPrev.addEventListener('click', () => {
  //     if (currentPage) {
  //       currentPage = currentPage - 1;
  //       showPage(currentPage);
  //       updateActiveButtonStates();
  //     }
  //   });
  //   content.appendChild(paginationContainer);
  //   paginationDiv.appendChild(buttonPrev);

  //   for (let i = 0; i < totalPages; i++) {
  //     const pageButton = document.createElement('button');
  //     pageButton.classList.add('pagination__button');
  //     pageButton.textContent = i + 1;
  //     pageButton.addEventListener('click', () => {
  //       currentPage = i;
  //       showPage(currentPage);
  //       updateActiveButtonStates();
  //     });
  
  //       content.appendChild(paginationContainer);
  //       paginationDiv.appendChild(pageButton);
  //   }

  //   const buttonNext = document.createElement('button');
  //   buttonNext.classList.add('pagination__button');
  //   buttonNext.textContent = '>';
  //   buttonNext.addEventListener('click', () => {
  //     if (currentPage < totalPages - 1) {
  //       currentPage = currentPage + 1;
  //       showPage(currentPage);
  //       updateActiveButtonStates();
  //     }
  //   });
  //   content.appendChild(paginationContainer);
  //   paginationDiv.appendChild(buttonNext);
  // }

  const createPageButton = (text, styles, clickHandler) => {
    const pageButton = document.createElement('button');
    pageButton.classList.add(styles);
    pageButton.textContent = text;
    pageButton.addEventListener('click', clickHandler);
    return pageButton;
  }

  const defaultPageButtonHandler = (pos, pagination) => {
    pagination.remove();
    currentPage = pos;
    showPage(currentPage);
    displayPageButtons();
    updateActiveButtonStates();
  };










  const displayPageButtons = () => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const paginationContainer = document.createElement('div');
    const paginationDiv = document.body.appendChild(paginationContainer);
    paginationContainer.classList.add('pagination');

    const buttonPrev = createPageButton('<', 'pagination__button', () => {
      if (currentPage) {
        paginationContainer.remove()
        currentPage = currentPage - 1;
        showPage(currentPage);
        displayPageButtons();
        updateActiveButtonStates();
      }
    });
    paginationDiv.appendChild(buttonPrev);

    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i++) {
        const pageButton = createPageButton(`${i + 1}`, 'pagination__button', () => defaultPageButtonHandler(i, paginationContainer));
        paginationDiv.appendChild(pageButton);
      }
    } else {
      const firstPageButton = createPageButton(1, 'pagination__button', () => defaultPageButtonHandler(0, paginationContainer));
      const lastPageButton = createPageButton(totalPages, 'pagination__button', () => defaultPageButtonHandler(totalPages - 1, paginationContainer));
      switch (currentPage) {
        case 0:
        case 1:
        case 2: 
          for (let i = 0; i <= 4; i++) {
            const pageButton = createPageButton(`${i + 1}`, 'pagination__button', () => defaultPageButtonHandler(i, paginationContainer));
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
            const pageButton = createPageButton(`${i + 1}`, 'pagination__button', () => defaultPageButtonHandler(i, paginationContainer));
            paginationDiv.appendChild(pageButton);
          }
          break;

        default:
          paginationDiv.appendChild(firstPageButton);
          paginationDiv.appendChild(firstDotsSpan);
          for (let i = currentPage - 1; i < currentPage + 2; i++) {
            const pageButton = createPageButton(`${i + 1}`, 'pagination__button', () => defaultPageButtonHandler(i, paginationContainer));
            paginationDiv.appendChild(pageButton);
          }
          paginationDiv.appendChild(lastDotsSpan);
          paginationDiv.appendChild(lastPageButton);
          break;
      }
    }

    const buttonNext = createPageButton('>', 'pagination__button', () => {
      if (currentPage < totalPages - 1) {
        paginationContainer.remove();
        currentPage = currentPage + 1;
        showPage(currentPage);
        displayPageButtons();
        updateActiveButtonStates();
      }
    });
    paginationDiv.appendChild(buttonNext);
  }








  
  const updateActiveButtonStates = () => {
    const pageButtons = Array.from(document.querySelectorAll('.pagination__button')).slice(1, -1);
    pageButtons.forEach((button, index) => {
      if (+button.textContent - 1 === currentPage) {
        button.classList.add('pagination__button--active');
      } else {
        button.classList.remove('pagination__button--active');
      }
    });
  }

  displayPageButtons();
  showPage(currentPage);
});