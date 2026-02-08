import React, { useRef, useState } from "react";

const ExtraHoursForm = () => {
  const tokenInput = useRef(null);
  const [error, setError] = useState("");
  const [report, setReport] = useState("");
  const [copied, setCopied] = useState(false);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setCopied(false);

    const token = tokenInput.current && tokenInput.current.value;

    if (!token) {
      setError("No token!");
      return;
    }

    try {
      const response = await fetch(`https://extrahours.now.sh/api?token=${token}`);
      const text = await response.text();
      setReport(text);
    } catch (err) {
      setError(err.message || "Request failed");
    }
  };

  const onCopy = async () => {
    if (!report) {
      return;
    }

    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
    } catch (err) {
      setError(err.message || "Copy failed");
    }
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <label>
          Insert Toggl Token:
          <input type="text" ref={tokenInput} required />
        </label>
        <button type="submit">Submit!</button>
      </form>
      <textarea
        readOnly
        style={{ margin: 0, width: "100%", height: 210, resize: "none" }}
        value={report}
      />
      <button style={{ marginTop: 20, marginBottom: 40 }} onClick={onCopy} type="button">
        {copied ? "Copied!" : "Copy to Clipboard!"}
      </button>
      <p>{error}</p>
    </div>
  );
};

export default ExtraHoursForm;
