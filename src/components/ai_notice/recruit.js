import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../base/header';
import Footer from '../base/footer';
import Sidebar from './sidebar';
import JobCard from './jobcard';
import '../../components/style/recruit.css';
import allRecruits from '../../json_data/recruit.json';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const gridTemplateColumns = 'repeat(2, 1fr)';

function Recruit() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecruits, setFilteredRecruits] = useState([]);
  const [inputPage, setInputPage] = useState('1');
  const [searchResultMessage, setSearchResultMessage] = useState('');
  const [selectedPositions, setSelectedPositions] = useState([]);
  const searchInputRef = useRef(null);
  const pageInputRef = useRef(null);

  const itemsPerPage = 4;

  useEffect(() => {
    const newFilteredRecruits = allRecruits.filter((recruit) => {
      const recruitTitle = recruit.title.toLowerCase();
      const recruitPosition = recruit.position.toLowerCase();
      return (
        recruitTitle.includes(searchQuery.toLowerCase()) &&
        (selectedPositions.length === 0 || selectedPositions.includes(recruit.position))
      );
    });
    setFilteredRecruits(newFilteredRecruits);
    setCurrentPage(1);

    if (newFilteredRecruits.length === 0) {
      setSearchResultMessage('검색된 공고가 없습니다.');
    } else {
      setSearchResultMessage('');
    }
  }, [searchQuery, selectedPositions]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setInputPage((prevPage) => (prevPage - 1).toString());
    }
  };

  const totalPages = Math.ceil(filteredRecruits.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      setInputPage((prevPage) => (parseInt(prevPage) + 1).toString());
    }
  };

  const handleSearch = () => {
    setSearchResultMessage('');
    const newFilteredRecruits = allRecruits.filter((recruit) => {
      const recruitTitle = recruit.title.toLowerCase();
      const recruitPosition = recruit.position.toLowerCase();
      return (
        recruitTitle.includes(searchQuery.toLowerCase()) &&
        (selectedPositions.length === 0 || selectedPositions.includes(recruit.position))
      );
    });
    setFilteredRecruits(newFilteredRecruits);
    setCurrentPage(1);

    if (newFilteredRecruits.length === 0) {
      setSearchResultMessage('검색된 공고가 없습니다.');
    } else {
      setSearchResultMessage('');
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
    setFilteredRecruits(allRecruits);
  }, []);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setInputPage(pageNumber.toString());
    }
  };

  const handleFilterChange = (selectedPositions) => {
    setSelectedPositions(selectedPositions);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleRecruits = filteredRecruits.slice(startIndex, endIndex);

  const renderJobCards = () => {
    return visibleRecruits.map((recruit) => (
      <JobCard
        key={recruit.id}
        title={recruit.title}
        position={recruit.position}
        inner_company={recruit.inner_company} // 수정된 부분
        address={recruit.address}
        stack={recruit.stack}
        site={recruit.site}
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
          <Sidebar
            allPositions={Array.from(new Set(allRecruits.map((recruit) => recruit.position)))}
            selectedPositions={selectedPositions}
            handleFilterChange={handleFilterChange}
          />
        </div>
        <div className="content-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              ref={searchInputRef}
            />
            {/* <button onClick={handleSearch}>검색</button> */}
          </div>
          <div className="search-result-message">{searchResultMessage}</div>
          <div className="grid-container" style={{ gridTemplateColumns }}>
            {renderJobCards()}
          </div>
          {renderPagination()}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Recruit;
