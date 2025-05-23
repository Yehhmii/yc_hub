import StartupCard, {StartupTypeCard} from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams} : {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();
  console.log(session?.id)

  const { data: posts} = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="teal_container">
        <h1 className="heading">Share your story <br /> Build and Evolve.</h1>
        <p className="sub-heading !max-w-3xl">
          Fast forward your growth, Vote and connect. <br />
        </p>

        <SearchForm query={query}/>
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "Latest Stories"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No story found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
