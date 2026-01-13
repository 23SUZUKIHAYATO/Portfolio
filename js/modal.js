document.addEventListener('DOMContentLoaded', function(){
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  const dialog = modal.querySelector('.app-dialog');
  const titleEl = modal.querySelector('.app-title');
  const contentEl = modal.querySelector('.app-content');
  const closeEls = modal.querySelectorAll('[data-modal-close="true"]');

  let lastFocus = null;

  function openModal(title, html){
    lastFocus = document.activeElement;
    titleEl.textContent = title || '';
    contentEl.innerHTML = html || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    // 初期フォーカス
    const closeBtn = modal.querySelector('.app-close');
    closeBtn && closeBtn.focus();
    // スクロール抑止（任意）
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    contentEl.innerHTML = '';
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
  }

  closeEls.forEach(el => {
    el.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', function(e){
    if (e.target === modal || e.target.dataset.modalClose === 'true') {
      closeModal();
    }
  });

  document.addEventListener('keydown', function(e){
    if (modal.classList.contains('is-open') && e.key === 'Escape') {
      closeModal();
    }
  });

  // カードクリックでモーダルを開く
  document.querySelectorAll('.projects-grid .card').forEach(card => {
    card.addEventListener('click', function(){
      const title = card.querySelector('.card-title')?.textContent?.trim();
      const detail = card.querySelector('.modal-body-content')?.innerHTML ||
                     card.querySelector('.card-text')?.innerHTML || '';
      openModal(title, detail);
    });
    card.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const title = card.querySelector('.card-title')?.textContent?.trim();
        const detail = card.querySelector('.modal-body-content')?.innerHTML ||
                       card.querySelector('.card-text')?.innerHTML || '';
        openModal(title, detail);
      }
    });
  });
});
