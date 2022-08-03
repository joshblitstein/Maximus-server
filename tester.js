var ffmetadata = require("ffmetadata");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
var ffprobe = require('ffprobe-static');
let probePath = ffmpeg.setFfprobePath(ffprobe.path);
ffmpeg.setFfmpegPath(ffmpegPath);
const express = require('express')
const exec = require('child_process').exec
ffmetadata.setFfmpegPath(ffmpegPath);
const app = express()
const port = 3000 
const { getAudioDurationInSeconds } = require('get-audio-duration')

 
ffmetadata.read("u.aiff", function(err, data) {
    if (err) console.error("Error reading metadata", err);
    else console.log(data);
  });  
  //getAudioDurationInSeconds('file.aiff')




//exec(`${ffmpegPath} -i aiff.aiff -map 0 -y -codec copy -write_id3v2 1 -metadata "ass=emonsort" aiffout.aiff`)
//exec(`${ffmpegPath} -i aiff.aiff -map 0 -y -codec copy -write_id3v2 1 -metadata "cheese=emnsort" aiffout.aiff`)