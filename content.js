(() => {
  const BUTTON = '[data-testid="SideNav_AccountSwitcher_Button"]';
  const MARK = 'data-unknow-x-label';
  const AVATAR_MARK = 'data-unknow-x-avatar';
  let settings = { name: '', id: '' };
  let avatar = '';
  let button = null;
  let buttonObserver = null;
  let documentObserver = null;
  let applyQueued = false;

  function normalizeId(value) {
    const id = String(value || '').trim();
    return id && !id.startsWith('@') ? `@${id}` : id;
  }

  function leafTextElements(target) {
    return [...target.querySelectorAll('span, div')].filter((el) => {
      if (el.closest('svg, [aria-hidden="true"]')) return false;
      if (el.children.length !== 0) return false;
      const value = el.textContent.trim();
      return value.length > 0 || el.hasAttribute(MARK);
    });
  }

  function applyText(target) {
    const values = [settings.name, settings.id];
    leafTextElements(target).slice(0, 2).forEach((el, i) => {
      const value = values[i] || '';
      el.setAttribute(MARK, String(i));
      if (el.textContent !== value) el.textContent = value;
      el.style.setProperty('color', value ? '' : 'transparent', 'important');
      el.style.setProperty('-webkit-text-fill-color', value ? '' : 'transparent', 'important');
    });
  }

  function applyAvatar(target) {
    target.querySelectorAll('img').forEach((img) => {
      if (!img.hasAttribute(AVATAR_MARK)) {
        img.setAttribute(AVATAR_MARK, 'true');
        img.setAttribute('data-unknow-x-original-src', img.getAttribute('src') || '');
        img.setAttribute('data-unknow-x-original-srcset', img.getAttribute('srcset') || '');
      }
      const src = avatar || img.getAttribute('data-unknow-x-original-src') || '';
      const srcset = avatar ? '' : img.getAttribute('data-unknow-x-original-srcset') || '';
      if (img.src !== src) img.src = src;
      if (img.srcset !== srcset) img.srcset = srcset;
    });
    target.querySelectorAll('svg image').forEach((image) => {
      if (!image.hasAttribute(AVATAR_MARK)) {
        image.setAttribute(AVATAR_MARK, 'true');
        image.setAttribute('data-unknow-x-original-href', image.getAttribute('href') || image.getAttribute('xlink:href') || '');
      }
      const href = avatar || image.getAttribute('data-unknow-x-original-href') || '';
      if (image.getAttribute('href') !== href) image.setAttribute('href', href);
      if (image.getAttribute('xlink:href') !== href) image.setAttribute('xlink:href', href);
    });
    target.querySelectorAll('*').forEach((el) => {
      const style = getComputedStyle(el);
      const hasBackground = style.backgroundImage && style.backgroundImage !== 'none';
      const hasMask = style.webkitMaskImage && style.webkitMaskImage !== 'none';
      if (!hasBackground && !hasMask) return;
      if (!el.hasAttribute(AVATAR_MARK)) {
        el.setAttribute(AVATAR_MARK, 'true');
        el.setAttribute('data-unknow-x-original-bg', el.style.backgroundImage || '');
        el.setAttribute('data-unknow-x-original-mask', el.style.webkitMaskImage || '');
      }
      const bg = avatar && hasBackground ? `url("${avatar}")` : el.getAttribute('data-unknow-x-original-bg') || '';
      const mask = avatar && hasMask ? `url("${avatar}")` : el.getAttribute('data-unknow-x-original-mask') || '';
      if (el.style.backgroundImage !== bg) el.style.setProperty('background-image', bg, 'important');
      if (el.style.webkitMaskImage !== mask) el.style.setProperty('-webkit-mask-image', mask, 'important');
    });
  }

  function apply(target) { applyText(target); applyAvatar(target); }

  function scheduleApply() {
    if (applyQueued) return;
    applyQueued = true;
    requestAnimationFrame(() => {
      applyQueued = false;
      const current = document.querySelector(BUTTON);
      if (current && current !== button) observeButton(current);
      else if (current) apply(current);
    });
  }

  function observeButton(target) {
    if (buttonObserver) buttonObserver.disconnect();
    button = target;
    buttonObserver = new MutationObserver(() => scheduleApply());
    buttonObserver.observe(target, { childList: true, subtree: true });
    apply(target);
  }

  function findButton() {
    const target = document.querySelector(BUTTON);
    if (target) {
      if (documentObserver) { documentObserver.disconnect(); documentObserver = null; }
      observeButton(target);
      return;
    }
    if (!documentObserver) {
      documentObserver = new MutationObserver(() => {
        const found = document.querySelector(BUTTON);
        if (found) {
          documentObserver.disconnect();
          documentObserver = null;
          observeButton(found);
        }
      });
      documentObserver.observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  chrome.storage.sync.get({ name: '', id: '' }, (saved) => {
    settings = { name: saved.name || '', id: normalizeId(saved.id) };
    scheduleApply();
  });
  chrome.storage.local.get({ avatar: '' }, (saved) => {
    avatar = saved.avatar || '';
    scheduleApply();
  });
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync') {
      if (changes.name) settings.name = changes.name.newValue || '';
      if (changes.id) settings.id = normalizeId(changes.id.newValue);
      scheduleApply();
    }
    if (area === 'local' && changes.avatar) {
      avatar = changes.avatar.newValue || '';
      scheduleApply();
    }
  });

  findButton();
})();
