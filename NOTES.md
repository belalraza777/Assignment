# Notes

> Fill this in as you work. This document is assessed alongside your code.

## Bugs I found

1. **Products were loading again and again**

   * **What was wrong:** `useEffect` was using `products` as a dependency.
   * **Why:** Updating products caused the API request to run again.
   * **Fix:** Changed `[products]` to `[]`.

2. **Products were using `any`**

   * **What was wrong:** Product data was typed as `any`.
   * **Why:** A `Product` type was already available.
   * **Fix:** Changed it to `Product[]`.

3. **Search and category filter did not work together**

   * **What was wrong:** Search was ignored when a category was selected.
   * **Why:** The code checked only one condition at a time.
   * **Fix:** Added both search and category checks.

4. **Search was case-sensitive**

   * **What was wrong:** `Phone` and `phone` were treated differently.
   * **Why:** The search used `includes()` directly.
   * **Fix:** Converted both values to lowercase before searching.

5. **Product list used index as key**

   * **What was wrong:** `index` was used as the React key.
   * **Why:** Product positions can change after filtering.
   * **Fix:** Used `product.id` instead.

## Features I completed

* Added error message when products cannot be loaded.
* Added open and close animation to the product modal.

## Decisions

* Used the existing `Product` type.
* Used `product.id` as the React key.
* Kept the existing UI and made only the required changes.
* Used a simple fade and scale animation for the modal.

## With more time
--
