const fs = require('fs');
const path = require('path');

const trainData = {
  en: fs.readFileSync(path.resolve(__dirname, 'train-data/train.en'), 'utf8').split('\n'),
  kn: fs.readFileSync(path.resolve(__dirname, 'train-data/train.kn'), 'utf8').split('\n')
};

function translate(text, targetLanguage) {
  let translatedText = '';

  const words = text.split(' ');

  if (targetLanguage === 'rw') {
    words.forEach(word => {
      const index = trainData.en.indexOf(word);
      translatedText += index !== -1 ? trainData.kn[index] + ' ' : word + ' ';
    });
  } else if (targetLanguage === 'en') {
    words.forEach(word => {
      const index = trainData.kn.indexOf(word);
      translatedText += index !== -1 ? trainData.en[index] + ' ' : word + ' ';
    });
  }

  return translatedText.trim();
}

module.exports = { translate };
