import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout';

import useAppStore from '../logic/stores/AppStore';
import useSiteStore from '../logic/stores/SiteStore';
import WelcomePage from '../pages/WelcomePage';
import BoardListPage from '../pages/BoardListPage';
import BoardPage from '../pages/BoardPage';
import ThreadPage from '../pages/ThreadPage';
import ErrorPage from '../pages/ErrorPage';

function App() {
  const { sites, update } = useSiteStore();

  useEffect(() => {
    update();
  }, [update]);



  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<WelcomePage />} />

          <Route path="/boards" element={<BoardListPage />} />

          <Route path='/view' element={<Navigate to="/boards/" replace />} />
          <Route path='/view/:boardId' element={<BoardPage />} />
          <Route path='/view/:boardId/:threadId' element={<ThreadPage />} />

          <Route path='/error' element={ <ErrorPage />} />
          <Route path='*' element={<Navigate to='/error?msg=404' replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;