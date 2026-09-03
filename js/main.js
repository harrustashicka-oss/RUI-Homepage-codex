/* 普通浏览器脚本：支持直接双击 index.html，无服务器、无模块导入。 */
(() => {
  'use strict';
  let locale = 'zh';
  const languageButton = document.querySelector('.lang-toggle');
  const heroVideo = document.getElementById('hero-video');
  const soundButton = document.querySelector('.hero-sound-toggle');
  const dialog = document.getElementById('project-dialog');
  const dialogMedia = document.getElementById('dialog-media');
  const hint = dialog.querySelector('.video-hint');
  let activeCard = null;
  let pausedVideos = [];

  // 中文直接写在 HTML；data-en 保存对应英文，切换时不重新加载媒体。
  const translations = Array.from(document.querySelectorAll('[data-en]'), (element) => ({
    element, zh: element.textContent, en: element.dataset.en,
  }));
  const attributeTranslations = ['alt', 'aria-label'].flatMap((attribute) =>
    Array.from(document.querySelectorAll('[data-en-' + attribute + ']'), (element) => ({
      element, attribute, zh: element.getAttribute(attribute),
      en: element.getAttribute('data-en-' + attribute),
    }))
  );

  function updateSoundButton() {
    const enabled = !heroVideo.muted;
    soundButton.setAttribute('aria-pressed', String(enabled));
    soundButton.setAttribute('aria-label', locale === 'zh'
      ? (enabled ? '关闭首屏声音' : '开启首屏声音')
      : (enabled ? 'Mute hero video' : 'Enable hero sound'));
    soundButton.querySelector('span').textContent = locale === 'zh'
      ? (enabled ? '声音开启' : '开启声音')
      : (enabled ? 'Sound on' : 'Sound off');
    soundButton.querySelector('.sound-muted').toggleAttribute('hidden', enabled);
    soundButton.querySelector('.sound-active').toggleAttribute('hidden', !enabled);
  }
  function updateLocale(next) {
    locale = next;
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    translations.forEach(({ element, zh, en }) => { element.textContent = locale === 'zh' ? zh : en; });
    attributeTranslations.forEach(({ element, attribute, zh, en }) => element.setAttribute(attribute, locale === 'zh' ? zh : en));
    languageButton.querySelector('span').textContent = locale === 'zh' ? 'EN' : '中';
    languageButton.setAttribute('aria-label', locale === 'zh' ? 'Switch to English' : '切换为中文');
    updateSoundButton();
    // 本地文件有时不允许存储偏好，但这不影响页面或语言切换。
    try { localStorage.setItem('portfolio-locale', locale); } catch (_) { /* optional preference */ }
  }
  let savedLocale = 'zh';
  try { if (localStorage.getItem('portfolio-locale') === 'en') savedLocale = 'en'; } catch (_) { /* file mode */ }
  updateLocale(savedLocale);
  languageButton.addEventListener('click', () => updateLocale(locale === 'zh' ? 'en' : 'zh'));

  // 浏览器要求用户点击后才能有声播放。
  soundButton.addEventListener('click', () => {
    heroVideo.muted = !heroVideo.muted;
    heroVideo.play().catch(() => { heroVideo.muted = true; updateSoundButton(); });
    updateSoundButton();
  });
  heroVideo.addEventListener('volumechange', updateSoundButton);

  function openProject(card) {
    if (dialog.open) return;
    activeCard = card;
    dialog.querySelector('.dialog-index').textContent = card.querySelector('.project-category').textContent;
    dialog.querySelector('#dialog-title').textContent = card.querySelector('h3').textContent;
    dialog.querySelector('#dialog-summary').textContent = card.querySelector('.project-meta p').textContent;
    dialog.querySelector('.dialog-tags').replaceChildren(...Array.from(card.querySelectorAll('.tag-row span'), (tag) => tag.cloneNode(true)));
    const media = card.querySelector('.project-media > video, .project-media > picture').cloneNode(true);
    media.className = 'dialog-picture';
    const largeImage = media.querySelector('img');
    if (largeImage) largeImage.loading = 'eager';
    dialogMedia.replaceChildren(media);
    hint.hidden = true;
    // 暂停背景视频，避免首屏和作品音乐重叠。
    pausedVideos = Array.from(document.querySelectorAll('main video')).filter((video) => !video.paused);
    pausedVideos.forEach((video) => video.pause());
    document.body.classList.add('dialog-open');
    dialog.showModal();
    if (media.tagName === 'VIDEO') {
      media.removeAttribute('muted');
      media.muted = false;
      media.defaultMuted = false;
      media.volume = 1;
      media.controls = true;
      media.preload = 'auto';
      media.addEventListener('playing', () => { hint.hidden = true; });
      media.addEventListener('error', () => {
        if (!dialog.open || !dialogMedia.contains(media)) return;
        hint.textContent = locale === 'zh' ? '视频无法加载，请检查对应的素材文件是否一起复制。' : 'Video could not load. Check that its media file was copied with the site.';
        hint.hidden = false;
      });
      media.play().catch(() => {
        if (!dialog.open || !dialogMedia.contains(media)) return;
        hint.textContent = locale === 'zh' ? '请点击视频上的播放按钮，开始有声播放。' : 'Press play on the video to start playback with sound.';
        hint.hidden = false;
      });
    }
  }
  // 复制 HTML 里的作品卡片即可增加作品，不需要改 JavaScript。
  document.querySelector('.project-grid').addEventListener('click', (event) => {
    const card = event.target.closest('.project-card');
    if (card) openProject(card);
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  let startedOutside = false;
  const outsideDialog = (event) => {
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  };
  dialog.addEventListener('pointerdown', (event) => { startedOutside = event.target === dialog && outsideDialog(event); });
  dialog.addEventListener('click', (event) => {
    if (startedOutside && event.target === dialog && outsideDialog(event)) dialog.close();
    startedOutside = false;
  });
  dialog.addEventListener('close', () => {
    const video = dialogMedia.querySelector('video');
    if (video) video.pause();
    dialogMedia.replaceChildren();
    document.body.classList.remove('dialog-open');
    pausedVideos.forEach((video) => { video.play().catch(() => {}); });
    pausedVideos = [];
    if (activeCard) activeCard.focus({ preventScroll: true });
    activeCard = null;
  });
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.section-heading, .project-card, .about-copy, .capability-list article').forEach((node) => observer.observe(node));
  }
})();
