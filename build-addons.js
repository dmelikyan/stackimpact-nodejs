
const os = require('os');
const fs = require('fs');
const cp = require('child_process');

cp.execSync('npm update node-abi', {stdio: [0,1,2]});
const nodeAbi = require('node-abi');

const versions= [
  "v4.0.0",
  "v4.1.0",
  "v4.1.1",
  "v4.1.2",
  "v4.2.0",
  "v4.2.1",
  "v4.2.2",
  "v4.2.3",
  "v4.2.4",
  "v4.2.5",
  "v4.2.6",
  "v4.3.0",
  "v4.3.1",
  "v4.3.2",
  "v4.4.0",
  "v4.4.1",
  "v4.4.2",
  "v4.4.3",
  "v4.4.4",
  "v4.4.5",
  "v4.4.6",
  "v4.4.7",
  "v4.5.0",
  "v4.6.0",
  "v4.6.1",
  "v4.6.2",
  "v4.7.0",
  "v4.7.1",
  "v4.7.2",
  "v4.7.3",
  "v4.8.0",
  "v4.8.1",
  "v4.8.2",
  "v4.8.3",
  "v4.8.4",
  "v5.0.0",
  "v5.1.0",
  "v5.1.1",
  "v5.10.0",
  "v5.10.1",
  "v5.11.0",
  "v5.11.1",
  "v5.12.0",
  "v5.2.0",
  "v5.3.0",
  "v5.4.0",
  "v5.4.1",
  "v5.5.0",
  "v5.6.0",
  "v5.7.0",
  "v5.7.1",
  "v5.8.0",
  "v5.9.0",
  "v5.9.1",
  "v6.0.0",
  "v6.1.0",
  "v6.10.0",
  "v6.10.1",
  "v6.10.2",
  "v6.10.3",
  "v6.11.0",
  "v6.11.1",
  "v6.11.2",
  "v6.2.0",
  "v6.2.1",
  "v6.2.2",
  "v6.3.0",
  "v6.3.1",
  "v6.4.0",
  "v6.5.0",
  "v6.6.0",
  "v6.7.0",
  "v6.8.0",
  "v6.8.1",
  "v6.9.0",
  "v6.9.1",
  "v6.9.2",
  "v6.9.3",
  "v6.9.4",
  "v6.9.5",
  "v7.0.0",
  "v7.1.0",
  "v7.10.0",
  "v7.10.1",
  "v7.2.0",
  "v7.2.1",
  "v7.3.0",
  "v7.4.0",
  "v7.5.0",
  "v7.6.0",
  "v7.7.1",
  "v7.7.2",
  "v7.7.3",
  "v7.7.4",
  "v7.8.0",
  "v7.9.0",
  "v8.0.0",
  "v8.1.0",
  "v8.1.1",
  "v8.1.2",
  "v8.1.3",
  "v8.1.4",
  "v8.2.0",
  "v8.2.1",
  "v8.3.0",
  "v8.4.0",
  "v8.5.0",
  "v8.6.0",
  "v8.7.0",
  "v8.8.0",
  "v8.8.1",
  "v8.9.0",
  "v8.9.1",
  "v8.9.2",
  "v8.9.3",
  "v8.9.4",
  "v8.10.0",
  "v8.11.0",
  "v8.11.1",
  "v9.0.0",
  "v9.1.0",
  "v9.2.0",
  "v9.2.1",
  "v9.3.0",
  "v9.4.0",
  "v9.5.0",
  "v9.6.0",
  "v9.6.1",
  "v9.7.0",
  "v9.7.1",
  "v9.8.0",
  "v9.9.0",
  "v9.10.0",
  "v9.10.1",
  "v9.11.0",
  "v9.11.1"
];


let abiMap = {};

let addonDir = `addons/${os.platform()}-${process.arch}`;
if (!fs.existsSync(addonDir)) {
  fs.mkdirSync(addonDir);
}

versions.forEach((version) => {
  let abi = nodeAbi.getAbi(version);
  let addonPath = `${addonDir}/stackimpact-addon-v${abi}.node`;

  if (!fs.existsSync(addonPath)) {
    cp.execSync(`node-gyp rebuild --target=${version}`, {stdio: [0,1,2]});
    fs.copyFileSync('build/Release/stackimpact-addon.node', addonPath);
  }
  else {
    console.log(`Addon with ABI ${abi} exists, skipping.`);
  }

  abiMap[version] = abi;
});

fs.writeFileSync('abi-map.json', JSON.stringify(abiMap));
