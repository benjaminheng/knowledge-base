---
title: "LibreChat"
---

## Deployment changes

Changes made to the code during my deployment.

```diff
diff --git a/client/nginx.conf b/client/nginx.conf
index c91c47a2..ecc9d50c 100644
--- a/client/nginx.conf
+++ b/client/nginx.conf
@@ -3,8 +3,8 @@
 # https://ssl-config.mozilla.org/#server=nginx&version=1.24.0&config=intermediate&openssl=3.1.4&guideline=5.7

 server {
-    listen 80 default_server;
-    listen [::]:80 default_server;
+    listen 8290 default_server;
+    listen [::]:8290 default_server;

     # To Configure SSL, comment all lines within the Non-SSL section and uncomment all lines under the SSL section.
     ########################################  Non-SSL  ########################################
diff --git a/deploy-compose.yml b/deploy-compose.yml
index ae61265a..12241470 100644
--- a/deploy-compose.yml
+++ b/deploy-compose.yml
@@ -7,7 +7,7 @@ services:
     image: ghcr.io/danny-avila/librechat-dev-api:latest
     container_name: LibreChat-API
     ports:
-      - 3080:3080
+      - 127.0.0.1:3080:3080
     depends_on:
       - mongodb
       - rag_api
@@ -31,17 +31,16 @@ services:
       - ./uploads:/app/uploads
       - ./logs:/app/api/logs

-  client:
-    image: nginx:1.27.0-alpine
-    container_name: LibreChat-NGINX
-    ports:
-      - 80:80
-      - 443:443
-    depends_on:
-      - api
-    restart: always
-    volumes:
-      - ./client/nginx.conf:/etc/nginx/conf.d/default.conf
+#  client:
+#    image: nginx:1.27.0-alpine
+#    container_name: LibreChat-NGINX
+#    ports:
+#      - 127.0.0.1:8290:8290
+#    depends_on:
+#      - api
+#    restart: always
+#    volumes:
+#      - ./client/nginx.conf:/etc/nginx/conf.d/default.conf
   mongodb:
     container_name: chat-mongodb
     # ports:  # Uncomment this to access mongodb from outside docker, not safe in deployment
 ```
