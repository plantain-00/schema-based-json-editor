import * as puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.emulate({ viewport: { width: 1440, height: 900 }, userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36" });

    for (const type of ["vue", "react", "angular"]) {
        await page.goto(`http://localhost:8000/demo/${type}`);
        await page.waitFor(100);
        await page.screenshot({ path: `screenshots/${type}-initial.png`, fullPage: true });

        const prefix = type === "angular" ? "editor" : ".row";

        await (page.type as any)(`${prefix}:nth-child(100n+1) input`, "num");
        await page.waitFor(100);
        await page.screenshot({ path: `screenshots/${type}-filter.png`, fullPage: true });

        await (page.keyboard as any).press("Backspace");
        await (page.keyboard as any).press("Backspace");
        await (page.keyboard as any).press("Backspace");
        await page.waitFor(100);
        await page.screenshot({ path: `screenshots/${type}-filter-reset.png`, fullPage: true });

        await page.click(`${prefix}:nth-child(100n+2) input`);
        await page.waitFor(100);
        await page.screenshot({ path: `screenshots/${type}-optional-and-default.png`, fullPage: true });

        await page.click(`${prefix}:nth-child(100n+2) input`);
        await page.waitFor(100);
        await page.screenshot({ path: `screenshots/${type}-optional-and-default-reset.png`, fullPage: true });

        await (page.type as any)(`${prefix}:nth-child(100n+3) input`, "hello");
        await page.waitFor(100);
        await page.screenshot({ path: `screenshots/${type}-string-long.png`, fullPage: true });

        await (page.keyboard as any).press("Backspace");
        await (page.keyboard as any).press("Backspace");
        await (page.keyboard as any).press("Backspace");
        await (page.keyboard as any).press("Backspace");
        await page.waitFor(100);
        await page.screenshot({ path: `screenshots/${type}-string-reset.png`, fullPage: true });

        await (page.type as any)(`${prefix}:nth-child(100n+4) input`, "567");
        await page.waitFor(100);
        await page.screenshot({ path: `screenshots/${type}-number.png`, fullPage: true });

        await (page.type as any)(`${prefix}:nth-child(100n+5) input`, "567");
        await page.waitFor(100);
        await page.screenshot({ path: `screenshots/${type}-integer.png`, fullPage: true });

        await (page.type as any)(`${prefix}:nth-child(100n+7) input`, "hello");
        await page.waitFor(100);
        await page.screenshot({ path: `screenshots/${type}-object.png`, fullPage: true });

        await (page.type as any)(`${prefix}:nth-child(100n+8) input`, "hello");
        await page.waitFor(100);
        await page.screenshot({ path: `screenshots/${type}-array.png`, fullPage: true });

        if (type === "angular") {
            await (page as any).select(`${prefix}:nth-child(100n+11) select`, "enum 2");
            await page.waitFor(100);
            await page.screenshot({ path: `screenshots/${type}-enum.png`, fullPage: true });
        }

        await (page.type as any)(`${prefix}:nth-child(100n+16) textarea`, "hello");
        await page.waitFor(100);
        await page.screenshot({ path: `screenshots/${type}-textarea.png`, fullPage: true });

        await (page.type as any)(`${prefix}:nth-child(100n+17) input`, "a");
        await page.waitFor(100);
        await page.screenshot({ path: `screenshots/${type}-pattern.png`, fullPage: true });
    }

    browser.close();
})();
