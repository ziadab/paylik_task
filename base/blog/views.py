from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import BlogPost
from .serializers import BlogPostSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination


class BlogPostListCreateView(APIView):
    permission_classes = [IsAuthenticated]

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
            return BlogPost.objects.get(pk=pk)
        except BlogPost.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        blog_post = self.get_object(pk)
        serializer = BlogPostSerializer(blog_post)
        return Response(serializer.data)

    def put(self, request, pk):
        blog_post = self.get_object(pk)
        if request.user != blog_post.author:
            return Response(
                {"message": "You do not have permission to delete this post"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = BlogPostSerializer(blog_post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        blog_post = self.get_object(pk)
        if request.user != blog_post.author:
            return Response(
                {"message": "You do not have permission to delete this post"},
                status=status.HTTP_403_FORBIDDEN,
            )

        blog_post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
