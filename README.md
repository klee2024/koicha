# Koicha

Koicha is a matcha discovery and review platform designed to help users
understand their taste preferences and find products they’ll love.

---

## What it Does

Koicha solves the problem of matcha discovery by aggregating matcha products across brands and creating personalized taste profiles so users can find their perfect matcha:

- **Taste Profile Visualization**: Radar charts across multiple flavor dimensions (umami, grassy, nutty, etc.)
- **Smart Onboarding**: First time quiz for users new to matcha to find their initial matcha preferences
- **Product Discovery**: Browse and review matcha products with flavor profile and preparation tags
- **Persistent User Data**: Authentication with saved reviews, bookmarks, and evolving taste profiles

---

## Tech Stack

**Frontend**

- Angular 19 with Typescript
- Tailwind CSS for responsive UI
- ECharts for taste profile visualization

**Backend**

- Django REST Framework
- Token-based Authentication (JWT)

**Database**

- PostgreSQL
- ERD
  ![ERD](/ERD.svg)

**Design**

- [Figma Prototype](https://www.figma.com/design/r48e6fTboGayjiVc2CnS90/Koicha?node-id=0-1&p=f&t=6wS0F7K0gsusdPcW-0)

**Deployment**

- Render _(note: the first request after idle time takes ~30 seconds to wake up)_

---

## Engineering Design Highlights

**Avoided creating fake "guest users"**
Instead of creating a guest or temporary account, I use a system-owned taste profile. This avoids a fake user profile which adds unneeded user objects while still allowing unauthenticated users to experience the full product flow.

**Radar chart for taste profile**
Radar charts visualize matcha across curated main flavor dimensions (grassy, umami, nutty, bitter, creamy, etc.). This allows for an intuitive representation of how products and preferences balance multiple taste characertistics.

**Preparation-based discovery**
In order to enjoy matcha in its best form, it should be consumed according to the preparation it was created for. Emphasizing and allowing filtering by product preparation encourages users to explore matcha blends with intention.

---

## System Architecture

![Architecture Flow](/architecture_flow.drawio.svg)
The frontend Angular and backend Django architecture contains domain centric components and apps that support this flow.

---

## Local Development

### Prerequisites

- Python 3.13
- Node.js
- Docker

### Database

```bash
docker-compose up -d
```

Create `backend/.env`:

```
POSTGRES_DB=koicha
POSTGRES_USER=koicha
POSTGRES_PASSWORD=koicha
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

### Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver 0.0.0.0:8000
```

### Frontend Setup

```bash
cd koicha-app
npm install
npm start
```

## Roadmap

**Phase 1: Core Experience** ✅

- User authentication and profiles
- Product browsing and reviews
- Taste profile visualization

**Phase 2: Intelligence** (In Progress)

- Recommendation engine to create a match % for a product based on the user's tatse profile
- Automated product scraper to expand catalog
- Taste archetype classification (e.g., "Traditionalist," "Adventurer")
- Smarter product rating and comparison tool

**Phase 3: Social**

- Public user profiles and follows
- Community reviews and comments

---

## Screenshots

**Onboarding quiz**
![Onboarding Quiz](/screenshots/onboarding-quiz.png)
**Taste profile**
![Taste Profile](/screenshots/taste-profile.png)
**Explore products**
![Explore products](/screenshots/explore-products.png)
**Write a review**
![Write review](/screenshots/writing-product-review.png)
**Rate product**
![Rate product](/screenshots/rating-product.png)
**View reviews**
![User reviews](/screenshots/user-reviews.png)
