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
    description = models.CharField(max_length=500)
    link = models.URLField()
    logo = models.URLField()

    numReviews = models.IntegerField()
    avgOverallRating = models.FloatField()
    avgLearningMentorshipRating = models.FloatField()
    avgMeaningfulWorkRating = models.FloatField()
    avgWorkLifeBalanceRating = models.FloatField()

    numSalaries = models.IntegerField()
    avgHourlySalary = models.FloatField()
    minHourlySalary = models.FloatField()
    maxHourlySalary = models.FloatField()

    def __str__(self):
        return self.name


class Job(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    locations = models.ManyToManyField(Location)

    numReviews = models.IntegerField()
    avgOverallRating = models.FloatField()
    avgLearningMentorshipRating = models.FloatField()
    avgMeaningfulWorkRating = models.FloatField()
    avgWorkLifeBalanceRating = models.FloatField()

    numSalaries = models.IntegerField()
    avgHourlySalary = models.FloatField()
    minHourlySalary = models.FloatField()
    maxHourlySalary = models.FloatField()

    def __str__(self):
        return self.name


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
    salaryCurrency = models.CharField(max_length=5)
    salaryPeriod = models.CharField(choices=SalaryPeriod.choices)

    def __str__(self):
        return self.name
