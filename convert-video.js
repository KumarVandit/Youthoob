const path = require('path');
const fs = require('fs');

const ffmpegPath = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath); //set the path of ffmpeg

async function convertVideo(videoFilePath, folderName, fileName, successful){
    //  console.log(videoUrl,folderName,fileName)
    //  console.log(typeof videoUrl,typeof folderName,typeof fileName)
        const outputFilePath = path.join(folderName.toString(),`${fileName.toString()}.mp3`);
    //  console.log(outputFilePath)
    
        if(fs.existsSync(outputFilePath)){
            //console.log('Audio File already converted');
            successful = false;
            //console.log(successful,"successful value changed to false")
            return false;
        }
    
        if(!fs.existsSync(folderName)){
            fs.mkdirSync(folderName);
        }
    
    if(successful){


        return new Promise((resolve, reject) => {
            console.log("Convert to Audio promise running..")
            ffmpeg(videoFilePath)
            .outputOptions([
                '-vn', //disable video only audio
                '-acodec', 'libmp3lame', //set audio codec
                '-ac', '2', //set number of audio channels
                '-ar', '44100', //set audio sampling frequency
                '-ab', '160k' //set audio bitrate
            ])
            .save(outputFilePath)
            .on('error', (error) => {
                console.log("ffmpeg.error executed")
                console.error(`Error converting video: ${error.message}`);

                reject(error);
            })
            .on('end', () => {
                console.log("ffmpeg.on executed")
                console.log('Audio converted successfully');
                resolve(outputFilePath);
            });
        });
    
    }
}
module.exports = { convertVideo };