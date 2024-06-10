import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import './style.scss';

interface PropsDataSerch {
  search: string;
  hendelChange: any;
}

function Index({ search, hendelChange }: PropsDataSerch) {
  return (
    <div className="w-96">
      <Paper
        component="form"
        sx={{ p: "2px 4px", width: 400, alignItems: "center", display: "flex" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          value={search}
          onChange={hendelChange}
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search" className="search-button">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

export default Index;
