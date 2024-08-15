import filter from 'leo-profanity';
import { useCallback } from 'react';
import ProfanityContext from '../context';

const ProfanityProvider = ({ children }) => {
  filter.loadDictionary('en');
  filter.add(filter.getDictionary('ru'));

  const filteredWord = useCallback((word) => filter.clean(word), []);

  return (
    <ProfanityContext.Provider value={filteredWord}>
      {children}
    </ProfanityContext.Provider>
  );
};

export default ProfanityProvider;
