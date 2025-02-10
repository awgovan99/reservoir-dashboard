# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ReservoirScraperItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass

class ReservoirDataItem(scrapy.Item):
    level = scrapy.Field()
    area = scrapy.Field()
    date = scrapy.Field()
