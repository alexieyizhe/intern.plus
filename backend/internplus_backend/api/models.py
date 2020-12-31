from django.db import models


class CommonModel(models.Model):
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Location(CommonModel):
    city = models.CharField(max_length=100)
    subdivision = models.CharField(max_length=100, null=True)
    country = models.CharField(max_length=100)


class Tag(CommonModel):
    value = models.CharField(max_length=100)


class HourlySalary(CommonModel):
    value = models.PositiveIntegerField()  # normalized to HOURLY value
    currencyCode = models.CharField(max_length=3)


class Company(CommonModel):
    slug = models.SlugField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    website = models.URLField()
    logo = models.ImageField()


class Job(CommonModel):
    slug = models.SlugField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    locations = models.ManyToManyField(Location)


class Review(CommonModel):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    author = models.EmailField()

    overall = models.PositiveIntegerField()
    learningMentorship = models.PositiveIntegerField()
    meaningfulWork = models.PositiveIntegerField()
    workLifeBalance = models.PositiveIntegerField()

    salary = models.OneToOneField(
        HourlySalary, on_delete=models.CASCADE, null=True)
    body = models.CharField(max_length=100)
    tags = models.ManyToManyField(Tag, blank=True)
    #  can add benefits, etc
