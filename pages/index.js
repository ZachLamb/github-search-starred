// import GitHubIcon from '@mui/icons-material/GitHub';
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import ClientOnly from "../components/ClientOnly";
import ReposList from "../components/ReposList";
import { Autocomplete, Button, Container, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRef, useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

const FINDREPOS = gql`
  query FindRepos($user_name: String!) {
    search(query: $user_name, type: REPOSITORY, first: 10) {
      edges {
        node {
          ... on Repository {
            name
            stargazerCount
            url
            id
          }
        }
      }
    }
  }
`;

export default function Home() {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [repoData, setRepoData] = useState({});
  // const loaded = useRef(false);
  const [loaded, setLoaded] = useState(false);

  const [getGithubRepos, { loading, data, error }] = useLazyQuery(FINDREPOS, {
    onCompleted: (repos) => {
      setRepoData(repos);
      setLoaded(true);
    },
  });

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
        <Container
        sx={{ 
          display: 'flex',
          justifyContent: 'space-between'
        }}
        maxWidth='md'
        >
          <Autocomplete
            id="search-github-user"
            sx={{
              width: '80%'
            }}
            freeSolo
            options={options}
            autoComplete
            includeInputInList
            size={'small'}
            value={value}
            onChange={(event, newValue) => {
              setOptions(newValue ? [newValue, ...options] : options);
              setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              const orgInput = `org:${newInputValue}`;
              setInputValue(orgInput);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Search for a user" fullWidth />
            )}
            filterOptions={(x) => x}
          ></Autocomplete>
          <Button
            variant="outlined"
            endIcon={<SearchIcon />}
            onClick={() =>
              getGithubRepos({
                variables: { user_name: inputValue },
              })
            }
          >
            Search
          </Button>
        </Container>
        <ReposList repoData={repoData} loaded={loaded}></ReposList>
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
