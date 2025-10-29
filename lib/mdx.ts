import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  author: string;
  category: string;
  readingTime: string;
  image: string;
  keywords: string;
  content: string;
}

/**
 * Get all blog posts
 */
export function getAllBlogPosts(): BlogPost[] {
  // Check if content directory exists
  if (!fs.existsSync(contentDirectory)) {
    console.warn(`[MDX] Content directory not found: ${contentDirectory}`);
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Parse frontmatter
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        publishDate: data.publishDate,
        author: data.author,
        category: data.category,
        readingTime: data.readingTime,
        image: data.image,
        keywords: data.keywords,
        content,
      } as BlogPost;
    });

  // Sort by publish date (newest first)
  return posts.sort((a, b) => {
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });
}

/**
 * Get a single blog post by slug
 */
export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      publishDate: data.publishDate,
      author: data.author,
      category: data.category,
      readingTime: data.readingTime,
      image: data.image,
      keywords: data.keywords,
      content,
    } as BlogPost;
  } catch (error) {
    console.error(`[MDX] Error reading blog post: ${slug}`, error);
    return null;
  }
}

/**
 * Get all blog post slugs (for static generation)
 */
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}
