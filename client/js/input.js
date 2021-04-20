/**
* Hide/Show items according to the number of selected entries
*/
function toggleItemsVisibility(smartTable) {
  const editBtn = document.getElementById('editBtn');
  const deleteBtn = document.getElementById('deleteBtn');

  const numChecked = smartTable.selectedCheckboxes.length;

  if (numChecked === 1) {
    editBtn.style.display = 'inline-block';
    deleteBtn.style.display = 'inline-block';
  } else if (numChecked > 1) {
    editBtn.style.display = 'none';
    deleteBtn.style.display = 'inline-block';
  } else {
    editBtn.style.display = 'none';
    deleteBtn.style.display = 'none';
  }
}

function editEntry() {
  const id = stockTable.selectedCheckboxes[0].id.toString();

  const selectedEntry = stockTable.values.find((entry) => entry[0].toString() === id);

  document.getElementById('UPDID').value = id;
  document.getElementById('UPDDAY').value = selectedEntry[1];
  document.getElementById('UPDINCOME').value = selectedEntry[2];
  document.getElementById('UPDOUTCOME').value = selectedEntry[3];

  viewSwitcher('edit-product-view');
}

const editBtn = document.getElementById('editBtn');
editBtn.addEventListener('click', editEntry);


document.getElementById('deleteBtn').addEventListener('click', () => {
  removeEntries();
});

document.getElementById('addBtn').addEventListener('click', () => {
  viewSwitcher('submit-new-product-view');
});