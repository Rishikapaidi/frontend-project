// src/pages/__tests__/ServiceDetail.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";

import ServiceDetail from "../../pages/ServiceDetail";
import * as api from "../../services/api";

vi.mock("../../services/api");

describe("ServiceDetail", () => {
  const fakeService = {
    id: 42,
    title: "Test Service",
    description: "Desc",
    price: 99,
    provider_id: 7,
    availableSlots: ["9:00", "10:00"],
    category: "TestCat",
  };

  beforeEach(() => {
    // @ts-ignore
    api.getServiceById.mockResolvedValue(fakeService);
  });

  it("renders service info, booking section, reviews, and chat widget", async () => {
    render(
      <MemoryRouter initialEntries={["/services/42"]}>
        <Routes>
          <Route path="/services/:id" element={<ServiceDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      // Title and description
      expect(screen.getByText("Test Service")).toBeInTheDocument();
      expect(screen.getByText("Desc")).toBeInTheDocument();

      // There should be exactly two "$ 99" occurrences:
      //  1) the main price display
      //  2) the "Price:" line in the booking form
      const priceEls = screen.getAllByText(/\$\s*99/);
      expect(priceEls).toHaveLength(2);

      // Check booking section header
      expect(
        screen.getByRole("heading", { name: "Book This Service" })
      ).toBeInTheDocument();

      // Check reviews section
      expect(
        screen.getByRole("heading", { name: "Reviews" })
      ).toBeInTheDocument();
      expect(screen.getByText("No reviews yet.")).toBeInTheDocument();

      // Chat widget button
      expect(screen.getByRole("button", { name: "💬" })).toBeInTheDocument();
    });
  });
});
