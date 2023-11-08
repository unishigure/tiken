# リモートで Misskey PostgreSQL の Web GUI に接続する

## Overview

Misskey を [install shell script](https://misskey-hub.net/docs/install/bash.html) でインストールした Ubuntu 22.04.3 に、\
[pgAdmin 4](https://www.pgadmin.org/) の Web mode をインストールし、外部ブラウザから PostgreSQL に接続できるようにする

ポート競合で手間取ったので覚え書き

## Flow

1. pgAdmin 4 をインストールする

   [公式のDLページ](https://www.pgadmin.org/download/pgadmin-4-apt/)の手順に従い、pgAdmin をインストールする

   ```bash
   # Install the public key for the repository (if not done previously):
   curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg
   ```

   ```bash
   # Create the repository configuration file:
   sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list && apt update'
   ```

   ```bash
   # Install for web mode only:
   sudo apt install pgadmin4-web
   ```

2. ポート競合を解決する

   pgAdmin は Apache サーバで起動しようとするが、デフォルトでは Misskey のポートと競合するため失敗する\
   そのため、利用するポートを変更する

   ポートの設定ファイルを開く

   ```bash
   sudo nano /etc/apache2/ports.conf
   ```

   デフォルト の `80` から `81` などにの利用していないポートに変更する

   ```bash
   Listen 81
   ```

3. ポートを開放する

   外部から接続できるよう、ポートを開放する

   ```bash
   sudo ufw allow 81
   sudo ufw reload
   sudo ufw status
   ```

4. pgAdmin サーバを起動する

   pgAdmin 公式の手順に戻り、サーバ設定を完了する

   ```bash
   # Configure the webserver, if you installed pgadmin4-web:
   sudo /usr/pgadmin4/bin/setup-web.sh
   ```

   管理者アカウントのログイン情報などを設定する

5. ログインする

   pgAdmin 4 の Web ページに接続する\
   ログイン画面が表示されるので、上記で設定した管理者アカウントでログインする

   ```text
   http://<<SERVER_IP>>:<<PORT>>/pgadmin4/
   ```

6. PostgreSQL に接続する

   Misskey が接続している PostgreSQL への接続情報を設定し、接続する

   DB 設定を思い出せないときは Misskey の config ファイルとかを確認する

   ```bash
   sudo nano /home/misskey/misskey/.config/default.yml
   ```

## Ref

- [pgAdmin 4 (APT)](https://www.pgadmin.org/download/pgadmin-4-apt/)
- [[ILP共通] Tomcat、Apache、PostgreSQL利用ポート... | よくあるご質問 | ALSI （アルシー）](https://alsifaq.dga.jp/faq_detail.html?id=3645)
- [Ubuntuのポート開放方法（ファイアウォールを設定する） #Ubuntu - Qiita](https://qiita.com/siida36/items/be21d361cf80d664859c)
