const upload = require('../utils/upload')
const multer = require('multer')
const {UploadError}=require('../utils/error')
const {formatResqonse} =require('../utils/tool')

module.exports = (req, res, next) => {
    upload(req, res, err => {
       
      if (err instanceof multer.MulterError) {
        next(new UploadError('文件上传失败，请检查文件大小，不要超过3MB'))
      } else {
        
        const path ='/static/upload/'+req.file.filename

      

        res.send(formatResqonse(0,'',path))
      }
  
    })
  }
