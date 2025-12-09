from django.db.models import OuterRef, Subquery
from apps.products.models import Product
from .models import ProductMatch

def products_with_match_for_user(user):
    user_matches = ProductMatch.objects.filter(
        user=user, product=OuterRef("pk")
        ).values("score")[:1]
    
    return (
        Product.objects
        .all()
        .annotate(match_score=Subquery(user_matches))
    )