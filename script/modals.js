export function showModalAlert(buttonType, title, message, onConfirm) {
  const modal = document.getElementById('modal');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMessage').textContent = message;
  const okButton = document.getElementById('modalBtnOk');
  const cancelButton = document.getElementById('modalBtnCancel');

  if (buttonType === 'Confirm') {
    okButton.style.display = 'block';
    okButton.textContent = 'Sim';
    cancelButton.style.display = 'block';
    cancelButton.textContent = 'Não';
  } else if (buttonType === 'Alert') {
    okButton.style.display = 'none';
    cancelButton.style.display = 'block';
    cancelButton.textContent = 'OK';
    cancelButton.classList.remove('modal-content-btn-cancel');
    cancelButton.classList.add('modal-content-btn-ok');
  } else if (buttonType === 'Next') {
    okButton.style.display = 'block';
    cancelButton.style.display = 'none';
    okButton.textContent = 'OK';
  }

  okButton.onclick = function () {
    onConfirm();
    closeModal();
  };

  cancelButton.onclick = function () {
    closeModal();
  };

  modal.style.display = 'block';
}

export function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

export function closeModalRegister() {
  const modal = document.getElementById('modal-register');
  modal.style.display = 'none';
}

export function closeModalDetails() {
  const modal = document.getElementById('modal-details');
  modal.style.display = 'none';
}
