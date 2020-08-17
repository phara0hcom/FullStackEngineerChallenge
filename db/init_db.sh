#!/bin/bash
/usr/bin/mysqld_safe --skip-grant-tables &
sleep 5
mysql -u root -e "CREATE DATABASE mysqldb"
mysql -u root mysqldb < /tmp/mysqldb.sql