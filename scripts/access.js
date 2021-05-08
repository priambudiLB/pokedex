const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://pokedex.priambudi.fyi', {
    waitUntil: 'networkidle2'
  })
  await page.screenshot({ path: 'screenshots/home.png' })

  await page.goto('https://pokedex.priambudi.fyi/pokedex/bulbasaur', {
    waitUntil: 'networkidle2'
  })
  await page.screenshot({ path: 'screenshots/bulbasaur.png' })

  await page.goto('https://pokedex.priambudi.fyi/my-pokemons', {
    waitUntil: 'networkidle2'
  })
  await page.screenshot({ path: 'screenshots/my-pokemons.png' })

  await browser.close()
})()
