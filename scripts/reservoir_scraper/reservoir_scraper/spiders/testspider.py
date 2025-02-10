import scrapy
from reservoir_scraper.items import ReservoirDataItem
import re
from datetime import datetime

class TestspiderSpider(scrapy.Spider):
    name = "testspider"
    allowed_domains = ["scottishwater.co.uk"]
    start_urls = ["https://www.scottishwater.co.uk/Your-Home/Your-Water/Managing-Water-Resources/Scotlands-Water-Resource-Levels"]

    def parse(self, response):
        # Get date from site
        date = response.css("td.telerik-reTableHeaderFirstCol-4 span::text").get() # Need to reformat
        # Reformat date to yyyy-mm-dd
        date = re.sub(r'(\d+)(st|nd|rd|th)', r'\1', date)
        date = datetime.strptime(date, "%d %B %Y").strftime("%Y-%m-%d")

        # Get water levels from site
        levels = response.css("td.telerik-reTableOddCol-4  span::text").getall()
        levels = levels + [response.css("td.telerik-reTableFooterOddCol-4 span::text").getall()[1]]

        # Get areas from site
        areas = response.css("td.telerik-reTableFirstCol-4  span::text").getall()
        areas = areas + [response.css("td.telerik-reTableFooterFirstCol-4 span::text").getall()[1]]

        for level, area in zip(levels, areas):
            # Reformat levels and areas
            # Could maybe do reformatting in items or pipeline
            level = re.sub(r'\D', '', level)
            area = area.replace('\xa0', '') + " Scotland"

            reservoir_item = ReservoirDataItem()
            reservoir_item["level"] = level
            reservoir_item["area"] = area
            reservoir_item["date"] = date

            yield reservoir_item