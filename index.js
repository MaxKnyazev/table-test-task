document.addEventListener('DOMContentLoaded', async() => {
  // console.log('DOMContentLoaded');

  //================================================================================ CONSTANS
  const LIMIT = 100;
  const SELECT = 'username,age,gender,email,phone,address';
  const URL_FAKE_API = `https://dummyjson.com/users?limit=${LIMIT}&select=${SELECT}`;
  let users = [];
  let table = document.getElementById('table');
  let tableBody = document.getElementById('table__body');
  // console.log(tableBody);
  let pageState = 0;



  //================================================================================ FUNCTIONS
  //------------------------------------------------------------------ log
  const log = console.log;

  //------------------------------------------------------------------ generateTableRow
  const generateTableRow = (user) => {
    // username,gender,email,phone,city, status (age <= 30)
    const tableRow = document.createElement('tr');
    const username = document.createElement('td');
    username.textContent = user.username;
    tableRow.appendChild(username);
    const gender = document.createElement('td');
    gender.textContent = user.gender;
    tableRow.appendChild(gender);
    const email = document.createElement('td');
    email.textContent = user.email;
    tableRow.appendChild(email);
    const phone = document.createElement('td');
    phone.textContent = user.phone;
    tableRow.appendChild(phone);
    const city = document.createElement('td');
    city.textContent = user.address.city;
    tableRow.appendChild(city);
    const status = document.createElement('td');
    status.textContent = user.age <= 30 ? 'Active' : 'Inactive';
    tableRow.appendChild(status);
    return tableRow;
  }

  //------------------------------------------------------------------ renderTablePage
  const renderTablePage = (arr, firstIndex, lastIndex) => {
    tableBody.remove();
    tableBody = document.createElement('tbody');

    for (let i = firstIndex; i <= lastIndex; i++) {
      tableBody.appendChild(generateTableRow(arr[i]))
    }
    log(tableBody)
    table.appendChild(tableBody)
  }



  //-------------------------------------------------------------------------- MAIN
  try {
    let response = await fetch(URL_FAKE_API);
    // если HTTP-статус в диапазоне 200-299
    if (response.ok) { 
      // получаем тело ответа (см. про этот метод ниже)
      result = await response.json();
      users = result.users;
    } else {
      log("Ошибка HTTP: " + response.status);
    }
  } catch (error) {
    log('ERROR: ', error)
  }

  log('users = ',users)

//******************************************  Проверка рендера постранично  */
  renderTablePage(users, pageState * 10, pageState * 10 + 9);
  setTimeout(() => {pageState = 1;renderTablePage(users, pageState * 10, pageState * 10 + 9)}, 2000)
  setTimeout(() => {pageState = 2;renderTablePage(users, pageState * 10, pageState * 10 + 9)}, 4000)
  setTimeout(() => {pageState = 3;renderTablePage(users, pageState * 10, pageState * 10 + 9)}, 6000)

  });
