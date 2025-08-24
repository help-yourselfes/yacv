import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout';

import WelcomePage from '../pages/WelcomePage';
import BoardListPage from '../pages/BoardListPage';
import BoardPage from '../pages/BoardPage';
import ThreadPage from '../pages/ThreadPage';
import ErrorPage from '../pages/ErrorPage';

function App() {
  
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<WelcomePage />} />

          <Route path='/view/:siteId' element={<BoardListPage />} />
          <Route path='/view/:siteId/:boardId' element={<BoardPage />} />
          <Route path='/view/:siteId/:boardId/:threadId' element={<ThreadPage />} />

          <Route path='/error' element={ <ErrorPage />} />
          <Route path='*' element={<Navigate to='/error?msg=404' replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;