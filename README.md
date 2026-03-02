
# 🧧 Lucky Money Tết Planner Pro – Front-End

Welcome to the **Lucky Money Tết Planner Pro** front-end repository!
This project is a React-based application designed to help users **plan, track, and optimize their Vietnamese Lunar New Year (Tết) preparation**. It combines task management, shopping list organization, budget tracking, and timeline visualization using Redux Toolkit for predictable state management and Apollo Client for GraphQL integration.

---

## Features

- 💰 **Budget Management**: Allocate, track, and visualize spending across categories. Monitor total budget vs. actual spend with spending timelines.
- 🛒 **Shopping List**: Organize items by Tết timeline phases (Pre Tết, During Tết, After Tết)
- 📊 **Tết Timeline Dashboard**: Get a quick overview of tasks and shopping items with category-based summaries.
- 📝 **Tết Task Management**: Plan and manage Tết-related tasks with categorization and status tracking.
- 🚨 **Authentication**: Secure login, logout, and profile management via Apollo Client GraphQL mutations.
- 🌸 **Theme Customization**: Toggle between "apricot" and "blossom" themes with localStorage persistence.
---

## Tech Stack

- **React** – Builds a fast and interactive user interface with a component-based architecture.
- **Redux Toolkit** – Manages global application state in a predictable and scalable way.
- **React Hook Form** – Handles form state efficiently with minimal re-renders and simple validation.
- **GraphQL** – Provides flexible and efficient data fetching between client and server.
- **Apollo Client** – Manages server state and caches GraphQL queries across the application.
- **Tailwind CSS** – Utility-first CSS framework for rapid and consistent UI development.

---

## State Structure Explanation
### 1. React Local State

Component-level state (`useState`) is used for temporary UI concerns:
- Form inputs and validation
- Modal and dialog toggles
- Local pagination or filtering
- Loading spinners and error messages

**Example:**
```javascript
const [formData, setFormData] = useState({ name: "", amount: "" });
const [isModalOpen, setIsModalOpen] = useState(false);
```

### 2. Context API

**AuthContext** (`src/context/AuthContext.jsx`)
- **Purpose**: Manages authentication state globally across the application.
- **State shape**:
  - `user`: Current user object (id, name, metadata)
  - `status`: "loading" | "authenticated" | "unauthenticated"
  - Methods: `login()`, `logout()`, `fetchProfile()`
- **Integration**: Connected to Apollo Client for queries/mutations

**ThemeContext** (`src/context/ThemeContext.jsx`)
- **Purpose**: Persists and toggles application theme preference.
- **State shape**:
  - `theme`: "apricot" | "blossom"
  - `setTheme()`: Update theme
  - `toggleTheme()`: Switch between presets
- **Persistence**: Synced with `localStorage`; applied to `document.documentElement.setAttribute("data-theme", theme)`

### 3. Redux Store

Redux Toolkit slices organize domain state into features. Each slice exports reducers, actions, and selectors.

**Store Structure** (`src/app/store.js`):
```json
{
  "budget": {
    "totalBudget": 5000000,
    "budgets": [
      { "id": "b1", "name": "Groceries", "amount": 2000000, "spent": 1500000 }
    ],
    "spendingTimeline": { "dates": ["2024-01-01", "2024-01-02"], "series": [100000, 150000] },
    "selectedBudgetId": "b1",
    "status": "succeeded",
    "error": null
  },
  "shoppingList": {
    "topCostItems": [
      { "id": "s1", "name": "Gift Box", "cost": 500000, "budget": { "id": "b1" } }
    ],
    "itemsByTimeline": {
      "preTet": [{ "id": "s1", "name": "Gift Box" }],
      "duringTet": [],
      "afterTet": [],
      "today": []
    },
    "status": { "topCost": "succeeded", "timeline": "succeeded" },
    "error": { "topCost": null, "timeline": null }
  },
  "dashboard": {
    "tasksTotal": 15,
    "itemsTotal": 42,
    "tasks": [{ "id": "t1", "title": "Buy decorations", "completed": false }],
    "categories": [{ "id": "cat1", "name": "Shopping" }],
    "items": [{ "id": "i1", "name": "Red lanterns", "status": "pending" }],
    "status": "succeeded",
    "error": null
  },
  "undoRedo": {
    "budget": { "past": [], "future": [] },
    "shoppingList": { "past": [], "future": [] }
  }
}
```

