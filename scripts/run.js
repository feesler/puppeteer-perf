import { task } from './task.js';

const run = async () => {
    const res = await task();

    console.log(JSON.stringify(res));
};

run();
