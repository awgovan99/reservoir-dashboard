# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter


class ReservoirScraperPipeline:
    def process_item(self, item, spider):
        return item


from dotenv import dotenv_values
from pydal import DAL
# import is required to set up libsql:// and sqld:// for pyDAL:
import pydal_libsql


class SaveToDBPipeline:

    def __init__(self):
        env = dotenv_values()
        uri = env.get("TURSO_CONNECTION_URL")
        token = env.get("TURSO_AUTH_TOKEN")

        # Set up the database connection with URI and authentication token
        self.db = DAL(uri, driver_args={"auth_token": token})

    def process_item(self, item, spider):
        # should add check to make sure not inserting duplicate rows, so check if any results with same area and date
        res = self.db.executesql("SELECT * FROM levels WHERE area = ? AND date = ?;", (item["area"], item["date"]))
        if len(res) == 0:
            self.db.executesql("INSERT INTO levels (currentlvl, area, date) VALUES (?, ?, ?);", (int(item["level"]), item["area"], item["date"]))
            # Need db.commit() to commit changes to database
            self.db.commit()
        return item

    def close_spider(self, spider):
        self.db.close()