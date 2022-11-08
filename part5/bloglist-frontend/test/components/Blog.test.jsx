import { fireEvent, render, screen } from "@testing-library/react";
import Blog from "../../src/components/Blog";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

describe("Pruebas al componente <Blog/>", () => {
    let blog;

    beforeEach(() => {
        blog = {
            user: {
                id: "oabrivard",
            },
            title: "a blog title",
            author: "the blog author",
            url: "the blog url",
            likes: 3107,
        };
    });

    test("renders title but not url nor author by default", () => {
        const { container } = render(<Blog blog={blog} />);
        const div = container.querySelector(".blog");

        expect(div).toHaveTextContent("a blog title");
        expect(div).toHaveTextContent("the blog author");
        expect(div).not.toHaveTextContent("the blog url");
        expect(div).not.toHaveTextContent("likes 3107");
    });

    test("renders all properties when [view] is clicked", () => {
        render(<Blog blog={blog} />);
        const button = screen.getByText("View");
        fireEvent.click(button);

        expect(screen.getByText("URL: the blog url")).toBeDefined();
        expect(screen.getByText("Likes: 3107")).toBeDefined();
    });

    test("when [like] is clicked twice, its event handler is called twice", () => {
        const mockHandler = jest.fn();
        render(
            <Blog userId="oabrivard" blog={blog} updateBlog={mockHandler} />
        );
        const viewButton = screen.getByText("View");
        fireEvent.click(viewButton);
        const likeButton = screen.getByText("Likes");
        fireEvent.click(likeButton);
        fireEvent.click(likeButton);
        expect(mockHandler.mock.calls).toHaveLength(2);
    });
});
