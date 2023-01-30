
const now = new Date().toLocaleDateString();

let header = document.getElementById('header')
header.classList.add('d-flex')
let headerDate = document.createElement('div')
headerDate.classList.add('fs-3', 'header__top1')
header.append(headerDate)
headerDate.textContent = now

const studentsList = [
  {
    surName: 'Чугуенко',
    name: 'Василий',
    midlName: 'Алибабаевич',
    dateOfBirth: new Date(1990,04,02).toLocaleDateString(),
    dateReceipt: new Date(2012,08,01).getFullYear(),
    facultet: 'Бизнеса и права',
  },
  {
    surName: 'Воробьев',
    name: 'Дмитрий',
    midlName: 'Александрович',
    dateOfBirth: new Date(2001,01,12).toLocaleDateString(),
    dateReceipt: new Date(2018,08,01).getFullYear(),
    facultet: 'Бухгалтерского учета',
  },
  {
    surName: 'Новиков',
    name: 'Семен',
    midlName: 'Семенович',
    dateOfBirth: new Date(2003,7,4).toLocaleDateString(),
    dateReceipt: new Date(2014,08,01).getFullYear(),
    facultet: 'Экономичесский',
  },
  {
    surName: 'Смирнова',
    name: 'Василиса',
    midlName: 'Федоровна',
    dateOfBirth: new Date(1998,10,11).toLocaleDateString(),
    dateReceipt: new Date(2019,08,01).getFullYear(),
    facultet: 'Землеустраительный',
  },
  {
    surName: 'Зайцев',
    name: 'Сергей',
    midlName: 'Сергеевич',
    dateOfBirth: new Date(1977,03,2).toLocaleDateString(),
    dateReceipt: new Date(2020,08,01).getFullYear(),
    facultet: 'Агротехнологичесский',
  }
]

let sortColumnFlag = 'fio',
    sortDirFlag = true,
    copyStudentsList;

// создаю и нахожу элементы дом дерева
const container = document.getElementById('container'),
  bodyForm = document.getElementById('bodyForm'),
  $addForm = document.getElementById('addForm'),
  body = document.createElement('div');

const filterForm = document.getElementById('filterForm'),
  filterFio = document.getElementById('filterFio'),
  filterFacultet = document.getElementById('filterFacultet'),
  filterDateOfBirth = document.getElementById('filterDateOfBirth'),
  filterDateRecept = document.getElementById('filterDateRecept');

body.classList.add('study__body')
body.setAttribute('id', 'bodyForm')

//создаю одного пользователя
function createUser(oneUser) {

  const form = document.createElement('div'),
    formFullName = document.createElement('div'),
    formFaculet = document.createElement('div'),
    formDateOfBirth = document.createElement('div'),
    formDateReceipt = document.createElement('div');

  form.classList.add('d-flex', 'student__form', 'justify-content-between', 'align-content-center')
  form.setAttribute('id', 'form')
  formFullName.classList.add('student__form-item')
  formFaculet.classList.add('student__form-item')
  formDateOfBirth.classList.add('student__form-item')
  formDateReceipt.classList.add('student__form-item')

  formFullName.textContent = oneUser.fio
  formFaculet.textContent = oneUser.facultet
  formDateOfBirth.textContent = oneUser.birthFull
  if (oneUser.course > 4) {
    formDateReceipt.textContent = oneUser.dateReceipt + ' - ' + (oneUser.dateReceipt + 4) + '  ' + '(Закончил)'
  } else {
    formDateReceipt.textContent = oneUser.dateReceipt + ' - ' + (oneUser.dateReceipt + 4) + ' - ' + (oneUser.course) + ' (курс)'
  }

  container.append(body)
  body.append(form)
  form.append(formFullName)
  form.append(formFaculet)
  form.append(formDateOfBirth)
  form.append(formDateReceipt)

  return form
}

//фильтрация
function filter(arr, prop, value) {
  return arr.filter(function(oneUser) {
      if (oneUser[prop].includes(value.trim())) return true
  });
}

