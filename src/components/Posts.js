import React from "react";
import { useEffect, useState } from "react";
import Items from "./Items";
import ReactPaginate from "react-paginate";

const Posts = ({ posts, loading, itemsPerPage, blank }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  // console.log(posts);

  useEffect(() => {
    // console.log(itemOffset);
    // console.log(typeof itemOffset);
    // console.log(itemsPerPage);
    // console.log(typeof itemsPerPage);

    const endOffset = itemOffset + Number(itemsPerPage);
    // console.log(endOffset);
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(posts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(posts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, posts]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % posts.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (blank) {
    return <div>Please enter language or name.</div>;
  }

  return (
    <div>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Posts;
