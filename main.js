(function () {
  'use strict';

  const templateStr = document.querySelector('#sig-tmpl').innerHTML;

  const tfName = document.querySelector('input#name');
  const tfTitle = document.querySelector('input#title');
  const tfPhone = document.querySelector('input#phone');
  const btnCopy = document.querySelector('button#copy-btn');
  const copyConfirmation = document.querySelector('.copy-confirmation');

  tfName.addEventListener('keyup', refreshPreview);
  tfTitle.addEventListener('keyup', refreshPreview);
  tfPhone.addEventListener('keyup', refreshPreview);
  btnCopy.addEventListener('click', copyCode);

  function refreshPreview() {
    const $name = tfName.value;
    const $title = tfTitle.value;
    const $phone = tfPhone.value;

    let html = templateStr.replace(/\$name/g, $name);
    html = html.replace(/\$title/g, $title);
    html = html.replace(/\$phone/g, $phone);

    const previewEls = document.querySelectorAll('.preview-block .sig-target');

    previewEls.forEach((el) => {
      el.innerHTML = html;
    });

    copyConfirmation.classList.add('hidden');
  }

  function copyCode() {
    const srcEl = document.querySelector('[data-copy-src]').firstElementChild;
    copyElementToClipboard(srcEl);

    copyConfirmation.classList.remove('hidden');
  }

  function copyElementToClipboard(element) {
    window.getSelection().removeAllRanges();
    let range = document.createRange();
    range.selectNode(
      typeof element === 'string' ? document.getElementById(element) : element
    );
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  }

  function init() {
    refreshPreview();
  }

  init();
})();
