import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

/**
 * Change the content to add your own bio
 */

export default () => {
  const data = useStaticQuery(graphql`
    query AuthorQuery {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata

  return (
    <span>
      A blog by <strong>{author}</strong>{' '}
      <small>
        <span role="img" aria-label="Dominican">
          🇩🇴
        </span>
      </small>
      <br /><span>On the daily life of a Software Engineer.</span>
    </span>
  )
}
