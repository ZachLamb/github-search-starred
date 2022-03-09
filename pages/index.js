// import GitHubIcon from '@mui/icons-material/GitHub';
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import ClientOnly from "../components/ClientOnly";
import ReposList from "../components/ReposList";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Zachs Github Starred Search</title>
        <meta
          name="search for Github Starred Projects"
          content="Created using ReactJS via NextJS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Search for Starred Github Projects</h1>
        {/* TODO: Convert this to Material UI Autocomplete search bar */}
        <form id="form" role="search">
          <input
            type="search"
            id="query"
            name="github-search"
            placeholder="Search Starred Repos..."
            aria-label="Search through Github Starred Repositories"
          />
          <button>Search</button>
        </form>

        <ReposList userName="org:Facebook"></ReposList>

        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}