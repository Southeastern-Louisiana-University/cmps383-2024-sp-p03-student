import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <h1>this is our home page</h1>

      <label htmlFor="search">Find a hotel</label>
      <input id="search" name="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value ?? "")}></input>
      <Link
        onClick={(e) => (!searchTerm ? e.preventDefault() : null)}
        to={`/find-hotel?searchTerm=${encodeURIComponent(searchTerm)}&start=now`}
        aria-disabled={!searchTerm}
      >
        Search
      </Link>
    </>
  );
}
