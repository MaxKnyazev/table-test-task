document.addEventListener('DOMContentLoaded', async() => {
  // console.log('DOMContentLoaded');

  //================================================================================ CONSTANS
  const LIMIT = 100;
  const SELECT = 'username,age,gender,email,phone,address';
  const URL_FAKE_API = `https://dummyjson.com/users?limit=${LIMIT}&select=${SELECT}`;
  let users = [];
  const tableBody = document.getElementById('table__body');
  // console.log(tableBody);
  let pageState = 1;



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
    for (let i = firstIndex; i <= lastIndex; i++) {
      tableBody.appendChild(generateTableRow(arr[i]))
    }
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

  renderTablePage(users, pageState - 1, pageState + 8);

  pageState = 2;
  setTimeout(() => {renderTablePage(users, pageState - 1, pageState + 8);}, 2000)

  });




  /**
   * 
   * 
   * https://dummyjson.com/users?limit=100&select=username,age,gender,email,phone,address
   * 
   * 
   * // 20240416182612
  // https://dummyjson.com/users
  
  {
    "users": [
      {
        "id": 1,
        "firstName": "Terry",
        "lastName": "Medhurst",
        "maidenName": "Smitham",
        "age": 50,
        "gender": "male",
        "email": "atuny0@sohu.com",
        "phone": "+63 791 675 8914",
        "username": "atuny0",
        "password": "9uQFF1Lh",
        "birthDate": "2000-12-25",
        "image": "https://robohash.org/Terry.png?set=set4",
        "bloodGroup": "A-",
        "height": 189,
        "weight": 75.4,
        "eyeColor": "Green",
        "hair": {
          "color": "Black",
          "type": "Strands"
        },
        "domain": "slashdot.org",
        "ip": "117.29.86.254",
        "address": {
          "address": "1745 T Street Southeast",
          "city": "Washington",
          "coordinates": {
            "lat": 38.867033,
            "lng": -76.979235
          },
          "postalCode": "20020",
          "state": "DC"
        },
        "macAddress": "13:69:BA:56:A3:74",
        "university": "Capitol University",
        "bank": {
          "cardExpire": "06/22",
          "cardNumber": "50380955204220685",
          "cardType": "maestro",
          "currency": "Peso",
          "iban": "NO17 0695 2754 967"
        },
        "company": {
          "address": {
            "address": "629 Debbie Drive",
            "city": "Nashville",
            "coordinates": {
              "lat": 36.208114,
              "lng": -86.58621199999999
            },
            "postalCode": "37076",
            "state": "TN"
          },
          "department": "Marketing",
          "name": "Blanda-O'Keefe",
          "title": "Help Desk Operator"
        },
        "ein": "20-9487066",
        "ssn": "661-64-2976",
        "userAgent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/12.0.702.0 Safari/534.24",
        "crypto": {
          "coin": "Bitcoin",
          "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
          "network": "Ethereum (ERC20)"
        }
      },
   * 
   */
