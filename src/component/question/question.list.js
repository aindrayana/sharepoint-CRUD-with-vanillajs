import { questionItem } from './question.item';

export const questionList = {
  render(items) {
    const questionHTML = items.reduce(
      (html, item) => html + questionItem(item),
      ''
    );
    return (`<ul>${questionHTML}</ul>`)
  },
};
