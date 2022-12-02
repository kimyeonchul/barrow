import requests
import sys
import os
import hashlib
import hmac
import base64
import time
import json

from pathlib import Path
from django.core.exceptions import ImproperlyConfigured

BASE_DIR = Path(__file__).resolve().parent.parent
secret_file = os.path.join(BASE_DIR, 'secrets.json')
with open(secret_file) as f:
    secrets = json.loads(f.read())

def get_secret(setting, secrets=secrets):
    try:
        return secrets[setting]
    except KeyError:
        error_msg = "Set the {} environment variable".format(setting)
        raise ImproperlyConfigured(error_msg)

access_key = get_secret("SMS_ACCESS_KEY")


url = "https://sens.apigw.ntruss.com"
uri = "/sms/v2/services/ncp:sms:kr:296962052810:barrow_test/messages"

def make_signature(timestamp):
        secret_key = get_secret("SMS_SECRET_KEY")
        secret_key = bytes(secret_key, "UTF-8")
        method = "POST"
        message = method + " " + uri + "\n" + timestamp + "\n" + access_key
        message = bytes(message, "UTF-8")
        signingKey = base64.b64encode(hmac.new(secret_key, message, digestmod = hashlib.sha256).digest())
        return signingKey
def send(to, text):   
    timestamp = int(time.time() * 1000)
    timestamp = str(timestamp)
    header = {
        "Content-Type" : "application/json; charset=utf-8",
        "x-ncp-apigw-timestamp" : timestamp,
        "x-ncp-iam-access-key" : access_key,
        "x-ncp-apigw-signature-v2" : make_signature(timestamp)
    }

    data = {
        "type" : "SMS",
        "from" : "01083470807",
        "subject" : "발신번호테스트",
        "content" : text,
        "messages" : [
            {
                "to" : to,
            }
        ]
    }

    res = requests.post(url+uri,headers=header,data = json.dumps(data))
    return res

