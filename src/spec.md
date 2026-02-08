# Specification

## Summary
**Goal:** Update the restaurant location/address displayed to users to exactly “Jandi Mor, GT road, Gujar Khan, Punjab, Pakistan” and ensure it is shown consistently even when profile data is unavailable.

**Planned changes:**
- Update the frontend Location section to display the primary address line as “Jandi Mor, GT road, Gujar Khan, Punjab, Pakistan” when restaurant profile address data is missing/unavailable.
- Update the backend default restaurant profile address fields (street/city/region/country) so the structured address renders as “Jandi Mor, GT road, Gujar Khan, Punjab, Pakistan” without duplicating “Gujar Khan”.
- Ensure the Location section does not show duplicated “Gujar Khan” across the main address line and any related helper text.

**User-visible outcome:** The Location page consistently shows the address “Jandi Mor, GT road, Gujar Khan, Punjab, Pakistan” as the main displayed location, without repeated city text.
