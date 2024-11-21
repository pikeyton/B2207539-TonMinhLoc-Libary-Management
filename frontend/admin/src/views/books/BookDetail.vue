<template>
    <BackButton />
    <div class="book-detail">
        <BookDetailCard :book="book" :isDetailView="true" />
        <div class="comments-section">
            <h3>Bình luận</h3>
            <BookComments :comments="comments" @add-comment="handleAddComment" />
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import BookDetailCard from "@/components/books/BookDetailCard.vue";
import BookComments from "@/components/books/BookComments.vue";
import bookService from "@/services/book.service";
import commentService from "@/services/comment.service";
import BackButton from "@/components/common/BackButton.vue";
import { useRoute } from "vue-router";

export default {
    name: "BookDetail",
    components: { BookDetailCard, BookComments, BackButton },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    setup() {
        const route = useRoute();
        const book = reactive({});
        const comments = reactive([]);

        // Fetch book details
        const fetchBook = async () => {
            try {
                const response = await bookService.findOne(route.params.id);
                Object.assign(book, response.data);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin sách:", error);
            }
        };

        // Fetch comments
        const fetchComments = async () => {
            try {
                const response = await commentService.findByBook(route.params.id);
                Object.assign(comments, response.data);
            } catch (error) {
                console.error("Lỗi khi lấy bình luận:", error);
            }
        };

        // Add comment
        const handleAddComment = async (newComment) => {
            try {
                console.log(newComment);
                const response = await commentService.create(route.params.id, newComment);
                comments.push(response.data); // Thêm bình luận mới vào danh sách
            } catch (error) {
                console.error("Lỗi khi gửi bình luận:", error);
                alert("Đã xảy ra lỗi khi gửi bình luận.");
            }
        };

        onMounted(() => {
            fetchBook();
            fetchComments();
        });

        return {
            book,
            comments,
            handleAddComment,
        };
    },
};
</script>

<style scoped>
.book-detail {
    max-width: 800px;
    margin: 0 auto;
}

.comments-section {
    margin-top: 20px;
}
</style>
