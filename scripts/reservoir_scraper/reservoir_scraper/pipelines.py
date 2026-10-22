# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter


class ReservoirScraperPipeline:
    def process_item(self, item, spider):
        return item

from pathlib import Path
from dotenv import dotenv_values
import libsql


class SaveToDBPipeline:

    def __init__(self):
        PROJECT_ROOT = Path(__file__).resolve().parents[3]
        env_path = PROJECT_ROOT / ".env"
        env = dotenv_values(env_path)

        self.db = libsql.connect(
            database=env.get("TURSO_CONNECTION_URL"),
            auth_token=env.get("TURSO_AUTH_TOKEN"),
        )

    def process_item(self, item, spider):
        # should add check to make sure not inserting duplicate rows, so check if any results with same area and date
        res = self.db.execute("SELECT * FROM levels WHERE area = ? AND date = ?;", (item["area"], item["date"])).fetchall()
        if len(res) == 0:
            self.db.execute("INSERT INTO levels (currentlvl, area, date) VALUES (?, ?, ?);", (int(item["level"]), item["area"], item["date"]))
            # Need db.commit() to commit changes to database
            self.db.commit()
        return item

    def close_spider(self, spider):
        self.db.close()