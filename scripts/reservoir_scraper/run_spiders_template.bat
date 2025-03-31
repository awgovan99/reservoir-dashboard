@echo off
call path\to\conda\Scripts\activate.bat your_env_name REM This activates the conda env that contains the scrapy and pydal packages
cd %~dp0reservoir_scraper REM This switches to the directory that scrapy crawl needs to be run in
scrapy crawl scottishWater & scrapy crawl UnitedUtilities & scrapy crawl northumbrianWater REM This runs the web scrapers
conda deactivate

REM To automate web scrapers schedule this to run using windows Task Scheduler
REM Both Scottish water and United Utilities update their data weekly but Northumbrian Water update monthly