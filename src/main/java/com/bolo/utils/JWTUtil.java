package com.bolo.utils;
import java.security.Key;

import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import javax.xml.bind.DatatypeConverter;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;


@Component

public class JWTUtil {

    public static String sercetKey = "HX012027.";

    //token加密时使用的密钥

    //一旦得到该密钥也就可以伪造token了

    //代表token的有效时间 默认7天,
    public final static long keeptime = 604800000;


    public final static int state = 1; //token 状态: 1正常 2过期 3验证失败



    //JWT由3个部分组成,分别是 头部Header,载荷Payload一般是用户信息和声明,签证Signature一般是密钥和签名

    //当头部用base64进行编码后一般都会呈现eyJ...形式,而载荷为非强制使用,签证则包含了哈希算法加密后的数据,包括转码后的header,payload和sercetKey

    //而payload又包含几个部分,issuer签发者,subject面向用户,iat签发时间,exp过期时间,aud接收方。

    public static String generToken(String id, String issuer, String subject) {

        long ttlMillis = keeptime;

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        //使用Hash256算法进行加密

        long nowMillis = System.currentTimeMillis();

        Date now = new Date(nowMillis);

        //获取系统时间以便设置token有效时间

        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(sercetKey);

        //将密钥转码为base64形式,再转为字节码

        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        //对其使用Hash256进行加密

        JwtBuilder builder = Jwts.builder().setId(id).setIssuedAt(now);

        //JWT生成类,此时设置iat,以及根据传入的id设置token

        if (subject != null) {

            builder.setSubject(subject);

        }

        if (issuer != null) {

            builder.setIssuer(issuer);

        }

        //由于Payload是非必须加入的,所以这时候要加入检测

        builder.signWith(signatureAlgorithm, signingKey);

        //进行签名,生成Signature

        if (ttlMillis >= 0) {

            long expMillis = nowMillis + ttlMillis;

            Date exp = new Date(expMillis);
            System.out.println("过期时间:"+exp);

            builder.setExpiration(exp);

        }

        return builder.compact();

        //返回最终的token结果

    }



    //该函数用于更新token

    public String updateToken(String token) {

        //Claims就是包含了我们的Payload信息类

        Claims claims = decodeToken(token);

        String id = claims.getId();

        String subject = claims.getSubject();

        String issuer = claims.getIssuer();

        //生成新的token,根据现在的时间

        return generToken(id, issuer, subject);

    }



    public static Claims decodeToken(String token) {

        Claims claims = Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(sercetKey))

                .parseClaimsJws(token).getBody();

        //将token解密出来,将payload信息包装成Claims类返回

        return claims;

    }

    /**
     * 验证token
     * @param token
     * @return 状态值 1正常 2过期 3验证失败
     */
    public static int verify(String token){
        if(token == ""|| "".equals(token) || token == null ){
            return -3;
        }
        try{
            Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(sercetKey))
                    .parseClaimsJws(token);
        }catch (ExpiredJwtException expireException){
            System.out.println("token过期啦");
            return -2;
        }catch (SignatureException signatureException){
            System.out.println("token验证失败");
            return -3;
        }catch (Exception e){
            System.out.println("token格式都不对!");
            return -3;
        }
        return 1;
    }

}

