from graphene import Field, Schema, ObjectType, String, Int
from graphene_django import DjangoObjectType, DjangoListField
from django.db.models import Min

from internplus_backend.api.models import Company, Job, Review


class CompanyType(DjangoObjectType):
    num_reviews = Int()

    def resolve_num_reviews(parent):
        return Review.objects.filter(company_id=parent.id).count()

    class Meta:
        name = 'Company'
        model = Company


class JobType(DjangoObjectType):
    class Meta:
        name = 'Job'
        model = Job


class ReviewType(DjangoObjectType):
    class Meta:
        name = 'Review'
        model = Review


class Query(ObjectType):
    companies = DjangoListField(CompanyType)
    company_by_slug = Field(
        CompanyType, slug=String(required=True))

    jobs = DjangoListField(JobType)
    reviews = DjangoListField(ReviewType)


schema = Schema(query=Query)
