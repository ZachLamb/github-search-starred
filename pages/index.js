// import GitHubIcon from '@mui/icons-material/GitHub';
import Head from "next/head";
import Image from "next/image";

import { useRef, useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

import ClientOnly from "../components/ClientOnly";
import ReposList from "../components/ReposList";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

import { Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [repoData, setRepoData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [prevPage, setPrevPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [hasPrevPage, setHasPrevPage] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageCount, setPageCount] = useState(1);

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
        <SearchBar
          setRepoData={setRepoData}
          setHasPrevPage={setHasPrevPage}
          setHasNextPage={setHasNextPage}
          setPrevPage={setPrevPage}
          setNextPage={setNextPage}
          setLoaded={setLoaded}
          options={options}
          setOptions={setOptions}
          value={value}
          setValue={setValue}
          inputValue={inputValue}
          setInputValue={setInputValue}
        ></SearchBar>
        <ReposList repoData={repoData} loaded={loaded}></ReposList>
        <Pagination
          pageCount={pageCount}
          setPageCount={setPageCount}
          nextPage={nextPage}
          prevPage={prevPage}
          setRepoData={setRepoData}
          setHasPrevPage={setHasPrevPage}
          setHasNextPage={setHasNextPage}
          setPrevPage={setPrevPage}
          setNextPage={setNextPage}
          setLoaded={setLoaded}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
          inputValue={inputValue}
        ></Pagination>
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
