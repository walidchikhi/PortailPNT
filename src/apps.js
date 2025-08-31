// Modify this file to change your app tiles and links.
export const apps = [
  {
    name: 'Documentation',
    description: "Accéder à la documentation interne et aux guides techniques.",
    icon: 'Book',
    url: 'http://localhost:8000/Home', // <-- Remplace par l’URL réelle
    external: true
  },
  {
    name: 'ContrObs',
    description: 'Contrôle des modéles PNT opérationnels par rapports aux observations.',
    icon: 'CheckCircle',
    url: 'http://10.16.40.88:39313/',
    external: true
  },
  {
    name: 'Visualisation',
    description: 'Explorer et visualiser les sorties de modéles PNT.',
    icon: 'BarChart2',
    url: 'http://10.16.50.11:2026/',
    external: true
  },
  {
    name: 'Production',
    description: 'Gérer et suivre la chaîne de production de la PNT.',
    icon: 'Factory',
    url: 'https://prod.example.pnt',
    external: false
  },
  {
    name: 'AmetForestFire',
    description: 'Accéder aux outils liés à la supervision des indices météorologiques de feux de forêts.',
    icon: 'Monitor',
    url: 'https://ametforestfire.meteo.dz/',
    external: true
  }
];
