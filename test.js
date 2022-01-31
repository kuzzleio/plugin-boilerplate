const { CronJob } = require('cron');
const { DateTime } = require('luxon')
const SortedArray = require('sorted-array');

// constructor(cronTime, onTick, onComplete, start, timezone, context, runOnInit, utcOffset, unrefTimeout)

const d = DateTime.fromFormat('2020-12-09 16:54:29', 'yyyy-MM-dd HH:mm:ss', { zone: 'utc'})

console.log(new Date(d.toUTC().valueOf()))
console.log()