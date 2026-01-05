# PNT-Hub: Centralized Meteorological Operations Portal

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)

## 🌟 Overview

**PNT-Hub** (Portail Prévision Numérique du Temps) is a mission-critical centralized dashboard developed for the **Direction de l'Exploitation Météorologique (DEM)** of Algeria. It serves as the unified entry point for meteorologists, researchers, and operational staff to access a vast ecosystem of weather forecasting tools, data visualization platforms, and production management systems.

Designed with a focus on modern UX/UI principles, performance, and scalability, this portal streamlines daily operations by consolidating disparate meteorological services into a single, cohesive interface.

---

## 🚀 Key Features

-   **Unified UI/UX**: A clean, modern interface inspired by world-class meteorological tools like Windy.com.
-   **Smart Search**: Instant filtering of applications and services based on names or descriptions.
-   **Personalized Experience**: Integrated "Favorites" system allowing users to pin their most-used tools for quick access.
-   **Dynamic Categorization**: Seamless navigation between all tools and user-specific favorites.
-   **Secure Access**: Built-in authentication layer to protect sensitive operational data.
-   **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices using Tailwind CSS.
-   **Real-time Interaction**: Interactive elements with smooth transitions and subtle animations (Lucide icons, hover effects).

---

## 🛠️ Technical Stack

### Frontend
-   **React 18**: Component-based architecture for a scalable and maintainable UI.
-   **Tailwind CSS**: Utility-first CSS framework for rapid, custom design implementation.
-   **Lucide React**: Clean and consistent iconography.
-   **Vite**: Next-generation frontend tooling for blazing fast development and builds.

### Backend
-   **Node.js & Express**: Lightweight and efficient server handling API requests.
-   **JSON Database**: Efficient data persistence for user preferences and application meta-data.
-   **CORS & Body-Parser**: Secure and robust middleware configuration.

---

## 📂 Project Structure

```text
├── src/
│   ├── App.jsx            # Main dashboard logic and routing
│   ├── Login.jsx          # Authentication interface
│   ├── apps.js            # Configuration hub for all linked services
│   ├── assets/            # Static resources (logos, images)
│   └── index.css          # Global styles and Tailwind directives
├── server.js              # Express server & API endpoints
├── data/
│   └── favorites.json     # User persistence data
├── vite.config.js         # Frontend build configuration
└── package.json           # Dependencies and scripts
```

---

## ⚙️ Installation & Setup

### Prerequisites
-   Node.js (v18+ recommended)
-   npm or yarn

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/walidchikhi/PortailPNT.git
   cd PortailPNT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the application**
   ```bash
   npm run build
   ```

4. **Start the production server**
   ```bash
   node server.js
   ```

The application will be available at `http://localhost:4173`.

---

## 👨‍💻 Developed by

**Chikhi**
*Senior Software Engineer / Meteorological Systems Architect*

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Developed with ❤️ for Météo Algérie
</p>
