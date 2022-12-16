#!/bin/bash

SCRIPT=$(readlink -f "$0")
FULLDIR=$(dirname "$SCRIPT")

$FULLDIR/../../portal/deploy-scripts/upload.sh "keep-hom" "keep-dev-portal-s3-web" "password" "$FULLDIR/.." "E3PJMXTTDOKWVI" "dist"