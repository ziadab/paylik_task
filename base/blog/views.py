from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from django.core.cache import cache
from .models import BlogPost
from .serializers import BlogPostSerializer


class BlogPostListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        parameters=[
            OpenApiParameter(
                "title",
                type=str,
                required=False,
                description="Filter blog posts by title (partial match).",
            ),
            OpenApiParameter(
                "author",
                type=str,
                required=False,
                description="Filter blog posts by author's username.",
            ),
            OpenApiParameter(
                "page_size",
                type=int,
                required=False,
                description="Number of posts per page.",
            ),
            OpenApiParameter(
                "page", type=int, required=False, description="Page number."
            ),
        ],
        responses={
            200: BlogPostSerializer(many=True),
            401: str,
            400: str,
        },
        description="Retrieve a list of blog posts with optional filtering and pagination.",
    )
    def get(self, request):
        title = request.query_params.get("title", None)
        author = request.query_params.get("author", None)

        paginator = PageNumberPagination()
        paginator.page_size_query_param = "page_size"

        queryset = BlogPost.objects.all().order_by("-created_at")

        if author:
            queryset = queryset.filter(author__username=author)
        if title:
            queryset = queryset.filter(title__icontains=title)

        result_page = paginator.paginate_queryset(queryset, request)
        serializer = BlogPostSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    @extend_schema(request=BlogPostSerializer, responses={201: BlogPostSerializer})
    def post(self, request):
        serializer = BlogPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlogPostDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try: 
            blog = cache.get(f"blog_{pk}")
            if blog:
                return blog
            else:
                blog = BlogPost.objects.get(pk=pk)
                cache.set(f"blog_{pk}", blog, timeout=60*60*24)
                return blog
        except BlogPost.DoesNotExist:
            return Response(
                {"message": "Blog does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

    @extend_schema(
        responses={200: BlogPostSerializer, 404: str},
        description="Retrieve a specific blog post by ID.",
    )
    def get(self, request, pk):
        blog_post = self.get_object(pk)
        if isinstance(blog_post, Response):
            return blog_post
        serializer = BlogPostSerializer(blog_post)
        return Response(serializer.data)

    @extend_schema(
        request=BlogPostSerializer,
        responses={200: BlogPostSerializer, 403: str, 400: str},
    )
    def put(self, request, pk):
        blog_post = self.get_object(pk)
        
        if request.user != blog_post.author:
            return Response(
                {"message": "You do not have permission to delete this post"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = BlogPostSerializer(blog_post, data=request.data)
        if serializer.is_valid():
            blog = serializer.save()
            cache.set(f"blog_{pk}", blog, timeout=60*60*24)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(responses={204: None, 403: str})
    def delete(self, request, pk):
        blog_post = self.get_object(pk)
        if request.user != blog_post.author:
            return Response(
                {"message": "You do not have permission to delete this post"},
                status=status.HTTP_403_FORBIDDEN,
            )

        blog_post.delete()
        cache.delete(f"blog_{pk}")
        return Response(status=status.HTTP_204_NO_CONTENT)
