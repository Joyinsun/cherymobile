#!/bin/bash
# Get package version
version=$(more package.json | grep "version" | awk '{split($0,array,"\"")} END{print array[4]}')
timestamp=$(date +%Y%m%d%H%M%S)
asset_name=$version"-"$timestamp".apk"
./github_release_android.py -o csc-chery -r cherymobile -u $GITHUB_USER -p $GITHUB_TOKEN -t ${asset_name%.*} --prerelease --asset_name $asset_name --asset_path ./android/app/build/outputs/apk/app-release.apk