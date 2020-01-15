import execjs
import os
import time
import requests
import cv2
from airtest import aircv


def getDistanceX(orange):
    im_search = aircv.imread('obj.png')
    im_source = aircv.imread(orange)
    result = aircv.find_template(im_source, im_search)
    return result


def pic_download(url, type='captcha'):
    """
    图片下载
    :param url:
    :param type:
    :return:
    """
    img_path = os.path.abspath('...') + '\\' + '{}.jpg'.format(type)
    print(img_path)
    img_data = session.get(url).content
    with open(img_path, 'wb') as f:
        f.write(img_data)
    return img_path


def process_img(wait_img_path, pro_img_path):
    """
    图片处理
    :param img1: 处理后图片
    :param img2: 待处理图片
    :return:
    """
    # 读取图片
    target = cv2.imread(wait_img_path)
    # 图片转化为灰度图
    target = cv2.cvtColor(target, cv2.COLOR_BGR2GRAY)
    target = abs(255 - target)
    cv2.imwrite(pro_img_path, target)


def cut_slider(img_path, cut_img_path):
    """
    滑块切割
    :return:
    """
    # 读取要被切割的图片
    img = cv2.imread(img_path)
    # 要被切割的开始的像素的高度值
    beH = 150
    # 要被切割的结束的像素的高度值
    hEnd = 300
    # 要被切割的开始的像素的宽度值
    beW = 3
    # 要被切割的结束的像素的宽度值
    wLen = 48
    # 对图片进行切割
    dstImg = img[beH:hEnd, beW:wLen]
    cv2.imwrite(cut_img_path, dstImg)


def cut_picture(img_path, cut_img_path, *args):
    """
    滑块切割
    :return:
    """
    # 读取要被切割的图片
    img = cv2.imread(img_path)
    # 要被切割的开始的像素的高度值
    beH = args[0]
    # 要被切割的结束的像素的高度值
    hEnd = args[1]
    # 要被切割的开始的像素的宽度值
    beW = args[2]
    # 要被切割的结束的像素的宽度值
    wLen = args[3]
    # 对图片进行切割
    dstImg = img[beH:hEnd, beW:wLen]
    cv2.imwrite(cut_img_path, dstImg)


def get_distance(captcha_path):
    """
    获取缺口距离
    :return:
    """
    # # 计算拼图还原距离
    target = cv2.imread(captcha_path, 0)
    # 获取图像的尺寸
    height = target.shape[0]
    # print(height) # 150
    width = target.shape[1]
    # print(width) # 240

    # 宽 遍历
    for x in range(width):  # X 轴
        for y in range(120):  # Y 轴
            # print(target[x, y])
            if target[y, x] != 255:
                # j就是对应的Y轴的坐标, X轴是不变的!
                # print(j)
                return x + 6


# 数值运算：加减乘除
def subtractPic(src11, src33):
    src1 = cv2.imread(src11)
    src3 = cv2.imread(src33)
    src = cv2.subtract(src1, src3)  # 减
    # cv2.imshow("相减", src)
    # 取非
    src = cv2.bitwise_not(src)
    # 二值化 更加清晰
    cv2.imwrite('subtract.jpg', src)


#################################################
session = requests.Session()


def get_js_function(js_path, func_name, func_args):
    '''
    获取指定目录下的js代码, 并且指定js代码中函数的名字以及函数的参数。
    :param js_path: js代码的位置
    :param func_name: js代码中函数的名字
    :param func_args: js代码中函数的参数
    :return: 返回调用js函数的结果
    '''

    with open(js_path, encoding='utf-8') as fp:
        js = fp.read()
        ctx = execjs.compile(js)
        return ctx.call(func_name, func_args)


headers = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Cookie': 'authId=ST-2308216-XhvXsSKtdxh4C5hdXwCd-ssolimsgetteccom',
    'Host': 'sample.nifdc.org.cn',
    'Pragma': 'no-cache',
    'Referer': 'http://sample.nifdc.org.cn/index.php?m=Admin&c=TaskList&a=addpaperysample',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36'
}


def crackSlide():
    url = 'http://sample.nifdc.org.cn/Admin/Captcha/getcaptcha?t=0.9832337044604367'
    pic_download(url)
    process_img('captcha.jpg', 'pro_img.jpg')
    cut_picture('captcha.jpg', 'src11_captcha.jpg', 0, 150, 0, 240)
    cut_picture('captcha.jpg', 'src33_captcha.jpg', 300, 450, 0, 240)
    subtractPic('src33_captcha.jpg', 'src11_captcha.jpg')
    result = getDistanceX('subtract.jpg')
    if result:
        print(result)
        x = result['result'][0] - 24
        # x = get_distance('subtract.jpg')
        PARAMS_URL = get_js_function('666.js', 'parmsData', x)
        # print(PARAMS_URL)
        BASE_URL = 'http://sample.nifdc.org.cn'
        response = session.get(BASE_URL + PARAMS_URL)
        print(response.text)
        return response.json()


def main():
    print('开始测试...')
    print('=' * 100)
    num = 1
    success = 0
    test_num = 20
    while num <= test_num:
        x = crackSlide()
        print(x)
        if 'success' in str(x):
            success += 1
        # time.sleep(.5)
        num += 1
    print('最后测试结果 >> %.2f%%' % (success / test_num * 100))


if __name__ == '__main__':
    main()
