import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Hero3D } from './components/Hero3D';
import { MenuGallery3D } from './components/MenuGallery3D';
import { Philosophy } from './components/Philosophy';
import { FloatingBookButton, ExperienceCTA } from './components/ExperienceCTA';
import { Footer } from './components/Footer';
import { DishModal } from './components/DishModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LoginPage } from './components/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import type { Dish } from './data/mockData';

// Main Landing Page with 3D Effects
const LandingPage = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);

  const handleDishClick = (dish: Dish) => {
    setSelectedDish(dish);
    setIsDishModalOpen(true);
  };

  const scrollToMenus = () => {
    const element = document.querySelector('#menus');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navigation onBookClick={() => setIsBookingOpen(true)} />
      
      <main>
        <Hero3D onExploreClick={scrollToMenus} />
        <MenuGallery3D onDishClick={handleDishClick} />
        <Philosophy />
      </main>

      <Footer />

      {/* Floating Book Button */}
      <FloatingBookButton onClick={() => setIsBookingOpen(true)} />

      {/* Modals */}
      <ExperienceCTA isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <DishModal 
        dish={selectedDish} 
        isOpen={isDishModalOpen} 
        onClose={() => setIsDishModalOpen(false)} 
      />
    </div>
  );
};

// App Component with Routing
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
