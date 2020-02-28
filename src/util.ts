
export function msToTimeString(ms: number) {
    let secs = Math.floor(ms / 100);
    let mins = Math.floor(secs / 60);
    let secStr = ('0' + (secs % 60)).slice(-2);
    let milStr = ('0' + (Math.ceil((ms % 100) / 10) * 10)).slice(-2);

    return "" + mins + ":" + secStr + ":" + milStr;
}