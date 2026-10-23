(() => {
  const BUTTON = '[data-testid="SideNav_AccountSwitcher_Button"]';
  const MARK = 'data-unknow-x-label';
  let settings = { name: '', id: '' };

  function leafTextElements(button) {
    return [...button.querySelectorAll('span, div')].filter((el) => {
      if (el.closest('svg, [aria-hidden="true"]')) return false;
      if (el.children.length !== 0) return false;
      const text = el.textContent.trim();
      return text.length > 0 || el.hasAttribute(MARK);
    });
  }

  function apply(button) {
    const leaves = leafTextElements(button);
    if (!leaves.length) return;
    const values = [settings.name, settings.id];
    leaves.slice(0, 2).forEach((el, i) => {
      el.setAttribute(MARK, String(i));
      el.textContent = values[i] || '';
      el.style.setProperty('color', values[i] ? '' : 'transparent', 'important');
      el.style.setProperty('-webkit-text-fill-color', values[i] ? '' : 'transparent', 'important');
    });
  }

  function scan(root = document) {
    if (!root.querySelectorAll) return;
    root.querySelectorAll(BUTTON).forEach(apply);
  }

  chrome.storage.sync.get({ name: '', id: '' }, (saved) => {
    settings = saved;
    scan();
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync') return;
    if (changes.name) settings.name = changes.name.newValue || '';
    if (changes.id) settings.id = changes.id.newValue || '';
    scan();
  });

  new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches?.(BUTTON)) apply(node);
          scan(node);
        }
      }
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
