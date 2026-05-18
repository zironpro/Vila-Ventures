# Managing Class Plans in Payload CMS

This guide explains how to manage yoga class pricing plans shown in the site booking modal.

## Admin sidebar overview

Collections are grouped in the Payload admin (`/admin`):

| Group | Collections | Purpose |
|-------|-------------|---------|
| **Classes & Booking** | Classes, Class Plans, Class Booking Leads | Yoga offerings, pricing, and booking form submissions |
| **Shop** | Products, Categories, Orders, … | E-commerce |
| **Content** | Blogs, FAQs | Marketing content |
| **Media** | Media | Images and files |
| **Users** | Users | Accounts and roles |

## Where to find class plans

1. Log in to `/admin`
2. Open **Classes & Booking** in the sidebar
3. Click **Class Plans**

## How plans appear on the website

The booking modal filters plans using two fields you set on each plan:

| CMS field | Booking modal step | Values |
|-----------|-------------------|--------|
| **Delivery mode** | Step 2 — Virtual / Physical | `virtual`, `physical` |
| **Pricing type** | Step 3 — Group / Private | `group`, `private` |

Only plans matching the user’s current delivery mode **and** pricing type are shown in step 4.

Yoga style (Hatha, Vinyasa, Kids) in step 1 does **not** change which plans appear — it only affects available time slots (schedules are still configured in code).

## Field reference

| Field | Required | Description |
|-------|----------|-------------|
| **Plan name** | Yes | Card title (e.g. Starter, Regular, 1 Person) |
| **Delivery mode** | Yes | Virtual or Physical — must match step 2 |
| **Pricing type** | Yes | Group or Private — must match step 3 |
| **Class count** | Yes | Number of classes (used for “4 Classes” display and lead capture) |
| **Max slots** | Yes | How many time slots the user must pick (1, 2, or 3 for tiered plans) |
| **Frequency** | Yes | Label under the class count (e.g. `1 Per Week`, `Per Session`) |
| **Price** | Yes | Amount in AED (number) |
| **Price sub-label** | No | Small text under price (e.g. `Per Person` for shared private plans) |
| **Best Value** | No | Shows the “Best Value” badge on the plan card |

## Ordering plans

The Class Plans list is **orderable**. Drag rows to change the order plans appear on the website within each delivery mode + pricing type group.

## Publishing and cache

Class Plans do not use drafts — saving updates the live site. After saving, the homepage and classes pages revalidate automatically. If you do not see changes immediately, hard-refresh the browser.

## Checklist: adding or editing a plan

1. Set **Delivery mode** and **Pricing type** correctly for the booking steps they should appear under
2. Set **Class count** and **Max slots** together (typical tiers: 4 classes / 1 slot, 8 / 2, 12 / 3)
3. Enter **Frequency** and **Price** as you want them displayed
4. Enable **Best Value** on at most one plan per delivery mode + pricing type group (usually “Regular”)
5. Drag to the desired position in the list
6. Save
7. Test on the site: open the booking modal → match steps 2–3 → confirm the plan appears in step 4

## Database migration (developers)

If you changed the Class Plans schema (e.g. `price` from text to number) and see a Postgres error like `column "price" cannot be cast automatically to type numeric`, run:

```bash
pnpm migrate:class-plans
```

Then restart the dev server. This script converts `price` with `USING`, adds `class_count` / `max_slots`, and removes legacy columns.

## Initial data (developers)

If the database has no class plans yet, seed the default 11 plans from the repo:

```bash
pnpm seed:class-plans
```

The script skips seeding if any class plans already exist. Delete existing plans in admin first if you need a clean re-seed.

## Troubleshooting

| Problem | Likely cause | Fix |
|---------|--------------|-----|
| Plan not visible in modal | Wrong delivery mode or pricing type | Edit plan fields to match steps 2–3 |
| Wrong number of time slots required | **Max slots** incorrect | Set max slots to 1, 2, or 3 as intended |
| Empty plan list for a combination | No plans in CMS for that pair | Add plans or run `pnpm seed:class-plans` |
| “Per Person” missing | **Price sub-label** empty | Set price sub-label on shared private plans |
| Changes not on site | Cache / not saved | Save in admin, hard-refresh; check revalidation |

## Related collections

- **Class Booking Leads** — form submissions with the plan and time slots the user selected
- **Classes** — class detail pages (separate from booking plan pricing)
