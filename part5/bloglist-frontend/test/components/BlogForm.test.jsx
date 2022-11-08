import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../../src/components/BlogForm";

describe("<BlogForm />", () => {
    test("<BlogForm /> updates state and calls the event handler to create a new blog", async () => {
        const addBlog = jest.fn();
        const user = userEvent.setup();

        const { container } = render(<BlogForm addBlog={addBlog} />);

        const titleInput = container.querySelector("#title");
        const authorInput = container.querySelector("#author");
        const urlInput = container.querySelector("#url");
        const likesInput = container.querySelector("#likes");
        const createButton = screen.getByText("Create");

        await user.type(titleInput, "a blog title");
        await user.type(authorInput, "the blog author");
        await user.type(urlInput, "the blog url");
        await user.type(likesInput, "5");
        await user.click(createButton);

        expect(addBlog.mock.calls).toHaveLength(1);
        expect(addBlog.mock.calls[0][0].title).toBe("a blog title");
        expect(addBlog.mock.calls[0][0].author).toBe("the blog author");
        expect(addBlog.mock.calls[0][0].url).toBe("the blog url");
        expect(addBlog.mock.calls[0][0].likes).toBe("5");
    });
});
