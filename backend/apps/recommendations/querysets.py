from django.db.models import OuterRef, Subquery
from apps.products.models import Product
from .models import UserProductMatch

def products_with_match_for_user(user):
    # get all user match objects 
    # for the passed in user, left join on product 
    user_matches = UserProductMatch.objects.filter(
        user=user, product=OuterRef("pk")
        ).values("score")[:1]
    
    return (
        Product.objects
        .all()
        .annotate(match_score=Subquery(user_matches))
    )