function addStudiesTable(arrData) {
  body.innerHTML = '';
  copyStudentsList = [...arrData]

  //подготовка
  for (const oneUser of copyStudentsList) {
    oneUser.fio = oneUser.surName + ' ' + oneUser.name + ' ' + oneUser.midlName
    oneUser.age = ((new Date().getTime() - new Date(oneUser.dateOfBirth)) / (24 * 3600 * 365.25 * 1000)) | 0
    oneUser.birthFull = (oneUser.dateOfBirth) + ' - ' + (oneUser.age) + ' лет/год(а)'
    oneUser.course = new Date().getFullYear() - new Date(oneUser.dateReceipt) | 0
  }

  // сортировка
  copyStudentsList = copyStudentsList.sort(function(a, b) {
    let sort = a[sortColumnFlag] < b[sortColumnFlag]
    if (sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag]
    if (sort) return -1
  })

  // фильтрация
  if (filterFio.value.trim() !== '') {
    copyStudentsList = copyStudentsList.filter(function(oneUser) {
      if (oneUser.fio.includes(filterFio.value.trim())) return true
    })
  };

  if (filterFacultet.value.trim() !== '') {
    copyStudentsList = copyStudentsList.filter(function(oneUser) {
      if (oneUser.facultet.includes(filterFacultet.value.trim())) return true
    })
  };

  if (filterDateOfBirth.value.trim() !== '') {
    copyStudentsList = copyStudentsList.filter(function(oneUser) {
      if (oneUser.dateOfBirth.includes(filterDateOfBirth.value.trim())) return true
    })
  };

  if (filterDateRecept.value.trim() !== '') {
    copyStudentsList = copyStudentsList.filter(function(oneUser) {
      if (oneUser.dateReceipt.includes(filterDateRecept.value.trim())) return true
    })
  };

  for (const oneUser of copyStudentsList) {
    const newTr = createUser(oneUser)
    body.append(newTr)
  }
}
addStudiesTable(studentsList)

// добавляем нового пользователя в таблицу студентов
$addForm.addEventListener('submit', function(e) {
  e.preventDefault()

  const $addSurName = document.getElementById('addSurName'),
        $addName = document.getElementById('addName'),
        $addMidlName = document.getElementById('addMidlName'),
        $addFacultet = document.getElementById('addFacultet'),
        $addDateOfBirth = document.getElementById('addDateOfBirth'),
        $addYear = document.getElementById('addYear');

  studentsList.push(
  {
    surName: $addSurName.value.trim(),
    name: $addName.value.trim(),
    midlName: $addMidlName.value.trim(),
    dateOfBirth: $addDateOfBirth.value,
    dateReceipt: parseInt($addYear.value),
    facultet: $addFacultet.value
  })

  addStudiesTable(studentsList)

  $addSurName.value = '';
  $addName.value = '';
  $addMidlName.value = '';
  $addDateOfBirth.value = '';
  $addYear.value = '';
  $addFacultet.value = '';
})

// сортировка массива по клику
const navFio = document.getElementById('navFio'),
      navFacultet = document.getElementById('navFacultet'),
      navDateOfBirth = document.getElementById('navDateOfBirth'),
      navYearRecept = document.getElementById('navYearRecept');

navFio.addEventListener('click', function() {
  sortColumnFlag = 'fio'
  sortDirFlag = !sortDirFlag
  addStudiesTable(studentsList)
})

navFacultet.addEventListener('click', function() {
  sortColumnFlag = 'facultet'
  sortDirFlag = !sortDirFlag
  addStudiesTable(studentsList)
})

navDateOfBirth.addEventListener('click', function() {
  sortColumnFlag = 'age'
  sortDirFlag = !sortDirFlag
  addStudiesTable(studentsList)
})

navYearRecept.addEventListener('click', function() {
  sortColumnFlag = 'dateReceipt'
  sortDirFlag = !sortDirFlag
  addStudiesTable(studentsList)
})

// обработчик на форму фильтрации
filterForm.addEventListener('submit', function(e) {
  e.preventDefault()
})

filterFio.addEventListener('input', function() {
  addStudiesTable(studentsList)
})

filterFacultet.addEventListener('input', function() {
  addStudiesTable(studentsList)
})

filterDateOfBirth.addEventListener('input', function() {
  addStudiesTable(studentsList)
})

filterDateRecept.addEventListener('input', function() {
  addStudiesTable(studentsList)
})

//очистка формы фильтрации (кнопка)
const filterFormBtn = document.getElementById('filterFormBtn')
filterFormBtn.addEventListener('click', function() {
  filterFio.value = ''
  filterFacultet.value = ''
  filterDateOfBirth.value = ''
  filterDateRecept.value = ''

  addStudiesTable(studentsList)
})
