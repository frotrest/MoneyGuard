# Project Overview
Personal Finance Tracker is a adaptive single page application for tracking personal income and expenses, viewing transaction history, and visualizing basic financial statistics and currency rates. The project is designed as a learning pet project that demonstrates practical React patterns, adaptive UI and integration with external APIs.

**IMPORTANT! 🔴🚨** I made this application authorization using local storage since I didn't have an access to real databases, and cause of that there's a little bug: when you log in into your account, you don't instantly get all your transactions, to fix this you need  just refresh the page and all transactions will appear!

## Purpose

Provide a compact, usable interface for adding, editing, and deleting transactions.

**I created an internal switch system in the application using if checks, but I’ll fix it in the future.**

Serve as a portfolio piece showing frontend architecture, responsive design, and integration with third‑party services.

## Features
Core Functionality

Transaction CRUD: create, edit, delete transactions with fields: date, type (income/expense), category, comment, amount.

Responsive Views: desktop uses a table layout; mobile uses card layout and a compact finances view.

Statistics: category summaries and charts for quick insights.

Currency Rates: fetches latest exchange rates and shows purchase/sale values.

Animations on Scroll: elements annotated with data-animate are animated when they enter the viewport using IntersectionObserver.

Accessible Actions: edit and delete actions per transaction with clear visual affordances.

## UX Details

Color coding for income vs expense.

Modal forms for transaction creation and editing.

Sidebar navigation for switching pages.

## React for UI.

MUI for UI primitives and useMediaQuery for responsive logic.

axios for HTTP requests.

CSS Modules for scoped styling.

Chart library (Chart.js ) for graphs.

IntersectionObserver for scroll-triggered animations.

App / MainPage — layout wrapper with Header, SideBar, and a Routes area.

FinanceTable — desktop transaction table.

Finances — mobile-focused finances view with currency rates and compact UI.

Statistics — charts and aggregated data.

CurrencyChart — chart component for currency visualization.

useAnimateOnScroll — custom hook that observes [data-animate] elements.

contexts or hooks — optional global state for transactions and balance.

Keep DOM-manipulating logic inside useEffect.
