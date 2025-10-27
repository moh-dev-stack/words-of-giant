# Words of Giants: Science & Math Quotes

This is an elegant and interactive single-page web application designed for enthusiasts of science and mathematics. It provides a curated collection of authentic quotes from some of the greatest minds in history, presented in a clean, modern, and user-friendly interface.

## 1. Key Features

- **Quote of the Day**: A prominently displayed, visually distinct quote that changes daily.
- **Dynamic Author Filtering**: Easily filter the entire collection of quotes by a specific author.
- **Author Search**: A search bar to quickly find an author within the filter list.
- **Random Quote Discovery**: A "Random Quote" button to discover new quotes serendipitously.
- **Deep Linking & Sharing**: Share a direct link to any specific quote. When the link is opened, the page automatically scrolls to and highlights the shared quote.
- **Copy to Clipboard**: A fallback for browsers that don't support the native Web Share API, allowing users to easily copy a quote's text.
- **Light & Dark Mode**: A theme toggle that respects the user's system preference and saves their choice in local storage for future visits.
- **Scroll to Top**: A floating button that appears on scroll, providing a smooth return to the top of the page.
- **Responsive Design**: A fully responsive layout that looks great on desktops, tablets, and mobile devices.
- **Engaging UI/UX**: Subtle animations and hover effects provide a dynamic and engaging user experience.

## 2. Requirements

This project is built with modern web technologies and requires no complex setup or build process.

- **Web Browser**: A modern web browser such as Google Chrome, Mozilla Firefox, Safari, or Microsoft Edge.
- **Internet Connection**: Required to load Google Fonts and the Tailwind CSS library from their respective CDNs.

## 3. How the Code Works (Architecture)

This application is a **Single-Page Application (SPA)** built with **React** and **TypeScript**.

- **Framework**: React is used for building the user interface with a component-based architecture.
- **Styling**: **Tailwind CSS** is loaded via a CDN for rapid, utility-first styling. This allows for a highly customized design without writing custom CSS files. A few additional styles for fonts are included directly in `index.html`.
- **State Management**: All application state (e.g., current theme, selected author, search query) is managed within the main `App.tsx` component using React Hooks (`useState`, `useEffect`, `useMemo`).
- **Data**: All quote data is stored locally in a static array within the `constants.ts` file. This makes the application fast and fully functional offline after the initial load.
- **No Build Step**: The application runs directly in the browser using ES modules, importing React and other libraries from a CDN, which simplifies development and deployment.

## 4. File Breakdown

The project is organized into several files, each with a specific purpose.

-   `index.html`: The main entry point of the application. It sets up the basic HTML document structure, imports the Google Fonts, loads and configures Tailwind CSS, and includes the main JavaScript module (`index.tsx`).
-   `index.tsx`: The TypeScript entry point for the React application. It finds the `root` div in `index.html` and renders the main `App` component into it.
-   `App.tsx`: The core of the application. This component acts as the main container and orchestrator. It manages all major state, handles filtering logic, determines the "Quote of the Day," and pieces together all the other UI components.
-   `constants.ts`: The "database" of the application. It contains a single array, `QUOTES`, which holds all the quote objects used throughout the site.
-   `types.ts`: Defines the shared TypeScript data structures, primarily the `Quote` interface, ensuring type safety and consistency.
-   `metadata.json`: A simple file containing the application's name and description.
-   `README.md`: This file, providing documentation for the project.

-   **`components/` Directory**: This directory contains all the reusable React components.
    -   `QuoteCard.tsx`: A component responsible for displaying a single quote in its own card. It also handles its own internal logic for the share and copy-to-clipboard functionality.
    -   `AuthorFilter.tsx`: The component that renders the author search bar, the list of author filter buttons, and the "Random Quote" button.
    -   `QuoteOfTheDay.tsx`: A visually distinct component designed to showcase the daily featured quote.
    -   `ThemeToggle.tsx`: A simple button in the header that allows users to switch between light and dark themes.
    -   `ScrollToTopButton.tsx`: A floating button that appears when the user scrolls down, allowing them to easily return to the top of the page.

