import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';

// Main pages
import Home from './pages/main/Home';
import About from './pages/main/About';
import Organizations from './pages/main/Organizations';

// Auth pages
import LoginSelection from './pages/auth/LoginSelection';
import RegisterSelection from './pages/auth/RegisterSelection';
import VolunteerLogin from './pages/auth/VolunteerLogin';
import VolunteerRegister from './pages/auth/VolunteerRegister';
import OrgLogin from './pages/auth/OrgLogin';
import OrgRegister from './pages/auth/OrgRegister';

// Legal pages
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import Terms from './pages/legal/Terms';
import ContactSupport from './pages/legal/ContactSupport';
import VolunteerGuidelines from './pages/legal/VolunteerGuidelines';

// Organizer Portal
import OrganizerDashboard from './pages/organizer_portal/OrganizerDashboard';
import OrganizerManageEvents from './pages/organizer_portal/OrganizerManageEvents';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Main */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="organizations" element={<Organizations />} />
          
          {/* Auth */}
          <Route path="auth/login" element={<LoginSelection />} />
          <Route path="auth/register" element={<RegisterSelection />} />
          <Route path="auth/volunteer-login" element={<VolunteerLogin />} />
          <Route path="auth/volunteer-register" element={<VolunteerRegister />} />
          <Route path="auth/org-login" element={<OrgLogin />} />
          <Route path="auth/org-register" element={<OrgRegister />} />
          
          {/* Legal */}
          <Route path="legal/privacy" element={<PrivacyPolicy />} />
          <Route path="legal/terms" element={<Terms />} />
          <Route path="legal/support" element={<ContactSupport />} />
          <Route path="legal/guidelines" element={<VolunteerGuidelines />} />
        </Route>

        {/* Organizer Portal */}
        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
        <Route path="/organizer/manage-events" element={<OrganizerManageEvents />} />

      </Routes>
    </Router>
  );
}

export default App;

