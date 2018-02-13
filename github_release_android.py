#!/usr/bin/python3
# This script is used to pre-release android apk package to GitHub release page.
# The apk package is used to do test

import argparse
import json
import requests
import pprint

parser = argparse.ArgumentParser()
# GitHub API arg
parser.add_argument("-a", "--api",
                    default="https://github.wdf.sap.corp/api/v3",
                    help="GitHub API URL. Default: https://github.wdf.sap.corp/api/v3")
# GitHub repo args
parser.add_argument("-o", "--owner", help="Organization or Owner name")
parser.add_argument("-r", "--repo", help="GitHub repository name")

# GitHub auth args
parser.add_argument("-u", "--user", help="GitHub username")
parser.add_argument("-p", "--password", help="User password or token")

# GitHub release args
parser.add_argument("-t", "--tag", help="Tag name")
parser.add_argument("--target_commitish", default="master",
                    help="The commitish value that determines where the Git tag is created from. Default: master")
parser.add_argument("--name", help="The name of release")
parser.add_argument("--body", help="Text describing the contents of the tag")
parser.add_argument("--draft", default=False,
                    action="store_true", help="Create a draft release")
parser.add_argument("--prerelease", default=False, action="store_true",
                    help="Identity the release as a prerelease")

# GitHub asset args
parser.add_argument("--asset_name", help="The name of the asset")
parser.add_argument("--asset_path", help="Relative path of the file")

args = parser.parse_args()
# Verify args
is_args_complete = True
if args.owner is None:
    print("Please provide GitHub repository owner or organization.")
    is_args_complete = False
if args.repo is None:
    print("Please provide GitHub repository name")
    is_args_complete = False
if args.user is None:
    print("Please provide GitHub user name")
    is_args_complete = False
if args.password is None:
    print("Please provide GitHub user password or token")
    is_args_complete = False
if args.tag is None:
    print("Please provide tag name")
    is_args_complete = False
if args.asset_name is None:
    print("Please provide upload asset name")
    is_args_complete = False
if args.asset_path is None:
    print("Please provide upload asset path")
    is_args_complete = False
if is_args_complete is False:
    exit(1)

client = requests.session()
client.auth = (args.user, args.password)
client.verify = False


def create_release():
    url = args.api + "/repos/" + args.owner + "/" + args.repo + "/releases"
    data = {
        "tag_name": args.tag,
        "target_commitish": args.target_commitish,
        "draft": args.draft,
        "prerelease": args.prerelease
    }
    if args.name is not None:
        data["name"] = args.name
    if args.body is not None:
        data["body"] = args.body
    headers = {
        "Content-Type": "application/json"
    }
    resp = client.post(url, json=data, headers=headers)
    if resp.status_code == 201:
        print("Release created")
        resp_content = json.loads(resp.content.decode())
        pprint.pprint(resp_content)
        return resp_content["upload_url"]
    else:
        print("Create release failed")
        pprint.pprint(json.loads(resp.content.decode()))
        exit(1)


def upload_asset(upload_url):
    url = upload_url.split("{")[0] + "?name=" + args.asset_name
    print(url)
    data = open(args.asset_path, "rb").read()
    # data = {
    #     "file": (args.asset_name, open(args.asset_path, "rb"))
    # }
    headers = {
        "Content-Type": "application/octet-stream"
    }
    resp = client.post(url, data=data, headers=headers)
    if resp.status_code == 201:
        print("Upload success")
        pprint.pprint(json.loads(resp.content.decode()))
    else:
        print("Upload failed")
        pprint.pprint(json.loads(resp.content.decode()))
        exit(1)


def main():
    upload_url = create_release()
    upload_asset(upload_url)
    exit(0)


if __name__ == "__main__":
    main()
