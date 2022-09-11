import { Pagination, Box } from '@mui/material';

const PaginationComponent = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box>
      <Pagination
        onChange={(event, page) => paginate(page)}
        count={pageNumbers.length}
        color="primary"
        shape="rounded"
      />
    </Box>
  );
};

export default PaginationComponent;
