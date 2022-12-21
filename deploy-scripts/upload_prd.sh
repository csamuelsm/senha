#!/bin/bash

SCRIPT=$(readlink -f "$0")
FULLDIR=$(dirname "$SCRIPT")

$FULLDIR/../../portal/deploy-scripts/upload.sh "keep-prd" "keep-prd-portal-s3-web" "password" "$FULLDIR/.." "EXF9M5ZEWX8MD" "dist"