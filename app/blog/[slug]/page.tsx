import fs from 'fs';
import path from 'path';
import Markdown from 'react-markdown';
import matter from 'gray-matter';

function getPostContent(slug: string) {
  const folder = path.join(process.cwd(), 'posts');
  const fullPath = path.join(folder, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const { content } = matter(fileContents);
  
  return content;
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ''),
  }));
}

export type paramsType = {
  slug: string;
};

export default async function PostPage({ params }: { params: Promise<paramsType> }) {
  const { slug } = await params;
  const content = getPostContent(slug);

  return (
    <article>
      <Markdown>{content}</Markdown>
    </article>
  );
}