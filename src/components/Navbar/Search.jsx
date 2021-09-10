import React, { useState, useEffect, useRef } from "react";
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

import User from "../Profile/User";
import DA_Logo from "./DA-logo.png";
import "./Search.css";

function SearchBar() {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const inpRef = useRef();

  useEffect(() => {
    if (open) {
      inpRef.current.focus();
    }
  }, [open]);

  function blur_handler(e) {
  }

  return (
    <div className="flex-center">
      {open ?
        <div className="search-panel">
          <input
            type="text"
            className="inp-search"
            placeholder="Search people here"
            value={text}
            ref={inpRef}
            onBlur={blur_handler}
            onChange={(e) => { setText(e.target.value) }} />
          <SearchResult query={text} />
        </div>
        : null
      }
      <button className="btn-icon" onClick={() => setOpen(!open)}>
        {open ? <CloseIcon /> : <SearchIcon />}
      </button>
    </div>
  )
}

function SearchResult({ query }) {
  const [result, setResult] = useState([]);

  useEffect(() => {
    // fetch all user data in result array
  }, [query]);

  return (
    <div className="search-result">
      {
        (!result.length && query) ?
          <div className="not-found">
            User not found
          </div>
          : null
      }
      {/* changes required */}
      <User key={1} name={"Utsav"} img={DA_Logo} />
      <User key={2} name={"Utsav"} img={DA_Logo} />
      <User key={3} name={"Utsav"} img={DA_Logo} />
      <User key={4} name={"Utsav"} img={DA_Logo} />
    </div>
  )
}

export { SearchBar }