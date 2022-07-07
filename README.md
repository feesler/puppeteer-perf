# Puppeteer ESM performance test
Before version 14.0.0 puppeteer compiled from TypeScript both to CommonJS and ESM, but exports only CommonJS entry. <br/>
In commit https://github.com/puppeteer/puppeteer/pull/8306  was added ESM exports and performance dramatically dropped.<br/>
- Version 13.7.0 exports ./cjs-entry.js as CommonJS  <br />
- Version 14.0.0 exports ./lib/esm/puppeteer/node.js for ESM  <br />
- Version ^14.4.0 exports ./lib/esm/puppeteer/puppeteer.js for ESM  <br />

Issue created: https://github.com/puppeteer/puppeteer/issues/8650

### How to test
```
git clone https://github.com/feesler/puppeteer-perf.git
cd puppeteer-perf
npm install
npm test
npm install puppeteer@14.0.0
npm test
```
Script will automatically download Chromium revision 982053 to discard possible difference in browser performance.

Current results:
```
Node: v16.15.1
Puppeteer: 13.7.0
Browser: HeadlessChrome/101.0.4950.0
Duration: 77.40569996833801

Node: v16.15.1
Puppeteer: 14.0.0
Browser: HeadlessChrome/101.0.4950.0
Duration: 730.2374999523163
```


### Temporary solution to fix performance for ESM packages:
```diff
- import puppeteer from 'puppeteer';
+ import puppeteer from 'puppeteer/lib/cjs/puppeteer/puppeteer.js';
```
