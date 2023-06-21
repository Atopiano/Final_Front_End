import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../base/header';
import Footer from '../base/footer';
import Sidebar from './sidebar';
import JobCard from './jobcard';
import '../../components/style/recruit.css';
import allStacks from '../../json_data/recruit.json';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Color } from 'three';

const gridTemplateColumns = 'repeat(3, 1fr)';

function Notice() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStacks, setFilteredStacks] = useState([]);
  const [inputPage, setInputPage] = useState('1');
  const [searchResultMessage, setSearchResultMessage] = useState('');
  const searchInputRef = useRef(null);
  const pageInputRef = useRef(null);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredStacks.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setInputPage((prevPage) => (prevPage - 1).toString());
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      setInputPage((prevPage) => (parseInt(prevPage) + 1).toString());
    }
  };
  

  const handleSearch = () => {
    setSearchResultMessage('');
    const newFilteredStacks = allStacks.filter((stack) => {
      const stackTitle = stack.title.toLowerCase();
      const stackPosition = stack.position.toLowerCase();
      return (
        stackTitle.includes(searchQuery.toLowerCase()) || stackPosition.includes(searchQuery.toLowerCase())
      );
    });
    setFilteredStacks(newFilteredStacks);
    setCurrentPage(1);

    if (newFilteredStacks.length === 0) {
      setSearchResultMessage('검색된 공고가 없습니다.');
    }
  };

  const handlePageInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handlePageInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      let newPage = parseInt(inputPage);
      if (newPage < 1) {
        newPage = 1;
      } else if (newPage > totalPages) {
        newPage = totalPages;
      }
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    if (searchInputRef.current && searchInputRef.current === document.activeElement) {
      const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      };
      document.addEventListener('keydown', handleSearchKeyPress);
      return () => {
        document.removeEventListener('keydown', handleSearchKeyPress);
      };
    }
  }, [searchQuery]);

  useEffect(() => {
    if (pageInputRef.current && pageInputRef.current === document.activeElement) {
      const handlePageInputKeyPress = (e) => {
        if (e.key === 'Enter') {
          handlePageChange();
        }
      };
      document.addEventListener('keydown', handlePageInputKeyPress);
      return () => {
        document.removeEventListener('keydown', handlePageInputKeyPress);
      };
    }
  }, []);

  useEffect(() => {
    setFilteredStacks(allStacks);
  }, []);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setInputPage(pageNumber.toString());
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleStacks = filteredStacks.slice(startIndex, endIndex);

  const renderJobCards = () => {
    return visibleStacks.map((stack) => (
      <JobCard
        key={stack.id}
        title={stack.title}
        position={stack.position}
        address={stack.address}
        stack={stack.stack}
        site={stack.site}
      />
    ));
  };

  const renderPagination = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    const maxPageNumbersToShow = 9;
    const maxPageNumbersPerSide = 4;

    let startPage = currentPage - maxPageNumbersPerSide;
    let endPage = currentPage + maxPageNumbersPerSide;

    if (startPage <= 0) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    const visiblePageNumbers = pageNumbers.slice(startPage - 1, startPage - 1 + maxPageNumbersToShow);

    return (
      <div className="pagination">
        <Button variant="primary" disabled={currentPage === 1} onClick={handlePreviousPage}>
          이전
        </Button>
        <span>
          {visiblePageNumbers.map((pageNumber) => (
            <Link
              key={pageNumber}
              to="#"
              className={`pagination-link ${currentPage === pageNumber ? 'active' : ''}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </Link>
          ))}
        </span>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={inputPage}
          onChange={handlePageInputChange}
          onKeyPress={handlePageInputKeyPress}
          ref={pageInputRef}
        />
        <Button variant="primary" disabled={currentPage === totalPages} onClick={handleNextPage}>
          다음
        </Button>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="recruit-container">
        <div className="sidebar-container">
        <h1>채용 공고</h1>          
          <Sidebar />
        </div>
        <div className="content-container">
          <div className="search-container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <input
              type="text"
              placeholder="검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              ref={searchInputRef}
            />
            <button onClick={handleSearch}>검색</button>
          </div>
          <div className="search-result-message">{searchResultMessage}</div>
          <div className="grid-container job-card-grid" style={{ gridTemplateColumns }}>
            {renderJobCards()}
          </div>
          {renderPagination()}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Notice;
