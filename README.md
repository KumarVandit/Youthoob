# Youthoob
This is a CLI tool to download youtube videos and convert them into mp3 files. 

........................................................................................................................................................................................................


Currently there are two feature in this tool:

1: download (i.e. used for downloading youtube videos)

2: convert (i.e. used for converting video to audio)



........................................................................................................................................................................................................


Given below are the arguments that you use with these features...


...................................................................................................


1: download

Usage: Youthoob download [options] <videoUrl>

Download a video from Youtube...

Options:

  -f, --folderName <folderName>  Output folder name (default: "videos")
  
  -n, --fileName <fileName>      Output file name (default: "video")
  
  -h, --help                     display help for command


...................................................................................................

2: convert

Usage: Youthoob convert [options] <videoFilePath>

Convert a video to mp3 file...

Options:
  
  -f, --folderName <folderName>  Output folder name (default: "audios")
  
  -n, --fileName <fileName>      Output file name (default: "audio")
  
  -h, --help                     display help for command


