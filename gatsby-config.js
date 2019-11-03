module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-blog`,
      options: {},
    },
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: `Engineering`,
    author: `Clovis Ramírez`,
    description: `A personal blog dedicated to the daily life of a Software Engineer.`,
    siteUrl: `https://clovisramirez.com`,
    social: [
      {
        name: `Twitter`,
        url: `https://twitter.com/ramirezclovis`,
      },
      {
        name: `GitHub`,
        url: `https://github.com/clovis1122`,
      }
    ],
  },
}
