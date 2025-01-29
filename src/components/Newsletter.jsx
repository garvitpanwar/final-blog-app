"use client";
import { useState } from "react";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [responseMsg, setResponseMsg] = useState("");
  const [statusCode, setStatusCode] = useState();
  const isEmailValid = email.includes("@");

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!isEmailValid) {
      setResponseMsg("Please enter a valid email address.");
      setStatus("error");
      setStatusCode(400);
      return;
    }

    setStatus("loading");
    try {
      console.log("aaaaaaaaa");
      const response = await axios.post("/api/subscribe", { email });
      console.log("aaaaaaaaa", response);

      setStatus("success");
      setStatusCode(response.status);
      setEmail("");
      setResponseMsg(response.data.message);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setStatus("error");
        setStatusCode(err.response?.status);
        setResponseMsg(err.response?.data.error || "An error occurred.");
      }
    }
  }

  return (
    <form
      className="rounded px-8 pt-6 pb-8 mb-4 max-w-md"
      onSubmit={handleSubscribe}
    >
      <label htmlFor="email" className="sr-only">
        Email Address
      </label>
      <div className="flex">
        <input
          id="email"
          className={`grow mr-1 transition ease-out delay-75 focus-within:border-2 focus-within:border-gray-600 items-center h-14 pr-0.5 rounded caret-purple-700 outline-none px-4 disabled:border-slate-400 border ${
            statusCode === 400 ? "border-orange-500" : "border-gray-600"
          }`}
          type="email"
          placeholder="What is your email address?"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
        />
        <button
          className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-slate-400 flex items-center"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <span className="loader border-t-transparent border-white"></span>
          ) : (
            "Subscribe"
          )}
        </button>
      </div>
      <div className="server-message pt-4" role="alert" aria-live="polite">
        {status === "success" && (
          <p className="text-green-600">{responseMsg}</p>
        )}
        {status === "error" && <p className="text-orange-600">{responseMsg}</p>}
      </div>
    </form>
  );
};

export default Newsletter;
