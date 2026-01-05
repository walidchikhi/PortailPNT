import React, { useState, useEffect } from 'react';
import {
  Book, CheckCircle, BarChart2, Factory, Satellite, Monitor,
  Flame, Plane, Thermometer, Server, AlertTriangle, MessageSquare,
  Globe, Languages, Radio, LayoutDashboard, Star, Search, LogOut, User, CloudSun
} from "lucide-react";
import { apps } from "./apps";
import logoLeft from "./assets/logo.png";
import logoRight from "./assets/logo.png";
import Login from './Login';

const IconMap = {
  Book, CheckCircle, BarChart2, Factory, Satellite, Monitor,
  Flame, Plane, Thermometer, Server, AlertTriangle, MessageSquare,
  Globe, Languages, Radio, LayoutDashboard, CloudSun
};

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pnt-user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load favorites from API
  useEffect(() => {
    if (user) {
      fetch(`/api/favorites/${user.username}`)
        .then(res => res.json())
        .then(data => setFavorites(data))
        .catch(err => console.error("Error fetching favorites:", err));
    }
  }, [user]);

  // Save favorites to API
  useEffect(() => {
    if (user) {
      fetch(`/api/favorites/${user.username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorites })
      }).catch(err => console.error("Error saving favorites:", err));
    }
  }, [favorites, user]);

  // Persist user session
  useEffect(() => {
    if (user) {
      localStorage.setItem('pnt-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pnt-user');
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setFavorites([]);
    setActiveTab('all');
  };

  const toggleFavorite = (appId) => {
    setFavorites(prev =>
      prev.includes(appId)
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || favorites.includes(app.id);
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-white opacity-70"></div>

      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-all duration-200"
              placeholder="Rechercher une application..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredApps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                isFavorite={favorites.includes(app.id)}
                onToggleFavorite={() => toggleFavorite(app.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">Aucune application trouvée</h3>
            <p className="mt-1 text-slate-500">Essayez de modifier vos critères de recherche ou d'ajouter des favoris.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function Header({ user, onLogout }) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <img
              src={logoLeft}
              alt="Logo PNT"
              className="h-10 w-auto object-contain"
            />
            <div className="hidden md:block w-px h-8 bg-slate-200 mx-2"></div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-900 tracking-tight">
                Portail De la DEM
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">
                Direction de l'Exploitation Metéorologie
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                <User className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-700">{user.name}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Connecté</span>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
              title="Se déconnecter"
            >
              <LogOut className="w-5 h-5" />
            </button>

            <div className="hidden sm:block w-px h-8 bg-slate-200 mx-2"></div>

            <img
              src={logoRight}
              alt="Logo Météo"
              className="h-10 w-auto object-contain opacity-90 hidden sm:block"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="flex p-1 space-x-1 bg-slate-200/50 rounded-xl w-fit">
      <button
        onClick={() => setActiveTab('all')}
        className={`
          flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
          ${activeTab === 'all'
            ? 'bg-white text-blue-700 shadow-sm ring-1 ring-black/5'
            : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}
        `}
      >
        <LayoutDashboard className="w-4 h-4" />
        Toutes les applications
      </button>
      <button
        onClick={() => setActiveTab('favorites')}
        className={`
          flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
          ${activeTab === 'favorites'
            ? 'bg-white text-yellow-600 shadow-sm ring-1 ring-black/5'
            : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}
        `}
      >
        <Star className={`w-4 h-4 ${activeTab === 'favorites' ? 'fill-current' : ''}`} />
        Favoris
      </button>
    </div>
  );
}

function AppCard({ app, isFavorite, onToggleFavorite }) {
  const Icon = IconMap[app.icon] || Book;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden">
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite();
          }}
          className={`
            p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            ${isFavorite
              ? 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100'
              : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'}
          `}
          title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <a
        href={app.url}
        target={app.external ? "_blank" : undefined}
        rel={app.external ? "noopener noreferrer" : undefined}
        className="flex-1 flex flex-col p-6"
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mb-5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
          <Icon className="w-7 h-7" strokeWidth={1.5} />
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
          {app.name}
        </h3>

        <p className="text-sm text-slate-500 leading-relaxed flex-1">
          {app.description}
        </p>

        <div className="mt-5 flex items-center text-sm font-medium text-blue-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Ouvrir l'application
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Direction de l'Exploitation Metéorologie.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Aide</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
