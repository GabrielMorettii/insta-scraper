import "dotenv/config";

import puppeteer from "puppeteer";
import chalkTable from "chalk-table";
import chalk from "chalk";

import { username, tableOptions } from "./utils/index.js";

(async () => {
  console.log("Lauching browser to collect data... \n");

  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();

  await page.goto("http://www.instagram.com");

  await page.waitForSelector('input[name="username"]');

  console.log("Logging the current user... \n");

  await page.type('input[name="username"]', process.env.INSTAGRAM_USER_NAME);
  await page.type(
    'input[name="password"]',
    process.env.INSTAGRAM_USER_PASSWORD
  );

  await page.click("#loginForm > div > div:nth-child(3) > button > div");

  await page.waitForNavigation({ waitUntil: "load" });

  console.log("Collecting instagram data... \n");

  await page.goto(`http://www.instagram.com/${username}`);

  await page.waitForSelector("span[title]", { timeout: 5000 });

  const data = await page.$$eval("span._ac2a", (spans) => {
    const [posts, followers, following] = spans.map((span) => span.textContent);

    return [
      { id: "Posts", value: posts },
      { id: "Followers", value: followers },
      { id: "Following", value: following },
    ];
  });

  console.log(
    `Listing collected data for (${chalk.bgCyanBright(username)}) : \n\n`
  );

  console.log(chalkTable(tableOptions, data));

  await browser.close();
})();
