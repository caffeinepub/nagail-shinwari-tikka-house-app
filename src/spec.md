# Specification

## Summary
**Goal:** Update the public Menu section to reflect the categories, items, and prices shown in the uploaded menu screenshot, presented cleanly in English.

**Planned changes:**
- Extract categories, menu items, and prices from `Screenshot_20260207-020802.jpg` and update the app’s menu data so the Menu section is populated (English names, optional short descriptions where helpful, prices in Pakistani Rupees).
- Ensure prices are stored as numeric values and rendered in the UI as `Rs. <amount>`.
- Add a small informational note at the top of the Menu section (above search) for any menu-wide information visible in the screenshot (e.g., serving hours), written in English and styled to match the existing theme.
- Keep existing Menu search behavior working across the updated item names/descriptions.

**User-visible outcome:** Visitors can open the Menu section and browse multiple English-labeled categories and items with correct `Rs.` prices, see a short menu note above search, and use search to filter the updated menu.
