var ffmetadata = require("ffmetadata");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const express = require('express')
ffmetadata.setFfmpegPath(ffmpegPath);
const app = express()
var cors = require('cors')
const port = 3000 
const multer = require('multer')
const fs = require('fs')
const { getAudioDurationInSeconds } = require('get-audio-duration')
var bodyParser = require('body-parser');
const { title } = require("process");

 const exec = require('child_process').exec;
 const storage = multer.diskStorage({

    destination: (req, file, cb) =>{
            cb(null, __dirname)
    },
    filename: (req, file, cb) =>{
        const { originalname } = file;
        cb(null, originalname)
        
    }
})
const upload = multer( {storage: storage});
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/file', cors(), upload.single('file'), urlencodedParser, (req, res) => {
  console.log(req.body)
let fileName  = req.file.originalname.replace(/\.[^/.]+$/, "")


    ffmpeg(req.file.path)
    //.audioCodec('copy')
    .outputOptions(
        "-write_id3v2", "1",
      '-metadata', `Full-Name=${req.body.fullname}`,
      '-metadata', `Leagal-Address=${req.body.address}`,
      '-metadata', `Contact-Number=${req.body.number}`,
      '-metadata', `E-mail=${req.body.Email}`,
      '-metadata', `Title=${req.body.title}`,
      '-metadata', `Artist=${req.body.artist}`,
      '-metadata', `TBPM=${req.body.bpm}`,
      '-metadata', `BPM=${req.body.bpm}`,
      '-metadata', `Key=${req.body.key}`,
      '-metadata', `Genre=${req.body.genre}`,
      '-metadata', `Description=${req.body.desc}`,
      '-metadata', `Composer=${req.body.composer}`,
      '-metadata', `Mood=${req.body.mood}`,
      '-metadata', `Tempo=${req.body.tempo}`,
      '-metadata', `Keywords=${req.body.keywords}`,
      '-metadata', `Sounds-Like=${req.body.soundsLike}`, 
      '-metadata', `Lyrics-Like=${req.body.lyrics}`, 
      '-metadata', `comments=hey`,
      '-metadata', `comment=hey`,
      '-metadata', `annotation=hey`,
      '-metadata', `Comments=hey`,
      '-metadata', `Comment=Song Name: Bees`,
    )
    //output filename.aiff
    .output(`${fileName}.aiff`)
    .on('end', () => { 
        res.download(__dirname +`/${fileName}.aiff`)
       // fs.unlinkSync(req.file.path)
        console.log(fileName, `deleted ${req.file.path}`, `sent file`) })
    .run()
    



})


  app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${port}`)
  }) 
