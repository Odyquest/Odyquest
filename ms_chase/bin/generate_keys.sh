#!/bin/sh

# Copyright (C) 2020 - museum x, Karlsruhe

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

# https://www.baeldung.com/spring-boot-https-self-signed-certificate

echo "Generate keystore..."

ALIAS="microservice"
BASE_DIR=".."
KEYSTORE_DIR=$BASE_DIR"/src/main/resources/"
KEYSIZE=2048
KEYALG="RSA"
VALIDITY=3650
HOSTNAME=$(hostname)
PASSWORD=

keytool -genkeypair  -v -alias $ALIAS -keyalg $KEYALG -keysize $KEYSIZE -storetype PKCS12 -keystore $KEYSTORE_DIR"keystore.p12" -validity $VALIDITY -ext SAN=DNS:"$HOSTNAME",IP:127.0.0.1

echo "Generate certificate.cer..."
CERT_DIR=$BASE_DIR"/config/"
keytool -v -exportcert -file $CERT_DIR"/certificate.cer" -alias $ALIAS -keystore $KEYSTORE_DIR"keystore.p12"

echo "Generate truststore..."
keytool -importcert -v -noprompt -alias $ALIAS -file $CERT_DIR"/certificate.cer" -keystore $KEYSTORE_DIR"truststore.p12"

keytool -v -list -keystore $KEYSTORE_DIR"truststore.p12"