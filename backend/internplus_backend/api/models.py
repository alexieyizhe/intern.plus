from django.db import models


class CommonModel(models.Model):
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Location(CommonModel):
    city = models.CharField(max_length=100)
    subdivision = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100)

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
    logo = models.ImageField()

    def __str__(self):
        return self.slug


class Job(CommonModel):
    slug = models.SlugField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    locations = models.ManyToManyField(Location)

    def __str__(self):
        return self.slug


class Review(CommonModel):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    author = models.EmailField()

    overall = models.PositiveIntegerField()
    learningMentorship = models.PositiveIntegerField()
    meaningfulWork = models.PositiveIntegerField()
    workLifeBalance = models.PositiveIntegerField()

    salary = models.PositiveIntegerField(blank=True)
    salaryCurrency = models.CharField(max_length=3, blank=True)

    body = models.CharField(max_length=100)
    tags = models.ManyToManyField(Tag, blank=True)
    #  can add benefits, etc

    def __str__(self):
        body = f'{self.body[:40]}...' if len(self.body) > 40 else self.body
        return f'{str(self.id)}: {body}'
