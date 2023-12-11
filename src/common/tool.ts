
export namespace Tools {
    let startTime = Date.now();

    export function getTime(): uint64_t {
        return Math.floor(startTime + process.uptime() * 1000);
    }

    export function newDate(msTime?: number): Date {
        msTime = msTime || getTime();
        return new Date(msTime);
    }

    function prefixInteger(val: number, len: number): string {
        return (Array(len).join('0') + val).slice(-len);
    }

    export function formatTimeStamp(msTime: number): string {
        let dateData = newDate(msTime);
        let year = dateData.getFullYear();
        let month = dateData.getMonth() + 1;
        let day = dateData.getDate();
        let hour = dateData.getHours();
        let min = dateData.getMinutes();
        let sec = dateData.getSeconds();

        let smonth: string = prefixInteger(month, 2);
        let sday: string = prefixInteger(day, 2);
        let shour: string = prefixInteger(hour, 2);
        let smin: string = prefixInteger(min, 2);
        let ssec: string = prefixInteger(sec, 2);

        let result: string = `${year}-${smonth}-${sday} ${shour}:${smin}:${ssec}`;
        return result;
    }
}