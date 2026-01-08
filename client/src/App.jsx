import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import Features from './pages/public/Features';
import About from './pages/public/About';
import Contact from './pages/public/Contact';

// Auth Pages
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';

// Admin Pages
import AdminPanel from './pages/admin/AdminPanel';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <Routes>
              {/* Public routes with layout */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Route>

              {/* Auth routes (no layout) */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected dashboard route */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Admin route */}
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
