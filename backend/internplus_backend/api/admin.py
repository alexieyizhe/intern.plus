from django.contrib import admin
from internplus_backend.api.models import Company, Job, Review, Location, Tag


admin.site.register(Company)
admin.site.register(Job)
admin.site.register(Review)

admin.site.register(Location)
admin.site.register(Tag)
