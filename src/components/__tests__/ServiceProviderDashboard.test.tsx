// src/components/__tests__/ServiceProviderDashboard.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import ProviderDashboard from "../../pages/ProviderDashboard";
import * as api from "../../services/api";

vi.mock("../../services/api");

describe("ProviderDashboard", () => {
  const mockJobs = [
    { id: 5, title: "My Job" },
    { id: 6, title: "Another Job" },
  ];

  beforeEach(() => {
    // @ts-ignore
    api.getServices.mockResolvedValue(mockJobs);
  });

  it("renders the provider’s jobs in a 2-column grid", async () => {
    render(<ProviderDashboard />);

    await waitFor(() => {
      expect(screen.getByText("My Job")).toBeInTheDocument();
      expect(screen.getByText("Another Job")).toBeInTheDocument();
    });

    const container = screen.getByText("My Job").closest("div");
    expect(container).toHaveClass("grid-cols-2");
  });
});
