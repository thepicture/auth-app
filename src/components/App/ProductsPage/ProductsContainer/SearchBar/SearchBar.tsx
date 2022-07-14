import { Card, TextField } from "@mui/material";
import { ChangeEvent, useEffect } from "react";

export interface SearchBarProps {
  target: Array<any>;
  onQueryChange: (query: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  useEffect(() => {
    props.onQueryChange("");
  }, []);

  return (
    <Card
      sx={{
        margin: "1em auto",
        padding: "2em 0",
        width: "50%",
        display: "flex",
        justifyContent: "center",
      }}
      elevation={4}
    >
      <TextField
        onChange={(e) => props.onQueryChange(e.target.value)}
        placeholder="Search by title"
        variant="standard"
      />
    </Card>
  );
};

export default SearchBar;
