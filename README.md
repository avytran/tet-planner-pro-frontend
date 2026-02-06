
# 🎉 Tết Planner Pro – Front-End

Welcome to the **Tết Planner Pro** front-end repository!
This project is a React-based web application that helps users **plan, track, and optimize their Vietnamese Lunar New Year (Tết) preparation** through task management, shopping & budget planning, and timeline seeing.

---

## 🌟 Features

- 📝 **Tết Task Management**: Users can manage all Tết-related tasks.
- 🛒 **Shopping List with Budget Management**: 
- ⚠️ **Budget Rules & Warnings**: 
- 📊 **Tết Timeline Dashboard**:
---

## 🚀 Tech Stack

- **ReactJS**: Robust and flexible front-end library for a responsive, fast, and interactive UI.

---

## 📂 Branch Naming Convention

Branches should be named according to their purpose and task:

```plaintext
<prefix>/<USXX>-<task-name>
```

- **Prefix** options:
  - `feature/` – for new features
  - `fix/` – for bug fixes
  - `chore/` – for non-functional tasks
  - `refactor/` – for code restructuring
  
> Example: If your task is `[US001][FE]Create application`, your branch name would be `feature/US001-create-application`.

---

## 💾 Commit Message Convention

Follow a structured commit message format to maintain a clear history:

```plaintext
<prefix>(<USXX>): <commit message>
```

- **Prefix** options:
  - `feat` – for new features
  - `fix` – for bug fixes
  - `chore` – for maintenance tasks
  - `refactor` – for code restructuring
  
> Example: If your branch is `[US009][FE]create header and footer`, your commit message would be `feat(US009): create home page`.

---

## 🔄 Development Workflow

The development process is organized for efficiency and consistency:

1. **Pull** the latest code from the main branch.
2. **Create a new branch** from the main branch.
3. **Code** your assigned task.
4. **Commit** changes and **stash** if needed.
5. **Switch to main branch** and pull any new updates.
6. **Switch back to your working branch** and merge any updates from `main` into it.
7. **Resolve conflicts** if any.
8. **Push** your branch to the remote repository.
9. **Create a pull request** and request reviews.
10. After approval, **squash and merge** the pull request.

```plaintext
┌───────────────────────────────┐
│        Pull from Main         │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│    Create New Branch from     │
│           Main                │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│             Code              │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│     Commit and Stash if       │
│           Needed              │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│   Switch to Main Branch and   │
│         Pull Updates          │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│   Switch to Working Branch    │
│    and Merge Updates from     │
│            Main               │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│   Resolve Conflicts if Any    │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│          Push to Remote       │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│      Create Pull Request      │
│   and Request Review from     │
│            Others             │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│  After Approval, Squash and   │
│            Merge              │
└───────────────────────────────┘
```

---

### 📌 Notes for Enhanced Development Progress

- **Consistency**: Adhere strictly to naming and commit conventions to maintain a clear, readable history.
- **Frequent Pulls**: Regularly pull updates from the main branch to avoid large conflicts.
- **Communication**: Keep the team informed about your progress and any blockers to ensure a smooth workflow.
- **Review Requests**: Aim for timely reviews by tagging appropriate reviewers, especially for critical features.

---

## 📊 Project Graph

Here's an example of the high-level structure of this project:

```plaintext
.
├── src
│   ├── components     # Reusable components
│   ├── pages          # Main views/pages
│   ├── apis           # API calls and services
│   ├── styles         # Global and component-specific styles
│   └── utils          # Helper functions and utilities
├── public
│   └── index.html     # Main HTML file
└── README.md
```

---

> **Happy Coding & Chúc mừng năm mới! 🧧** Build something meaningful while practicing real-world React state management and UX design 🎉
