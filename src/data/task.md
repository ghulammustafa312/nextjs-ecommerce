Harbor Market catalog

You are building a small market site. Data is already nested by category in src/data/catalog.json. Do not flatten it by hand in the JSON. Write helpers that walk the tree.

Pages

/market/category — category chips + item cards
/market/cateogry/[id] — one item (name, image, price, seller, origin, tags, in/out of stock)
Must do

<!-- Import the JSON and type it. No any.
Category chips come from catalog.categories (All + each category name).
Filter with the URL: /market?category=bakery (same idea as product search).
Each card shows: image, name, price, unit, seller name, stock badge.
Out-of-stock cards look different (opacity or a badge) and still open the detail page.
Detail page: find the item by id across all categories. If missing, use not-found.
Empty filter: “No items in this category.”
Tailwind cards only. No API routes. No extra libraries. -->