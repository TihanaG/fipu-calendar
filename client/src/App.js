import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Error, Landing, ProtectedRoute, Register } from './pages'
import {
  Home,
  MultiDatePicker,
  Profile,
  Reports,
  SharedLayout,
} from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="multi-date-picker" element={<MultiDatePicker />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
