import { render, screen } from "@testing-library/react";
import Header from "../components/header";
import "@testing-library/jest-dom";

describe("Header Component", () => {
  it("should render correctly", () => {
    render(<Header />);

    // Check for h1 with text "My Music Library"
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("My Music Library");

    // Check for the Guitar icon from lucide-react
    const icon = document.querySelector(".header-guitar-icon");
    expect(icon).toBeInTheDocument();

    // Ensure nothing else is rendered (only the icon and h1 inside the header)
    const header = screen.getByRole("banner"); // Assuming StyledHeader has role banner or similar
    expect(header.children).toHaveLength(2); // Icon and h1
  });
});
