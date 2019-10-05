import execjs
import requests


def get_js_function(js_path, func_name, func_args):
    '''
    获取指定目录下的js代码, 并且指定js代码中函数的名字以及函数的参数。
    :param js_path: js代码的位置
    :param func_name: js代码中函数的名字
    :param func_args: js代码中函数的参数
    :return: 返回调用js函数的结果
    '''

    with open(js_path) as fp:
        js = fp.read()
        ctx = execjs.compile(js)
        return ctx.call(func_name, func_args)


def login(passwd):
    url = 'https://www.imooc.com/passport/user/login'
    session = requests.Session()
    headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Length': '327',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'imooc_uuid=698163be-752c-437d-979f-a024be53a993; imooc_isnew_ct=1539541237; imooc_isnew=2; zg_did=%7B%22did%22%3A%20%22166e7f069a10-0b251bb7adae18-36664c08-100200-166e7f069a49b%22%7D; dist_id=a7ZE0dF1uNW8enTrUenFBYTjbeAWKkSx; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1562464352,1563851968,1564150581; PHPSESSID=fc6rttd0j0orp63jlpqqr47qi3; PSEID=2ef87c0ecfdb8e233fdb7bcf67c89ae4; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1564194896; cvde=5d3b0b34657b9-22; zg_f375fe2f71e542a4b890d9a620f9fb32=%7B%22sid%22%3A%201564194229399%2C%22updated%22%3A%201564195619895%2C%22info%22%3A%201563851967607%2C%22superProperty%22%3A%20%22%7B%5C%22%E5%BA%94%E7%94%A8%E5%90%8D%E7%A7%B0%5C%22%3A%20%5C%22%E6%85%95%E8%AF%BE%E7%BD%91%E6%95%B0%E6%8D%AE%E7%BB%9F%E8%AE%A1%5C%22%2C%5C%22Platform%5C%22%3A%20%5C%22web%5C%22%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22www.imooc.com%22%2C%22zs%22%3A%200%2C%22sc%22%3A%200%2C%22firstScreen%22%3A%201564194229399%2C%22cuid%22%3A%20%22zo4kcpAhzmU%2C%22%7D',
        'Host': 'www.imooc.com',
        'Origin': 'https://www.imooc.com',
        'Pragma': 'no-cache',
        'Referer': 'https://www.imooc.com/user/newlogin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
    }
    url_get_cookie = 'https://www.imooc.com/user/newlogin'
    # 先访问这个获取Cookie 记录Cookie
    # session.get(url_get_cookie, headers=headers)
    data = {
        'username': '13298307816-我的微信-填写你的微信',
        'password': passwd,
        'verify': "zxkp",
        'remember': '1',
        'pwencode': '1',
        'browser_key': 'b3d1f46398d13c2608889e5f91c197f3',
        'referer': 'https://www.imooc.com',
    }

    response = requests.post(url, data=data, headers=headers)
    with open('imooc.html', 'wb') as fp:
        fp.write(response.content)


if __name__ == '__main__':
    params = '填写你的密码'
    # 加密密码
    passwd = get_js_function('imooc.js', 'login', params)
    print(passwd)
    login(str(passwd))


    '''
    目前存在的问题是: 加密搞出来了  但是在发送请求的时候出现的大都是非法请求的错误  
    其实在浏览器里面有时候即使密码账号正确也会出现这样的错误  也登陆不进去。
    '''