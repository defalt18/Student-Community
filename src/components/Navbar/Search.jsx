import React, { useState, useEffect, useRef } from "react";
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

import { UserList } from "../Profile/User";
import DA_Logo from "./DA-logo.png";
import "./Search.css";
import { getAllUsersDetails } from "../../services/user-utils";

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
            onChange={(e) => { setText(e.target.value.trim()) }} />
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
  const [found, setFound] = useState(true);

  async function fetchUsers(search_query) {
    const users = await getAllUsersDetails(search_query);
    users.length ? setResult(users) : setFound(false);
  }

  useEffect(() => {
    if (query) {
      setResult([]);
      setFound(true);
      fetchUsers(query);
    }
  }, [query]);

  return (
    <div className="search-result">
      {
        (!found) && query && <div className="not-found">User Not Found</div>
      }
      {
        query && <UserList users={result} />
      }
    </div>
  )
}

export { SearchBar }