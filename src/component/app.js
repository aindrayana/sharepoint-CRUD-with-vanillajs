import 'trumbowyg';

import { appTemplate } from './app.template';
import { listItem, createListItem, updateListItem } from './app.spListItem';
import { Modal } from './app.modal';
import { config } from '../../config';

import '../assets/trumbowyg.min.css';

const submitForm = () => {
  let qid = document.getElementById("q-id").value;
  let question = document.getElementById("q-question").innerHTML;
  let detail = document.getElementById("q-detail").value;
  let answer = document.getElementById("q-answer").value;
  let notes = document.getElementById("q-notes").value;
  return {
    "Status": "Current",
    "Question_x0020_ID": qid,
    "Question": question,
    "Question_x0020_Details": detail,
    "Answers": answer,
    "Internal_x0020_Notes": notes
  }
}

export const App = {
  init() {
    this.appElement = document.getElementById('root');
    this.render();
  },

  render() {
    listItem.init().then(list => {
      this.appElement.innerHTML = appTemplate(list);

      // --- setup modal template and event listener --
      $.trumbowyg.svgPath = config.siteUrl+'SiteAssets/js/icons.svg';

      $("#q-question").trumbowyg(
        {
          btns: [
            ['viewHTML', 'formatting', 'link', 'insertImage'],
            ['strong', 'em'],
            ['justifyLeft', 'justifyCenter',
              'justifyRight', 'justifyFull', 'unorderedList',
              'orderedList'],
            ['fullscreen']
          ],
          autogrow: true
        }
      );
      Modal.listener();
      this.listener(list);
    })
  },

  listener(list) {
    // --- event listener for item clicked / edit question ---
    const itemsListener = document.querySelectorAll(".question-item");
    for (const item of itemsListener) {
      let spid = item.getAttribute('data');
      let itemData = list.find(list => Number(list.spid) === Number(spid));
      item.addEventListener("click", () => this.editQuestion(itemData, spid));
    }

    // --- event listener for add new question button ---
    const openModal = document.querySelectorAll("[data-open]");
    for (const el of openModal) {
      el.addEventListener("click", () => {
        const modalId = el.dataset.open;
        // -- open modal window --
        document.getElementById(modalId).classList.add('is-visible');
        this.addQuestion();
      });
    }
    
  },

  addQuestion() {
    let submit = document.getElementById('add-question');
    // --- create new Question
    submit.addEventListener("click", () => {
      createListItem(submitForm()).then((response) => {
        if (response) {
          document.querySelector(".popup-modal.is-visible [data-close]").click();
          location.reload();
        }
      });
    });
  },

  editQuestion(item, spid) {
    document.querySelector("#modal1.popup-modal .question-header").innerText = "Edit Question";
    document.getElementById("q-id").value = item.id;
    document.getElementById("q-question").innerHTML = item.question;
    document.getElementById("q-detail").value = item.details;
    document.getElementById("q-answer").value = item.answers;
    document.getElementById("q-notes").value = item.notes;

    // -- open modal window --
    document.getElementById("modal1").classList.add('is-visible');

    // -- toggle submit-question (add or edit) --
    document.getElementById('add-question').style.display = "none";
    let update = document.getElementById('edit-question');
    update.style.display = "block";

    // --- edit Question
    update.addEventListener("click", () => {
      updateListItem(submitForm(), spid).then((response) => {
        if (response) {
          document.querySelector(".popup-modal.is-visible [data-close]").click();
          location.reload();
        }
      });
    });
  },

};