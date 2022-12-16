import { spawn } from 'node:child_process';
import { FetchMongo } from './Mongodb';

let mainjson = {
    PATH: '/usr/local/bin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin:/Users/harvey/Library/Android/sdk/emulator:/Users/harvey/Library/Android/sdk/platform-tools',
}

export async function setupTunnel(port: string, tunnelName: string) {

    if (!port.includes("http://")) {
        port = `http://localhost:${port}`;
    }

    console.log(port)

    const data = spawn(`cloudflared`, [`tunnel`, `--url`, port], { env: mainjson });

    data.on('error', (e) => {
        console.log(e);
    })

    data.stderr.on('data', async (e) => {

        let out = e.toString().match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/g)
        if (out) {
            console.log(out[0])
            try {
                await (await FetchMongo()).db("Rovolution-Utils").collection("Tunnels").updateOne({ name: tunnelName }, { $set: { url: out[0] } }, { upsert: true });
                console.log("Tunnel URL set");
            } catch {
                console.log("Error setting tunnel url");
            }
        }
    })

    return;
}