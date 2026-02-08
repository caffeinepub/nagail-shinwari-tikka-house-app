# Specification

## Summary
**Goal:** Remove Breakfast from the menu everywhere (seed/fallback data, public menu rendering, and backend deletion behavior).

**Planned changes:**
- Remove the “BREAKFAST” category and its items from `frontend/src/data/menuSeed.ts` so it never appears when backend menu data is empty.
- Filter out any “BREAKFAST” category (case-insensitive) and its items from the public Menu UI even if returned by the backend, avoiding empty category cards and excluding these items from search/results.
- Update backend category deletion so deleting a menu category also deletes all menu items belonging to that category (matching `categoryId`).

**User-visible outcome:** The public Menu never shows a Breakfast category or Breakfast items, and when an admin deletes a category, all items in that category are removed as well.
