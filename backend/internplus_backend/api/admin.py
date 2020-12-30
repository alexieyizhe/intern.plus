from django.contrib import admin
from internplus_backend.api.models import Company, Job, Location, Tag, Review


admin.site.register(Company)
admin.site.register(Job)
admin.site.register(Location)
admin.site.register(Tag)
admin.site.register(Review)
