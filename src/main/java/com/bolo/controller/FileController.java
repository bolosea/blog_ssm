package com.bolo.controller;

import com.bolo.dao.FileMapper;
import com.bolo.entitys.JSONResponse;
import com.bolo.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;

@Controller
@RequestMapping("/file")
public class FileController {

    @Autowired
    private FileService fileService;

    @RequestMapping(value = "/upload",method = RequestMethod.POST)
    @ResponseBody
    public JSONResponse testFileUpload(@RequestParam("file") MultipartFile file, HttpServletRequest request) throws IOException {

        String path = System.getProperty("webapp.path");
        System.out.println("path" + path);
        String timeStr = new SimpleDateFormat("yyyy-MM-dd").format(System.currentTimeMillis());
        try {
            String filePath = path+ "statics/images/"+ timeStr;
            File dir = new File(filePath);
            if (!dir.exists()){
                dir.mkdirs();
            }
            System.out.println("filepath: "+ filePath);
            file.transferTo(new File(filePath + File.separator + file.getOriginalFilename()));

            com.bolo.entitys.File fl = new com.bolo.entitys.File();
            fl.setName(file.getOriginalFilename());
            fl.setPath("statics/images/" +timeStr + File.separator + file.getOriginalFilename());
            fileService.addFile(fl);
            return JSONResponse.success("/statics/images/"+timeStr+File.separator + file.getOriginalFilename(),"上传成功!");
        }catch (Exception e){
            System.out.println(e);
            return JSONResponse.error("上传失败!");
        }

    }
}