## 5. Most Important Functionality

Here's a closer look at how some of the key features are implemented.

### Theme Management (`App.tsx`, `ThemeToggle.tsx`)

The theme is managed as a piece of state in `App.tsx`. A `useEffect` hook watches for changes to this state and performs two side effects:
1.  It adds or removes the `dark` class from the `<html>` element, which is what Tailwind CSS uses to apply dark mode styles.
2.  It saves the user's preference to `localStorage`, so the theme persists across browser sessions.

When the app first loads, it prioritizes the `localStorage` value, then checks the user's system preference (`prefers-color-scheme`), and finally defaults to a theme if neither is available.

### Filtering, Searching, and Discovery (`App.tsx`, `AuthorFilter.tsx`)

1.  **Filtering**: The `selectedAuthor` state lives in `App.tsx`. A `useEffect` hook listens for changes to this state and filters the main `QUOTES` array accordingly, updating the `filteredQuotes` state that is actually rendered.
2.  **Searching**: The `AuthorFilter.tsx` component has its own internal state for the `searchQuery`. It filters the full list of authors it receives via props before rendering the buttons, ensuring the UI is fast and responsive to user input.
3.  **Random Quote**: The `handleRandomQuote` function in `App.tsx` picks a random quote, resets the author filter to "All" to ensure the quote is visible, and then calls the `highlightQuote` utility function.

### Deep Linking and Sharing (`App.tsx`, `QuoteCard.tsx`)

This two-part feature creates a seamless sharing experience.

1.  **Creating the Link**: When a user clicks the share button in `QuoteCard.tsx`, the component constructs a URL that includes the current page's path plus a hash identifier (e.g., `.../index.html#quote-42`). This URL is then passed to the Web Share API.
2.  **Handling the Link**: When the application loads, a `useEffect` hook in `App.tsx` checks if `window.location.hash` exists. If it does, it calls the `highlightQuote` function. This function finds the quote's DOM element by its ID, smoothly scrolls it into the center of the viewport, and temporarily applies a bright, attention-grabbing ring around it. This immediately draws the user's attention to the specific content that was shared with them.

## 6. Deployment on GitHub Pages

This project is perfectly suited for deployment on GitHub Pages because it is a **static site** that runs directly in the browser without needing a server or a "build" step.

### Why is there no 'build' step?
Many React projects use tools like Create React App or Vite, which require a `npm run build` command. That command compiles, bundles, and optimizes the code into static HTML, CSS, and JS files.

This project is different. It uses **ES Modules** and an **import map** directly in the `index.html` file. This tells the browser how to load React and other libraries from a CDN on its own. The `.tsx` files are handled by the browser's capabilities. This simpler setup means you can deploy the source code files directly.

### Step-by-Step Instructions

1.  **Create a GitHub Repository**:
    -   Go to GitHub and create a new **public** repository.
    -   Give it a name (e.g., `words-of-giant`).
    -   Do not initialize it with a README, as you already have one.

2.  **Push Your Code**:
    -   Open a terminal in your project's root folder.
    -   Run the following commands to upload your code to the new repository. *Remember to replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME`.*
    ```bash
    # Initialize a local git repository if you haven't already
    git init -b main
    
    # Add all files to be tracked
    git add .
    
    # Create your first commit
    git commit -m "Initial commit"
    
    # Connect to your remote repository on GitHub
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    
    # Push your code to GitHub
    git push -u origin main
    ```

3.  **Configure GitHub Pages**:
    -   In your new repository on GitHub, go to the **"Settings"** tab.
    -   In the left sidebar, click on **"Pages"**.
    -   Under "Build and deployment", set the "Source" to **"Deploy from a branch"**.
    -   Under "Branch", ensure `main` is selected and the folder is `/ (root)`.
    -   Click **"Save"**.

4.  **You're Live!**:
    -   That's it! GitHub will start deploying your site. This usually takes 1-2 minutes.
    -   The "Pages" settings page will display the public URL for your live site. It will be: `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`