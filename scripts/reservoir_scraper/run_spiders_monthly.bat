@echo off
call C:\Users\sillb\anaconda3\Scripts\activate.bat CS408WebScraper
cd %~dp0reservoir_scraper
scrapy crawl northumbrianWater
conda deactivate

REM Schedule this to run monthly