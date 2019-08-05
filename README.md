# JSpider

## 关于

JSpider 的含义是 JavaScript 与 Spider，JSpider每周会更新至少一个网站的JS解密方式。并且把解密的JS文件分享出来，该JS文件可以直接使用Python模块pyexecjs调用执行。分享的文件包括JS源码和Python程序。

- **欢迎 Star**

## 解密方法

### 对称性加密解密

- DES

**DES** 是对称性加密里面常见一种，全称为Data Encryption Standard，即数据加密标准，是一种使用密钥加密的块算法。密钥长度是64位(bit)，超过位数密钥被忽略。所谓对称性加密，加密和解密密钥相同。对称性加密一般会按照固定长度，把待加密字符串分成块。不足一整块或者刚好最后有特殊填充字符。往往跨语言做DES加密解密，经常会出现问题。往往是填充方式不对、或者编码不一致、或者选择加密解密模式(ECB,CBC,CTR,OFB,CFB,NCFB,NOFB)没有对应上造成。

常见的填充模式有： 'pkcs5','pkcs7','iso10126','ansix923','zero' 类型，包括DES-ECB,DES-CBC,DES-CTR,DES-OFB,DES-CFB。

- 3DES

**3DES**（又叫Triple DES）是三重数据加密算法（TDEA，Triple Data Encryption Algorithm）块密码的通称。它相当于是对每个数据块应用三次DES加密算法。密钥长度是128位，192位(bit)，如果密码位数少于等于64位，加密结果与DES相同。原版DES容易被破解，新的3DES出现，增加了加密安全性,避免被暴力破解。它同样是对称性加密，同样涉及到加密编码方式，及填充方式。包括3DES-ECB,3DES-CBC,3DES-CTR,3DES-OFB,3DES-CFB

- AES

**AES**,高级加密标准（英语：Advanced Encryption Standard，缩写：AES），在密码学中又称Rijndael加密法，是美国联邦政府采用的一种区块加密标准。这个标准用来替代原先的DES，已经被多方分析且广为全世界所使用。严格地说，AES和Rijndael加密法并不完全一样（虽然在实际应用中二者可以互换），因为Rijndael加密法可以支持更大范围的区块和密钥长度：AES的区块长度固定为128 比特，密钥长度则可以是128，192或256比特；而Rijndael使用的密钥和区块长度可以是32位的整数倍，以128位为下限，256比特为上限。包括AES-ECB,AES-CBC,AES-CTR,AES-OFB,AES-CFB

- RC2

**RC2**（也称为ARC2）是一种对称密钥块加密由Ron Rivest在1987年“RC”旨在表示“Ron的代码”或“的Rivest密码”;由Rivest设计的其他密码包括RC4，RC5，RC6。包括RC2-ECB,RC2-CBC,RC2-CTR,RC2-OFB,RC2-CFB ,它可作为DES算法的建议替代算法,RC2加密算法的执行可比DES算法快两倍。

- RC4

**RC4**,RC4加密算法是RSA三人组中的头号人物Ron Rivest在1987年设计的密钥长度可变的流加密算法簇。该算法的速度可以达到DES加密的10倍左右，且具有很高级别的非线性。1994年9月，它的算法被发布在互联网上。由于RC4算法加密是采用的xor，所以，一旦子密钥序列出现了重复，密文就有可能被破解。RC4作为一种老旧的验证和加密算法易于受到黑客攻击，现在逐渐不推荐使用了。

- RC5

**RC5**,分组密码算法是1994由麻萨诸塞技术研究所的Ronald L. Rivest教授发明的，并由RSA实验室分析。不像许多方案，RC5具有可变块大小（32，64或128位），密钥大小（0到2040位）和轮回数（0到255）。参数的原始建议选择分别为64位，128位密钥和12轮的块大小。12轮的RC5（64位块）易受使用244选择明文差分攻击。18-20轮被认为是足够的安全保护。包括RC5-ECB,RC5-CBC,RC5-CTR,RC5-OFB,RC5-CFB 。

- RC6

**RC6**,在密码学中，RC6（维斯特密码6）为RC5派生的对称密钥块密码。它被设计由Ron Rivest, Matt Robshaw, Ray Sidney, and Yiqun Lisa Yin，以满足高级加密标准（AES）的要求。RC6具有128比特的块大小和支持的64,128,192和256位的密钥大小，像RC5可以进行参数设置，以支持各种字长，密钥大小，和轮数。它包括RC6-ECB,RC6-CBC,RC6-CTR,RC6-OFB,RC6-CFB 。

- Blowfish

**Blowfish**是一个对称加密块算法，是1993年有Bruce Schneider设计的，现已应用在多种加密产品。Blowfish能保证很好的加密速度，并且目前为止没有发现有效地破解方法。目前为止AES比Blowfish有更广的知名度。Schneider 设计的Blowfish算法用途广泛，意在摒弃DES的老化以及其他算法的强制捆绑。Blowfish刚刚研发出的时候，大部分其他加密算法是专利所有的活商业(政府)机密，所以发展起来非常受限制。Schneider 则声明 Blowfish 的使用没有任何限制，任何国家任何人任何时候都可以随意使用 Blowfish算法。包括Blowfish-ECB,Blowfish-CBC,Blowfish-CTR,Blowfish-OFB,Blowfish-CFB

