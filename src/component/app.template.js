import { questionList } from "./question/question.list";
import { Modal } from './app.modal';
import { template } from './question/question.template'

export const appTemplate = (items) => {
  return (`
    <section class="app">
      <h3> Question List </h3>
      <div class="question-list">${questionList.render(items)}</div>
      <section class="button">
        <button class="open-modal" data-open="modal1">
          Add New Question
        </button>
      </section>
    </section>
    ${ Modal.render(template.render()) }
  `);
}
