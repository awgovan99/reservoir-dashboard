# UK Reservoir Monitor
A proof-of-concept web application that collects, processes and visualises reservoir water-level data from across the UK through a single interactive dashboard.
View the live application: UK Reservoir Monitor

## Project Overview
Climate change and increasingly variable weather patterns highlight the importance of monitoring and managing water resources effectively.
The UK has numerous water companies, each publishing reservoir level data separately. This makes it difficult to gain an overall picture of reservoir levels across the country.

This project aims to address this challenge by bringing together publicly available reservoir data from multiple sources into a single, user-friendly dashboard, making water levels easier to explore and compare.

## Demo
View the live application: [UK Reservoir Monitor](https://reservoir-dashboard-eight.vercel.app/)

<img width="1920" height="918" alt="dashboard" src="https://github.com/user-attachments/assets/32a9e208-81d8-438e-aeb1-9d8797a1c4c6" />

## Features
- Reservoir Data Collection: Collects publicly available reservoir level data using web scrapers, with three working scrapers currently implemented.
- Data Normalisation: Converts data from different sources into a consistent format for storage and display.
- Interactive Data Visualisation: Displays historical reservoir levels through interactive charts.
- Reservoir Statistics: Presents the latest available measurements, changes from previous readings, and recorded highs and lows.
- Hierarchical Navigation: Allows users to browse reservoir data by country and geographic area, with additional navigation for water companies in England.
- Weather Data Integration: Retrieves weather forecast data from the Open-Meteo API to provide additional context for reservoir levels.


## System Architecture
The system is composed of four key elements: 
- Frontend (Web Dashboard): Provides a user-friendly interface for data visualization and interaction. 
- Backend (API): Acts as an intermediary, handling requests from the frontend and retrieving data in the database. 
- Database: Stores structured data collected by the web scrapers to be displayed on the website. 
- Web Scrapers: Run independently to gather and insert data into the database so that the dashboard remains updated with the latest information. 

## Data Collection

The project currently contains three working web scrapers which were made using Python and Scrapy to collect reservoir water-level data from multiple water company websites.

Each scraper is responsible for:
- Accessing the source website
- Extracting the relevant reservoir data
- Converting the data into the application's common format
- Save the processed measurements into the database for retrieval by the dashboard

### Current Data Sources
The project currently collects data from the following water companies:
1. Scottish Water
2. United Utilities
3. Northumbrian Water

### Demonstration Data
This project is a proof of concept and does not yet cover every UK reservoir or water company.
To demonstrate how the dashboard handles a broader dataset, generated demonstration data is used for areas where live data collection has not yet been implemented. This allows the application to showcase its functionality beyond the coverage of the current scrapers.


## Dashboard
The dashboard was built using Next.js, React and TypeScript, with Tailwind CSS and DaisyUI used to create a responsive and consistent user interface.
### Area Selection and Data Fetching
The dashboard defaults to a UK-wide view and updates the displayed data when users select a different area. Dropdown menus organise the available areas by country, with additional nested menus for England's numerous water companies.
### Data Visualisation
Chart.js is used to visualise historical reservoir levels in an interactive line chart and weekly weather forecasts in a bar chart. Users can explore historical measurements and compare forecast precipitation and evapotranspiration.
Weather forecast data is retrieved from the Open-Meteo API, providing weather information for specific geographic coordinates.
### Backend and Database
Next.js API routes handle data requests from the dashboard, using URL slugs to retrieve information for specific areas without duplicating routes. The backend accesses the Turso (SQLite) database, allowing reservoir data to be queried and returned to the frontend. Database credentials are stored in environment variables rather than committed to the codebase.
### Styling
Tailwind CSS provides utility-based styling, while DaisyUI supplies reusable interface components, including buttons, dropdowns, cards and sidebars. Together, they help maintain a consistent and responsive layout.

<img width="1920" height="918" alt="dashboard" src="https://github.com/user-attachments/assets/32a9e208-81d8-438e-aeb1-9d8797a1c4c6" />

## Technology Stack
- Frontend: Next.js, React, TypeScript
- Styling: Tailwind CSS, DaisyUI
- Backend / API: Next.js API Routes
- Data Visualisation: Chart.js
- Web Scraping: Python, Scrapy
- Weather Data: Open-Meteo API
- Testing: Jest
- Database: SQLite (Turso)
- Deployment: Vercel

## Key Directories
src/app/ - Contains the Next.js application, including dashboard pages and API routes.

src/app/components/ - Contains all components of the dashboard

src/app/api/ - Handles requests from the frontend and retrieves reservoir data from the database.

scripts/reservoir_scraper/ - Contains the Scrapy project responsible for collecting reservoir data from external sources.

spiders/ - Contains the individual spiders that scrape data from Scottish Water, United Utilities and Northumbrian Water.

## Getting Started
Follow these instructions to run the UK Reservoir Monitor locally.
### Prerequisites
Node.js and npm
A Turso database
Python and pip, if you want to run the web scrapers
1. Clone the Repository:
git clone https://github.com/awgovan99/reservoir-dashboard.git
2. Install Dependencies:
npm install
3. Configure the Database:
Create a Turso database using the provided waterlvls database file from the repository and generate an authentication token. Create a .env file in the project root with the following variables:
- TURSO_CONNECTION_URL=your_database_url
- TURSO_AUTH_TOKEN=your_auth_token

Replace the placeholder values with your own database URL and authentication token.

4. Run the Dashboard
Start the Next.js development server: `npm run dev`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running the Web Scrapers
The project includes Python web scrapers that collect reservoir data from Scottish Water, United Utilities and Northumbrian Water. The scrapers use Scrapy to extract and process data, with the results stored in the Turso database.
1. Install Python Dependencies
From the project root, install the scraper dependencies:
python -m pip install -r scraper-requirements.txt
2. Configure Environment Variables
Create an .env file in the project root containing your Turso database credentials:
TURSO_CONNECTION_URL=your_database_url
TURSO_AUTH_TOKEN=your_auth_token
Replace the placeholder values with your own credentials. Keep the .env file private and never commit it to GitHub.
3. Run the Scrapers

Navigate to the directory: 
- reservoir-dashboard\scripts\reservoir_scraper\reservoir_scraper> 

Run the spiders using Scrapy:
- scrapy crawl scottishWater & scrapy crawl UnitedUtilities & scrapy crawl northumbrianWater

The scrapers collect data from their respective sources and store the processed measurements in the configured database.

## Testing
Jest and React Testing Library were used to test the Reservoir Level Dashboard, covering both application logic and user interface behaviour.
Integration testing formed the main focus of testing, as much of the application's functionality relies on the interaction between data fetching, UI updates, and the rendering of visual elements such as charts and tables. These tests helped verify that data flowed correctly through the application and that components behaved as expected when interacting with one another.

Unit testing was also used to validate individual functions and critical pieces of application logic, helping identify issues in data processing and calculations.

React Testing Library was used to test component behaviour and user interactions, including button clicks and region selection. Jest provided the test runner and mocking capabilities needed to isolate functionality and test different scenarios.

## Challenges
### Data Collection Across Multiple Water Companies
The UK has numerous water companies, particularly in England, making it challenging to identify and integrate reservoir data from across the country. Differences in data availability, formats and website structures also introduce complexity when developing and maintaining web scrapers.
### Geographic granularity
Not all sources provide information at the same level of detail. Some data can identify an individual reservoir, while other sources only provide a broader geographic area. Rather than creating inaccurate map locations or pretending that all data has the same precision, the application represents information at the level provided by the source.
### Scalability
Creating individual scrapers for every reservoir and water organisation would require significant ongoing maintenance. For this proof of concept, three real-world data sources were implemented, demonstrating the approach while leaving scope for broader coverage in the future.

## Limitations
### Limited Availability of Reservoir Data
Not every water company publishes publicly accessible reservoir water-level data. This limits the coverage of the dashboard and requires identifying which companies provide suitable data sources before their reservoirs can be included.
### Limited historical data
Historical comparisons are constrained by how much data has been collected and retained. Older measurements may be unavailable for newly supported reservoirs. 
Dependence on external sources
Changes to source websites, access restrictions or service outages may affect data collection and the availability of measurements. 

## Future Improvements
Potential future improvements include:
- Expand data coverage: Add more web scrapers to gather data from additional water companies
- Improve navigation: Add a search bar to allow users to find reservoirs or filter by area.
- Compare reservoir levels: Enable comparisons between different areas and across previous years.
- Average Reservoir Levels: Displaying the average water reservoir levels for each country, e.g. Scotland, England, Wales, could give users a high-level overview of national water resources. 
