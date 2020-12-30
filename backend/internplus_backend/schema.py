import graphene
from graphene_django import DjangoObjectType, DjangoListField

from internplus_backend.api.models import Company, Job, Location, Tag, Review


class CompanyType(DjangoObjectType):
    class Meta:
        name = 'Company'
        model = Company
        fields = ("id", "name", "slug")


class Query(graphene.ObjectType):
    companies = DjangoListField(CompanyType)

    company_by_slug = graphene.Field(
        CompanyType, slug=graphene.String(required=True))

    def resolve_company_by_slug(root, info, slug):
        try:
            return Company.objects.get(slug=slug)
        except Company.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)
