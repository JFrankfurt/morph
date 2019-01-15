# -*- coding: utf-8 -*-
"""
Created on Mon Jan 14 23:14:31 2019

@author: jordan frankfurt
"""

import click
import requests
import hmac

url = 'http://127.0.0.1:3000'

def authHeaders(route, key, shared_secret, body, params):
    
    h = hmac.new(key, preimage, 'sha256')
    signature = h.hexdigest()
    headers = { 'X-Route': route, 'X-Key': key, 'X-Signature': signature }
    return headers

"""
PUT /credential
body: key, shared_secret
"""
@click.command()
@click.option('-k', '--key')
@click.option('-s', '--shared_secret')
def putCredential(key, shared_secret):
    headers = {'Content-Type': 'application/json'}
    data = {'key': key, 'shared_secret': shared_secret}
    requests.put(url + '/credential', data=data, headers=headers)

"""
POST /message
body: msg, tags
headers:
    X-Key: key registered on the server
    X-Route: route being accessed
    X-Signature: HMAC-SHA256
"""
@click.command()
@click.option('-k', '--key')
@click.option('-s', '--shared_secret')
def postMessage(key, shared_secret, msg, tags):
    route = '/message'
    headers = authHeaders(route, key, shared_secret, {'msg': msg, 'tags': tags}, {})
    data = {'msg': msg, 'tags': tags}
    requests.post(url + route, data=data, headers=headers)

"""
GET /message/<id>
headers:
    X-Key: key registered on the server
    X-Route: route being accessed
    X-Signature: HMAC-SHA256
"""


"""
GET /messages/<tag>
headers:
    X-Key: key registered on the server
    X-Route: route being accessed
    X-Signature: HMAC-SHA256
"""

