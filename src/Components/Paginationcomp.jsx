import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Paginationcomp = ({count ,func}) => {
  return (
    <Stack spacing={2}>
      <Pagination count={count} variant="outlined" shape="rounded"
       onChange={func}
      />
    </Stack>
  );
};

export default Paginationcomp;
