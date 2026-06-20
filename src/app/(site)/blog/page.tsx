import { sanityClient } from "@/sanity/lib/client";
import { LINKEDIN_POSTS_QUERY } from "@/sanity/lib/queries";

export default async function Blog() {
  const posts = await sanityClient.fetch(LINKEDIN_POSTS_QUERY);

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-24">
      <h1 className="text-4xl font-bold mb-12">Blog & Updates</h1>
      
      {posts.length === 0 ? (
        <p className="text-xl text-gray-600 dark:text-gray-400">
          No posts synced from LinkedIn yet.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {posts.map((post: any) => (
            <div key={post._id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-500 mb-4">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap mb-4">
                {post.text}
              </p>
              {post.url && (
                <a href={post.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm font-medium">
                  Read original on LinkedIn ↗
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
