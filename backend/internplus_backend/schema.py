from graphene import Field, Schema, ObjectType, String, Int, Float
from graphene.relay import Connection, Node, ConnectionField
from graphene_django import DjangoObjectType, DjangoListField, DjangoConnectionField
from graphene_django.filter import DjangoFilterConnectionField
from django.db.models import Min, Count, Avg

from internplus_backend.api.models import Company, Job, Review, Location, Tag


def min_max_salary_resolver(parent_class, min_or_max):
    def resolve_salary(parent, info):
        # todo: get min or max salary based on `min_or_max`
        try:
            review = parent_class.objects.get(
                id=parent.id).reviews.order_by('salary_usd')[0]
        except:
            return None

        return Salary(value=review.salary, currency_code=review.salary_currency)

    return resolve_salary


def avg_rating_resolver(parent_class):
    def resolve_avg_rating(parent, info):
        return parent_class.objects.get(id=parent.id).reviews.aggregate(Avg('rating_overall'))['rating_overall__avg']

    return resolve_avg_rating


class ConnectionWithCount(Connection):
    class Meta:
        abstract = True

    @classmethod
    def __init_subclass_with_meta__(cls, node=None, name=None, **options):
        result = super().__init_subclass_with_meta__(node=node, name=name, **options)
        cls._meta.fields["count"] = Field(
            type=Int,
            name="count",
            description="Number of items in the queryset.",
            required=True,
            resolver=cls.resolve_count,
        )
        return result

    def resolve_count(self, *_) -> int:
        return self.iterable.count()


class Salary(ObjectType):
    value = Float()
    currency_code = String()


class LocationType(DjangoObjectType):
    class Meta:
        model = Location


class TagType(DjangoObjectType):
    class Meta:
        model = Tag


class ReviewType(DjangoObjectType):
    # IDEA: override query set selector to only include reviews that have been approved (`is_live=True`)
    # https://docs.graphene-python.org/projects/django/en/latest/queries/#default-queryset

    class Meta:
        name = 'Review'
        model = Review
        interfaces = (Node, )
        connection_class = ConnectionWithCount
        filter_fields = ["author"]


class JobType(DjangoObjectType):
    max_salary = Field(
        Salary, resolver=min_max_salary_resolver(Job, 'max'))
    min_salary = Field(
        Salary, resolver=min_max_salary_resolver(Job, 'min'))
    avg_rating = Field(Float, resolver=avg_rating_resolver(Job))

    reviews = DjangoFilterConnectionField(ReviewType)

    class Meta:
        name = 'Job'
        model = Job
        interfaces = (Node, )
        connection_class = ConnectionWithCount
        filter_fields = ["slug"]


class JobConnection(Connection):
    class Meta:
        node = JobType


class CompanyType(DjangoObjectType):
    max_salary = Field(
        Salary, resolver=min_max_salary_resolver(Company, 'max'))
    min_salary = Field(
        Salary, resolver=min_max_salary_resolver(Company, 'min'))
    avg_rating = Field(Float, resolver=avg_rating_resolver(Company))

    jobs = DjangoFilterConnectionField(JobType)
    reviews = DjangoFilterConnectionField(ReviewType)

    class Meta:
        name = 'Company'
        model = Company
        interfaces = (Node, )


class CompanyConnection(Connection):
    class Meta:
        node = CompanyType


class Query(ObjectType):
    companies = DjangoListField(CompanyType)
    company_by_slug = Field(
        CompanyType, slug=String(required=True))

    jobs = DjangoListField(JobType)
    reviews = DjangoListField(ReviewType)


schema = Schema(query=Query)
