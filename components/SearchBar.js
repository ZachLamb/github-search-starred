import { Autocomplete, Button, Container, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useLazyQuery, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";

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
      pageInfo {
        startCursor
        hasPreviousPage
        hasNextPage
        endCursor
      }
    }
  }
`;

export default function SearchBar(props) {

    const [getGithubRepos, { loading, data, error }] = useLazyQuery(FINDREPOS, {
        onCompleted: (repos) => {
            props.setRepoData(repos);
            props.setHasPrevPage(!repos.search.pageInfo.hasPrevPage);
            props.setHasNextPage(!repos.search.pageInfo.hasNextPage);
            props.setPrevPage(repos.search.pageInfo.startCursor);
            props.setNextPage(repos.search.pageInfo.endCursor);
            props.setLoaded(true);
        },
        });

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
      maxWidth="md"
    >
      <Autocomplete
        id="search-github-user"
        sx={{
          width: "80%",
        }}
        freeSolo
        options={props.options}
        autoComplete
        includeInputInList
        size={"small"}
        value={props.value}
        onChange={(event, newValue) => {
          props.setOptions(newValue ? [newValue, ...options] : options);
          props.setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          const orgInput = `org:${newInputValue}`;
          props.setInputValue(orgInput);
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
            variables: { 
                user_name: props.inputValue
            },
          })
        }
      >
        Search
      </Button>
    </Container>
  );
}
