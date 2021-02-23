import '../../assets/form.css';

export const template = {
  render() {
    let modalObj = {
      header: "Add New Question",
      content: `
        <div class="container">
          <ul class="flex-outer">
            <li>
              <label><b>Question ID</b> <span class="required">*</span></label>
              <input type="text" id="q-id" required>
            </li>
            <li>
              <label><b>Question</b> <span class="required">*</span></label>
              <div id="q-question"></div>
            </li>
            <li>
              <label><b>Question Detail</b></label>
              <textarea id="q-detail"></textarea>
            </li>
            <li>
              <label><b>Answers</b> <span class="required">*</span></label>
              <textarea id="q-answer" required></textarea>
            </li>
            <li>
              <label><b>Internal Notes</b></label>
              <textarea id="q-notes"></textarea>
            </li>
            <li>
              <button type="button" id="add-question" class="modal-btn">Submit</button>
              <button type="button" id="edit-question" class="modal-btn">Update</button>
              <button type="button" class="modal-btn close-modal" aria-label="close modal" data-close>Cancel</button>
            </li>
          </ul>
        </div>
      `
    };
    return modalObj;
  }

}