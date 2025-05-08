import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import ReviewSection from "../ReviewSection";
import * as api from "../../services/api";

vi.mock("../../services/api");

describe("ReviewSection", () => {
  beforeEach(() => {
    // Mock the exact function your component calls to fetch reviews:
    // e.g. getServiceById or getReviewsForService
    // @ts-ignore
    api.getServiceById.mockResolvedValue({
      id: 42,
      title: "Test",
      // ...
      reviews: [{ id: 1, user: { username: "alice" }, comment: "Great!" }],
    });

    // Mock the POST helper if your component uses it:
    // @ts-ignore
    api.postReviewForService = vi.fn().mockResolvedValue({
      id: 2,
      user: { username: "bob" },
      comment: "Nice work",
    });
  });

  it("shows existing reviews and lets you add a new one", async () => {
    render(<ReviewSection serviceId={42} />);

    // Wait for the existing comment—match just "Great"
    const existing = await screen.findByText(/Great/i);
    expect(existing).toBeInTheDocument();

    // Now submit a new review
    const textarea = screen.getByPlaceholderText(/write your feedback/i);
    fireEvent.change(textarea, { target: { value: "Nice work" } });
    fireEvent.click(screen.getByRole("button", { name: /submit review/i }));

    // Wait for the new comment to show up (again match without the "!")
    const added = await screen.findByText(/Nice work/i);
    expect(added).toBeInTheDocument();

    // And verify the POST helper was called correctly
    expect(api.postReviewForService).toHaveBeenCalledWith(42, {
      comment: "Nice work",
    });
  });
});
