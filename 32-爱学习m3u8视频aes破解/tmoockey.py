import requests
from Crypto.Cipher import AES


HEADERS = {
    'Origin': 'http://tts.tmooc.cn',
    'Referer': 'http://tts.tmooc.cn/video/showVideo?menuId=582783&version=CGB_A_V02',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
}


def download_key(url_key):

    response_key = requests.get(url_key, headers=HEADERS).content  # 下载key
    return response_key


def download_ts(url_ts):

    response_ts = requests.get(url_ts, headers=HEADERS).content  # 下载key
    return response_ts

def aes_key_and_ts(key, ts):

    data = AES.new(key, AES.MODE_CBC, ts[0:16]).decrypt(ts[16:])
    return data

def save_mp4(file_name, data):

    with open(file_name+'.mp4', 'ab') as fp:
        fp.write(data)

if __name__ == '__main__':
    url_key = 'http://c.it211.com.cn/cgb19020226pm/static.key'
    key = download_key(url_key)
    for page in range(0, 199):
        url_ts = f'http://c.it211.com.cn/cgb19020226pm/cgb19020226pm-{page}.ts'
