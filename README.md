# Koicha

Koicha is a matcha discovery and review platform designed to help users
understand their taste preferences and find products they’ll love.

---

## What it Does

Koicha solves the problem of matcha discovery by aggregating matcha products across brands and creating personalized taste profiles that evolve with user interactions:

- **Taste Profile Visualization**: Radar charts across multiple flavor dimensions (umami, grassy, nutty, etc.)
- **Smart Onboarding**: Interactive quiz for users new to matcha to establish baseline preferences
- **Product Discovery**: Browse and review matcha products with taste profile and preparation-specific guidance
- **Persistent User Data**: Authentication system with saved reviews, bookmarks, and evolving taste profiles

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

---

## Engineering Highlights

**Avoided creating fake "guest users"**
Instead of generating temporary accounts, I use a system-owned taste profile. This avoids a fake user profile which adds database noise while still allowing unauthenticated users to experience the full product flow.

**Radar chart for taste dimensions**
Radar charts visualize matcha across independent flavor dimensions (grassy, umami, nutty, bitter, creamy, etc.). Unlike linear scales, this shows how products and preferences balance multiple characteristics simultaneously.

**Preparation-based discovery**
A matcha created for ceremonial koicha won't shine in a latte, and vice versa. Filtering by preparation ensures users enjoy matcha in its optimal form, and find products designed for how they actually want to drink their matcha.

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
