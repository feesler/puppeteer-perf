# Puppeteer performance test

### How to test
```
git clone https://github.com/feesler/puppeteer-perf.git
cd puppeteer-perf
npm install
npm test
npm install puppeteer@19.7.1
npm test
```
Script will automatically download Chromium revision 1095492 to discard possible difference in browser performance.

Current results:
```
Node: v19.8.1
Puppeteer: 19.7.0
Browser: HeadlessChrome/111.0.5555.0
Duration: 105.92980003356934

Node: v19.8.1
Puppeteer: 19.7.1
Browser: HeadlessChrome/111.0.5555.0
Duration: 148.32850003242493
```


### Previous issue with ESM performance since v14.0.0
Before version 14.0.0 puppeteer compiled from TypeScript both to CommonJS and ESM, but exports only CommonJS entry. <br/>
In commit https://github.com/puppeteer/puppeteer/pull/8306  was added ESM exports and performance dramatically dropped.<br/>
- Version 13.7.0 exports ./cjs-entry.js as CommonJS  <br />
- Version 14.0.0 exports ./lib/esm/puppeteer/node.js for ESM  <br />
- Version ^14.4.0 exports ./lib/esm/puppeteer/puppeteer.js for ESM  <br />

Issue: https://github.com/puppeteer/puppeteer/issues/8650


### Temporary solution to fix performance for ESM packages:
```diff
- import puppeteer from 'puppeteer';
+ import puppeteer from 'puppeteer/lib/cjs/puppeteer/puppeteer.js';
```
