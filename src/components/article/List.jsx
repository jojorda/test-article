 import React, { useState, useEffect } from 'react';
import { getArticles, deleteArticle } from '../../api/api';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function MyModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
       style={{margin:"20px"}}
    >
      <Modal.Header closeButton >
       <button style={{padding: "15px", borderRadius: "40px", color:"red",border: "none"}} className='bg-pink btn-lg'><i className="bi bi-trash3-fill"></i></button>
        <Modal.Title id="contained-modal-title-vcenter" style={{padding: "13px"}}>
        Delete Article
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ border: "none" }} >
        <h6>Are you sure you want to delete it? You can’t undo this action.</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={props.onHide}>Cancel</Button>
        <Button variant="danger" onClick={props.onHide}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastPage, setLastPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [path, setPath] = useState('');
  const [total, setTotal] = useState('');
  const [activePage, setActivePage] = useState(currentPage);

  const [modalShow, setModalShow] = useState(false);

  // const showModal = () => {
  //   setModalShow(true);
  // };

  const fetchArticles = async () => {
    const response = await getArticles(activePage, searchTerm);
    setLastPage(response.last_page);
    // setCurrentPage(response.data.current_page);
    // setPath(response.data.path);
    // setTotal(response.data.total);
    // setArticles(response.data.articles);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchArticles();
  };

  const [articleToDelete, setArticleToDelete] = useState(null);

  const showModal = (articleId) => {
    setArticleToDelete(articleId);
    setModalShow(true);
  };

  const handleDelete = async () => {
    if (articleToDelete) {
      await deleteArticle(articleToDelete);
      setArticleToDelete(null);
      setModalShow(false);
      fetchArticles();
    }
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    fetchArticles();
  };
  
  const getPageItems = () => {
    const items = [];

    for (let page = 1; page <= lastPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === activePage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <>
    <div className='card'>
    <div className='card-body'>
      <div className='row'>
      <div className='col-md-8' style={{ display: 'flex', alignItems: 'center' }}>
          <form className='mb-3' onSubmit={handleSearchSubmit} 
            style={{ display: 'flex', alignItems: 'center' }}>
            <i className="bi bi-search" style={{ marginLeft: '20px' }}></i>
            <input
              style={{ border: 'none' }}
              type="text"
              placeholder="Type here to search"
              value={searchTerm}
              onChange={handleSearch}
              className='form-control'
            />
          </form>
        </div>

        <div className='col-md-2'>
          <div className='input-group'>
            <span className="input-group-text" id="calender">
                <i className="bi bi-calendar text-success"></i>
            </span>
            <select className="form-select" aria-label="Select Year">
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </select>
          </div>
        </div>
        <div className='col-md-2'>
          <div className='d-grid gap-2'>
            <Link to='/add/adds' className='btn btn-success btn-sm btn-block p-2'>
                <i className="bi bi-plus"></i> Add
            </Link>
          </div>
        </div>
      </div>      
      <table className='table table-bordered text-center'>
        <thead>
          <tr className='text-center' >
            <th className='text-success col-2'style={{background:"#EEF7EF"}}>Date</th>
            <th className='text-success' style={{background:"#EEF7EF"}}>Title</th>
            <th className='text-success' style={{background:"#EEF7EF"}}>Content</th>
            <th className='text-success col-2' style={{background:"#EEF7EF"}}>Actions</th>
          </tr>
          <tr>
            <td>06 Mar 2023</td>
            <td>Lorem Ipsum</td>
            <td>Lorem Ipsum is simply dummy text of the printing....</td>
            <td>
              <Link to={`add/edit`}style={{borderRadius: "40px", color: "white"}} className='btn btn-warning btn-sm me-1'><i className="bi bi-pencil-square"></i></Link>
              <button style={{borderRadius: "40px"}} onClick={showModal} className='btn btn-danger btn-sm'><i className="bi bi-trash3-fill"></i></button>
            
            </td>
          </tr>
          <tr>
            <td>06 Mar 2023</td>
            <td>Lorem Ipsum</td>
            <td>Lorem Ipsum is simply dummy text of the printing....</td>
            <td>
              <Link to={`add/edit`}style={{borderRadius: "40px", color: "white"}} className='btn btn-warning btn-sm me-1'><i className="bi bi-pencil-square"></i></Link>
              <button style={{borderRadius: "40px"}} onClick={showModal} className='btn btn-danger btn-sm'><i className="bi bi-trash3-fill"></i></button>
            
            </td>
           </tr>
        {articles.map((article, index) => (
        <tr key={index}>
          <td>{moment(article.created_at).format('DD MM YYYY')}</td>
          <td>{article.title}</td>
          <td>{article.content.slice(0, 100)}...</td>
          <td>
            <div className="d-grid gap-2 d-md-block">
              <Link to={`add/edit/` + index} className='btn btn-warning btn-sm me-1'>
                <i className="bi bi-pencil-square"></i>
              </Link>
              <button onClick={() => showModal(article.id)} className='btn btn-danger btn-sm'>
                <i className="bi bi-trash3-fill"></i>
              </button>
            </div>
          </td>
        </tr>
      ))}
        </thead>
        {/* <tbody>
        </tbody> */}
      </table>
      <div className='col-md-12' style={{ display: 'flex', justifyContent: 'end' }}>
        <div className='text-muted mb-3' style={{ marginRight: '20px', margin:'5px' }}>
          Show :  {activePage}  , entries
        </div>
        <div className=''>
          <Pagination style={{borderRadius:'5px'}}>
            <Pagination.First  onClick={() => handlePageChange(1)} />
            <Pagination.Prev style={{ marginLeft: '10px',borderRadius:'5px' }}
              onClick={() => handlePageChange(activePage - 1)}
              disabled={activePage === 1}
            />
            {getPageItems()}
            <Pagination.Next style={{ marginLeft: '10px',borderRadius:'25px' }}
              onClick={() => handlePageChange(activePage + 1)}
              disabled={activePage === lastPage}
            />
            <Pagination.Last style={{ marginLeft: '10px', borderRadius:'5px' }} 
                onClick={() => handlePageChange(lastPage)} />
          </Pagination>
        </div>
      </div>
      </div>
    </div>
    <MyModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
  
}

export default ArticleList;
