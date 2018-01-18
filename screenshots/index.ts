import * as puppeteer from 'puppeteer'

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.emulate({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36' })

  const cases = [
        { type: 'vue', url: '/packages/vue/demo' },
        { type: 'react', url: '/packages/react/demo' },
        { type: 'angular', url: '/packages/angular/demo/jit' },
        { type: 'aot', url: '/packages/angular/demo/aot' }
  ]

  for (const { type, url } of cases) {
    await page.goto(`http://localhost:8000${url}`)
    await page.waitFor(100)
    await page.screenshot({ path: `screenshots/${type}-initial.png` })

    const prefix = (type === 'angular' || type === 'aot') ? 'editor' : '.row'

    await (page.type as any)(`${prefix}:nth-child(100n+1) input`, 'num')
    await page.waitFor(100)
    await page.screenshot({ path: `screenshots/${type}-filter.png` })

    await (page.keyboard as any).press('Backspace')
    await (page.keyboard as any).press('Backspace')
    await (page.keyboard as any).press('Backspace')
    await page.waitFor(100)
    await page.screenshot({ path: `screenshots/${type}-filter-reset.png` })

    await page.click(`${prefix}:nth-child(100n+2) input`)
    await page.waitFor(100)
    await page.screenshot({ path: `screenshots/${type}-optional-and-default.png` })

    await page.click(`${prefix}:nth-child(100n+2) input`)
    await page.waitFor(100)
    await page.screenshot({ path: `screenshots/${type}-optional-and-default-reset.png` })

    await (page.type as any)(`${prefix}:nth-child(100n+3) input`, 'hello')
    await page.waitFor(100)
    await page.screenshot({ path: `screenshots/${type}-string-long.png` })

    await (page.keyboard as any).press('Backspace')
    await (page.keyboard as any).press('Backspace')
    await (page.keyboard as any).press('Backspace')
    await (page.keyboard as any).press('Backspace')
    await page.waitFor(100)
    await page.screenshot({ path: `screenshots/${type}-string-reset.png` })

    await (page.type as any)(`${prefix}:nth-child(100n+4) input`, '567')
    await page.waitFor(100)
    await page.screenshot({ path: `screenshots/${type}-number.png` })

    await (page.type as any)(`${prefix}:nth-child(100n+5) input`, '567')
    await page.waitFor(100)
    await page.screenshot({ path: `screenshots/${type}-integer.png` })

    await (page.type as any)(`${prefix}:nth-child(100n+7) input`, 'hello')
    await page.waitFor(100)
    await page.screenshot({ path: `screenshots/${type}-object.png` })

    await (page.type as any)(`${prefix}:nth-child(100n+8) input`, 'hello')
    await page.waitFor(100)
    await page.screenshot({ path: `screenshots/${type}-array.png` })

    if (type === 'angular' || type === 'aot') {
      await (page as any).select(`${prefix}:nth-child(100n+11) select`, 'enum 2')
      await page.waitFor(100)
      await page.screenshot({ path: `screenshots/${type}-enum.png` })
    }

    await (page.type as any)(`${prefix}:nth-child(100n+16) textarea`, 'hello')
    await page.waitFor(100)
    await page.screenshot({ path: `screenshots/${type}-textarea.png` })

    await (page.type as any)(`${prefix}:nth-child(100n+17) input`, 'a')
    await page.waitFor(100)
    await page.screenshot({ path: `screenshots/${type}-pattern.png` })
  }

  browser.close()
})()
