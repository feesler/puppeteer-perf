# Puppeteer performance test

### How to test
```
git clone https://github.com/feesler/puppeteer-perf.git
cd puppeteer-perf
npm install
npm test
npm install puppeteer@21.2.0
npm test
```

Current results:
```
Node: v21.6.2
Puppeteer: 21.1.1
Browser: Chrome/116.0.5845.96
Duration: 218.91580000000022

Node: v21.6.2
Puppeteer: 21.2.0
Browser: Chrome/116.0.5845.96
Duration: 783.2916

Node: v21.6.2
Puppeteer: 22.1.0
Browser: Chrome/121.0.6167.85
Duration: 775.9939000000004
```

