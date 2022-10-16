import React from 'react';
import './suggestions.css';

type SuggestionsProps = {
  items: string[];
  inputValue: string;
  onItemSelected: (item: string) => void;
};

const Suggestions: React.FC<SuggestionsProps> = ({ items, inputValue, onItemSelected }) => {
  const chooseSuggestion = (suggestion: string) => () => {
    onItemSelected(suggestion);
  };

  const renderSuggestionHighlighted = (suggestion: string, inputValue: string) => {
    const parts = suggestion.split(new RegExp(`(${inputValue})`, 'ig'));
    return (
      <>
        {parts.map((part, i) => (
          <span key={i} className={part.toLowerCase() === inputValue.toLowerCase() ? 'matching-part' : ''}>
            {part}
          </span>
        ))}
      </>
    );
  };

  if (!items.length) {
    return null;
  }

  return (
    <div className="suggestions-container">
      <ul className="suggestions-list">
        {items.map((suggestion, i) => (
          <li className="suggestions-item" key={i} onClick={chooseSuggestion(suggestion)}>
            {renderSuggestionHighlighted(suggestion, inputValue)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
