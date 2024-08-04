import filter from 'leo-profanity';

const cleanText = (nameForClean) => {
  filter.loadDictionary('ru');
  const cleanRuName = filter.clean(nameForClean);
  filter.loadDictionary('en');
  return filter.clean(cleanRuName);
};

export default cleanText;
