import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { versions } from './versions.js';

console.log('Starting to collect performance history...');

const taskVersions = [...versions].reverse();
const results = {
    values: [],
    series: [],
};

for (const version of taskVersions) {
    execSync(`npm install puppeteer@${version}`);
    const json = execSync('node scripts/run.js');
    const res = JSON.parse(json.toString());

    console.log(`Version ${res.puppeteer}: `, res.duration);

    results.values.push(res.duration);
    results.series.push(res.puppeteer);
}

writeFileSync('results.json', JSON.stringify(results));

console.log('Done');
