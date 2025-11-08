import { BookOpen } from 'lucide-react';
import type { AuthUser } from '../lib/supabase';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: AuthUser | null;
  onLogout: () => void;
}

export default function Header({ currentPage, onNavigate, user, onLogout }: HeaderProps) {
  const isActive = (page: string) => currentPage === page ? 'text-[#004d26] font-semibold' : 'text-gray-700';

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
             <div className="w-12 h-13 bg-[#ffffff] rounded-lg flex items-center justify-center">
              <img src="attachments/logo.png" alt="Logo" />
            </div>

            <div className="text-left">
              <h1 className="text-lg font-bold text-[#004d26]">TechKnots</h1>
              <p className="text-xs text-gray-500">Academy LLP</p>
            </div>
          </button>

          <nav className="flex items-center space-x-8">
            <button
              onClick={() => onNavigate('explore')}
              className={`${isActive('explore')} hover:text-[#004d26] transition-colors font-medium`}
            >
              Explore
            </button>
            <a
              href="mailto:contact@techknots.com"
              className="text-gray-700 hover:text-[#004d26] transition-colors font-medium"
            >
              Contact
            </a>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{user.email}</span>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onNavigate('login')}
                  className={`${isActive('login')} hover:text-[#004d26] transition-colors font-medium`}
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-4 py-2 bg-[#004d26] text-white rounded-lg hover:bg-[#003d1f] transition-colors font-medium shadow-sm hover:shadow-md"
                >
                  Signup
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
