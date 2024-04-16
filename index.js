document.addEventListener('DOMContentLoaded', () => {
  const log = console.log;
  log('DOMContentLoaded');
  
  const tableBody = document.getElementById('table__body');
  log(tableBody);

  const generateTableRow = () => {
    // Создаем строку таблицы
    const tableRow = document.createElement('tr');

    // Создаем 5 ячеек таблицы и добавляем их в строку
    for (let i = 0; i < 5; i++) {
      const cell = document.createElement('td');
      cell.textContent = `content-${i}`;
      tableRow.appendChild(cell);
    }

    // Возвращаем строку таблицы
    return tableRow;
  }

  // Вызываем функцию и выводим результат в консоль
  console.log(generateTableRow());
  tableBody.appendChild(generateTableRow())




});