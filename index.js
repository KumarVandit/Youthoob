#!/usr/bin/env node
// 1 add the above lines in the file which executes first.. or like whatever you want node to be able to
//   access and run directly 
//   enables and tells system/nodejs to use this index.js file to be used through node
// 2 also add "bin" in the package.json file
// 3 now run npm link while being in the folder containing index.js(main file) and package.json file....
//   but ig it definately need to be in the package.json folder... cause index.js could be anywhere else also..
// now we can directly run the name of the project and use it in the cli/terminal.... :)

const { Command } = require('commander');
const { downloadVideo } = require('./download-video');
const { convertVideo } = require('./convert-video');
const program = new Command();

// anything here would always run .. even if we run youthoob --version
//console.log("This is my first CLI tool made using nodejs...")

// its like project_name then program_name then arguments
// program.name is the name of the program_name you would like user to write every time while passing 
// any command..
// like Usage: Youthoob [options] [command] this would show up like this...
program
  .name('Youthoob')
  .description('CLI tool to download YT videos and convert them to mp3 files :)')
  .version('1.0.0');

program
  .command('hello <name>') //takes name as the argument from the cli user
  .option('-c, --capitalize' , 'Capitalize the name') // argument for capitalising the name of the person
  //.option('-g, --gender_change' , 'Change the gender of the person') //argument for gender change 
  .description("Say hello to someone and change gender :)") // brief description about the command
  .action((name, option)=>{
    console.log("...............................................................................")
    console.log(`These are the conditions and values input => ${JSON.stringify(option)} ${option} ${option.toString()} ${name}`);
    console.log("...............................................................................")
    if (option!=null) {
      console.log(`Hello ${option.capitalize ? name.toUpperCase() : name}`);
      console.log('-c was called above....'); 
      console.log("...............................................................................")
    } else {
      console.log("Enter a valid input name...")
    }
  });

program
  .command('download <videoUrl>')
  .description("Download a video from Youtube...")
  .option('-f, --folderName <folderName>', 'Output folder name', 'videos')
  .option('-n, --fileName <fileName>', 'Output file name', 'video')
  .action(async (videoUrl, options) =>{
    //console.log(videoUrl)
    let folderName = options.folderName;
    let fileName = options.fileName;
    let successful = true;
    //console.log(options)
    //console.log(folderName)
    //console.log(fileName)
    try {
      const outputPath = await downloadVideo(videoUrl, folderName, fileName, successful);
    //  console.log(videoUrl,folderName,fileName)
      
      if(outputPath!=false){
        console.log(`Video downloaded to ${outputPath}`);
      }else{
        console.log(`Video with the name ${fileName} already exists`);
      }
      
    }
    catch(error){
      console.error(error)
    }
  }
  );

program
  .command('convert <videoFilePath>')
  .description("Convert a video to mp3 file...")
  .option('-f, --folderName <folderName>', 'Output folder name', 'audios')
  .option('-n, --fileName <fileName>', 'Output file name', 'audio')
  .action(async (videoFilePath, options) =>{
    let folderName = options.folderName;
    let fileName = options.fileName;
    let successful = true;
    try {
      const outputPath = await convertVideo(videoFilePath, folderName, fileName, successful);
      if(outputPath!=false){
        console.log(`Converted audio saved to ${outputPath}`);
      }else{
        console.log(`Audio with the name "${fileName}" already exists :)`);
      }
      
    }
    catch(error){
      console.error(error)
    }
  }
  );

program.parse();
