const { Console } = require('console');
const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');

//  console.log('Hi')
//  let videoUrl = 'https://www.youtube.com/watch?v=5qap5aO4i9A';
//  let folderName = 'videos';
//  let fileName = 'video';


async function downloadVideo(videoUrl, folderName, fileName, successful){
//  console.log(videoUrl,folderName,fileName)
//  console.log(typeof videoUrl,typeof folderName,typeof fileName)
    const outputPath = path.join(folderName.toString(),`${fileName.toString()}.mkv`);
//  console.log(outputPath)

    




    if(fs.existsSync(outputPath)){
        //console.log('File already exists');
        successful = false;
        //console.log(successful,"successful value changed to false")
        return false;
    }

    if(!fs.existsSync(folderName)){
        fs.mkdirSync(folderName);
    }

if(successful){
    const videoStream = ytdl(videoUrl,{quality:'highest'}); //ytdl is used to download the video from the url
    const writeStream = fs.createWriteStream(outputPath); //createWriteStream is used to create a write stream

    return new Promise((resolve, reject) => {
        videoStream.pipe(writeStream) //pipe is used to write the data from one stream to another   
        writeStream.on('finish', () => { //finish is an event which is fired when the write stream is finished
            resolve(outputPath); //resolve is used to return the value of the promise
            });
        writeStream.on('error',(error)=>{ 
            //console.log("writeStream.on executed..");
            console.log('Error writing video to disk...');
            console.error(`Error converting video: ${error.message}`);
            reject();
        });
    });


}

}

module.exports = { downloadVideo };