import React, { KeyboardEvent, useEffect, useState } from 'react';
import './auto-complete.css';
import Suggestions from '../suggestions/suggestions';
import useFetch from '../../hooks/use-fetch';

type AutoCompleteProps = {
  dataUrl: string;
  dataTransformer: (data: any) => string[];
  suggestionsLimit: number;
  onChange: Function;
};

const AutoComplete: React.FC<AutoCompleteProps> = ({ dataUrl, dataTransformer, suggestionsLimit, onChange }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isChoosen, setIsChoosen] = useState<boolean>(false);
  const fetchdata = useFetch(dataUrl, dataTransformer, suggestionsLimit);

  useEffect(() => {
    if (!isChoosen) {
      fetchdata(inputValue, setSuggestions);
    }
  }, [fetchdata, inputValue, isChoosen]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    setIsChoosen(false);
    setInputValue(currentValue);
    onChange(currentValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setSuggestions([]);
    }
    // Production notice: user keyboard interactions could be added
  };

  const handleOnBlur = () => {
    // timeout is needed to select the value, before closing
    setTimeout(() => setSuggestions([]), 300);
  };

  const chooseSuggestion = (suggestion: string) => {
    setIsChoosen(true);
    setInputValue(suggestion);
    onChange(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="auto-complete-wrapper">
      <input
        className="auto-complete-input"
        value={inputValue}
        placeholder="Start typing.."
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onBlur={handleOnBlur}
      ></input>
      <Suggestions items={suggestions} inputValue={inputValue} onItemSelected={chooseSuggestion}></Suggestions>
    </div>
  );
};

export default AutoComplete;
