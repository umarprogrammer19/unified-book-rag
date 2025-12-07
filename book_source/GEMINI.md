# GEMINI.md

## Project Overview

This project is a website for the "Physical AI & Humonoid Robotics Course," built using Docusaurus, a modern static website generator. The site serves as a comprehensive guide to mastering generative AI, with a focus on physical AI and humanoid robotics.

The project is structured as follows:
- `docs/`: Contains the course content in Markdown files, organized into modules. The sidebar navigation is automatically generated from this directory structure.
- `src/`: Contains the custom React components and pages that make up the website's theme and landing page.
- `docusaurus.config.ts`: The main configuration file for the Docusaurus site, defining the title, theme, navigation, and other settings.
- `sidebars.ts`: Configures the sidebar generation for the documentation.

The main technologies used are:
- **Docusaurus:** A static site generator for building documentation websites.
- **React:** Used for creating custom components and pages.
- **TypeScript:** For type-safe JavaScript development.

## Building and Running

### Installation

To install the project dependencies, run:

```bash
yarn
```

### Local Development

To start a local development server, run:

```bash
yarn start
```

This will open a browser window with the website, and most changes will be reflected live without needing to restart the server.

### Build

To generate a static build of the website, run:

```bash
yarn build
```

The output will be in the `build/` directory.

### Deployment

To deploy the website to GitHub Pages, you can use one of the following commands:

Using SSH:
```bash
USE_SSH=true yarn deploy
```

Not using SSH:
```bash
GIT_USER=<Your GitHub username> yarn deploy
```

## Development Conventions

- **Content:** All course content is written in Markdown and located in the `docs/` directory. The structure of the subdirectories in `docs/` defines the sidebar navigation.
- **Landing Page:** The landing page is built with React components, which can be found in `src/components/`. The main layout is defined in `src/pages/index.tsx`.
- **Styling:** Custom styles are defined in `src/css/custom.css`. The overall theme is configured in `docusaurus.config.ts`.
- **Sidebar:** The sidebar for the documentation is automatically generated from the directory structure in the `docs/` folder, as configured in `sidebars.ts`.
