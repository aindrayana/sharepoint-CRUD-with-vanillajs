export const Modal = {

  render(data) {
    let header, content, footer;
    if (data) {
      if (data.header) header = data.header;
      if (data.content) content = data.content;
      if (data.footer) {
        footer = `<footer class="modal-footer">${data.footer}</footer>`;
      }
    }

    return (`
      <div class="popup-modal" id="modal1" data-animation="slideInOutLeft">
        <div class="modal-dialog">
          <header class="modal-header">
            <span class="question-header">${ (header) ? header : 'Header' }</span>
            <button type="button" class="close-modal" aria-label="close modal" data-close>x</button>
          </header>
          <section class="modal-content">
            ${ (content) ? content : '' }
          </section>
          ${ (footer) ? footer : '' }
        </div>
      </div>
    `)
  },

  listener() {
    // --- close modal event listener ---
    const parent = document.querySelector(".popup-modal");
    const closeModal = document.querySelectorAll("[data-close]");

    for (const el of closeModal) {
      el.addEventListener("click", function() {
        // --- when modal close, reset form
        document.querySelector("#modal1.popup-modal .question-header").innerText = "Add New Question";
        document.getElementById("q-id").value = '';
        document.getElementById("q-question").innerHTML = '';
        document.getElementById("q-detail").value = '';
        document.getElementById("q-answer").value = '';
        document.getElementById("q-notes").value = '';
        document.getElementById('add-question').style.display = "block";
        document.getElementById('edit-question').style.display = "none";

        parent.classList.remove("is-visible");
      });
    }

    /* --- this listener cause conflicts with trumbowyg editor
       --- disable for now
    document.addEventListener("click", e => {
      e.preventDefault();
      if (e.target == document.querySelector(".popup-modal.is-visible")) {
        document.querySelector(".popup-modal.is-visible [data-close]").click();
      }
    });
    
    document.addEventListener("keyup", e => {
      e.preventDefault();
      // close modal on press the ESC
      if (e.key == "Escape" && document.querySelector(".popup-modal.is-visible")) {
        document.querySelector(".popup-modal.is-visible [data-close]").click();
      }
    });
    */
  }
}

