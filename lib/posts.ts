import fs from 'fs';
import path from 'path';

export async function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.md$/, ''),
      title: fileName.replace(/\.md$/, '').replace(/-/g, ' ')
    };
  });
  return posts;
}