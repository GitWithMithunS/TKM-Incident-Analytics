package com.tkm_ma.incident_analytics.utils;

import org.springframework.util.DigestUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


public class CalculateHash {

    private CalculateHash(){};

    public static String getCalculatedHash(MultipartFile file) {

        try {
            return DigestUtils.md5DigestAsHex(
                    file.getInputStream()
            );
        } catch (IOException e) {
            throw new RuntimeException(
                    "Failed to calculate file hash", e
            );
        }
    }
}