- Twofish

**Twofish**,双鱼算法（Twofish）是布鲁斯·施奈尔带领的项目组于1998年研发的区块加密算法。美国国家标准技术研究所(NIST)公开招募的高级加密标准（AES）算法最终候选算法之一，但最终并未当选高级加密标准算法。双鱼算法的标志性特点是它采用了和密钥相关的替换盒（S盒）。密钥输入位的一半被用于“真正的”加密流程进行编排并作为Feistel的轮密钥使用，而另一半用于修改算法所使用的S盒。双鱼算法的密钥编排非常复杂。软件实现的128位双鱼算法在大多数平台上的运行速度不及最终获胜的128位的AES标准算法Rijndael，不过，256位的双鱼算法运行速度却较AES-256稍快。包括Twofish-ECB,Twofish-CBC,Twofish-CTR,Twofish-OFB,Twofish-CFB

- Serpent 

**Serpent**,是一个对称密钥块密码，这是在高级加密标准（AES）的较量，它被排在第二位，以Rijndael算法入围。Serpent是由罗斯·安德森，礼比哈姆，和Lars努森设计。像其他的AES意见书，Serpent具有128比特的块大小和支持的128,192或256位的密钥大小。[2]所述的密码是32轮取代-置换网络的4个32位字的块上操作。每轮适用的8个4比特至4比特S-box的并行32倍之一。Serpent的目的是使所有的操作可以并行执行时，采用32位的切片。这最大限度地提高并行性，而且还允许使用DES上进行的广泛的密码分析工作。包括Serpent-ECB,Serpent-CBC,Serpent-CTR,Serpent-OFB,Serpent-CFB

- Gost

**Gost**,GOST分组密码，在标准GOST28147-89定义，是苏联和俄罗斯政府标准的对称密钥块密码。也正基于此分组密码是GOST散列函数。在20世纪70年代开发的，该标准已被标记为“绝密”，然后降级为“秘密”，在1990年后不久，苏联解体，它被解密，它是向公众发布于1994年GOST28147是苏联替代美国标准算法DES。包括Gost-ECB,Gost-CBC,Gost-CTR,Gost-OFB,Gost-CFB

- Rijndael

**Rijndael**,一般可以与AES等同，它实际是包括了AES加密。因为Rijndael加密法可以支持更大范围的区块和密钥长度：AES的区块长度固定为128 比特，密钥长度则可以是128，192或256比特；而Rijndael使用的密钥和区块长度可以是32位的整数倍，以128位为下限，256比特为上限。包括Rijndael-ECB,Rijndael-CBC,Rijndael-CTR,Rijndael-OFB,Rijndael-CFB

- Xtea 

**Xtea**,在密码学中，XTEA（扩展TEA）是一个分组密码旨在纠正TEA的弱点。密码的设计者是大卫·惠勒和剑桥大学计算机实验室的罗杰·尼达姆和算法提出以一个未公开的技术报告于1997年（李约瑟和惠勒，1997年）。它是不受任何专利。喜欢TEA，XTEA是一个64位块Feistel密码，有128位密钥和建议64轮。从TEA几个差别是显而易见的，包括一个较为复杂的密钥调度和移位，异或，和添加的重排。包括Xtea-ECB,Xtea-CBC,Xtea-CTR,Xtea-OFB,Xtea-CFB

### 非对称性加密解密

- RSA公钥加密解密

**RSA**,常说的非对称加密。加密解密密钥不一致，它们是成对出现，本工具密钥生成是PEM格式。公钥加密的私钥解密，私钥加密的要公钥解密。往往私钥是不公开的，公钥是大家共享的。相同内容，相同私钥每次加密后结果还会不一样。RSA已被ISO推荐为公钥数据加密标准，能够阻击各种破解方案。 通过公钥加密结果，必须私钥解密。 同样私钥加密结果，公钥可以解密。RSA加密也是块加密，因此一样存在填充模式。

- RSA私钥加密解密

**RSA**,非对称加密，私钥一般保存在比较安全地方，用户接触不到，PEM格式的私钥有2种模式，一种是带密码加密的，一种是没有带密码的。如果带密码私钥需要我们填写密码后，才可以使用该私钥加密、解密。没有带密码私钥直接可以使用。一般从生成格式可以看到。"-----BEGIN PRIVATE KEY-----"开头 "-----END PRIVATE KEY-----"结尾的为不要密码私钥。"-----BEGIN ENCRYPTED PRIVATE KEY-----"开头 "-----END ENCRYPTED PRIVATE KEY-----"结尾，是需要解密密码私钥。私钥加密内容，只能公钥解密，公钥加密内容，只能私钥解密。公钥加密的公钥不能解密的。

- DSA

做非对称加密密钥对一般有RSA、DSA，都可以用作签名验证，一般如果只做签名操作，生成DSA即可，速度会快很多,效率也很高。DSA尽管很少用，但是也一样具有很高可靠性，通过公私钥签名验证内容。保证数据在传输中不被修改。

## 联系

- scrapy@qq.com

## 注意

- 本项目仅用于学习交流，切勿用于任何非法用途。

