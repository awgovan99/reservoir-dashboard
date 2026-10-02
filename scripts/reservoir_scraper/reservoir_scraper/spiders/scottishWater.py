import scrapy
from reservoir_scraper.items import ReservoirDataItem
import re
from datetime import datetime

class ScottishwaterSpider(scrapy.Spider):
    name = "scottishWater"
    allowed_domains = ["www.scottishwater.co.uk"]
    start_urls = ["https://www.scottishwater.co.uk/Your-Home/Your-Water/Managing-Water-Resources/Scotlands-Water-Resource-Levels"]

    def parse(self, response):
        # Get date from site
        date = response.css("td.telerik-reTableHeaderFirstCol-4 span::text").get()  # Need to reformat
        # Reformat date to yyyy-mm-dd
        date = re.sub(r'(\d+)(st|nd|rd|th)', r'\1', date)
        date = datetime.strptime(date, "%d %B %Y").strftime("%Y-%m-%d")

        # Get regional table
        table = response.css("table.telerik-reTable-4")[1]

        # Skip header row
        rows = table.css("tbody tr")[1:]

        for row in rows:
            # Get area and current level
            area = "".join(row.css("td")[0].css("::text").getall()).strip()

            level = "".join(row.css("td")[1].css("::text").getall()).strip()

            # Clean up
            area = area.replace("\xa0", "")
            level = re.sub(r"\D", "", level)

            reservoir_item = ReservoirDataItem()
            reservoir_item["level"] = level
            reservoir_item["area"] = area + " Scotland"
            reservoir_item["date"] = date

            yield reservoir_item