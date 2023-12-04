import React, { useEffect, useState } from 'react';
import {getOneArticles, createArticle, updateArticle, deleteArticle, } from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';

function ArticleEdit() {
    let { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const getOneData = async () => {
      const response = await getOneArticles(id);
      setTitle(response.data.title);
      setContent(response.data.content);
    }
    
    useEffect(() => {
      getOneData();
    });

    const handleTitle = (e) => {
      e.preventDefault();
      setTitle(e.target.value);
    };
  
    const handleContent = (e) => {
      setContent(e.target.value);
    };


    const handleEdit = async (e) => {
      e.preventDefault();
      const articleData = {
        title,
        content
      };
      await updateArticle(articleData, id);
      navigate('/');
      setTitle('');
      setContent('');
    };

    const handleDelete = async (e) => {
      await deleteArticle(id);
      navigate('/');
    }
  
      return (
        <div className='card'>
        <div className='card-body'>
          <h4 className='card-title'>Edit #{id}</h4>
          <hr />
          <div className='row'>
            <div className='col-md-6'>
              <form onSubmit={handleEdit}>
              <div className='mb-2'>
                <input
                  className='form-control'
                  type="text"
                  placeholder="Judul"
                  value={title}
                  onChange={handleTitle}
                />
              </div>
              <div className='mb-2'>
                <textarea
                  className='form-control'
                  placeholder="Konten"
                  rows="15"
                  value={content}
                  onChange={handleContent}
                ></textarea>
              </div>
              <button
                type="submit" 
                className='btn btn-success me-3'>Save</button>
              <button type="button" 
                onClick={handleDelete} 
                className='btn btn-danger'>Delete</button>
            </form>
            </div>
          </div>
        </div>
      </div>
      );
}

export default ArticleEdit;