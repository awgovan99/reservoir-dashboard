import scrapy
from reservoir_scraper.items import ReservoirDataItem
import re
from datetime import datetime


class UnitedutilitiesSpider(scrapy.Spider):
    name = "UnitedUtilities"
    allowed_domains = ["www.unitedutilities.com"]
    start_urls = ["https://www.unitedutilities.com/help-and-support/your-water-supply/your-reservoirs/reservoir-levels/"]

    def parse(self, response):

        date = response.css("th strong::text").get()
        # Reformat date to yyyy-mm-dd
        date = re.sub(r'(\d+)(st|nd|rd|th)', r'\1', date)
        date = datetime.strptime(date, "%d %B %Y").strftime("%Y-%m-%d")

        rows = response.css("table tr")

        # Loop skips first 2 and last row
        for row in rows[2:-1]:
            area = row.css("th::text").get()

            # Get first column in row
            level = row.css("td::text").get()
            # Reformat level
            level = re.sub(r'[^\d.]', '', level)
            level = str(round(float(level)))

            reservoir_item = ReservoirDataItem()
            reservoir_item["level"] = level
            reservoir_item["area"] = area
            reservoir_item["date"] = date

            yield reservoir_item