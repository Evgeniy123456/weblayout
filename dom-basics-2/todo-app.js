(function() {

  //создаем пустой массив в который будет записываться значения из инпута
  let listArray = [],
      listName = '';

  //создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }
  // создаем и возвращаем форму для создания дел
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = "Введите название нового дела";
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('id', 'buttonId');
    button.disabled = true;
    button.textContent = 'Добавить дело';
    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    // создаем переменную кнопки создания нового дела по Id
    let buttonId = document.getElementById('buttonId');
    // создаем событие для активации кнопки при активном input
    input.addEventListener('input', () => {
     if (input.value !== "") {
       button.disabled = false;
      } else {
        button.disabled = true;
      }
    });

    return {
      form,
      input,
      button
    };
  }

  // создаем и возвращаем список элементов ul
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  // создаем и возвращаем элементы списка li, div, button, button
  function createTodoItem(obj) {
    // создаем элемент списка
    let item = document.createElement('li');
    // кнопки помещаем в элемент, который красим покажет их в одной  группе
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    // устанавливаем стили для элемента списка, а также для размещения кнопок
    // в его правой части с помощью флекс
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = obj.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success')
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger')
    deleteButton.textContent = 'Удалить';

    if (obj.done == true) item.classList.add('list-group-item-success')

     // добавляем обработчик на кнопки
      doneButton.addEventListener('click', function() {
      item.classList.toggle('list-group-item-success');
      for (const listItem of listArray) {
        if (listItem.id == obj.id) listItem.done = !listItem.done
      }
      saveList(listArray, listName)
    });

    deleteButton.addEventListener('click', function() {
      if (confirm('Вы уверены?')) {
        item.remove();
        for (let i = 0; i < listArray.length; i++) {
          if (listArray[i].id == obj.id) listArray.splice(i, 1)
        }
        saveList(listArray, listName)
      }
    });

    // вкладываем кнопки в отдельный элемент, что бы они объединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // приложению нужен доступ к самому элементу и кнопкам, что бы обрабатывать события нажатия
    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  function getNewId(arr) {
    let max = 0;
      for (const item of arr) {
        if (item.id > max) max =item.id
      }
      return max + 1;
  }

  function saveList(arr, keyName) {
    localStorage.setItem(keyName, JSON.stringify(arr));
  }

  // создаем всё приложение
  function createTodoApp(container, title = 'Список дел', keyName) {
    // создаем переменные с функциями
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    listName = keyName;

    // добавляем переменнные в контейнер в дом дерево
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    let localData = localStorage.getItem(listName);
      if (localData !== null && localData !== '') listArray = JSON.parse(localData)

      for(const itemList of listArray) {
        let todoItem = createTodoItem(itemList);
        todoList.append(todoItem.item);
      }

    // браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
    todoItemForm.form.addEventListener('submit', async e => {
      // эта строчка необходима, что предотвратить стандартное действие браузера
      // в данном случае мы не хотим что бы страница перезагружалась при отправке формы
      e.preventDefault();

      // игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }

      const response = await fetch('http://localhost:3000/api/todos', {
        mathod: 'POST',
        body: JSON.stringify({
          name: todoItemForm.input.value.trim(),
          owner: 'Cидоров',
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const todoItem = await response.json();

      let newItem = {
        id: getNewId(listArray),
        name: todoItemForm.input.value,
        done: false,
      }

      let todoItemElement = createTodoItem(todoItem.name);

      listArray.push(newItem)
      // console.log(listArray)
      saveList(listArray, listName);

      // создаем и добавляем в список новое дело с названием из поля для ввода
      todoList.append(todoItemElement.item);

      // деактивируем кнопку после создания нового дела
      todoItemForm.button.disabled = true;

      // обнуляем значение в поле, что бы не прищлось стирать его в ручную
      todoItemForm.input.value = '';
    })

  }
  window.createTodoApp = createTodoApp;

})();
