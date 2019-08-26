import React, { useRef, useState } from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const ExtraHours = ({ data, location }) => {

  const tokenInput = useRef(null);
  const [error, setError] = useState("");
  const [report, setReport] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    const token = tokenInput.current && tokenInput.current.value;

    if (!token) {
      return setError("No token!");
    }

    fetch(`https://pcfdcjhk31.execute-api.us-east-1.amazonaws.com/dev/extrahours?token=${token}`)
      .then(resp => resp.json())
      .then(resp => setReport(resp.data))
      .catch(err => setError(err.message));
  }

  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <SEO title="Extra Hours!" />
      <h1>Extra Hours</h1>
      <p>A simple app to generate the extra hours report.</p>
      <form onSubmit={onFormSubmit}>
        <label>Insert Toggl Token: <input type="text" ref={tokenInput} required /></label>
        <button type="submit">Submit!</button>
      </form>
      <textarea readonly style={{ margin: 0, width: '100%', height: 210, resize: 'none' }} value={report} />
      <button style={{ marginTop: 20, marginBottom: 40 }}>Copy to Clipboard!</button>
      <p>{error}</p>
    </Layout>
  );
}

export default ExtraHours;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
