<template>
    <div>
        <!-- Hiển thị danh sách bình luận -->
        <div v-for="comment in comments" :key="comment.id" class="comment">
            <div class="evaluation">
                <span
                    v-for="n in 5"
                    :key="n"
                    class="star"
                    :class="{ filled: n <= comment.evaluation }"
                >
                    ★
                </span>
            </div>
            <p class="comment-author">
                <strong>{{ comment.readerId.firstName + " " + comment.readerId.lastName }}</strong>
            </p>
            <p class="comment-content">{{ comment.content }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "BookComments",
    props: {
        comments: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            newComment: {
                evaluation: 0,
                content: "",
                readerId: {
                    firstName: "John", // Thay bằng thông tin người dùng đăng nhập
                    lastName: "Doe",  // Thay bằng thông tin người dùng đăng nhập
                },
            },
        };
    },
    methods: {
        setRating(rating) {
            this.newComment.evaluation = rating;
        },
        submitComment() {
            if (!this.newComment.content.trim()) {
                alert("Comment content cannot be empty.");
                return;
            }
            if (this.newComment.evaluation === 0) {
                alert("Please provide a rating.");
                return;
            }

            // Thêm bình luận mới vào danh sách
            const newComment = {
                ...this.newComment,
                id: Date.now(), // Tạo ID giả
            };
            this.$emit("add-comment", newComment);

            // Reset form sau khi gửi bình luận
            this.newComment.evaluation = 0;
            this.newComment.content = "";
        },
    },
};
</script>

<style scoped>
.comment {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.evaluation {
    display: flex;
    gap: 4px;
}

.star {
    font-size: 20px;
    color: #ccc;
    cursor: pointer; /* Thêm con trỏ chỉ tay khi hover */
}

.star.filled {
    color: #FFD700;
}

.comment-author {
    font-weight: bold;
    font-size: 14px;
}

.comment-content {
    margin-top: 5px;
    font-size: 14px;
}

.comment-form {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fdfdfd;
}

.comment-form h3 {
    margin-bottom: 15px;
    font-size: 18px;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
}

textarea {
    resize: none;
}
</style>
