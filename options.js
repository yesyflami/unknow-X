const nameInput = document.getElementById('name');
const idInput = document.getElementById('id');
const status = document.getElementById('status');
const languageButton = document.getElementById('language');

const text = {
  zh: { title: 'unknow-X 设置', intro: '设置后，X 左下角只会显示这里填写的自定义内容。留空即可隐藏对应文字；头像和账号切换功能会保留。', nameLabel: '自定义昵称', idLabel: '自定义 ID', namePlaceholder: '例如：工作账号', idPlaceholder: '例如：@company', save: '保存设置', saved: '已保存', switchTo: 'English' },
  en: { title: 'unknow-X Settings', intro: 'X will show only the custom values entered here. Leave a field empty to hide that line; the avatar and account switcher remain usable.', nameLabel: 'Custom nickname', idLabel: 'Custom ID', namePlaceholder: 'For example: Work account', idPlaceholder: 'For example: @company', save: 'Save settings', saved: 'Saved', switchTo: '中文' }
};
let language = 'zh';

function renderLanguage() {
  const t = text[language];
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.title = t.title;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t[el.dataset.i18n]; });
  nameInput.placeholder = t.namePlaceholder;
  idInput.placeholder = t.idPlaceholder;
  languageButton.textContent = t.switchTo;
  if (status.textContent) status.textContent = t.saved;
}

chrome.storage.sync.get({ name: '', id: '' }, (saved) => {
  nameInput.value = saved.name;
  idInput.value = saved.id;
});

languageButton.addEventListener('click', () => {
  language = language === 'zh' ? 'en' : 'zh';
  renderLanguage();
});

document.getElementById('save').addEventListener('click', () => {
  chrome.storage.sync.set({ name: nameInput.value.trim(), id: idInput.value.trim() }, () => {
    status.textContent = text[language].saved;
    setTimeout(() => { status.textContent = ''; }, 1800);
  });
});

renderLanguage();
