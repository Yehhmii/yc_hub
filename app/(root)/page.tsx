import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <>
    <section className="teal_container">
      <h1 className="heading">Share your story <br /> Build and Evolve.</h1>
      <p className="sub-heading !max-w-3xl">
        Fast forward your growth, Vote and connect. <br />
      </p>

      <SearchForm />
    </section>
    </>
  );
}
