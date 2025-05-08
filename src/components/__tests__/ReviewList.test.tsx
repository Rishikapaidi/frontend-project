// src/components/__tests__/ReviewList.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import ReviewList from "../../pages/ReviewList";
import * as api from "../../services/api";

vi.mock("../../services/api");

describe("ReviewList", () => {
  const reviews = [
    { id: 1, user: { username: "alice" }, comment: "Great!" },
    { id: 2, user: { username: "bob" }, comment: "Nice work" },
  ];

  beforeEach(() => {
    // @ts-ignore
    api.getServiceById.mockResolvedValue({ reviews });
    // If your ReviewList calls a reviews endpoint separately, mock that instead:
    // @ts-ignore
    api.getReviewsForService.mockResolvedValue(reviews);
  });

  it("fetches and displays reviews for a given service", async () => {
    render(<ReviewList serviceId={123} />);

    await waitFor(() => {
      expect(screen.getByText("Great!")).toBeInTheDocument();
      expect(screen.getByText("Nice work")).toBeInTheDocument();
    });
  });
});
