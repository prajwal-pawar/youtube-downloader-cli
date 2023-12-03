#!/usr/bin/env node

const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const ytdl = require("ytdl-core");
const homedir = require("homedir");
const util = require("util");
const projectInfo = require("./package.json");

/**
 renamed variables
 info == projectInfo
 opts == options
 */

let url;
// command <options>
const options = require("commander")
  .version(projectInfo.version)
  .arguments("<url>")
  .action((a) => {
    url = a;
  })
  .option("-q, --quality <ITAG>", "Video quality to download, default: highest")
  .option(
    "-r, --range <INT>..<INT>",
    "Byte range to download, ie 10355705-12452856"
  )
  .option(
    "-b, --begin <INT>",
    "Time to begin video, format by 1:30.123 and 1m30s"
  )
  .option(
    "-o, --output <FILE>",
    "Save to file, template by {prop}, default: stdout or {title}"
  )
  .option(
    "--filter <STR>",
    "Can be video, videoonly, audio, audioonly",
    /^(video|audio)(only)?$/
  )
  .option("--filter-container <REGEXP>", "Filter in format container")
  .option("--unfilter-container <REGEXP>", "Filter out format container")
  .option("--filter-resolution <REGEXP>", "Filter in format resolution")
  .option("--unfilter-resolution <REGEXP>", "Filter out format resolution")
  .option("--filter-codecs <REGEXP>", "Filter in format codecs")
  .option("--unfilter-codecs <REGEXP>", "Filter out format codecs")
  .option("-i, --info", "Print video info without downloading")
  .option("-j, --info-json", "Print video info as JSON without downloading")
  .option("--print-url", "Print direct download URL")
  .option("--no-cache", "Skip file cache for html5player")
  .parse(process.argv);

// if url option in command not found, throw error
if (!url) {
  options.outputHelp((help) => {
    return chalk.red("\n url argument is required\n") + help;
  });

  process.exit(1);
}
