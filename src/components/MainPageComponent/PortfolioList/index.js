import React, { useState, useEffect, memo } from "react";
import Portfolio from "components/common/Portfolio";
import Pagination from "components/common/Pagination";

import { portfolioApi } from "shared/Api";

const PortfolioList = memo(() => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchPortfolioList() {
      setIsLoading(true);
      try {
        const result = await portfolioApi.get("/");

        // console.log(result);

        setList(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPortfolioList();
  }, []);

  // console.log(list);

  // pagination
  let postsPerPage = 10;
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFist = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFist, indexOfLast);
    return currentPosts;
  }

  return (
    <>
      <div className="portfolio_list">
        {isLoading && <div className="loader" />}
        {list &&
          currentPosts(list).map((item, i) => (
            <a key={i} href={item.url} target="black">
              <Portfolio
                title={item.title}
                comment={item.comment}
                img_url={item.img_url}
                url={item.url}
              />
            </a>
          ))}
      </div>
      <Pagination
        postsPerpage={postsPerPage}
        totalPosts={list.length}
        paginate={setCurrentPage}
      />
    </>
  );
});

export default PortfolioList;
