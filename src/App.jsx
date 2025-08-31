import { Book, CheckCircle, BarChart2, Factory, Monitor } from "lucide-react"
import { apps } from "./apps"
import logoLeft from "./assets/logo.png"
import logoRight from "./assets/logo.png"

const IconMap = { Book, CheckCircle, BarChart2, Factory, Monitor }

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="bg-[#010c70] px-6 py-6 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo gauche */}
        <img
          src={logoLeft}
          alt="Logo gauche"
          className="w-12 h-12 object-contain"
        />

        {/* Texte centré */}
        <div className="text-center flex-1 px-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Hub de la PNT
          </h1>
          <p className="mt-1 text-sm sm:text-base text-gray-200">
          </p>
        </div>

        {/* Logo droit */}
        <img
          src={logoRight}
          alt="Logo droit"
          className="w-12 h-12 object-contain"
        />
      </div>
    </header>
  )
}

function Main() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-16">
  <h1 className="text-2xl font-bold text-blue-900 mb-4 tracking-tight text-center pt-1">
  Portail des applications numérique de la PNT 
  </h1>
  <h2 className="text-2xl font-bold text-blue-900 mb-4">
    Toutes les applications :
  </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <AppTile key={app.name} app={app} />
        ))}
      </div>
    </main>
  )
}

function AppTile({ app }) {
  const Icon = IconMap[app.icon] || Book
  const common =
    "rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"

  const body = (
    <div className="p-6 h-full flex flex-col items-start">
      <Icon className="w-8 h-8 text-blue-800 mb-4" aria-hidden="true" />
      <h3 className="text-xl font-semibold text-blue-900">{app.name}</h3>
      <p className="text-gray-600 mt-2 text-sm">{app.description}</p>
    </div>
  )

  if (app.url) {
    return (
      <a
        href={app.url}
        target={app.external ? "_blank" : undefined}
        rel={app.external ? "noopener noreferrer" : undefined}
        className={common}
      >
        {body}
      </a>
    )
  }

  return <div className={common}>{body}</div>
}

function Footer() {
  return (
    <footer className="text-center py-6 text-gray-500 text-sm border-t mt-10">
      © {new Date().getFullYear()} Département de la PNT. Tous droits réservés.
    </footer>
  )
}
