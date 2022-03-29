import { Button, Container, TextField } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

import { useLazyQuery, gql } from "@apollo/client";

import styles from "../styles/Home.module.css";

const NEXTREPOS = gql`
  query FindRepos($user_name: String!, $after_node: String!) {
    search(query: $user_name, type: REPOSITORY, first: 10, after: $after_node) {
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

const PREVREPOS = gql`
  query FindRepos($user_name: String!, $before_node: String!) {
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

export default function Pagination(props) {
  const [getNextGithubRepos, { loading: nextLoading, data: nextData, error: nextError }] = useLazyQuery(
    NEXTREPOS,
    {
      onCompleted: (repos) => {
        const newPage = props.pageCount + 1;
        props.setPageCount(newPage);
        props.setLoaded(false);
        props.setRepoData(repos);
        props.setHasPrevPage(false);
        props.setHasNextPage(!repos.search.pageInfo.hasNextPage);
        props.setPrevPage(repos.search.pageInfo.startCursor);
        props.setNextPage(repos.search.pageInfo.endCursor);
        props.setLoaded(true);
      },
    }
  );

  const [getPrevGithubRepos, { loading: prevLoading, data: prevData, error: prevError }] = useLazyQuery(
    NEXTREPOS,
    {
      onCompleted: (repos) => {
        const newPage = props.pageCount - 1;
        props.setPageCount(newPage);
        props.setLoaded(false);
        props.setRepoData(repos);

        if(newPage < 2){
            props.setHasPrevPage(true);
        }
        else{
            props.setHasPrevPage(false);
        }
        props.setHasNextPage(!repos.search.pageInfo.hasNextPage);
        props.setPrevPage(repos.search.pageInfo.startCursor);
        props.setNextPage(repos.search.pageInfo.endCursor);
        props.setLoaded(true);
      },
    }
  );
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
      maxWidth="md"
    >
      <Button
        variant="outlined"
        endIcon={<ArrowBack />}
        disabled={props.hasPrevPage}
        onClick={() =>
            getPrevGithubRepos({
              variables: { 
                  user_name: props.inputValue,
                  before_node: props.prevPage
              },
            })
          }
      >
        Previous
      </Button>
      <Button
        variant="outlined"
        endIcon={<ArrowForward />}
        disabled={props.hasNextPage}
        onClick={() =>
            getNextGithubRepos({
              variables: { 
                  user_name: props.inputValue,
                  after_node: props.nextPage
              },
            })
          }
      >
        Next
      </Button>
    </Container>
  );
}
