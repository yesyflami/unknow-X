const nameInput = document.getElementById('name');
const idInput = document.getElementById('id');
const status = document.getElementById('status');
const languageButton = document.getElementById('language');
const avatarInput = document.getElementById('avatar');
const avatarPreview = document.getElementById('avatarPreview');
const removeAvatarButton = document.getElementById('removeAvatar');
const saveButton = document.getElementById('save');

const text = {
  zh: { title: 'unknow-X 设置', intro: '设置后，X 左下角只会显示这里填写的自定义内容。留空即可隐藏对应文字；头像和账号切换功能会保留。', avatarLabel: '自定义头像', removeAvatar: '移除自定义头像', nameLabel: '自定义昵称', idLabel: '自定义 ID', namePlaceholder: '例如：工作账号', idPlaceholder: '例如：@company', save: '保存设置', saved: '已保存', saveError: '保存失败，请重试', imageError: '无法读取这张图片', imageTooLarge: '图片请小于 2 MB', switchTo: 'English' },
  en: { title: 'unknow-X Settings', intro: 'X will show only the custom values entered here. Leave a field empty to hide that line; the avatar and account switcher remain usable.', avatarLabel: 'Custom avatar', removeAvatar: 'Remove custom avatar', nameLabel: 'Custom nickname', idLabel: 'Custom ID', namePlaceholder: 'For example: Work account', idPlaceholder: 'For example: @company', save: 'Save settings', saved: 'Saved', saveError: 'Save failed, please try again', imageError: 'Unable to read this image', imageTooLarge: 'Please use an image under 2 MB', switchTo: '中文' }
};
let language = 'zh';
let pendingAvatar = '';

function normalizeId(value) {
  const id = String(value || '').trim();
  return id && !id.startsWith('@') ? `@${id}` : id;
}

function setStatus(message, temporary = false) {
  status.textContent = message;
  if (temporary) setTimeout(() => { status.textContent = ''; }, 1800);
}

function renderLanguage() {
  const t = text[language];
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.title = t.title;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t[el.dataset.i18n]; });
  nameInput.placeholder = t.namePlaceholder;
  idInput.placeholder = t.idPlaceholder;
  languageButton.textContent = t.switchTo;
}

function showAvatar(dataUrl) {
  avatarPreview.src = dataUrl;
  avatarPreview.style.display = 'block';
  removeAvatarButton.style.display = 'inline-block';
}

function hideAvatar() {
  avatarPreview.removeAttribute('src');
  avatarPreview.style.display = 'none';
  removeAvatarButton.style.display = 'none';
}

function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read'));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}

async function prepareAvatar(file) {
  const source = await readImageAsDataUrl(file);
  const image = new Image();
  image.src = source;
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = () => reject(new Error('decode'));
  });
  const scale = Math.min(1, 512 / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/webp', 0.86);
}

function storageSet(area, values) {
  return new Promise((resolve, reject) => {
    chrome.storage[area].set(values, () => {
      const error = chrome.runtime.lastError;
      if (error) reject(error);
      else resolve();
    });
  });
}

chrome.storage.sync.get({ name: '', id: '' }, (saved) => {
  nameInput.value = saved.name || '';
  idInput.value = normalizeId(saved.id);
});
chrome.storage.local.get({ avatar: '' }, (saved) => {
  pendingAvatar = saved.avatar || '';
  if (pendingAvatar) showAvatar(pendingAvatar);
});

avatarInput.addEventListener('change', async () => {
  const file = avatarInput.files?.[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    setStatus(text[language].imageTooLarge);
    avatarInput.value = '';
    return;
  }
  try {
    pendingAvatar = await prepareAvatar(file);
    showAvatar(pendingAvatar);
    setStatus('');
  } catch {
    setStatus(text[language].imageError);
    avatarInput.value = '';
  }
});

removeAvatarButton.addEventListener('click', () => {
  pendingAvatar = '';
  avatarInput.value = '';
  hideAvatar();
});

languageButton.addEventListener('click', () => {
  language = language === 'zh' ? 'en' : 'zh';
  renderLanguage();
});

idInput.addEventListener('input', () => {
  if (!idInput.value || idInput.value.startsWith('@')) return;
  const cursor = idInput.selectionStart;
  idInput.value = `@${idInput.value}`;
  if (cursor !== null) idInput.setSelectionRange(cursor + 1, cursor + 1);
});

saveButton.addEventListener('click', async () => {
  saveButton.disabled = true;
  try {
    await Promise.all([
      storageSet('sync', { name: nameInput.value.trim(), id: idInput.value.trim() }),
      storageSet('local', { avatar: pendingAvatar })
    ]);
    setStatus(text[language].saved, true);
  } catch {
    setStatus(text[language].saveError);
  } finally {
    saveButton.disabled = false;
  }
});

renderLanguage();
