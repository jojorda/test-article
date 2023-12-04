import React, { useState } from 'react';
import { createArticle } from '../../api/api';
import { useNavigate } from 'react-router-dom';

function ArticleCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const articleData = {
      title,
      content
    };
    await createArticle(articleData);
    setTitle('');
    setContent('');
    navigate('/');
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <h4 className='card-title'>Add Article</h4>
        <hr />
        <div className='row'>
          <form onSubmit={handleSubmit}>
            <div className='col-md-6'>
              <div className='mb-2'>
                <h5 style={{ fontFamily: 'Open Sans' }}>Title</h5>
                <input
                  onChange={handleTitle}
                  style={{ backgroundColor: "#F7F7F7", height: "60px" }}
                  className='form-control'
                  type="text"
                  name='title'
                  value={title}
                />
              </div>
            </div>
            <div className='mb-2'>
              <h5 style={{ marginTop: "20px", fontFamily: 'Open Sans' }}>
                Content
              </h5>
              <textarea
                onChange={handleContent}
                style={{ backgroundColor: "#F7F7F7", marginTop: "10px" }}
                className='form-control'
                rows="5"
                value={content}
                name='content'
              ></textarea>
            </div>
            <button
              style={{ marginTop: "20px", width: "90px" }}
              type="submit"
              className='btn btn-success'
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ArticleCreate;
