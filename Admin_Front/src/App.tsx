import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import AdminList from './pages/ManagerList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/adminList' element={<AdminList />} />
        {/* 필요에 따라 추가 라우트 작성 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
