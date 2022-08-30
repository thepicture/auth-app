import { useEffect } from "react";

import { Card, TextField } from "@mui/material";

import styles from "./SearchBar.module.css";

export interface SearchBarProps {
  target: Array<any>;
  onQueryChange: (query: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  useEffect(() => {
    props.onQueryChange("");
  }, [props]);

  return (
    <Card className={styles.Card} elevation={4}>
      <TextField
        onChange={(e) => props.onQueryChange(e.target.value)}
        placeholder="Search by title"
        variant="standard"
      />
    </Card>
  );
};

export default SearchBar;
