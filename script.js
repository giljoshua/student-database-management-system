const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const genderInput = document.getElementById('gender');
const emailInput = document.getElementById('email');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');

let records = JSON.parse(localStorage.getItem('records')) || [];

function isDuplicateEmail(email) {
  return records.some(record => record.email.toLowerCase() === email.toLowerCase());
}

function displayRecords() {
  recordList.innerHTML = '';

  if (records.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="6" style="text-align:center;color:red;">No Record Found</td>';
    recordList.appendChild(row);
  } else {
    records.forEach((record, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
                <td>${record.name}</td>
                <td>${record.age}</td>
                <td>${record.gender}</td>
                <td>${record.email}</td>
                <td><button onclick="editRecord(${index})">Edit</button></td>
                <td class="deleteButton"><button onclick="deleteRecord(${index})">Delete</button></td>
            `;
      recordList.appendChild(row);
    });
  }
}

recordForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const gender = genderInput.value.trim();
  const email = emailInput.value.trim();
  const editIndex = parseInt(editIndexInput.value);

  if (name && age && email) {
    if (isDuplicateEmail(email) && editIndex === -1) {
      alert('A student with this email already exists.');
      return;
    }

    if (editIndex === -1) {
      records.push({ name, age, gender, email });
    } else {
      records[editIndex] = { name, age, gender, email };
      editIndexInput.value = -1;
    }

    localStorage.setItem('records', JSON.stringify(records));
    nameInput.value = '';
    ageInput.value = '';
    genderInput.value = '';
    emailInput.value = '';
    editIndexInput.value = -1;
    displayRecords();
  } else {
    alert('Please fill out all required fields.');
  }
});

function editRecord(index) {
  const recordToEdit = records[index];
  nameInput.value = recordToEdit.name;
  ageInput.value = recordToEdit.age;
  genderInput.value = recordToEdit.gender;
  emailInput.value = recordToEdit.email;
  editIndexInput.value = index;
}

function deleteRecord(index) {
  displayRecords();
  let delBtns = document.querySelectorAll('.deleteButton');

  delBtns[index].innerHTML = `
        <i id="yesBtn" onclick="confirmDelete(${index})" class="fa-solid fa-check"></i>
        <i id="noBtn" onclick="resetDelete(${index})" class="fa-solid fa-xmark"></i>
    `;
}

function confirmDelete(index) {
  records.splice(index, 1);
  localStorage.setItem('records', JSON.stringify(records));
  displayRecords();
}

function resetDelete() {
  displayRecords();
}


displayRecords();