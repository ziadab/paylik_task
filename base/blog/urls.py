from django.urls import path
from .views import BlogPostListCreateView, BlogPostDetailView

urlpatterns = [
    path("blogs/", BlogPostListCreateView.as_view(), name="post-list-create"),
    path("blogs/<int:pk>/", BlogPostDetailView.as_view(), name="post-detail"),
]
