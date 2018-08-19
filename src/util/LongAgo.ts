const IN_SECONDS = {
    YEAR: 31536000,
    MONTH: 2592000,
    DAY: 86400,
    HOUR: 3600
}


export const howLongAgo = (from: Date) => {
    const now = new Date()
    const time = Math.floor(((now.getTime()/1000) - from.getTime()))
    if (rest(time, IN_SECONDS.YEAR) >= 1)
}

function rest(time, inSeconds) {
    return Math.floor(time / inSeconds)
}


function timeSince(date) {

    var seconds = Math.floor(((new Date().getTime()/1000) - date)),
    interval = Math.floor(seconds / 31536000);

    if (interval > 1) return interval + "y";

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + "m";

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + "d";

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + "h";

    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + "m ";

    return Math.floor(seconds) + "s";
}