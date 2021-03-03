import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { resultTemplateManager, searchBox, searchResultList } from "./search-engine";

function App() {
  const [search, setSearch] = useState(searchBox.state);
  const [resultList, setResultList] = useState(searchResultList.state);

  useEffect(() => {
    searchBox.subscribe(() => {
      //console.log(searchBox.state);

      setSearch(searchBox.state);
    });

    searchResultList.subscribe(() => {
      setResultList(searchResultList.state)
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <input
          type="text"
          value={search.value}
          onChange={(e) => {
            searchBox.updateText(e.currentTarget.value);
          }}
          onKeyUp={(e) => {
            if(e.keyCode == 13) {
              searchBox.submit()
            }
          }}
        />
        <ul>
          {searchBox.state.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion.rawValue}</li>
          ))}
        </ul>
      </header>
      <div className="resultList">
        {resultList.results.map((result) => {
          const template: any = resultTemplateManager.selectTemplate(
            result
          );
          return template ? template(result) : null;
        })}
      </div>
    </div>
  );
}

export default App;
