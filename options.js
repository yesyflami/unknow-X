const nameInput = document.getElementById('name');
const idInput = document.getElementById('id');
const status = document.getElementById('status');

chrome.storage.sync.get({ name: '', id: '' }, (saved) => {
  nameInput.value = saved.name;
  idInput.value = saved.id;
});

document.getElementById('save').addEventListener('click', () => {
  chrome.storage.sync.set({ name: nameInput.value.trim(), id: idInput.value.trim() }, () => {
    status.textContent = '已保存';
    setTimeout(() => { status.textContent = ''; }, 1800);
  });
});
