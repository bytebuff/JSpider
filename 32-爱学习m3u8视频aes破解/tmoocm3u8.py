import re, os
import requests
from parsel import Selector
from tmoockey import download_key, download_ts, aes_key_and_ts, save_mp4


headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Cookie': 'xxxxxxxxxxxxxxxxxxx',
    'Host': 'tts.tmooc.cn',
    'Referer': 'http://tts.tmooc.cn/studentCenter/toMyttsPage?versionCode=CGB_A_V02',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
}

headers2 = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Cookie': 'xxxxxxxxxxxx',
    'Host': 'tts.tmooc.cn',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',

}

headers3 = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
}

def get_menuId(url):

    response = requests.get(url, headers=headers)
    selectors = Selector(text=response.text).xpath('//div[@class="course-menu"]/ul/li[@class="opened"]')
    for selector in selectors:
        video_name = selector.xpath('./p/text()').get().strip()
        video_href = selector.xpath('./ul/li[@class="sp"]/a/@href').get()
        video_name = ''.join(video_name.split())
        video_href = video_href
        yield video_name, video_href


def get_m3u8(m3u8_url):
    # m3u8_url = 'https://hls.videocc.net/01b768ec8c/0/01b768ec8c4739f79cec9964836b5800_2.m3u8?pid=1580626301758X1133587&device=desktop'
    # m3u8_url = 'https://hls.videocc.net/01b768ec8c/e/01b768ec8c3d4e068ad411ccc0b9342e_2.m3u8?pid=1580632138310X1619848&device=desktop'
    response_m3u8 = requests.get(m3u8_url, headers=headers3)
    print(response_m3u8.text)
    # 提取key的url
    url_key = re.search('URI="(.*?)"', response_m3u8.text).group(1)
    #'http://c.it211.com.cn/cgb19020226pm/static.key'
    key = download_key(url_key)
    url_ts = re.findall(r'https://.*?\.ts\?pid=.*?&device=desktop', response_m3u8.text)
    print(url_ts)
    for ts_url in url_ts:
        print(ts_url)
        ts = download_ts(ts_url)
        data = aes_key_and_ts(key, ts)
        video_path = '第6讲 【作】写人篇·我的好朋友'
        save_mp4(video_path, data)


if __name__ == '__main__':
    m3u8_url = 'https://hls.videocc.net/01b768ec8c/7/01b768ec8c751c7b09232998c15b6837_2.m3u8?pid=1580646548553X1389651&device=desktop'
    get_m3u8(m3u8_url)
