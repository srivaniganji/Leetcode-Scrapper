const puppeteer = require("puppeteer");
const fs = require("fs");

async function scrapeLeetCodeProblems() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://leetcode.com/tag/dynamic-programming/");
  await page.setDefaultNavigationTimeout(60000);
  const selector = ".title-cell__ZGos a";
  await page.waitForSelector(selector, { timeout: 60000 });

  const problems = await page.evaluate((selector) => {
    let data = [];
    let elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      data.push({
        title: element.innerText,
        link: element.href,
      });
    });
    return data;
  }, selector);

  fs.writeFileSync("problems.json", JSON.stringify(problems, null, 2));
}

scrapeLeetCodeProblems();
