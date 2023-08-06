برای استفاده از فضای ابری لیارا  با  استفاده از multer,aws-sdk

پروژه برای اپلود عکس و فیلم در مخزن لیارا است
دارای اپلود یک و چند تا عکس همزمان و همچنین اپدیت ان 

برای اپدیت ان نیاز است که  کلید هر عکس هم ارسال شود تا عکس یا ویدیو از ذخیره سازی ابری لیارا پاک شود و فایل جدید اپلود شود

ادرس درخواست این پروژه به صورت زیر است

اپلود یک عکس: https://uploade.iran.liara.run/api/uploade/singleFile
اپلود چند عکس: https://uploade.iran.liara.run/api/uploade/multipleFile
اپدیت چند عکس: https://uploade.iran.liara.run/api/uploade/updateMultipleFile
اپدیت یک عکس: https://uploade.iran.liara.run/api/uploade/updateSingleFile


طریقه اپلود چند عکس همزمان:
const formData = new FormData();

    // files همان input عکس یا فیلم ما است که اطلاعات ان در ان ریخته شده
      Object.values(files).forEach(file=>{
        formData.append('files',file)
        
      })
     

      try{
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
  
        const { data } = await axios.post(
          "https://uploade.iran.liara.run/pi/uploade/multipleFiles",
            formData,
          config
        );
        //data: {time,file}
        //time: زمانی که اپلود شده فایل
        //file: اطلاعات فایل اپلود شده =>  file = {
      fileName: req.file.originalname,
      filePath: result.Location,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormater(req.file.size, 2),
      fileKey: result.Key,
    };
}catch(err){
    console.log(err)

}


// برای اپدیت یک فایل
const formData = new FormData();

    // file همان input عکس یا فیلم ما است که اطلاعات ان در ان ریخته شده
     
        formData.append('file',file)
        
   
     

      try{
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
  
        const { data } = await axios.post(
          "https://uploade.iran.liara.run/pi/uploade/singleFile",
            formData,
          config
        );

        //data: {time,file}
}catch(err){
    console.log(err)

}

https://uploade.iran.liara.run



به فایل .env بروید:
و مشخصات فضای ابری خودتون را قرار دهید



ENDPOINT
BUCKET_NAME 
ACCESS_KEY
SECRET_KEY 

به این ها نیاز داری برای اپلود فایل در فضای ابری 

* با استفاده از fs:
میتونی علاوه بر فضای ابری در محل پروژه هم فایلتو سیو کنی
*