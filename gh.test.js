let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForTimeout(1000);
    const pageDescriptor = await page.waitForSelector(
      ".home-campaign-hero div.col-11 > h1"
    );
    const actualOriginal = await page.evaluate(
      (el) => el.textContent,
      pageDescriptor
    );
    const actual = actualOriginal.replace(/\s+/g, " ").trim();
    const expectedOriginal = "Let’s build from here";
    const expected = expectedOriginal.replace(/\s+/g, " ").trim();
    await page.waitForTimeout(1000);
    expect(actual).toEqual(expected);
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  });
});


describe("Titles of other pages", () => {
  
  test("Should find the title on /features", async () => {
    await page.goto("https://github.com/features");
    const title = "div.application-main main div.p-responsive.container-xl.text-center.mt-12.mb-6 h1";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toContain("The tools you need to build what you want.");
  }, 5000);

  test("Should find the Contact sales button on /features/security", async () => {
    await page.goto("https://github.com/features/security");
    const button = "div.position-relative.z-1.container-xl.mx-auto.px-3.pt-6.py-md-12.height-full.d-flex.flex-column.flex-justify-center";
    const actualButton = await page.$eval(button, (link) => link.textContent);
    expect(actualButton).toContain("Contact sales");
  }, 5000);

  test("Should find the title on /enterprise", async () => {
    await page.goto("https://github.com/enterprise");
    const title = " div.col-9-max.position-relative.z-2.ml-lg-4.ml-xl-0 h1";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toContain("Build like the best");
  }, 5000);
});
