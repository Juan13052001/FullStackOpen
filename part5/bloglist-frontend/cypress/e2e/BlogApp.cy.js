describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/testing/reset");
        const user1 = {
            name: "Olivier Abrivard",
            username: "oabrivard",
            password: "password",
        };
        cy.request("POST", "http://localhost:3003/api/users/", user1);

        const user2 = {
            name: "Francoise Forestier",
            username: "fforestier",
            password: "password",
        };
        cy.request("POST", "http://localhost:3003/api/users/", user2);

        cy.visit("http://localhost:5173");

        cy.contains("login").click();
    });

    it("Login form is shown", function () {
        cy.contains("Username");
        cy.contains("Password");
        cy.contains("Login");
    });

    describe("Login", function () {
        it("succeeds with correct credentials", function () {
            cy.get("#username").type("oabrivard");
            cy.get("#password").type("password");
            cy.get("#login").click();

            cy.contains("Olivier Abrivard logged");
        });

        it("fails with wrong credentials", function () {
            cy.get("#username").type("oabrivard");
            cy.get("#password").type("wrong");
            cy.get("#login").click();
        });
    });

    describe("When logged in", function () {
        beforeEach(function () {
            cy.login({ username: "oabrivard", password: "password" });
        });

        it("A blog can be created", function () {
            cy.contains("Create a new Blog").click();
            cy.get("#title").type("a blog title");
            cy.get("#author").type("the blog author");
            cy.get("#url").type("the blog url");
            cy.get("#likes").type("5");
            cy.get("#create-blog").click();

            cy.contains("a blog title");
        });

        it("A blog can be deleted", function () {
            cy.createBlog({
                title: "blog to delete",
                author: "author",
                url: "url",
                likes: "5",
            });
            cy.contains("View").click();
            cy.get("#delete").click();
        });

        it("A blog can be deleted but only by its creator", function () {
            cy.createBlog({
                title: "blog that is not owned",
                author: "author",
                url: "url",
            });
            cy.get("#salir").click();
            cy.login({ username: "fforestier", password: "password" });
            cy.contains("View").click();
        });

        describe("and several blogs exist", function () {
            beforeEach(function () {
                cy.createBlog({
                    title: "first blog",
                    author: "author 1",
                    url: "url 1",
                });
                cy.createBlog({
                    title: "second blog",
                    author: "author 2",
                    url: "url 2",
                });
                cy.createBlog({
                    title: "third blog",
                    author: "author 3",
                    url: "url 3",
                });
            });

            it("one of those can be liked", function () {
                cy.contains("Title: second blog")
                    .parent()
                    .find("button")
                    .click();
                cy.get("#likes-btn").click();
                cy.contains("Title: second blog")
                    .parent()
                    .siblings()
                    .contains("Likes: 1");
            });
        });
    });
});
