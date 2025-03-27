import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SelectArea from "@/src/app/components/SelectArea";

// Stops graphs from being rendered
jest.mock("@/src/app/components/WeatherGraph", () => () => <div>WeatherGraph Mock</div>);

jest.mock("@/src/app/components/DisplayData", () => () => <div>DisplayData Mock</div>);

// Could test both api's in this file, will probably keep them seperate

// global.fetch = jest.fn((url) => {
//     if (url.includes('/api/selectArea/')) {
//         return Promise.resolve({
//             ok: true,
//             json: () => Promise.resolve({
//                 message: 'Reservoir data fetched successfully',
//                 data: [],
//             }),
//         });
//     }
//     if (url.includes('/api/weatherData/')) {
//         return Promise.resolve({
//             ok: true,
//             json: () => Promise.resolve({
//                 Precipitation: [],
//                 Evaporation: [],
//                 Dates: [],
//                 Temperature: [],
//                 WindSpeed: [],
//             }),
//         });
//     }

//     return Promise.reject(new Error('Invalid API endpoint'));
// });

// Will come back to this later, not as important as reservoir level api
describe("Weather data fetch", () => {
    // Mocks fetch requests
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    Precipitation: [],
                    Evaporation: [],
                    Dates: [],
                    Temperature: [],
                    WindSpeed: [],
                }),
            })
        );
    });

    // Reset mock calls
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetches data for UK when component renders', async () => {
        render(<SelectArea />);
        await waitFor(() => expect(fetch).toHaveBeenCalledWith(`/api/weatherData/UK`));
    });



    it("displays reservoir level data correctly", async () => {
        const mockData = {
            Precipitation: [2.799999952316284,0.20000000298023224,0.4000000059604645,2,4.999999046325684,9.500000953674316,1.2000001668930054],
            Evaporation: [1.0329267978668213,2.0937612056732178,2.2216432094573975,1.6374592781066895,1.0376931428909302,1.6558152437210083,2.1558985710144043],
            Dates: ['23 Mar', '24 Mar','25 Mar','26 Mar','27 Mar','28 Mar','29 Mar'],
            Temperature: [11.158500671386719,12.708499908447266,13.458499908447266, 10.25,9.75,8.649999618530273,9.149999618530273],
            WindSpeed: [15.119998931884766,20.880001068115234,21.239999771118164,28.37384605407715,30.58517074584961,31.394393920898438,27.098220825195312]
        }

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        );

        render(<SelectArea />);

        // Check total precipitation
        // await waitFor(() => expect(screen.getByText(/total precipitation is expected to be 21.1mm/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/21.1mm/i)).toBeInTheDocument());
        
        // Check total evapotranspiration
        // await waitFor(() => expect(screen.getByText("total evapotranspiration may remove 11.84 mm")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/11.84 mm/i)).toBeInTheDocument());

        // Check estimated net water input
        // await waitFor(() => expect(screen.getByText("estimated net water input of 9.26 mm")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/9.26 mm/i)).toBeInTheDocument());

        // Check prediction
        // await waitFor(() => expect(screen.getByText("Reservoir levels are likely to increase slightly")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/increase slightly/i)).toBeInTheDocument());
    });
});