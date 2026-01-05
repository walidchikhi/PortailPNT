import React, { useState } from 'react';
import { User, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import logo from './assets/logo.png';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay for a smoother feel
        setTimeout(() => {
            if (
                (username === 'admin' && password === 'admin')
            ) {
                let name = 'Utilisateur';
                if (username === 'admin') name = 'Administrateur';
                onLogin({ username, name });
            } else {
                setError('Nom d\'utilisateur ou mot de passe incorrect');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[100px] animate-pulse delay-1000"></div>
            </div>

            <div className="w-full max-w-md p-8 relative z-10">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-8 sm:p-10">
                        <div className="flex flex-col items-center mb-10">
                            <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-white/10">
                                <img
                                    src={logo}
                                    alt="Météo Algérie"
                                    className="w-16 h-16 object-contain"
                                />
                            </div>
                            <h2 className="text-3xl font-bold text-white tracking-tight text-center">
                                Bienvenue
                            </h2>
                            <p className="text-blue-200 mt-2 text-center text-sm">
                                Connectez-vous au Portail DEM
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-blue-200 uppercase tracking-wider ml-1">
                                    Nom d'utilisateur
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-blue-300 group-focus-within:text-white transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 sm:text-sm"
                                        placeholder="Entrez votre identifiant"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-blue-200 uppercase tracking-wider ml-1">
                                    Mot de passe
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-blue-300 group-focus-within:text-white transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 sm:text-sm"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm animate-shake">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Se connecter
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="px-8 py-4 bg-black/20 border-t border-white/5 text-center">
                        <p className="text-xs text-blue-300/60">
                            © {new Date().getFullYear()} Direction de l'Exploitation Météorologique
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
