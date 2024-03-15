import { useFetch } from "use-http";
import { FormEvent, useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, post } = useFetch("/api/authentication/login", {
    method: "post",
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        type="text"
        autoComplete="email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        autoComplete="password"
      />
      {loading ? "Checking Login..." : null}
      {error ? "invalid username or password" : null}
      <button type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  );
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // stops the browser from causing a page refresh - more on this in the lecture

    if (loading) {
      return;
    }

    post({
      userName: userName,
      password: password,
    });

    // TODO: call /me, redirect
  }
}
