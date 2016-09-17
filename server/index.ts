import * as chokidar from 'chokidar';
import { ChildProcess, ForkOptions, fork } from 'child_process';

const files = [
    '!(node_modules|typings)',
    '!index.ts',
    '**/*.ts'
];

const watcher = chokidar.watch(files, {
    cwd: '.',
    awaitWriteFinish: true,
    ignoreInitial: true
});

watcher
    .on('add', startServer)
    .on('change', startServer)
    .on('unlink', startServer)
    .on('ready', startServer);

let child, starting = false;
function startServer() {
    function run() {
        let started = false;
        console.info(`Server ${child ? 'restarting' : 'starting'}`);

        child = fork('run.js', [], <ForkOptions>{
            cwd: __dirname,
            stdio: ['pipe', 'pipe', 'pipe', 'ipc']
        });

        const onExit = code => {
            if (started) return;
            starting = false;
            child = null;
            console.error(`Server start failed with ${code}`);
        }
        child.once('exit', onExit);

        const onRunning = () => {
            started = true;
            starting = false;
            child.removeListener('message', onRunning);
            child.removeListener('exit', onExit);
        }

        child.on('message', msg => {
            if (msg === 'server:started') onRunning();
        })
    }

    if (!child || !child.connected) return run();
    starting = true;
    child.once('exit', run);
    child.kill();
}
