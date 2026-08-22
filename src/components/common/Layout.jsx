import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();

  return (
    <div className={`flex flex-col pt-16 w-full min-h-screen`}>
      <Navbar />
      <main className={`flex-grow flex flex-col w-full h-full`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;


