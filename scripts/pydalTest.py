from dotenv import dotenv_values
from pydal import DAL
# import is required to set up libsql:// and sqld:// for pyDAL:
import pydal_libsql

# Load database credentials from .env file or replace with your values directly
env = dotenv_values()
uri = env.get("TURSO_CONNECTION_URL")
token = env.get("TURSO_AUTH_TOKEN")

# Set up the database connection with URI and authentication token
db = DAL(uri, driver_args={"auth_token": token})


# tables = db.executesql("SELECT * FROM levels WHERE area='West Scotland';")
# print("Existing tables:", tables)
#
# testArea = "North West Wales"
# tables = db.executesql("SELECT * FROM levels WHERE currentlvl = ? AND area = ?;", (58, testArea))
# print("Test select:", tables)
#
# area = "East Scotland"
# date = "2025-01-31"
# tables = db.executesql("SELECT * FROM levels WHERE area = ? AND date = ?;", (area , date))
# print(tables)
# print(len(tables))
#
# print()
#
# area = "East Scotland"
# date = "2025-01-32"
# tables = db.executesql("SELECT * FROM levels WHERE area = ? AND date = ?;", (area , date))
# print(tables)
# print(len(tables))

# db.executesql("INSERT INTO levels (currentlvl, area, date) VALUES (?, ?, ?);", (100, "test", "2025-02"))
# Need db.commit() to commit changes to database
# db.commit()

reservoir_data = [
    (39, "Bough Beech", "2024-12-01"),
    (46, "Bough Beech", "2024-12-07"),
    (53, "Bough Beech", "2024-12-14"),
    (55, "Bough Beech", "2024-12-21"),
    (61, "Bough Beech", "2024-12-28"),
    (65, "Bough Beech", "2025-01-04"),
    (72, "Bough Beech", "2025-01-11"),
    (72, "Bough Beech", "2025-01-18"),
    (71, "Bough Beech", "2025-01-25"),
    (65, "Bough Beech", "2025-02-01"),
    (63, "Bough Beech", "2025-02-08"),
]
# data = reservoir_data[0]
# print(data[0], data[1], data[2])
for data in reservoir_data:
    res = db.executesql("SELECT * FROM levels WHERE area = ? AND date = ?;", (data[1], data[2]))
    if len(res) == 0:
        print("Inserting: " + str(data))
        db.executesql("INSERT INTO levels (currentlvl, area, date) VALUES (?, ?, ?);", (int(data[0]), data[1], data[2]))
        # Need db.commit() to commit changes to database
        db.commit()

db.close()