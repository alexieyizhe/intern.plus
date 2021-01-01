from graphene import Field, Schema, ObjectType, String, Int, Float
from graphene_django import DjangoObjectType, DjangoListField
from django.db.models import Min, Count, Avg

from internplus_backend.api.models import Company, Job, Review, Location, Tag


class Salary(ObjectType):
    value = Float()
    currency_code = String()


def min_max_salary_resolver(parent_class, min_or_max):
    def resolve_salary(parent, info):
        # todo: get min or max salary based on `min_or_max`
        review = parent_class.objects.get(
            id=parent.id).reviews.order_by('salary_usd')[0]
        return Salary(value=review.salary, currency_code=review.salary_currency)

    return resolve_salary


def avg_rating_resolver(parent_class):
    def resolve_avg_rating(parent, info):
        return parent_class.objects.get(id=parent.id).reviews.aggregate(Avg('rating_overall'))['rating_overall__avg']

    return resolve_avg_rating


class LocationType(DjangoObjectType):
    class Meta:
        model = Location


class TagType(DjangoObjectType):
    class Meta:
        model = Tag


class CompanyType(DjangoObjectType):
    # TODO: build review count with connections
    # num_reviews = Int()

    max_salary = Field(
        Salary, resolver=min_max_salary_resolver(Company, 'max'))
    min_salary = Field(
        Salary, resolver=min_max_salary_resolver(Company, 'min'))
    avg_rating = Field(Float, resolver=avg_rating_resolver(Company))

    class Meta:
        name = 'Company'
        model = Company


class JobType(DjangoObjectType):
    # TODO: build review count with connections
    # num_reviews = Int()

    max_salary = Field(
        Salary, resolver=min_max_salary_resolver(Job, 'max'))
    min_salary = Field(
        Salary, resolver=min_max_salary_resolver(Job, 'min'))
    avg_rating = Field(Float, resolver=avg_rating_resolver(Job))

    class Meta:
        name = 'Job'
        model = Job


class ReviewType(DjangoObjectType):
    # IDEA: override query set selector to only include reviews that have been approved (`is_live=True`)
    # https://docs.graphene-python.org/projects/django/en/latest/queries/#default-queryset
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
