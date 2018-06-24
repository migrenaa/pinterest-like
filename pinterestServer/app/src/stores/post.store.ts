const knex = require("knex")(require("../../knexfile"));

export namespace PostStore {

    export function getById(id: number) {
        return knex("posts").where("id", id).first();
    }
    export function create(content: string, photoUrl: string, authorId: number) {
        return knex("posts").insert({
            content: content,
            photoUrl: photoUrl,
            authorId: authorId
        }).returning("id");
    }

    export function relatePostToCategory(postId: number, categoryId: number) {
        return knex("postCategories").insert({
            postId : postId,
            categoryId : categoryId
        });
    }

    export function getByCategoryId(categoryId: number) {
        return knex("posts")
            .join("postCategories", "posts.id", "=", "postCategories.postId")
            .where("categoryId", categoryId);
    }

    export function getByCategoryName(categoryName: string) {
        return knex("posts")
            .join("postCategories", "posts.id", "=", "postCategories.postId")
            .join("categories", "postCategories.categoryId", "categories.id")
            .where("categories.name", categoryName);
    }

    export function getAll() {
        return knex("posts");
    }
}
