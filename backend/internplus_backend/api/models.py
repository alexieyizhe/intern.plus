from django.db import models


class CommonModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Location(CommonModel):
    city = models.CharField(max_length=100)
    subdivision = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100)
    #  can add lat-long, etc

    def __str__(self):
        return f'{self.city}, {self.country}'


class Tag(CommonModel):
    slug = models.SlugField(max_length=100, unique=True)
    label = models.CharField(max_length=100)

    def __str__(self):
        return self.label


class Company(CommonModel):
    slug = models.SlugField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    website = models.URLField()
    logo = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.slug


class Job(CommonModel):
    slug = models.SlugField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name='companies')
    locations = models.ManyToManyField(Location)

    def __str__(self):
        return self.slug


class Review(CommonModel):
    job = models.ForeignKey(
        Job, on_delete=models.CASCADE, related_name='reviews')
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name='reviews')

    author = models.EmailField(null=True, blank=True)

    rating_overall = models.PositiveIntegerField()
    rating_learning_mentorship = models.PositiveIntegerField()
    rating_meaningful_work = models.PositiveIntegerField()
    rating_work_life_balance = models.PositiveIntegerField()

    salary = models.PositiveIntegerField(blank=True)
    salary_usd = models.PositiveIntegerField(blank=True)
    salary_currency = models.CharField(max_length=3, blank=True)

    body = models.CharField(max_length=100)
    tags = models.ManyToManyField(Tag, blank=True)
    #  can add benefits, etc

    is_live = models.BooleanField(default=False)

    def __str__(self):
        body = f'{self.body[:40]}...' if len(self.body) > 40 else self.body
        return f'{str(self.id)}: {body}'
