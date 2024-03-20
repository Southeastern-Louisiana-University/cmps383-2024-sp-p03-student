import { useFetch } from "use-http";
import { FormEvent, useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading, post } = useFetch("/api/authentication/login", {
    method: "post",
    onNewData: (_, x) => {
      if (typeof x === "string") {
        setError(x);
      } else if (typeof x === "object") {
        console.log("we logged in as: ");
        console.log(x);
        // TODO: save in context and redirect to home page
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        type="text"
        autoComplete="email"
        placeholder="Email"
        required
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        autoComplete="password"
        required
      />
      {loading ? "Checking Login..." : null}
      {error ? error : null}
      <button type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
