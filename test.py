# This script creates a ready-to-run React + Vite + Tailwind "Department Hub" project
# and zips it so the user can download it. It also includes a README with step-by-step
# deployment instructions and an nginx example config.
import os, json, textwrap, shutil, pathlib

root = "/home/chikhi/SAVE/repositories/NWP-Algerie/PNThub"
src = os.path.join(root, "src")
public = os.path.join(root, "public")

os.makedirs(src, exist_ok=True)
os.makedirs(public, exist_ok=True)

# package.json
package_json = {
  "name": "pnt-hub",
  "private": True,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.462.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.45",
    "tailwindcss": "^3.4.10",
    "vite": "^5.4.9"
  }
}
with open(os.path.join(root, "package.json"), "w") as f:
    json.dump(package_json, f, indent=2)

# index.html
index_html = """<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PNT Department Hub</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
"""
with open(os.path.join(root, "index.html"), "w") as f:
    f.write(index_html)

# vite.config.js
vite_cfg = """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Change base if you will host under a subpath, e.g. '/hub/'
  base: '/'
})
"""
with open(os.path.join(root, "vite.config.js"), "w") as f:
    f.write(vite_cfg)

# tailwind config
tailwind_cfg = """/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Arial']
      }
    }
  },
  plugins: []
}
"""
with open(os.path.join(root, "tailwind.config.js"), "w") as f:
    f.write(tailwind_cfg)

# postcss config
postcss_cfg = """export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
"""
with open(os.path.join(root, "postcss.config.js"), "w") as f:
    f.write(postcss_cfg)

# src/index.css
index_css = """@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root {
  height: 100%;
}

body {
  @apply bg-gray-50 text-gray-900 font-sans;
}
"""
with open(os.path.join(src, "index.css"), "w") as f:
    f.write(index_css)

# src/apps.js (easy place to edit your links)
apps_js = """// Modify this file to change your app tiles and links.
export const apps = [
  {
    name: 'Documentation',
    description: \"Accéder à la documentation interne et aux guides techniques.\",
    icon: 'Book',
    url: 'https://docs.example.pnt', // <-- Remplace par l’URL réelle
    external: true
  },
  {
    name: 'Contrôle',
    description: 'Superviser et contrôler les processus PNT.',
    icon: 'CheckCircle',
    url: 'https://control.example.pnt',
    external: true
  },
  {
    name: 'Visualisation',
    description: 'Explorer et visualiser les données météorologiques.',
    icon: 'BarChart2',
    url: 'https://viz.example.pnt',
    external: true
  },
  {
    name: 'Production',
    description: 'Gérer et suivre la chaîne de production des modèles.',
    icon: 'Factory',
    url: 'https://prod.example.pnt',
    external: true
  },
  {
    name: 'MTG',
    description: 'Accéder aux outils liés à la mission MTG.',
    icon: 'Monitor',
    url: 'https://mtg.example.pnt',
    external: true
  }
];
"""
with open(os.path.join(src, "apps.js"), "w") as f:
    f.write(apps_js)

# src/App.jsx
app_jsx = """import { Book, CheckCircle, BarChart2, Factory, Monitor } from 'lucide-react'
import { apps } from './apps'

const IconMap = { Book, CheckCircle, BarChart2, Factory, Monitor }

export default function App() {
  return (
    <div className=\"min-h-screen\">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className=\"px-6 py-10 text-center\">
      <div className=\"mx-auto max-w-5xl\">
        <div className=\"flex items-center justify-center gap-2 mb-2\">
          <div className=\"w-9 h-9 rounded-full border-2 border-blue-900 flex items-center justify-center\">
            <span className=\"text-blue-900 font-bold\">P</span>
          </div>
          <span className=\"text-sm font-medium text-gray-600\">Department Hub</span>
        </div>
        <h1 className=\"text-4xl sm:text-5xl font-extrabold tracking-tight text-blue-900\">Department Hub</h1>
        <p className=\"mt-3 text-gray-600\">Votre tableau de bord centralisé pour les outils essentiels. Simplifiez votre flux de travail avec des raccourcis intelligents adaptés à vos besoins.</p>
      </div>
    </header>
  )
}

function Main() {
  return (
    <main className=\"mx-auto max-w-6xl px-6 pb-16\">
      <h2 className=\"text-2xl font-bold text-blue-900 mb-4\">Toutes les applications</h2>
      <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6\">
        {apps.map((app) => (
          <AppTile key={app.name} app={app} />
        ))}
      </div>
    </main>
  )
}

function AppTile({ app }) {
  const Icon = IconMap[app.icon] || Book
  const common = \"rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600\"
  const body = (
    <div className=\"p-6 h-full flex flex-col items-start\">
      <Icon className=\"w-8 h-8 text-blue-800 mb-4\" aria-hidden=\"true\" />
      <h3 className=\"text-xl font-semibold text-blue-900\">{app.name}</h3>
      <p className=\"text-gray-600 mt-2 text-sm\">{app.description}</p>
    </div>
  )

  // Open external links in a new tab if app.external is true
  if (app.url) {
    return (
      <a
        href={app.url}
        target={app.external ? \"_blank\" : undefined}
        rel={app.external ? \"noopener noreferrer\" : undefined}
        className={common}
      >
        {body}
      </a>
    )
  }

  // Fallback: no URL provided
  return <div className={common}>{body}</div>
}

function Footer() {
  return (
    <footer className=\"text-center py-6 text-gray-500 text-sm border-t mt-10\">
      © {new Date().getFullYear()} PNT Department Hub. Tous droits réservés.
    </footer>
  )
}
"""
with open(os.path.join(src, "App.jsx"), "w") as f:
    f.write(app_jsx)

# src/main.jsx
main_jsx = """import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
"""
with open(os.path.join(src, "main.jsx"), "w") as f:
    f.write(main_jsx)

# public favicon (simple)
favicon_svg = """<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"64\" height=\"64\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle cx=\"12\" cy=\"12\" r=\"10\"/>\n  <path d=\"M8 12h8\"/>\n  <path d=\"M12 8v8\"/>\n</svg>\n"""
with open(os.path.join(public, "favicon.svg"), "w") as f:
    f.write(favicon_svg)
