import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SelectArea from "@/src/app/components/SelectArea";

// Stops graphs from being rendered
jest.mock("@/src/app/components/WeatherData", () => () => <div>WeatherData Mock</div>);

jest.mock("@/src/app/components/WaterLevelGraph", () => ({
    WaterLevelGraph: jest.fn(() => <div>WaterLevelGraph Mock</div>),
}));

// Reservoir level api calls test
describe("SelectArea fetch", () => {

    // Mocks fetch requests
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'Data fetched successfully', data: [] }),
            })
        );
    });

    // Resets mock calls
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetches data for UK when component renders', async () => {
        render(<SelectArea />);
        await waitFor(() => expect(fetch).toHaveBeenCalledWith(`/api/selectArea/UK`));
    });

    it('fetches data for correct areas', async () => {
        render(<SelectArea />);

        // Open dropdown menu
        fireEvent.click(screen.getByText("Scotland"));
        
        // Click button
        fireEvent.click(screen.getByText("North Scotland"));
        await waitFor(() => expect(fetch).toHaveBeenCalledWith(`/api/selectArea/${encodeURIComponent("North Scotland")}`));
    });

    it("Does not fetch data when the selected area is clicked again", async () => {
        render(<SelectArea />);
        
        // Open dropdown menu
        fireEvent.click(screen.getByText("Scotland"));
        // Click button
        fireEvent.click(screen.getByText("North Scotland"));
    
        // Check that api call is made once for the selected area
        await waitFor(() => expect(fetch).toHaveBeenCalledWith(`/api/selectArea/${encodeURIComponent("North Scotland")}`));
        
        // Reset mock calls
        jest.clearAllMocks();

        fireEvent.click(screen.getByText("North Scotland"));

         // Check that api call is NOT made agian for the same selected area
        await waitFor(() => expect(fetch).not.toHaveBeenCalledWith(`/api/selectArea/${encodeURIComponent("North Scotland")}`));
    });

    it("displays reservoir level data correctly when the data is empty", async () => {
        render(<SelectArea />);
        
        // Assert that there are exactly 4 elements displaying "0%"
        await waitFor(() => expect(screen.getAllByText('0%')).toHaveLength(4));
    });

    // Could write test that check that the mock data is being used correctly by the components
    it("displays reservoir level data correctly", async () => {
        const mockData = [
            {currentlvl: 92, area: 'North Scotland', date: '2025-01-21'},
            {currentlvl: 100, area: 'North Scotland', date: '2025-01-31'},
            {currentlvl: 100, area: 'North Scotland', date: '2025-02-07'},
            {currentlvl: 99, area: 'North Scotland', date: '2025-02-14'},
            {currentlvl: 99, area: 'North Scotland', date: '2025-02-21'},
            {currentlvl: 98, area: 'North Scotland', date: '2025-02-28'},
            {currentlvl: 98, area: 'North Scotland', date: '2025-03-07'},
            {currentlvl: 97, area: 'North Scotland', date: '2025-03-14'}
        ]

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'Data fetched successfully', data: mockData }),
            })
        );

        render(<SelectArea />);
        
        // Check that current level is 97%
        await waitFor(() => expect(screen.getByText("97%")).toBeInTheDocument());

        // Check that current level is 97%
        await waitFor(() => expect(screen.getByText("-1%")).toBeInTheDocument());

        // Check that current level is 97%
        await waitFor(() => expect(screen.getByText("100%")).toBeInTheDocument());

        // Check that current level is 97%
        await waitFor(() => expect(screen.getByText("92%")).toBeInTheDocument());
    });
});