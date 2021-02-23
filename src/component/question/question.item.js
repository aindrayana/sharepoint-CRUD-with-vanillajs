const plain = (html) => html.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "");

export const questionItem = (item) => `
  <li class="question-item" data="${item.spid}" >
    <div class="question-item-name"> ${plain(item.question)} </div>
  </li>
`;
