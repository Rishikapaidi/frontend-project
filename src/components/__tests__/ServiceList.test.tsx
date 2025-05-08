import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import ServiceList from "../../pages/ServiceList";
import * as api from "../../services/api";

vi.mock("../../services/api");

describe("ServiceList", () => {
  const fakeServices = [
    { id: 1, title: "Clean Windows" },
    { id: 2, title: "Dog Walking" },
  ];

  beforeEach(() => {
    // @ts-ignore
    api.getServices.mockResolvedValue(fakeServices);
  });

  it("fetches and displays a list of service titles", async () => {
    render(<ServiceList />);

    await waitFor(() => {
      expect(screen.getByText("Clean Windows")).toBeInTheDocument();
      expect(screen.getByText("Dog Walking")).toBeInTheDocument();
    });
  });
});
