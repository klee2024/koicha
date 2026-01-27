from decimal import Decimal

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db import transaction

from apps.products.models import Preparation, Product, ProductTaste, Tag
from apps.quiz.models import Quiz, QuizOption, QuizQuestion
from apps.recommendations.models import UserProductMatch
from apps.reviews.models import Review, ReviewPreference, ReviewSubPreference
from apps.taste_profiles.models import (
    FlavorCharacteristic,
    TasteProfile,
    TasteProfileArchetype,
    TasteProfileDetail,
    TasteProfileFlavorDimension,
)

from apps.products.services.product_tastes import geometric_tag_intensities


class Command(BaseCommand):
    help = "Seeds the database with representative data that spans every Django app."

    def handle(self, *args, **options):
        with transaction.atomic():
            self.stdout.write(self.style.NOTICE("Starting Koicha seed data generation..."))
            flavor_characteristics = self._create_flavor_characteristics()
            preparations = self._create_preparations()
            tags = self._create_tags()
            products = self._create_products(preparations, tags)
            self._create_quiz()
            archetypes = self._create_taste_profile_archetypes()
            review_preferences = self._create_review_preferences()
            default_taste_profile = self._create_default_taste_profile()
        self.stdout.write(self.style.SUCCESS("Seed data ready. Run `python manage.py seed_data` anytime to refresh."))

    def _create_preparations(self):
        prep_specs = [
            {"slug": "koicha", "name": "Koicha"},
            {"slug": "usucha", "name": "Usucha"},
            {"slug": "latte", "name": "Latte"},
        ]
        preparations = {}
        for spec in prep_specs:
            preparation, _ = Preparation.objects.get_or_create(**spec)
            preparations[spec["slug"]] = preparation
        self.stdout.write(self.style.SUCCESS(f"Preparations ready ({len(preparations)})"))
        return preparations

    def _create_tags(self):
        tag_specs = [
            {"slug": "astringent", "name": "astringent"},
            {"slug": "cocoa", "name": "cocoa"},
            {"slug": "nutty", "name": "nutty"},
            {"slug": "oceanic", "name": "oceanic"},
            {"slug": "savory", "name": "savory"},
            {"slug": "umami", "name": "umami"},
            {"slug": "verdant", "name": "verdant"},
            {"slug": "floral", "name": "floral"},
            {"slug": "sweet", "name": "sweet"},
            {"slug": "creamy", "name": "creamy"},
            {"slug": "rich", "name": "rich"},
        ]
        tags = {}
        for spec in tag_specs:
            tag, _ = Tag.objects.get_or_create(**spec)
            tags[spec["slug"]] = tag
        self.stdout.write(self.style.SUCCESS(f"Tags ready ({len(tags)})"))
        return tags
    
    def create_product_tastes(self, product, tags, base: float = 0.6):
        """ 
        Helper function to create product tastes based on tags 
        """

        # Get all of the main flavor charateristics
        flavor_characteristics = FlavorCharacteristic.objects.filter(is_active=True, parent__isnull=True)

      
        # Use the product's tags to create flavor intensity weights
        tag_flavor_characteristic_intensities = geometric_tag_intensities(tags)

        # For each tag that corresponds to a main flavor characteristic, create corresponding ProductTaste object based on the weights
        for tag_slug, weight in tag_flavor_characteristic_intensities.items():
            matching_flavor_characteristic = FlavorCharacteristic.objects.filter(
                slug=tag_slug, 
                is_active=True, 
                parent__isnull=True).first()
            if not matching_flavor_characteristic:
                continue 
            # if there's a matching flavor characteristic, create the ProductTaste object
            ProductTaste.objects.update_or_create(
                product = product, 
                taste_dimension=matching_flavor_characteristic, 
                defaults={"intensity": weight}
            )

    def _create_products(self, preparations, tags):
        product_specs = [
            {
                "slug": "kiyona-matcha",
                "name": "Kiyona Matcha",
                "brand": "Kettl",
                "preparation": "usucha",
                "image_url": "https://kettl.co/cdn/shop/files/3591029d-cbe4-4bee-b85e-3ac3eb4dbee0_1680x.jpg?v=1755114175",
                "product_url": "https://kettl.co/products/kiyona-matcha?pr_prod_strat=e5_desc&pr_rec_id=a3ad54589&pr_rec_pid=8667352629498&pr_ref_pid=8098143666426&pr_seq=uniform",
                "tags": ["astringent", "cocoa", "nutty"],
            },
            {
                "slug": "kohata-matcha",
                "name": "Kohata Matcha",
                "brand": "Kettl",
                "preparation": "koicha",
                "image_url": "https://kettl.co/cdn/shop/files/4b86217c-e836-4027-a489-170dbe9514ae_1680x.jpg?v=1755022395",
                "product_url": "https://kettl.co/collections/matcha-green-tea/products/kohata-matcha-20g",
                "tags": ["oceanic", "savory", "umami"],
            },
            {
                "slug": "yamagumo-matcha",
                "name": "Yamagumo Matcha",
                "brand": "Kettl",
                "preparation": "usucha",
                "image_url": "https://kettl.co/cdn/shop/files/2a9f4b9a-5227-4211-b208-83f94887f5c4_1680x.jpg?v=1752611694",
                "product_url": "https://kettl.co/products/yamagumo-matcha?_pos=5&_sid=fbb9e8347&_ss=r",
                "tags": ["astringent", "verdant"],
            },
            {
                "slug": "sayaka",
                "name": "Sayaka",
                "brand": "Ippodo",
                "preparation": "usucha",
                "image_url": "https://ippodotea.com/cdn/shop/files/ippodo-tea-sayaka-matcha-plate.jpg?v=1761798292&width=600",
                "product_url": "https://ippodotea.com/collections/matcha/products/sayaka-no-mukashi",
                "tags": ["creamy", "sweet", "umami", "astringent"],
            },
            {
                "slug": "ummon",
                "name": "Ummon",
                "brand": "Ippodo",
                "preparation": "koicha",
                "image_url": "https://ippodotea.com/cdn/shop/files/ippodo-tea-ummon-matcha-plate.jpg?v=1761797795&width=600",
                "product_url": "https://ippodotea.com/collections/matcha/products/ummon-no-mukashi-40g",
                "tags": ["sweet", "umami", "astringent"],
            },
            {
                "slug": "kan",
                "name": "Kan",
                "brand": "Ippodo",
                "preparation": "latte",
                "image_url": "https://ippodotea.com/cdn/shop/files/ippodo-tea-kan-matcha-plate.jpg?v=1761833799&width=600",
                "product_url": "https://ippodotea.com/collections/matcha/products/kan-20",
                "tags": ["umami", "sweet", "astringent"],
            },
            {
                "slug": "ikuyo",
                "name": "Ikuyo",
                "brand": "Ippodo",
                "preparation": "latte",
                "image_url": "https://ippodotea.com/cdn/shop/files/ippodo-tea-ikuyo-matcha-plate.jpg?v=1763055331&width=600",
                "product_url": "https://ippodotea.com/collections/matcha/products/ikuyo-20",
                "tags": ["astringent", "umami", "sweet"],
            },
            {
                "slug": "wakaki",
                "name": "Wakaki",
                "brand": "Ippodo",
                "preparation": "usucha",
                "image_url": "https://ippodotea.com/cdn/shop/files/ippodo-tea-wakaki-matcha-plate.jpg?v=1761783548&width=600",
                "product_url": "https://ippodotea.com/collections/matcha/products/wakaki-20g-box",
                "tags": ["umami", "astringent", "sweet"],
            },
            {
                "slug": "rockys-matcha-ceremonial-blend-matcha",
                "name": "Ceremonial Blend",
                "brand": "Rocky's Matcha",
                "preparation": "latte",
                "image_url": "https://www.rockysmatcha.com/cdn/shop/files/Swipe_Re-Edit.jpg?crop=center&height=150&v=1760692987&width=150",
                "product_url": "https://www.rockysmatcha.com/products/rockys-matcha-ceremonial-blend-matcha-100g",
                "tags": ["rich", "savory"],
            },
            {
                "slug": "rockys-matcha-osada-ceremonial-blend",
                "name": "Osada Ceremonial Blend",
                "brand": "Rocky's Matcha",
                "preparation": "latte",
                "image_url": "https://www.rockysmatcha.com/cdn/shop/files/Rocky_sOct2024Photo7.2Large.jpg?crop=center&height=863&v=1763596042&width=720",
                "product_url": "https://www.rockysmatcha.com/products/rockys-matcha-osada-ceremonial-blend-matcha-20g",
                "tags": ["silky", "roasted"],
            },
            {
                "slug": "rockys-matcha-Shiranami-ceremonial-blend",
                "name": "Shiranami Ceremonial Blend",
                "brand": "Rocky's Matcha",
                "preparation": "usucha",
                "image_url": "https://www.rockysmatcha.com/cdn/shop/files/rocky_smatchaShiranamiCeremonialBlendMatcha100g2-min.jpg?crop=center&height=863&v=1760685401&width=720",
                "product_url": "https://www.rockysmatcha.com/products/rockys-matcha-shiranami-ceremonial-blend-matcha-20g",
                "tags": ["vegetal", "umami"],
            },
            {
                "slug": "rockys-matcha-organic-Kogacha",
                "name": "Organic Kogacha",
                "brand": "Rocky's Matcha",
                "preparation": "latte",
                "image_url": "https://www.rockysmatcha.com/cdn/shop/files/rocky_smatchaOrganicKogachaBlend20g2_a3e7b55b-c92f-4539-9c31-320f547b13f3.jpg?crop=center&height=863&v=1760683638&width=720",
                "product_url": "https://www.rockysmatcha.com/products/rocky-s-matcha-organic-kogacha-blend-20g",
                "tags": ["sweet", "umami", "chocolate"],
            },
            {
                "slug": "rockys-matcha-koshun",
                "name": "Single Cultivar Koshun",
                "brand": "Rocky's Matcha",
                "preparation": "latte",
                "image_url": "https://www.rockysmatcha.com/cdn/shop/files/koshun-Rocky_sMatcha_May2024_Photo_Round100022.jpg?crop=center&height=863&v=1715825029&width=720",
                "product_url": "https://www.rockysmatcha.com/products/rockys-matcha-single-cultivar-koshun-matcha-20g",
                "tags": ["grassy", "earthy", "sweet"],
            },
            {
                "slug": "rockys-matcha-asahi",
                "name": "Single Cultivar Asahi",
                "brand": "Rocky's Matcha",
                "preparation": "latte",
                "image_url": "https://www.rockysmatcha.com/cdn/shop/files/rocky_s_matcha_Single_Cultivar_Asahi_Matcha_20g_2-min.png?crop=center&height=863&v=1760621056&width=720",
                "product_url": "https://www.rockysmatcha.com/products/rockys-matcha-single-cultivar-asahi-matcha-20g",
                "tags": ["umami", "vanilla"],
            },
            {
                "slug": "rockys-matcha-horii-shichimeien-narino",
                "name": "Horii Shichimeien Narino",
                "brand": "Rocky's Matcha",
                "preparation": "usucha",
                "image_url": "https://www.rockysmatcha.com/cdn/shop/files/Narino_Ball_2-White-min.jpg?crop=center&height=863&v=1760692723&width=720",
                "product_url": "https://www.rockysmatcha.com/products/rockys-matcha-single-cultivar-narino-matcha-20g",
                "tags": ["umami", "rich", "floral"],
            },
            # TODO: finish rocky's matcha 
            # TODO: kettl matcha

            {
                "slug": "meiko-ceremonial-matcha",
                "name": "Meiko™ Ceremonial Matcha",
                "brand": "Matchaeologist",
                "preparation": "latte",
                "image_url": "https://www.matchaeologist.com/cdn/shop/products/P-01_1024x1024.jpg?v=1487288229",
                "product_url": "https://www.matchaeologist.com/products/meiko-ceremonial-matcha?srsltid=AfmBOophHDiNmVeBfMC_UK7oLzN1Cfls2uOWo1LlIly5I6xyyFdjmE3u",
                "tags": ["floral", "sweet", "savory", "astringent"],
            },
        ]
        products = {}
        for spec in product_specs:
            tag_slugs = spec["tags"]
            prep = preparations[spec["preparation"]]
            slug = spec["slug"]
            product, _ = Product.objects.get_or_create(
                name=spec["name"],
                brand=spec["brand"],
                defaults={
                    "preparation": prep,
                    "image_url": spec["image_url"],
                    "product_url": spec["product_url"],
                },
            )
            product.name = spec["name"]
            product.brand = spec["brand"]
            product.preparation = prep
            product.image_url = spec["image_url"]
            product.product_url = spec["product_url"]
            product.save()
            product.tags.set([tags[tag_slug] for tag_slug in tag_slugs if tag_slug in tags])
            self.create_product_tastes(product, spec["tags"])
            products[slug] = product
        self.stdout.write(self.style.SUCCESS(f"Products ready ({len(products)})"))
        return products


    def _create_quiz(self):
        quiz, _ = Quiz.objects.get_or_create(
            slug="first-time-quiz",
            version=1,
            defaults={"title": "Taste Discovery"},
        )
        quiz.title = "Taste Discovery"
        quiz.save()

        # Mirrors koicha-app/src/app/data/form-questions.mock.ts
        question_specs = [
            {
                "initial_prompt": "It's a beautiful",
                "follow_up_prompt": "day",
                "options": [
                    {"value": "floral", "label": "Spring"},
                    {"value": "grassy", "label": "Summer"},
                    {"value": "creamy", "label": "Fall"},
                    {"value": "umami", "label": "Winter"},
                ],
            },
            {
                "initial_prompt": "You are welcomed into a",
                "follow_up_prompt": "restaurant for the afternoon",
                "options": [
                    {"value": "creamy", "label": "Cozy"},
                    {"value": "floral", "label": "Airy"},
                    {"value": "umami", "label": "Luxurious"},
                    {"value": "grassy", "label": "Minimalist"},
                ],
            },
            {
                "initial_prompt": "There's a pleasant",
                "follow_up_prompt": "aroma in the air",
                "options": [
                    {"value": "creamy", "label": "Vanilla"},
                    {"value": "nutty", "label": "Freshly baked bread"},
                    {"value": "floral", "label": "Wildflowers"},
                    {"value": "grassy", "label": "Lemongrass"},
                ],
            },
            {
                "initial_prompt": "Let's order a drink! The",
                "follow_up_prompt": "sounds good",
                "options": [
                    {"value": "astringent", "label": "Black coffee"},
                    {"value": "floral", "label": "Plum tea"},
                    {"value": "creamy", "label": "Hot chocolate"},
                    {"value": "nutty", "label": "Mocha"},
                ],
            },
            {
                "initial_prompt": "You'll have that with",
                "follow_up_prompt": "",
                "options": [
                    {"value": "astringent", "label": "no milk"},
                    {"value": "nutty", "label": "almond milk"},
                    {"value": "umami", "label": "oat milk"},
                    {"value": "creamy", "label": "whole milk"},
                ],
            },
            {
                "initial_prompt": "You like...",
                "follow_up_prompt": "",
                "options": [
                    {"value": "usucha", "label": "A refreshing beverage"},
                    {"value": "koicha", "label": "A rich beverage to enjoy slowly"},
                    {"value": "latte", "label": "A satisfying beverage you can take on the go"},
                ],
            },
            {
                "initial_prompt": "What looks good on the menu?",
                "follow_up_prompt": "",
                "options": [
                    {"value": "umami", "label": "Mushroom pappardelle"},
                    {"value": "nutty", "label": "Pistachio croissant"},
                    {"value": "astringent", "label": "Sushi"},
                    {"value": "grassy", "label": "Salad"},
                ],
            },
            {
                "initial_prompt": "You'll take a",
                "follow_up_prompt": "to go",
                "options": [
                    {"value": "nutty", "label": "Cardamom bun"},
                    {"value": "creamy", "label": "Canele"},
                    {"value": "floral", "label": "Orange blossom madeleine"},
                    {"value": "umami", "label": "Spinach and white cheddar puff pastry"},
                ],
            },
        ]

        for order, spec in enumerate(question_specs, start=1):
            question, _ = QuizQuestion.objects.get_or_create(
                quiz=quiz,
                initial_prompt=spec["initial_prompt"],
                defaults={
                    "follow_up_prompt": spec["follow_up_prompt"],
                    "order": order,
                },
            )
            question.follow_up_prompt = spec["follow_up_prompt"]
            question.order = order
            question.save()

            for option_spec in spec["options"]:
                QuizOption.objects.get_or_create(
                    question=question,
                    value=option_spec["value"],
                    defaults={"label": option_spec["label"]},
                )
        self.stdout.write(self.style.SUCCESS("Quiz content ready"))
        return {"quiz": quiz}

    def _create_review_preferences(self):
        preference_specs = [
            {"bucket": "DISLIKED", "label": "Not for me", "value": Decimal("20")},
            {"bucket": "FINE", "label": "It was fine", "value": Decimal("50")},
            {"bucket": "LIKED", "label": "I liked it", "value": Decimal("80")},
        ]
        preferences = {}
        for spec in preference_specs:
            preference, _ = ReviewPreference.objects.get_or_create(**spec)
            preferences[spec["bucket"]] = preference

        sub_preferences = {}
        sub_specs = [
            {"slug": "disliked-really-disliked", "bucket": "DISLIKED", "label": "Really Disliked", "value": Decimal("10")},
            {"slug": "disliked-disliked", "bucket": "DISLIKED", "label": "Disliked", "value": Decimal("20")},
            {"slug": "disliked-slightly-disliked", "bucket": "DISLIKED", "label": "Slightly Disliked", "value": Decimal("30")},
            {"slug": "fine-meh", "bucket": "FINE", "label": "Meh", "value": Decimal("40")},
            {"slug": "fine-fine", "bucket": "FINE", "label": "Fine", "value": Decimal("50")},
            {"slug": "fine-good", "bucket": "FINE", "label": "Good", "value": Decimal("60")},
            {"slug": "liked-liked", "bucket": "LIKED", "label": "Liked", "value": Decimal("70")},
            {"slug": "liked-really-liked", "bucket": "LIKED", "label": "Really liked", "value": Decimal("80")},
            {"slug": "liked-loved", "bucket": "LIKED", "label": "Loved", "value": Decimal("90")},
        ]
        for spec in sub_specs:
            bucket = preferences[spec["bucket"]]
            subpref, _ = ReviewSubPreference.objects.get_or_create(
                bucket=bucket,
                label=spec["label"],
                defaults={"value": spec["value"]},
            )
            subpref.value = spec["value"]
            subpref.save()
            sub_preferences[spec["slug"]] = subpref
        self.stdout.write(self.style.SUCCESS("Review preference ladders ready"))
        return {"preferences": preferences, "sub_preferences": sub_preferences}


    def _create_taste_profile_archetypes(self):
        archetype_specs = [
            {
                "slug": "citrus_sage",
                "name": "Citrus Sage",
                "description": "Seeks high-energy, sparkling infusions grounded by herbs.",
            },
            {
                "slug": "forest_guardian",
                "name": "Forest Guardian",
                "description": "Looks for layered roasted notes with calm, grounding depth.",
            },
        ]
        archetypes = {}
        for spec in archetype_specs:
            archetype, _ = TasteProfileArchetype.objects.get_or_create(**spec)
            archetypes[spec["slug"]] = archetype
        self.stdout.write(self.style.SUCCESS("Taste profile archetypes seeded"))
        return archetypes

    def _create_flavor_characteristics(self):
        flavor_specs = [
            {"slug": "umami", "name": "umami"},
            {"slug": "floral", "name": "floral"},
            {"slug": "astringent", "name": "astringent"},
            {"slug": "grassy", "name": "grassy"},
            {"slug": "nutty", "name": "nutty"},
            {"slug": "creamy", "name": "creamy"},
        ]
        flavor_characteristics = {}
        for spec in flavor_specs:
            flavor, _ = FlavorCharacteristic.objects.get_or_create(**spec)
            flavor_characteristics[spec["slug"]] = flavor
        self.stdout.write(self.style.SUCCESS("Flavor characteristics catalogued"))
        return flavor_characteristics
    
    def _create_default_taste_profile(self):
        taste_profile = TasteProfile.objects.create(is_system=True)
        main_characteristics = FlavorCharacteristic.objects.filter(parent__isnull=True, is_active=True)

        TasteProfileFlavorDimension.objects.bulk_create([
            TasteProfileFlavorDimension(
                taste_profile=taste_profile,
                characteristic=fc,
            )
            for fc in main_characteristics
        ])
        self.stdout.write(self.style.SUCCESS("Default Taste Profile Created"))
        return taste_profile

