import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SelectArea from "@/src/app/components/SelectArea";
import fetchMock from "jest-fetch-mock";

// Stops graphs from being rendered
jest.mock("@/src/app/components/WeatherData", () => () => <div>WeatherData Mock</div>);

jest.mock("@/src/app/components/WaterLevelGraph", () => ({
    WaterLevelGraph: jest.fn(() => <div>WaterLevelGraph Mock</div>),
}));

// Select Area unit tests
describe("SelectArea Component", () => {

    // Mocks fetch requests
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Data fetched successfully', data: [] }),
      })
    );

    it("UK is selected when component loads", async () => {
      render(<SelectArea />);

      await waitFor(() => expect(screen.getByText("Reservoir Levels in UK")).toBeInTheDocument());
    });

    it("updates when a different area is selected", async () => {
      render(<SelectArea />);

      // Open dropdown menu
      fireEvent.click(screen.getByText("Scotland"));
      
      // Click button
      fireEvent.click(screen.getByText("North Scotland"));
  
      // Check if area has been selected
      await waitFor(() => expect(screen.getByText("Reservoir Levels in North Scotland")).toBeInTheDocument());

      // Click another button and check if that area has been selected
      fireEvent.click(screen.getByText("West Scotland"));
      await waitFor(() => expect(screen.getByText("Reservoir Levels in West Scotland")).toBeInTheDocument());

    });
  });
  