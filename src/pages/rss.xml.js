import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site } from "../config/site";

export async function GET(context) {
  const posts = await getCollection("posts");
  return rss({
    title: site.title,
    description: site.description,
    site: site.siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
  });
}