**Feature Slices**:
- **`budget`**: Budget allocation, spending, and timeline data. Dispatches async thunks (`fetchBudgetData`, `updateBudgetThunk`).
- **`shoppingList`**: Shopping items grouped by Tết timeline (pre-Tết, during, after).
- **`dashboard`**: Aggregated counts and lists for task/item summaries.
- **`undoRedo`**: History stacks for undo/redo operations per feature scope.

### 4. Undo / Redo State Design

The `undoRedo` slice implements a scoped, multi-level undo/redo system:

```javascript
{
  "undoRedo": {
    "scope_name": {
      "past": [
        { "type": "CREATE", "newData": { "id": "item1", "name": "Item" } },
        { "type": "UPDATE", "oldData": {...}, "newData": {...} }
      ],
      "future": [
        { "type": "DELETE", "oldData": { "id": "item2" } }
      ]
    }
  }
}
```

**Key Features**:
- **Scoped states**: Each feature (e.g., "budget", "shoppingList") maintains its own past/future stack.
- **Record types**: CREATE, UPDATE, DELETE operations are tracked with old and new data.
- **MAX_HISTORY**: Capped at 20 entries per scope to prevent unbounded memory growth.
- **Actions**: `initScope()`, `pushHistory()`, `undo()`, `redo()` for history management.

---

## Known Limitations

- There are no automated tests yet; the codebase currently lacks unit, integration, and end-to-end coverage.
- Undo/redo functionality has been implemented for key scopes but is not complete across all features.
- Several application features remain partial or in-progress and may not behave as expected.
- Error handling is basic and should be enhanced for production readiness.

---
## Project Structure

Here's an example of the high-level structure of this project:

```plaintext
Features are organized by domain (budget, shopping, dashboard, undo/redo). Shared components, utilities, and configuration sit at the root `src/` level.

```plaintext
src/
├── app/
│   └── store.js                      # Redux store configuration
├── features/
│   ├── budget/
│   │   ├── budgetSlice.js            # Redux slice & reducers
│   │   ├── budgetSelectors.js        # Memoized selectors
│   │   └── budgetThunks.js           # Async actions (fetch, update, delete)
│   ├── [other features]/
│   └── undoRedo/
│       └── undoRedoSlice.js          # Undo/redo history management
├── apollo/
│   └── client.js                     # Apollo Client configuration & InMemoryCache
├── context/
│   ├── AuthContext.jsx               # Authentication & session state
│   └── ThemeContext.jsx              # Theme preference state
├── graphql/
│   ├── mutations/                    # GraphQL mutations
│   └── queries/                      # GraphQL queries
├── components/                       # Reusable UI components
├── pages/                            # Page-level components mapped to routes
├── hooks/                            # Custom React hooks
├── routes/                           # Application routing configuration
├── schemas/                          # Yup validation
├── utils/                            # Helper functions and shared utilities
├── constants/                        # Application constants (enums, labels, config values)
├── assets/                           # Static assets
├── layouts/                          # Layout components
├── App.jsx                           # Root component
├── main.jsx                          # Bootstrap entry point
└── index.css                         # Global styles
```

## Setup Guide

Follow these steps to get the project running locally.

### Prerequisites

- Node.js (v16 or later) and npm installed
- Network access to the configured GraphQL API endpoint (set via `VITE_GRAPHQL_URL` in `.env`)

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

Running the Project
Start the development server with:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

