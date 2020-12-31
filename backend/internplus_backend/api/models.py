from django.db import models


class Location(models.Model):
    city = models.CharField(max_length=100)
    subdivision = models.CharField(max_length=100)
    country = models.CharField(max_length=100)


class Tag(models.Model):
    name = models.CharField(max_length=100)


class Company(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100)
    description = models.CharField(max_length=500)  # used to be `desc`
    link = models.URLField()  # used to be `websiteUrl`
    logo = models.URLField()  # used to be `logoSrc`

    numReviews = models.IntegerField()  # used to be `numRatings``

    totRating = models.DecimalField(max_digits=11, decimal_places=2)
    avgRating = models.FloatField()

    avgLearningMentorshipRating = models.FloatField()
    totLearningMentorshipRating = models.FloatField()
    avgMeaningfulWorkRating = models.FloatField()
    totMeaningfulWorkRating = models.FloatField()
    avgWorkLifeBalanceRating = models.FloatField()
    totWorkLifeBalanceRating = models.FloatField()

    totHourlySalary = models.FloatField()
    avgHourlySalary = models.FloatField()
    minHourlySalary = models.FloatField()
    maxHourlySalary = models.FloatField()
    hourlySalaryCurrency = models.CharField(max_length=3)

    def __str__(self):
        return self.name


class Job(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    locations = models.ManyToManyField(Location)

    totRating = models.FloatField()
    avgRating = models.FloatField()

    avgLearningMentorshipRating = models.FloatField()
    totLearningMentorshipRating = models.FloatField()
    avgMeaningfulWorkRating = models.FloatField()
    totMeaningfulWorkRating = models.FloatField()
    avgWorkLifeBalanceRating = models.FloatField()
    totWorkLifeBalanceRating = models.FloatField()

    totHourlySalary = models.FloatField()
    avgHourlySalary = models.FloatField()
    minHourlySalary = models.FloatField()
    maxHourlySalary = models.FloatField()
    hourlySalaryCurrency = models.CharField(max_length=3)

    def __str__(self):
        return self.name


class Rating(models.Model):
    overall = models.IntegerField()


class Review(models.Model):
    class SalaryPeriod(models.TextChoices):
        YEARLY = 'YEARLY'
        WEEKLY = 'WEEKLY'
        HOURLY = 'HOURLY'

    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    body = models.CharField(max_length=100)
    tags = models.ManyToManyField(Tag)
    author = models.EmailField()

    overallRating = models.FloatField()
    learningMentorshipRating = models.FloatField()
    meaningfulWorkRating = models.FloatField()
    workLifeBalanceRating = models.FloatField()

    salary = models.FloatField()
    salaryCurrency = models.CharField(max_length=3)
    salaryPeriod = models.CharField(
        max_length=20, choices=SalaryPeriod.choices)

    def __str__(self):
        return self.name
