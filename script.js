/* Daily Bible Verse — Core Logic */

(function () {
  'use strict';

  // ── CONFIG ──
  const TOTAL_VERSES = VERSES.length; // from verses.js
  let currentIndex = 0;

  // ── ROTATION FORMULA ──
  function getRandomIndex() {
    return Math.floor(Math.random() * TOTAL_VERSES);
  }

  // ── RENDER ──
  function renderVerse() {
    currentIndex = getRandomIndex();
    const index = currentIndex;
    const v = VERSES[index];

    document.getElementById('verseEnglish').textContent = v.en;
    document.getElementById('verseTelugu').textContent = v.te;
    document.getElementById('refEnglish').textContent = v.ref;
    document.getElementById('refTelugu').textContent = v.refTe;

    // Date display
    const now = new Date();
    const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', opts);

  }
  // ── SHARE / COPY ──
  function getShareText() {
    const index = currentIndex;
    const v = VERSES[index];
    return `📖 ${v.ref}\n\n"${v.en}"\n\n${v.refTe}\n"${v.te}"`;
  }

  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg || 'Copied to clipboard ✓';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  function initActions() {
    // Share button
    document.getElementById('shareBtn').addEventListener('click', async () => {
      const text = getShareText();
      if (navigator.share) {
        try {
          await navigator.share({ title: 'Daily Bible Verse', text });
        } catch (e) { /* user cancelled */ }
      } else {
        await navigator.clipboard.writeText(text);
        showToast('Verse copied for sharing ✓');
      }
    });

    // Copy button
    document.getElementById('copyBtn').addEventListener('click', async () => {
      const text = getShareText();
      try {
        await navigator.clipboard.writeText(text);
        showToast('Copied to clipboard ✓');
      } catch {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Copied to clipboard ✓');
      }
    });
  }

  // ── STARS ──
  function createStars() {
    const container = document.getElementById('stars');
    const count = Math.min(40, Math.floor(window.innerWidth / 30));
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.setProperty('--dur', (2 + Math.random() * 4) + 's');
      star.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(star);
    }
  }

  // ── INIT ──
  function init() {
    createStars();
    renderVerse();
    initActions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
