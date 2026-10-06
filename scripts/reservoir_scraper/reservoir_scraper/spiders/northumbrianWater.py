import scrapy
from reservoir_scraper.items import ReservoirDataItem
import re
from datetime import datetime

class NorthumbrianwaterSpider(scrapy.Spider):
    name = "northumbrianWater"
    allowed_domains = ["www.nwl.co.uk"]
    start_urls = ["https://www.nwl.co.uk/help-and-support/water/water-resources/"]

    def parse(self, response):

        date = response.css("p strong::text").getall()[1]
        date = date.split("week ending")[-1].strip()
        date = re.sub(r'(\d+)(st|nd|rd|th)', r'\1', date)
        date = datetime.strptime(date, "%d %B %Y").strftime("%Y-%m-%d")

        rows = response.css("table tr")

        # Loop through rows in table
        for row in rows[1:]:
            data = row.css("td")
            area = data[0].css("span strong::text").get()
            area = area.split(" ")[0].strip()
            area = area.replace('\xa0', '')

            level = data[1].css("strong::text").get()
            level = level.replace('\xa0', '')
            level = re.search(r'(\d+)', level).group()

            reservoir_item = ReservoirDataItem()
            reservoir_item["level"] = level
            reservoir_item["area"] = area
            reservoir_item["date"] = date

            yield reservoir_item