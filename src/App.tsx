import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Stats } from './pages/Stats';
import { NotFound } from './pages/NotFound';
import { Footer } from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;