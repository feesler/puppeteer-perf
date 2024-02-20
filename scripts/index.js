import { task } from './task.js';

const run = async () => {
    const res = await task();

    console.log(`Node: ${res.node}`);
    console.log(`Puppeteer: ${res.puppeteer}`);
    console.log(`Browser: ${res.browser}`);
    console.log(`Duration: ${res.duration}`);
};

run();
