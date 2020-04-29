function trueOrFalse(max = 2) {
  return Math.floor(Math.random() * Math.floor(max))
}

function mockify(text) {
  text = text.toLowerCase().split('');

  for (let i = 0; i < text.length; i++) {
    if (trueOrFalse()) {
      text[i] = text[i].toUpperCase();
    }
  }
  return text.join('');
}

export { mockify }