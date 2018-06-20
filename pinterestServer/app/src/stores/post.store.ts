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
    export function getByCategoryId(categoryId: number) {
        return knex("posts")
            .join("postCategories", "posts.id", "=", "postCategories.postId")
            .where("categoryId", categoryId);
    }

    export function getAll() {
        return knex("posts");
    }
}
