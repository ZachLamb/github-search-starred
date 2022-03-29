import { Icon, List, ListItem, ListItemButton } from "@mui/material";
import styles from "../styles/Home.module.css";

export default function ReposList(repoData,loaded,error) {

  if (error) {
    // TODO: Convert this to Toast Message
    console.error(error);
    return null;
  }
  if(repoData.loaded){
    return (
      <List>
        {repoData?.repoData.search.edges.map((edge,i) => {
          const repo = edge.node;
          return (
            <ListItem key={repo.id + " " + i}>
              <ListItemButton component="a" href={repo.url} target="_blank">
                <Icon></Icon>{repo.name}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
  }
  else{
    return(
      <div></div>
    )
  }
}
