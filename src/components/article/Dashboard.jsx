import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ArticleList from './List';
import ArticleCreate from './Create';

function Article() {
    return (
      <Router>
        <nav>
            <ul>
                <li><Link to="/">List</Link></li>
                <li><Link to="/adds">Add</Link></li>
            </ul>
        </nav>
        <Routes>
            <Route exact path='/' element={<ArticleList />}></Route>
            <Route exact path='/adds' element={<ArticleCreate />}></Route>
        </Routes>
      </Router>
    );
  }
  
  export default Article;