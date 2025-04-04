document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.how-to-riddle').forEach((section) => {
    const tabButtons = section.querySelectorAll('.htr-item');
    const tabContents = section.querySelectorAll('.htr-item-image');
    const labels = section.querySelectorAll('.htr-item-point');
    tabButtons.forEach((tabButton) => {
      tabButton.addEventListener('mouseenter', (e) => {
        const tabIndex = e.currentTarget.dataset.listItem;
        tabButtons.forEach((btn) => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
        tabContents.forEach((tabContent) => tabContent.classList.remove('active'));
        const matchingTabContent = section.querySelector(`.htr-item-image[data-htr-img-item="${tabIndex}"]`);
        if (matchingTabContent) {
          matchingTabContent.classList.add('active');
        }
      });
    });
    labels.forEach((label) => {
      label.addEventListener('mouseenter', (e) => {
        const tabIndex = e.currentTarget.closest('[data-htr-img-item]').dataset.htrImgItem;
        tabContents.forEach((tabContent) => tabContent.classList.remove('active'));
        e.currentTarget.closest('[data-htr-img-item]').classList.add('active');
        tabButtons.forEach((btn) => btn.classList.remove('active'));
        const matchingTabContent = section.querySelector(`.htr-item[data-list-item="${tabIndex}"]`);
        if (matchingTabContent) {
          matchingTabContent.classList.add('active');
        }
      });
    });
    tabContents.forEach((tabContent) => {
      tabContent.addEventListener('mouseenter', (e) => {
        const tabIndex = e.currentTarget.closest('[data-htr-img-item]').dataset.htrImgItem;
        tabContents.forEach((tabContent) => tabContent.classList.remove('active'));
        e.currentTarget.closest('[data-htr-img-item]').classList.add('active');
        tabButtons.forEach((btn) => btn.classList.remove('active'));
        const matchingTabContent = section.querySelector(`.htr-item[data-list-item="${tabIndex}"]`);
        if (matchingTabContent) {
          matchingTabContent.classList.add('active');
        }
      });
    });
  });
});