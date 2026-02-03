// 英雄原型数据库
// 格式: RIASEC-MBTI

export interface HeroArchetype {
  title: string;
  subtitle: string;
  celebrity: string;
  description: string;
  ability: string;
}

export const HERO_ARCHETYPES: Record<string, HeroArchetype> = {
    // R型：钢铁先锋 (The Vanguard)
    'R-ISTP': { title: '钢铁先锋·宗师形态', subtitle: '钢铁先锋 (R) + ISTP', celebrity: '李小龙 / 杰森·斯坦森', description: '以无法为有法，用身体和直觉打破一切形式的束缚。', ability: '物理极限挑战' },
    'R-ESTP': { title: '钢铁先锋·特技形态', subtitle: '钢铁先锋 (R) + ESTP', celebrity: '成龙 / 汤姆·克鲁斯', description: '把每一次危机都变成一场精彩的即兴表演，挑战物理极限。', ability: '即兴应变' },
    'R-ISFP': { title: '钢铁先锋·游侠形态', subtitle: '钢铁先锋 (R) + ISFP', celebrity: '苏翊鸣 / 梅西', description: '将冰雪或草地变成画布，用灵动的直觉主宰赛场。', ability: '灵动直觉' },
    'R-ESFP': { title: '钢铁先锋·飞人形态', subtitle: '钢铁先锋 (R) + ESFP', celebrity: '全红婵 / 博尔特', description: '在万众瞩目中爆发潜能，享受速度与水花的共鸣。', ability: '爆发潜能' },
    'R-ISTJ': { title: '钢铁先锋·国医形态', subtitle: '钢铁先锋 (R) + ISTJ', celebrity: '吴孟超 (肝胆之父) / 萨利机长', description: '在危机关头，靠千锤百炼的肌肉记忆和程序拯救生命。', ability: '精准执行' },
    'R-ESTJ': { title: '钢铁先锋·教头形态', subtitle: '钢铁先锋 (R) + ESTJ', celebrity: '刘国梁 / 弗格森爵士', description: '用铁血纪律和战术，打造一支战无不胜的现实军团。', ability: '铁血纪律' },
    'R-ISFJ': { title: '钢铁先锋·圣手形态', subtitle: '钢铁先锋 (R) + ISFJ', celebrity: '林巧稚 / 南丁格尔', description: '用温柔而精准的手术刀，零失误地修补生命的缺口。', ability: '生命修补' },
    'R-ESFJ': { title: '钢铁先锋·挂帅形态', subtitle: '钢铁先锋 (R) + ESFJ', celebrity: '郎平 / 菲尔·杰克逊', description: '不仅传授技术，更无微不至地照顾团队，凝聚战斗力。', ability: '团队凝聚' },
    'R-INTJ': { title: '钢铁先锋·工匠形态', subtitle: '钢铁先锋 (R) + INTJ', celebrity: '王传福 / 詹姆斯·戴森', description: '为了解决一个物理痛点，耐心研发核心技术，颠覆行业。', ability: '核心研发' },
    'R-ENTJ': { title: '钢铁先锋·总师形态', subtitle: '钢铁先锋 (R) + ENTJ', celebrity: '钱学森 / 冯·布劳恩', description: '组织庞大的工程军团，以钢铁之躯征服星辰大海。', ability: '工程组织' },
    'R-INTP': { title: '钢铁先锋·天工形态', subtitle: '钢铁先锋 (R) + INTP', celebrity: '鲁班 / 达芬奇', description: '痴迷于机械原理，在图纸上画出超越时代的造物。', ability: '机械原理' },
    'R-ENTP': { title: '钢铁先锋·创客形态', subtitle: '钢铁先锋 (R) + ENTP', celebrity: '李永乐老师 / 亚当 (流言终结者)', description: '动手实验只是为了验证那个疯狂的想法，硬核科普炸飞无聊。', ability: '硬核实验' },
    'R-INFJ': { title: '钢铁先锋·舞者形态', subtitle: '钢铁先锋 (R) + INFJ', celebrity: '杨丽萍 / 羽生结弦', description: '用身体动作书写诗篇，赋予每一次舞动以灵魂的重量。', ability: '灵魂舞动' },
    'R-ENFJ': { title: '钢铁先锋·导演形态', subtitle: '钢铁先锋 (R) + ENFJ', celebrity: '张艺谋 / 奥普拉', description: '用极具在场感的调度和视觉语言，瞬间震撼所有观众。', ability: '视觉调度' },
    'R-INFP': { title: '钢铁先锋·武者形态', subtitle: '钢铁先锋 (R) + INFP', celebrity: '叶问 / 宫本武藏', description: '将武术视为人道，在孤独的修炼中寻找内心的和平。', ability: '内心和平' },
    'R-ENFP': { title: '钢铁先锋·行客形态', subtitle: '钢铁先锋 (R) + ENFP', celebrity: '徐霞客 / 贝尔 (荒野求生)', description: '在绝境中保持乐观，用双脚丈量大地，在荒野中寻找自由。', ability: '荒野生存' },

    // I型：真理破译者 (The Decoder)
    'I-INTP': { title: '真理破译者·大贤形态', subtitle: '真理破译者 (I) + INTP', celebrity: '杨振宁 / 爱因斯坦', description: '在脑海中进行思想实验，用纯粹的逻辑重构宇宙的秩序。', ability: '逻辑重构' },
    'I-INTJ': { title: '真理破译者·奠基形态', subtitle: '真理破译者 (I) + INTJ', celebrity: '华罗庚 / 牛顿', description: '建立严密的定律体系，用数学构建一座通往真理的大厦。', ability: '定律体系' },
    'I-ENTP': { title: '真理破译者·教授形态', subtitle: '真理破译者 (I) + ENTP', celebrity: '陈平 (复旦) / 理查德·费曼', description: '用幽默和好奇心拆解世界，拒绝一切枯燥和权威。', ability: '好奇拆解' },
    'I-ENTJ': { title: '真理破译者·霸主形态', subtitle: '真理破译者 (I) + ENTJ', celebrity: '李彦宏 / 比尔·盖茨', description: '不仅读懂代码，更读懂商业，将技术标准推广为世界法则。', ability: '商业技术' },
    'I-INFJ': { title: '真理破译者·解梦形态', subtitle: '真理破译者 (I) + INFJ', celebrity: '曾仕强 / 荣格', description: '潜入人类集体潜意识的深海，解读易经与心灵的密码。', ability: '心灵密码' },
    'I-INFP': { title: '真理破译者·格物形态', subtitle: '真理破译者 (I) + INFP', celebrity: '李时珍 / 达尔文', description: '怀着对生命的热爱，在漫长的观察中编写自然的百科全书。', ability: '自然观察' },
    'I-ENFP': { title: '真理破译者·预言形态', subtitle: '真理破译者 (I) + ENFP', celebrity: '刘慈欣 / 凯文·凯利', description: '充满激情地向大众描绘未来的科幻图景，点燃想象力。', ability: '未来图景' },
    'I-ENFJ': { title: '真理破译者·信使形态', subtitle: '真理破译者 (I) + ENFJ', celebrity: '罗振宇 / 尼尔·泰森', description: '用迷人的魅力充当知识的二传手，让所有人爱上思考。', ability: '知识传播' },
    'I-ISTJ': { title: '真理破译者·神农形态', subtitle: '真理破译者 (I) + ISTJ', celebrity: '屠呦呦 / 居里夫人', description: '几十年如一日，从古籍和实验中筛选出拯救生命的配方。', ability: '实验筛选' },
    'I-ESTJ': { title: '真理破译者·院士形态', subtitle: '真理破译者 (I) + ESTJ', celebrity: '张文宏 / 福奇医生', description: '用数据说话，捍卫科学的边界，维护公共卫生的严谨性。', ability: '数据捍卫' },
    'I-ISFJ': { title: '真理破译者·仵作形态', subtitle: '真理破译者 (I) + ISFJ', celebrity: '法医秦明 / 李昌钰', description: '通过微小的细节 and 证据，替逝者说话，还原最后的真相。', ability: '细节还原' },
    'I-ESFJ': { title: '真理破译者·园丁形态', subtitle: '真理破译者 (I) + ESFJ', celebrity: '叶圣陶 / 蒙台梭利', description: '将复杂的知识系统化、条理化，耐心地教给下一代。', ability: '知识系统化' },
    'I-ISTP': { title: '真理破译者·提刑形态', subtitle: '真理破译者 (I) + ISTP', celebrity: '狄仁杰 / 福尔摩斯', description: '不关心宏大的理论，只关心脚下的线索，演绎推理。', ability: '演绎推理' },
    'I-ESTP': { title: '真理破译者·神医形态', subtitle: '真理破译者 (I) + ESTP', celebrity: '钟南山 / 豪斯医生', description: '敢于奔赴前线，用冒险的手段和敏锐的直觉，攻克疑难杂症。', ability: '直觉攻克' },
    'I-ISFP': { title: '真理破译者·数痴形态', subtitle: '真理破译者 (I) + ISFP', celebrity: '韦东奕 / 陈景润', description: '在孤独的数字世界里，你是快乐的行者，摘取皇冠上的明珠。', ability: '数字探索' },
    'I-ESFP': { title: '真理破译者·探险形态', subtitle: '真理破译者 (I) + ESFP', celebrity: '单霁翔 (故宫) / 印第安纳·琼斯', description: '为了一个关键文物，亲自深入现场，让沉睡的历史活过来。', ability: '现场考古' },

    // A型：造梦织师 (The Dream Weaver)
    'A-INFP': { title: '造梦织师·童话形态', subtitle: '造梦织师 (A) + INFP', celebrity: '几米 / J.K.罗琳', description: '在角落里，构建一个温暖又略带忧伤的童话魔法世界。', ability: '童话构建' },
    'A-INFJ': { title: '造梦织师·巨匠形态', subtitle: '造梦织师 (A) + INFJ', celebrity: '曹雪芹 / 宫崎骏', description: '耗尽心血描绘宏大的梦境，作品里藏着对人类深刻的反思。', ability: '梦境描绘' },
    'A-ENFP': { title: '造梦织师·魔术形态', subtitle: '造梦织师 (A) + ENFP', celebrity: '马云 (早期) / 华特·迪士尼', description: '把看似疯狂的梦想变成现实的乐园，让全世界一起快乐。', ability: '梦想实现' },
    'A-ENFJ': { title: '造梦织师·指挥形态', subtitle: '造梦织师 (A) + ENFJ', celebrity: '陈凯歌 / 斯皮尔伯格', description: '调动演员和观众的所有情绪，达成灵魂深处的共鸣。', ability: '情绪共鸣' },
    'A-ISFP': { title: '造梦织师·歌者形态', subtitle: '造梦织师 (A) + ISFP', celebrity: '王菲 / 迈克尔·杰克逊', description: '用极致的嗓音和灵性，定义流行文化，让世界随你空灵。', ability: '灵性定义' },
    'A-ESFP': { title: '造梦织师·名伶形态', subtitle: '造梦织师 (A) + ESFP', celebrity: '迪丽热巴 / 玛丽莲·梦露', description: '天生的表演者，每一个眼神都是戏，享受被爱包围的感觉。', ability: '表演天赋' },
    'A-ISTP': { title: '造梦织师·怪侠形态', subtitle: '造梦织师 (A) + ISTP', celebrity: '姜文 / 昆汀·塔伦蒂诺', description: '剪辑凌厉，风格霸道，打破常规，创造属于你的暴力美学。', ability: '暴力美学' },
    'A-ESTP': { title: '造梦织师·弄潮形态', subtitle: '造梦织师 (A) + ESTP', celebrity: '陈冠希 / 麦当娜', description: '不断打破禁忌，永远站在时尚的最前沿，重新定义自我。', ability: '时尚定义' },
    'A-INTJ': { title: '造梦织师·乐圣形态', subtitle: '造梦织师 (A) + INTJ', celebrity: '贝多芬 / 诺兰', description: '用严谨宏大的结构和顽强的意志，扼住命运的咽喉。', ability: '结构意志' },
    'A-ENTP': { title: '造梦织师·狂客形态', subtitle: '造梦织师 (A) + ENTP', celebrity: '徐悲鸿 / 达利', description: '融贯中西，扭曲空间，用画笔挑战人类的视觉认知极限。', ability: '视觉挑战' },
    'A-INTP': { title: '造梦织师·文豪形态', subtitle: '造梦织师 (A) + INTP', celebrity: '鲁迅 / 卡夫卡', description: '用最冷静的笔触解剖最荒诞的现实，以笔为刀。', ability: '冷静解剖' },
    'A-ENTJ': { title: '造梦织师·暴君形态', subtitle: '造梦织师 (A) + ENTJ', celebrity: '郭帆 (流浪地球) / 卡梅隆', description: '为了拍出心中的工业奇观，不惜先发明工业体系。', ability: '工业奇观' },
    'A-ISFJ': { title: '造梦织师·传人形态', subtitle: '造梦织师 (A) + ISFJ', celebrity: '李子柒 / 匠人精神', description: '用一生守护田园与手艺，在时光流逝中展现东方的优雅。', ability: '文化守护' },
    'A-ISTJ': { title: '造梦织师·律动形态', subtitle: '造梦织师 (A) + ISTJ', celebrity: '林夕 / 巴赫', description: '创作像数学公式一样完美、对称、押韵的词曲建筑。', ability: '词曲建筑' },
    'A-ESFJ': { title: '造梦织师·司仪形态', subtitle: '造梦织师 (A) + ESFJ', celebrity: '何炅 / 奥普拉', description: '关注每一个细节，照顾每一个嘉宾的情绪，制造完美的舞台。', ability: '舞台制造' },
    'A-ESTJ': { title: '造梦织师·制片形态', subtitle: '造梦织师 (A) + ESTJ', celebrity: '邵逸夫 / 默多克', description: '建立庞大的娱乐帝国，将艺术家的作品推向市场。', ability: '娱乐帝国' },

    // S型：光之守护者 (The Guardian)
    'S-ENFJ': { title: '光之守护者·国父形态', subtitle: '光之守护者 (S) + ENFJ', celebrity: '孙中山 / 马丁·路德·金', description: '用梦想的演说唤醒人们的良知，发起改变历史的社会变革。', ability: '社会变革' },
    'S-INFJ': { title: '光之守护者·高僧形态', subtitle: '光之守护者 (S) + INFJ', celebrity: '玄奘法师 / 甘地', description: '用沉默和苦行，展现比武器更强大的精神信仰力量。', ability: '精神信仰' },
    'S-ENFP': { title: '光之守护者·捕手形态', subtitle: '光之守护者 (S) + ENFP', celebrity: '贾玲 / 罗宾·威廉姆斯', description: '用幽默治愈悲伤，让抑郁的人在笑声中看到希望。', ability: '幽默治愈' },
    'S-INFP': { title: '光之守护者·天使形态', subtitle: '光之守护者 (S) + INFP', celebrity: '林徽因 / 戴安娜王妃', description: '用才情与真诚的拥抱，去关怀被遗忘的弱者与美。', ability: '真诚关怀' },
    'S-ESFJ': { title: '光之守护者·慈母形态', subtitle: '光之守护者 (S) + ESFJ', celebrity: '张桂梅 / 特蕾莎修女', description: '在贫困山区点亮女孩的梦想，用具体的行动践行无条件的爱。', ability: '无私奉献' },
    'S-ISFJ': { title: '光之守护者·螺钉形态', subtitle: '光之守护者 (S) + ISFJ', celebrity: '雷锋 / 南丁格尔', description: '做一颗永不生锈的螺丝钉，细致入微地温暖身边的人。', ability: '细致温暖' },
    'S-ESTJ': { title: '光之守护者·谏官形态', subtitle: '光之守护者 (S) + ESTJ', celebrity: '魏征 / 严厉教导主任', description: '用严厉的方式纠正错误，建立规则，其实是为了保护国家的未来。', ability: '规则建立' },
    'S-ISTJ': { title: '光之守护者·判官形态', subtitle: '光之守护者 (S) + ISTJ', celebrity: '包拯 / 金斯伯格大法官', description: '铁面无私，通过一丝不苟地维护法律程序，来保护正义。', ability: '正义维护' },
    'S-ENTJ': { title: '光之守护者·校长形态', subtitle: '光之守护者 (S) + ENTJ', celebrity: '蔡元培 / 邓布利多', description: '兼容并包，建立更好的教育体系，改变更多人的命运。', ability: '教育体系' },
    'S-INTJ': { title: '光之守护者·夫子形态', subtitle: '光之守护者 (S) + INTJ', celebrity: '曾国藩 / 弗洛伊德', description: '冷静地剖析人性，为了修身齐家或治愈精神的顽疾。', ability: '人性剖析' },
    'S-ENTP': { title: '光之守护者·刑辩形态', subtitle: '光之守护者 (S) + ENTP', celebrity: '罗翔 / 苏格拉底', description: '用幽默的段子和发问，启蒙大众的法治精神与良知。', ability: '法治启蒙' },
    'S-INTP': { title: '光之守护者·圣哲形态', subtitle: '光之守护者 (S) + INTP', celebrity: '王阳明 / 康德', description: '龙场悟道，用纯粹理性推导出内心的良知与道德律令。', ability: '理性推导' },
    'S-ESFP': { title: '光之守护者·大使形态', subtitle: '光之守护者 (S) + ESFP', celebrity: '韩红 / 安吉丽娜·朱莉', description: '利用自己的名气筹款，亲自带领车队去灾区发物资。', ability: '名气筹款' },
    'S-ISFP': { title: '光之守护者·守护形态', subtitle: '光之守护者 (S) + ISFP', celebrity: '奚志农 (野性中国) / 珍·古道尔', description: '只身前往深山保护金丝猴，用影像表达对万物的爱。', ability: '影像表达' },
    'S-ESTP': { title: '光之守护者·救援形态', subtitle: '光之守护者 (S) + ESTP', celebrity: '重庆摩托骑士 / 消防队长', description: '在山火灾难现场冲在最前面，用身体和勇气守护家园。', ability: '勇气守护' },
    'S-ISTP': { title: '光之守护者·军医形态', subtitle: '光之守护者 (S) + ISTP', celebrity: '白求恩 / 无国界医生', description: '在枪林弹雨中做手术，技术高超且冷静，守护生命防线。', ability: '生命守护' },

    // E型：荣耀统帅 (The Commander)
    'E-ENTJ': { title: '荣耀统帅·始皇形态', subtitle: '荣耀统帅 (E) + ENTJ', celebrity: '秦始皇 / 拿破仑', description: '拥有宏大的蓝图和铁腕手段，书同文车同轨，建立秩序。', ability: '秩序建立' },
    'E-INTJ': { title: '荣耀统帅·主脑形态', subtitle: '荣耀统帅 (E) + INTJ', celebrity: '张一鸣 / 扎克伯格', description: '不一定站在台前，但整个算法推荐的底层逻辑都是你定的。', ability: '算法逻辑' },
    'E-ENTP': { title: '荣耀统帅·纵横形态', subtitle: '荣耀统帅 (E) + ENTP', celebrity: '罗永浩 / 乔布斯', description: '用现实扭曲力场和发布会，让所有人相信理想主义能赚钱。', ability: '现实扭曲' },
    'E-INTP': { title: '荣耀统帅·拓荒形态', subtitle: '荣耀统帅 (E) + INTP', celebrity: '王坚 (阿里云) / 拉里·佩奇', description: '顶住骂名坚持研发云计算，用技术优势改变商业规则。', ability: '技术拓荒' },
    'E-ESTP': { title: '荣耀统帅·战将形态', subtitle: '荣耀统帅 (E) + ESTP', celebrity: '李云龙 / 巴顿将军', description: '充满攻击性，直觉敏锐，狭路相逢勇者胜，为胜利而生。', ability: '敏锐直觉' },
    'E-ESFP': { title: '荣耀统帅·玩家形态', subtitle: '荣耀统帅 (E) + ESFP', celebrity: '史玉柱 / 理查德·布兰森', description: '大起大落，敢于豪赌，把商业变成一场精彩的翻身仗。', ability: '商业博弈' },
    'E-ISTP': { title: '荣耀统帅·硬汉形态', subtitle: '荣耀统帅 (E) + ISTP', celebrity: '刘强东 / 普京', description: '出身草莽，话不多，但在关键时刻敢于冲锋，掌控全场。', ability: '掌控全场' },
    'E-ISFP': { title: '荣耀统帅·风雅形态', subtitle: '荣耀统帅 (E) + ISFP', celebrity: '宋徽宗 / 老佛爷', description: '用个人的极致品味和风雅，定义整个时代的审美标准。', ability: '审美定义' },
    'E-ESTJ': { title: '荣耀统帅·掌柜形态', subtitle: '荣耀统帅 (E) + ESTJ', celebrity: '曹德旺 / 洛克菲勒', description: '建立标准、控制成本，用极度的理性与秩序构建玻璃帝国。', ability: '理性秩序' },
    'E-ISTJ': { title: '荣耀统帅·堡垒形态', subtitle: '荣耀统帅 (E) + ISTJ', celebrity: '任正非 / 贝佐斯', description: '注重细节和长远规划，忍受孤独，构建长期主义的堡垒。', ability: '长期主义' },
    'E-ESFJ': { title: '荣耀统帅·铁娘子形态', subtitle: '荣耀统帅 (E) + ESFJ', celebrity: '董明珠 / 撒切尔夫人', description: '走过的路不长草，建立庞大的销售铁军，令行禁止。', ability: '销售铁军' },
    'E-ISFJ': { title: '荣耀统帅·掌事形态', subtitle: '荣耀统帅 (E) + ISFJ', celebrity: '王熙凤 / 英女王', description: '用精明和隐忍，维持整个大家族的体面，成为精神象征。', ability: '精神象征' },
    'E-ENFJ': { title: '荣耀统帅·名嘴形态', subtitle: '荣耀统帅 (E) + ENFJ', celebrity: '撒贝宁 / 奥巴马', description: '用才华和演说感染观众，即使是综艺也能控场，全能ACE。', ability: '演说感染' },
    'E-ENFP': { title: '荣耀统帅·演说形态', subtitle: '荣耀统帅 (E) + ENFP', celebrity: '俞敏洪 / 马丁·路德·金', description: '在绝望中寻找希望，用奋斗的故事激励一代人跟随。', ability: '奋斗激励' },
    'E-INFJ': { title: '荣耀统帅·精神形态', subtitle: '荣耀统帅 (E) + INFJ', celebrity: '唐僧 / 曼德拉', description: '虽然手无缚鸡之力，但信念最坚定，是团队的精神支柱。', ability: '信念坚定' },
    'E-INFP': { title: '荣耀统帅·旗帜形态', subtitle: '荣耀统帅 (E) + INFP', celebrity: '花木兰 / 圣女贞德', description: '虽柔弱，但为了家国信念敢于替父从军，成为激励全军的旗帜。', ability: '家国信念' },

    // C型：秩序架构师 (The Architect)
    'C-ISTJ': { title: '秩序架构师·账房形态', subtitle: '秩序架构师 (C) + ISTJ', celebrity: '李嘉诚 / 巴菲特', description: '只看数据和现金流，坚持原则，几十年如一日地滚雪球。', ability: '原则坚持' },
    'C-ESTJ': { title: '秩序架构师·链条形态', subtitle: '秩序架构师 (C) + ESTJ', celebrity: '蒂姆·库克', description: '把供应链库存控制到极致，每一分钱、每一秒钟都算清楚。', ability: '极致控制' },
    'C-ISFJ': { title: '秩序架构师·丞相形态', subtitle: '秩序架构师 (C) + ISFJ', celebrity: '诸葛亮 (内政) / 赫敏', description: '鞠躬尽瘁，处理所有繁杂政务，是团队最靠谱的后盾。', ability: '政务处理' },
    'C-ESFJ': { title: '秩序架构师·枢纽形态', subtitle: '秩序架构师 (C) + ESFJ', celebrity: '杨澜 / 金牌董秘', description: '既维护规则，又照顾人情，让庞大的机构运转顺畅。', ability: '枢纽运转' },
    'C-INTJ': { title: '秩序架构师·宰相形态', subtitle: '秩序架构师 (C) + INTJ', celebrity: '管仲 / 凯恩斯', description: '设计宏观经济模型，用一双看不见的手调控整个国家。', ability: '宏观调控' },
    'C-INTP': { title: '秩序架构师·去中形态', subtitle: '秩序架构师 (C) + INTP', celebrity: '中本聪', description: '用代码建立无需信任的完美契约系统，重构信任。', ability: '代码契约' },
    'C-ENTJ': { title: '秩序架构师·谋士形态', subtitle: '秩序架构师 (C) + ENTJ', celebrity: '刘润 (顾问) / 麦肯锡', description: '制定战略，大刀阔斧地砍掉冗余流程，重建高效秩序。', ability: '战略制定' },
    'C-ENTP': { title: '秩序架构师·操盘形态', subtitle: '秩序架构师 (C) + ENTP', celebrity: '段永平 / 查理·芒格', description: '敏锐地发现价值的低估或漏洞，利用极度理性的认知获利。', ability: '理性认知' },
    'C-ISTP': { title: '秩序架构师·斥候形态', subtitle: '秩序架构师 (C) + ISTP', celebrity: 'TK教主 (黑客) / 斯诺登', description: '熟悉网络协议的所有后门，在数据流中维护自由与安全。', ability: '安全维护' },
    'C-ESTP': { title: '秩序架构师·猎手形态', subtitle: '秩序架构师 (C) + ESTP', celebrity: '《繁花》宝总 / 孙正义', description: '在资本市场的剧烈波动中，以惊人的胆魄快进快出，攫取胜利。', ability: '胆魄博弈' },
    'C-ISFP': { title: '秩序架构师·美工形态', subtitle: '秩序架构师 (C) + ISFP', celebrity: '罗永浩 (UI) / 乔纳森·伊夫', description: '让冰冷的数据系统变得美观、易用，赋予秩序以美感。', ability: '美感赋予' },
    'C-ESFP': { title: '秩序架构师·说书形态', subtitle: '秩序架构师 (C) + ESFP', celebrity: '南派三叔 / 汉斯·罗斯林', description: '构建复杂的笔记和时间线，把枯燥的数据变成生动的故事。', ability: '故事构建' },
    'C-INFJ': { title: '秩序架构师·太史形态', subtitle: '秩序架构师 (C) + INFJ', celebrity: '季羡林 / 博尔赫斯', description: '在寂静中分类、保存人类的文化火种，守护文明的秩序。', ability: '文化守护' },
    'C-ENFJ': { title: '秩序架构师·吏部形态', subtitle: '秩序架构师 (C) + ENFJ', celebrity: '彭蕾 (阿里CPO) / 桑德伯格', description: '设计价值观和组织架构，为了让每个人发挥最大潜能。', ability: '组织设计' },
    'C-INFP': { title: '秩序架构师·修补形态', subtitle: '秩序架构师 (C) + INFP', celebrity: '樊锦诗 (敦煌) / 记忆缝补者', description: '在戈壁大漠里，建立数字化档案，让千年的文明永存。', ability: '文明修补' },
    'C-ENFP': { title: '秩序架构师·编导形态', subtitle: '秩序架构师 (C) + ENFP', celebrity: '马东 (米未) / 凯文·费奇', description: '在混乱的综艺制作中，建立流程，持续输出快乐。', ability: '流程建立' }
};

// 获取英雄原型
export const getHeroArchetype = (riasec: string, mbti: string): HeroArchetype => {
  const key = `${riasec}-${mbti}`;
  
  // 如果有精确匹配，返回精确匹配
  if (HERO_ARCHETYPES[key]) {
    return HERO_ARCHETYPES[key];
  }
  
  // 否则返回该RIASEC类型的第一个默认英雄
  const defaultKeys = Object.keys(HERO_ARCHETYPES).filter(k => k.startsWith(`${riasec}-`));
  if (defaultKeys.length > 0) {
    return HERO_ARCHETYPES[defaultKeys[0]];
  }
  
  // 兜底：返回R-ESTJ
  return HERO_ARCHETYPES['R-ESTJ'];
};

// 获取英雄代码
export const getHeroCode = (riasec: string, mbti: string): string => {
  return `${riasec}-${mbti}`;
};
