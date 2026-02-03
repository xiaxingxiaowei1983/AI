#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
大六壬预测脚本 - 宗师版
基于《六壬毕法赋》《大六壬指南》等经典典籍
实现完整的三传四课、神煞推断、毕法赋智能索引、现代决策算法映射
"""

import json
import argparse
import sys
from typing import Dict, List, Tuple, Optional

try:
    from lunar_python import Solar, Lunar
except ImportError:
    print("错误：未安装lunar-python库")
    print("请执行：pip install lunar-python==1.4.8")
    sys.exit(1)


# ============================================================================
# Phase 1: 基础公理 (Axioms)
# ============================================================================

# 天干列表
GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

# 地支列表（1-12）
ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

# 地支索引（名称->数字）
ZHI_INDEX = {z: i+1 for i, z in enumerate(ZHI)}
ZHI_FROM_INDEX = {i+1: z for i, z in enumerate(ZHI)}

# 五行生克
WUXING = {
    '水': {'克': ['火', 2, 7], '被克': ['土', 5, 10], '生': ['木', 3, 8], '被生': ['金', 4, 9]},
    '火': {'克': ['金', 4, 9], '被克': ['水', 1, 6], '生': ['土', 5, 10], '被生': ['木', 3, 8]},
    '金': {'克': ['木', 3, 8], '被克': ['火', 2, 7], '生': ['水', 1, 6], '被生': ['土', 5, 10]},
    '木': {'克': ['土', 5, 10], '被克': ['金', 4, 9], '生': ['火', 2, 7], '被生': ['水', 1, 6]},
    '土': {'克': ['水', 1, 6], '被克': ['木', 3, 8], '生': ['金', 4, 9], '被生': ['火', 2, 7]}
}

# 天干五行
GAN_WUXING = {
    '甲': '木', '乙': '木', '丙': '火', '丁': '火',
    '戊': '土', '己': '土', '庚': '金', '辛': '金',
    '壬': '水', '癸': '水'
}

# 地支五行
ZHI_WUXING = {
    '子': '水', '丑': '土', '寅': '木', '卯': '木',
    '辰': '土', '巳': '火', '午': '火', '未': '土',
    '申': '金', '酉': '金', '戌': '土', '亥': '水'
}

# 十干寄宫（严格校验表）
JI_GONG = {
    '甲': '寅', '乙': '辰',
    '丙': '巳', '丁': '未',
    '戊': '巳', '己': '未',
    '庚': '申', '辛': '戌',
    '壬': '亥', '癸': '丑'
}

# 地支六合
LIU_HE = {
    '子': '丑', '丑': '子',
    '寅': '亥', '亥': '寅',
    '卯': '戌', '戌': '卯',
    '辰': '酉', '酉': '辰',
    '巳': '申', '申': '巳',
    '午': '未', '未': '午'
}

# 地支三合
SAN_HE = {
    '子': ('卯', '辰'),  # 水三合
    '寅': ('午', '戌'),  # 火三合
    '辰': ('申', '子'),  # 水三合
    '巳': ('酉', '丑'),  # 金三合
    '午': ('寅', '戌'),  # 火三合
    '申': ('巳', '丑'),  # 金三合
    '亥': ('卯', '未')   # 木三合
}

# 地支三刑
SAN_XING = {
    '子': ('卯', '辰'),  # 无礼之刑
    '寅': ('巳', '申'),  # 无恩之刑
    '巳': ('寅', '申'),  # 无恩之刑
    '申': ('寅', '巳'),  # 无恩之刑
    '丑': ('未', '戌'),  # 恃势之刑
    '未': ('丑', '戌'),  # 恃势之刑
    '戌': ('丑', '未'),  # 恃势之刑
    '辰': ('辰', '辰'),  # 自刑
    '午': ('午', '午'),  # 自刑
    '酉': ('酉', '酉')   # 自刑
}

# 六阳地支
LIU_YANG = ['子', '寅', '辰', '午', '申', '戌']

# 六阴地支
LIU_YIN = ['丑', '卯', '巳', '未', '酉', '亥']

# 驿马
YI_MA = {
    '寅': '午', '午': '寅', '戌': '申',
    '申': '子', '子': '辰', '辰': '申',
    '巳': '酉', '酉': '巳', '丑': '亥',
    '亥': '卯', '卯': '未', '未': '丑'
}

# 十二天将
TWELVE_GENERALS = ['贵人', '螣蛇', '朱雀', '六合', '勾陈', '青龙',
                   '天空', '白虎', '太常', '玄武', '太阴', '天后']

# 十二将所主
GENERAL_MEANING = {
    '贵人': '吉神、贵人提携、解灾',
    '螣蛇': '惊恐、怪异、火烛',
    '朱雀': '文书、口舌、是非',
    '六合': '合作、婚姻、中介',
    '勾陈': '迟滞、牵连、争斗',
    '青龙': '财帛、喜庆、进财',
    '天空': '虚伪、欺诈、空言',
    '白虎': '凶灾、疾病、血光',
    '太常': '酒食、宴会、赐予',
    '玄武': '盗贼、暗昧、失脱',
    '太阴': '隐匿、女人、财物',
    '天后': '女人、恩泽、财物'
}


# ============================================================================
# 辅助函数
# ============================================================================

def get_zhi_index(zhi: str) -> int:
    """获取地支索引（1-12）"""
    return ZHI_INDEX.get(zhi, 0)


def get_zhi_from_index(idx: int) -> str:
    """根据索引获取地支"""
    idx = (idx - 1) % 12 + 1
    return ZHI_FROM_INDEX.get(idx, '')


def get_wuxing(gan_or_zhi: str) -> str:
    """获取天干或地支的五行"""
    if gan_or_zhi in GAN_WUXING:
        return GAN_WUXING[gan_or_zhi]
    elif gan_or_zhi in ZHI_WUXING:
        return ZHI_WUXING[gan_or_zhi]
    return '未知'


def check_ke(ke_gan_or_zhi: str, bei_ke_gan_or_zhi: str) -> bool:
    """检查五行相克关系"""
    ke_wuxing = get_wuxing(ke_gan_or_zhi)
    bei_ke_wuxing = get_wuxing(bei_ke_gan_or_zhi)
    if ke_wuxing in WUXING:
        targets = WUXING[ke_wuxing].get('克', [])
        return bei_ke_wuxing in targets or bei_ke_wuxing in targets[1:]
    return False


def check_sheng(sheng_gan_or_zhi: str, bei_sheng_gan_or_zhi: str) -> bool:
    """检查五行相生关系"""
    sheng_wuxing = get_wuxing(sheng_gan_or_zhi)
    bei_sheng_wuxing = get_wuxing(bei_sheng_gan_or_zhi)
    if sheng_wuxing in WUXING:
        targets = WUXING[sheng_wuxing].get('生', [])
        return bei_sheng_wuxing in targets or bei_sheng_wuxing in targets[1:]
    return False


def is_yang_gan(gan: str) -> bool:
    """判断是否为阳干"""
    return gan in ['甲', '丙', '戊', '庚', '壬']


def is_yin_gan(gan: str) -> bool:
    """判断是否为阴干"""
    return gan in ['乙', '丁', '己', '辛', '癸']


def get_yin_yang(zhi: str) -> str:
    """获取地支的阴阳属性"""
    if zhi in LIU_YANG:
        return '阳'
    elif zhi in LIU_YIN:
        return '阴'
    return '未知'


# ============================================================================
# Phase 1: 天地盘定位
# ============================================================================

def calc_tianpan_shift(yue_jiang_zhi: str, zhan_shi_zhi: str) -> int:
    """
    计算天地盘位移（Shift = 月将索引 - 占时索引）

    Args:
        yue_jiang_zhi: 月将地支
        zhan_shi_zhi: 占时地支

    Returns:
        int: 位移值（-11 到 +11）
    """
    yj_idx = get_zhi_index(yue_jiang_zhi)
    zs_idx = get_zhi_index(zhan_shi_zhi)
    shift = yj_idx - zs_idx

    # 归一化到 -11 到 +11
    if shift > 6:
        shift -= 12
    elif shift < -6:
        shift += 12

    return shift


def get_tianpan(di_pan_zhi: str, shift: int) -> str:
    """
    根据地盘和位移计算天盘
    天盘 = (地盘 + Shift)

    Args:
        di_pan_zhi: 地盘地支
        shift: 位移值

    Returns:
        str: 天盘地支
    """
    idx = get_zhi_index(di_pan_zhi)
    new_idx = idx + shift

    # 处理循环
    while new_idx > 12:
        new_idx -= 12
    while new_idx < 1:
        new_idx += 12

    return get_zhi_from_index(new_idx)


def verify_shift(yue_jiang_zhi: str, zhan_shi_zhi: str, shift: int) -> bool:
    """
    强制验证位移计算是否正确

    Args:
        yue_jiang_zhi: 月将地支
        zhan_shi_zhi: 占时地支
        shift: 计算出的位移值

    Returns:
        bool: 验证是否通过
    """
    # 验证：地盘子(1)+shift 是否等于 月将
    zi_idx = 1
    expected_tianpan = zi_idx + shift

    while expected_tianpan > 12:
        expected_tianpan -= 12
    while expected_tianpan < 1:
        expected_tianpan += 12

    yj_idx = get_zhi_index(yue_jiang_zhi)

    return expected_tianpan == yj_idx


# ============================================================================
# Phase 1: 起四课
# ============================================================================

def qi_si_ke(day_gan: str, day_zhi: str, yue_jiang_zhi: str, zhan_shi_zhi: str) -> List[Dict]:
    """
    起四课

    Args:
        day_gan: 日干
        day_zhi: 日支
        yue_jiang_zhi: 月将地支
        zhan_shi_zhi: 占时地支

    Returns:
        List[Dict]: 四课列表
    """
    shift = calc_tianpan_shift(yue_jiang_zhi, zhan_shi_zhi)

    # 验证位移
    if not verify_shift(yue_jiang_zhi, zhan_shi_zhi, shift):
        print(f"警告：位移验证失败 shift={shift}")

    # 日干寄宫
    gan_ji = JI_GONG[day_gan]

    # 一课(干阳)：地盘=[日干寄宫]，天盘=[地盘+Shift]
    ti_yi = get_tianpan(gan_ji, shift)

    # 二课(干阴)：地盘=[一课天盘]，天盘=[地盘+Shift]
    di_er = ti_yi
    tian_er = get_tianpan(di_er, shift)

    # 三课(支阳)：地盘=[日支]，天盘=[地盘+Shift]
    di_san = day_zhi
    tian_san = get_tianpan(di_san, shift)

    # 四课(支阴)：地盘=[三课天盘]，天盘=[地盘+Shift]
    di_si = tian_san
    tian_si = get_tianpan(di_si, shift)

    si_ke = [
        {'name': '一课(干阳)', 'di_pan': gan_ji, 'tian_pan': ti_yi},
        {'name': '二课(干阴)', 'di_pan': di_er, 'tian_pan': tian_er},
        {'name': '三课(支阳)', 'di_pan': di_san, 'tian_pan': tian_san},
        {'name': '四课(支阴)', 'di_pan': di_si, 'tian_pan': tian_si}
    ]

    return si_ke


# ============================================================================
# Phase 1: 发三传与课体识别（熔断机制）
# ============================================================================

def fa_san_chuan(day_gan: str, day_zhi: str, si_ke: List[Dict], yue_jiang_zhi: str, zhan_shi_zhi: str) -> Tuple[List[Dict], str, str]:
    """
    发三传与课体识别（熔断机制）

    Args:
        day_gan: 日干
        day_zhi: 日支
        si_ke: 四课
        yue_jiang_zhi: 月将地支
        zhan_shi_zhi: 占时地支

    Returns:
        Tuple[List[Dict], str, str]: (三传, 课体名, 警告信息)
    """
    shift = calc_tianpan_shift(yue_jiang_zhi, zhan_shi_zhi)

    # === 路径 A: 伏吟/返吟 (特殊局) ===
    if shift == 0:
        # 伏吟熔断
        # 依古法，有克取克；无克取"刑"
        # 简法处理：刚日取日干上神，柔日取日支上神发用
        if is_yang_gan(day_gan):
            chu_chuan = si_ke[0]['tian_pan']  # 刚日取日干上神
        else:
            chu_chuan = si_ke[2]['tian_pan']  # 柔日取日支上神

        # 中传、末传顺行
        chu_idx = get_zhi_index(chu_chuan)
        zhong_idx = chu_idx + 1
        mo_idx = chu_idx + 2

        return (
            [
                {'name': '初传', 'zhi': get_zhi_from_index(chu_idx)},
                {'name': '中传', 'zhi': get_zhi_from_index(zhong_idx)},
                {'name': '末传', 'zhi': get_zhi_from_index(mo_idx)}
            ],
            '伏吟',
            '此局为伏吟，依简法取传。'
        )

    elif shift == 6:
        # 返吟熔断
        # 取驿马发用（简法）
        gan_ji = JI_GONG[day_gan]
        chu_chuan = YI_MA.get(gan_ji, gan_ji)

        chu_idx = get_zhi_index(chu_chuan)
        zhong_idx = chu_idx + 1
        mo_idx = chu_idx + 2

        return (
            [
                {'name': '初传', 'zhi': get_zhi_from_index(chu_idx)},
                {'name': '中传', 'zhi': get_zhi_from_index(zhong_idx)},
                {'name': '末传', 'zhi': get_zhi_from_index(mo_idx)}
            ],
            '返吟',
            '此局为返吟，依简法取驿马发用。'
        )

    # === 路径 B: 贼克法 (常规局) ===
    # 统计四课中的"下贼上"(Zei) 和 "上克下"(Ke)
    zei_list = []   # 下贼上
    ke_list = []    # 上克下

    for i, ke in enumerate(si_ke):
        di_pan = ke['di_pan']
        tian_pan = ke['tian_pan']

        # 检查下贼上（地支克天盘）
        if check_ke(di_pan, tian_pan):
            zei_list.append((i, ke))

        # 检查上克下（天盘克地支）
        if check_ke(tian_pan, di_pan):
            ke_list.append((i, ke))

    # 情况 B1: 重审 (Single Zei) -> 仅有1个下贼上
    if len(zei_list) == 1:
        chu_chuan = zei_list[0][1]['tian_pan']
        zhong_chuan = get_tianpan(chu_chuan, 1)
        mo_chuan = get_tianpan(zhong_chuan, 1)

        return (
            [
                {'name': '初传', 'zhi': chu_chuan},
                {'name': '中传', 'zhi': zhong_chuan},
                {'name': '末传', 'zhi': mo_chuan}
            ],
            '重审',
            ''
        )

    # 情况 B2: 元首 (Single Ke) -> 无下贼上，仅有1个上克下
    if len(zei_list) == 0 and len(ke_list) == 1:
        chu_chuan = ke_list[0][1]['tian_pan']
        zhong_chuan = get_tianpan(chu_chuan, 1)
        mo_chuan = get_tianpan(zhong_chuan, 1)

        return (
            [
                {'name': '初传', 'zhi': chu_chuan},
                {'name': '中传', 'zhi': zhong_chuan},
                {'name': '末传', 'zhi': mo_chuan}
            ],
            '元首',
            ''
        )

    # 情况 B3: 比用 (Multi Zei) -> 有2-3个下贼上
    if len(zei_list) >= 2:
        # 简法：取与日干阴阳属性相同者
        if is_yang_gan(day_gan):
            # 阳日取阳神
            for idx, ke in zei_list:
                if get_yin_yang(ke['tian_pan']) == '阳':
                    chu_chuan = ke['tian_pan']
                    break
            else:
                chu_chuan = zei_list[0][1]['tian_pan']
        else:
            # 阴日取阴神
            for idx, ke in zei_list:
                if get_yin_yang(ke['tian_pan']) == '阴':
                    chu_chuan = ke['tian_pan']
                    break
            else:
                chu_chuan = zei_list[0][1]['tian_pan']

        zhong_chuan = get_tianpan(chu_chuan, 1)
        mo_chuan = get_tianpan(zhong_chuan, 1)

        return (
            [
                {'name': '初传', 'zhi': chu_chuan},
                {'name': '中传', 'zhi': zhong_chuan},
                {'name': '末传', 'zhi': mo_chuan}
            ],
            '比用(熔断)',
            '此局涉比用，依简法取与日干阴阳相同者为初传。'
        )

    # 情况 B4: 知一 (Multi Ke) -> 无下贼上，有2-3个上克下
    if len(zei_list) == 0 and len(ke_list) >= 2:
        # 简法：取与日干阴阳属性相同者
        if is_yang_gan(day_gan):
            # 阳日取阳神
            for idx, ke in ke_list:
                if get_yin_yang(ke['tian_pan']) == '阳':
                    chu_chuan = ke['tian_pan']
                    break
            else:
                chu_chuan = ke_list[0][1]['tian_pan']
        else:
            # 阴日取阴神
            for idx, ke in ke_list:
                if get_yin_yang(ke['tian_pan']) == '阴':
                    chu_chuan = ke['tian_pan']
                    break
            else:
                chu_chuan = ke_list[0][1]['tian_pan']

        zhong_chuan = get_tianpan(chu_chuan, 1)
        mo_chuan = get_tianpan(zhong_chuan, 1)

        return (
            [
                {'name': '初传', 'zhi': chu_chuan},
                {'name': '中传', 'zhi': zhong_chuan},
                {'name': '末传', 'zhi': mo_chuan}
            ],
            '知一(熔断)',
            '此局涉知一，依简法取与日干阴阳相同者为初传。'
        )

    # === 路径 C: 涉害/无克 (复杂局) ===
    # 简法取第一课上神（日干上神）为初传
    chu_chuan = si_ke[0]['tian_pan']
    zhong_chuan = get_tianpan(chu_chuan, 1)
    mo_chuan = get_tianpan(zhong_chuan, 1)

    return (
        [
            {'name': '初传', 'zhi': chu_chuan},
            {'name': '中传', 'zhi': zhong_chuan},
            {'name': '末传', 'zhi': mo_chuan}
        ],
        '涉害(熔断)',
        '此局涉害/无克，依古法简例取传，定数请结合专业排盘复核。'
    )


# ============================================================================
# Phase 2: 毕法赋智能索引
# ============================================================================

# 毕法赋100条口诀
BI_FA_FU = {
    1: {'name': '前后引从升迁吉', 'type': '结构', 'desc': '初传在日干前一位为"引"，末传在日干后一位为"从"。贵人提携，升迁之象。'},
    2: {'name': '首尾相见始终宜', 'type': '结构', 'desc': '初末传相同或相合。有始有终，利合作。'},
    3: {'name': '帘幕贵人高甲第', 'type': '神煞', 'desc': '昼夜贵人交互。科举高中、仕途升迁。'},
    4: {'name': '催官使者赴官期', 'type': '神煞', 'desc': '日鬼乘白虎加临日干或年命。赴任催官。'},
    5: {'name': '六阳数足须公用', 'type': '结构', 'desc': '课传皆居六阳之位。公事有利，私谋不利。'},
    6: {'name': '六阴相继尽昏迷', 'type': '结构', 'desc': '课传皆居六阴之位。私谋虽吉，公事不利。'},
    7: {'name': '旺禄临身徒妄作', 'type': '干支', 'desc': '日禄临日干且不空亡。位高权重，守成大吉，妄动招灾。'},
    8: {'name': '权摄不正禄临支', 'type': '干支', 'desc': '禄神加临支辰。受屈于他人，权位不正。'},
    9: {'name': '避难逃生须弃旧', 'type': '结构', 'desc': '三传无益，惟干上逢吉神。弃旧从新，避凶趋吉。'},
    10: {'name': '朽木难雕别作为', 'type': '干支', 'desc': '卯为空亡或受克。事难成，宜改业别谋。'},
    11: {'name': '众鬼虽彰全不畏', 'type': '神煞', 'desc': '三传皆为日鬼，但有吉神制化。鬼不克身，终无大害。'},
    12: {'name': '虽忧狐假虎威仪', 'type': '干支', 'desc': '日干受克，但支神能制克我者。借他力护身。'},
    13: {'name': '鬼贼当时无畏忌', 'type': '神煞', 'desc': '日鬼旺于令但贪旺不克。暂时无忧，防后患。'},
    14: {'name': '传财太旺反财亏', 'type': '干支', 'desc': '财神太旺，身弱不能胜。反主破财。'},
    15: {'name': '脱上逢脱防虚诈', 'type': '干支', 'desc': '日干生上神，上神再生天将。脱耗重重，主虚诈、被骗。'},
    16: {'name': '空上乘空事莫追', 'type': '神煞', 'desc': '空亡上神又乘空亡。事无实据，不宜追查。'},
    17: {'name': '进茹空亡宜退步', 'type': '结构', 'desc': '初传空亡，中末亦空。宜退守不宜进谋。'},
    18: {'name': '踏脚空亡进用宜', 'type': '结构', 'desc': '初传不空，末传空亡。宜进取，终能化解。'},
    19: {'name': '胎财生气妻怀孕', 'type': '神煞', 'desc': '胎神乘生气。妻有孕，得子之象。'},
    20: {'name': '胎财死气损胎推', 'type': '神煞', 'desc': '胎神作死气。胎孕不保，有损。'},
    21: {'name': '交车相合交关利', 'type': '干支', 'desc': '干支交互生合。交易、合作、关说顺利。'},
    22: {'name': '上下皆合两心齐', 'type': '干支', 'desc': '支干上神、地盘皆合。同心协力，合作无间。'},
    23: {'name': '彼求我事支传干', 'type': '结构', 'desc': '初传起于支上，末传归于干上。他人托我办事。'},
    24: {'name': '我求彼事干传支', 'type': '结构', 'desc': '初传起于干上，末传归于支上。我求他人。'},
    25: {'name': '金日逢丁凶祸动', 'type': '神煞', 'desc': '金日见"丁"或"午"(丁寄宫)。突发凶灾、官非、变动。'},
    26: {'name': '水日逢丁财动之', 'type': '神煞', 'desc': '水日见"丁"或"午"(丁寄宫)。进财机遇，变动生财。'},
    27: {'name': '传财化鬼财休觅', 'type': '干支', 'desc': '三传化财为鬼。财反致祸，不宜求财。'},
    28: {'name': '传鬼化财钱险危', 'type': '干支', 'desc': '三传化鬼为财。得财亦险，恐有后患。'},
    29: {'name': '眷属丰盈居狭宅', 'type': '干支', 'desc': '人多宅窄。家庭和睦但空间不足。'},
    30: {'name': '屋宅宽广致人衰', 'type': '干支', 'desc': '宅广人稀。家道衰败，人气不旺。'},
    31: {'name': '三传递生人举荐', 'type': '结构', 'desc': '三传递生。得人举荐，仕途顺达。'},
    32: {'name': '三传互克众人欺', 'type': '结构', 'desc': '三传互克。受人排挤，众人欺凌。'},
    33: {'name': '有始无终难变易', 'type': '结构', 'desc': '初吉末凶。事难有终，守旧为宜。'},
    34: {'name': '苦去甘来乐里悲', 'type': '结构', 'desc': '初凶末吉。苦尽甘来，但乐中有悲。'},
    35: {'name': '人宅受脱俱招盗', 'type': '干支', 'desc': '干支皆受脱气。被盗、失财。'},
    36: {'name': '干支皆败事倾颓', 'type': '干支', 'desc': '干支上神皆败。事败、家道中落。'},
    37: {'name': '末助初兮三等论', 'type': '结构', 'desc': '末传助初传。事后得力。'},
    38: {'name': '闭口卦体两般推', 'type': '神煞', 'desc': '旬尾加旬首。事有隐瞒，不敢言或不能言。'},
    39: {'name': '太阳照武宜擒贼', 'type': '神煞', 'desc': '太阳加武职。擒贼获盗，官事得理。'},
    40: {'name': '后合占婚岂用媒', 'type': '干支', 'desc': '支干后合。占婚自然成，无需媒人。'},
    41: {'name': '富贵干支逢禄马', 'type': '神煞', 'desc': '干支逢禄马贵人。富贵、仕途高升。'},
    42: {'name': '尊崇传内遇三奇', 'type': '神煞', 'desc': '三传见三奇（甲戊庚等）。尊贵、遇奇事。'},
    43: {'name': '害贵讼直作曲断', 'type': '神煞', 'desc': '贵人受害。诉讼曲直难断。'},
    44: {'name': '课传俱贵转无依', 'type': '神煞', 'desc': '课传皆贵。贵人无力，事无依傍。'},
    45: {'name': '昼夜贵加求两贵', 'type': '神煞', 'desc': '昼夜贵人俱见。得两方贵人相助。'},
    46: {'name': '贵人差迭事参差', 'type': '神煞', 'desc': '贵人错落。事有参差，难归一途。'},
    47: {'name': '贵虽在狱宜临干', 'type': '神煞', 'desc': '贵人入狱，若临日干。宜求贵成事。'},
    48: {'name': '鬼乘天乙乃神祗', 'type': '神煞', 'desc': '日鬼乘贵人。神祗为患，宜修功德。'},
    49: {'name': '两贵受克难干贵', 'type': '神煞', 'desc': '两贵皆受克。贵人自顾不暇，难求助。'},
    50: {'name': '二贵皆空虚喜期', 'type': '神煞', 'desc': '两贵皆空。喜信成虚，被人谗言所误。'},
    51: {'name': '魁度天门关隔定', 'type': '神煞', 'desc': '戌加亥。事关隔，谋望受阻。'},
    52: {'name': '罡塞鬼户任谋为', 'type': '神煞', 'desc': '辰加寅。众鬼不侵，谋事亨利。'},
    53: {'name': '两蛇夹墓凶难免', 'type': '神煞', 'desc': '两螣蛇夹墓。病重、凶灾难免。'},
    54: {'name': '虎视逢虎力难施', 'type': '神煞', 'desc': '课传见虎视又乘白虎。凶力难施展。'},
    55: {'name': '所谋多拙逢网罗', 'type': '神煞', 'desc': '干支乘罗网。谋事多拙，受困。'},
    56: {'name': '天网自裹己招非', 'type': '神煞', 'desc': '天网自裹。自招其祸，非他人害。'},
    57: {'name': '费有余而得不足', 'type': '干支', 'desc': '生处空亡、财陷空亡。花费多而所得少。'},
    58: {'name': '用破身心无所归', 'type': '干支', 'desc': '财禄俱作鬼空。身心无依，无实得。'},
    59: {'name': '华盖覆日人昏晦', 'type': '神煞', 'desc': '华盖作墓覆日。身受昏晦，难明事理。'},
    60: {'name': '太阳射宅屋光辉', 'type': '神煞', 'desc': '支墓临支又为月将。宅光辉，吉。'},
    61: {'name': '干乘墓虎无占病', 'type': '神煞', 'desc': '日干乘墓、虎。病难占，凶。'},
    62: {'name': '支乘墓虎有伏尸', 'type': '神煞', 'desc': '支乘墓虎。宅有伏尸为祸。'},
    63: {'name': '彼此全伤防两损', 'type': '干支', 'desc': '干支互克。两败俱伤。'},
    64: {'name': '夫妇芜淫各有私', 'type': '干支', 'desc': '干支互克。夫妻不和，各有私情。'},
    65: {'name': '干墓并关人宅废', 'type': '神煞', 'desc': '日干之墓作关神。家宅衰败。'},
    66: {'name': '支坟财并旅程稽', 'type': '神煞', 'desc': '支上见墓财。旅程稽迟。'},
    67: {'name': '受虎克神为病症', 'type': '神煞', 'desc': '受虎克之神。病症。'},
    68: {'name': '制鬼之位乃良医', 'type': '神煞', 'desc': '能制鬼之位。良医、可治病。'},
    69: {'name': '虎乘遁鬼殃非浅', 'type': '神煞', 'desc': '虎乘遁鬼。灾祸深重。'},
    70: {'name': '鬼临三四讼灾随', 'type': '神煞', 'desc': '鬼在三四课。官司灾祸随来。'},
    71: {'name': '病符克宅全家患', 'type': '神煞', 'desc': '病符克宅。全家有患。'},
    72: {'name': '丧吊全逢挂缟衣', 'type': '神煞', 'desc': '丧门吊客俱逢。家有丧事。'},
    73: {'name': '前后逼迫难进退', 'type': '结构', 'desc': '前后逼迫。进退两难。'},
    74: {'name': '空空如也事休追', 'type': '神煞', 'desc': '空亡重重。事无实，休追。'},
    75: {'name': '宾主不投刑在上', 'type': '干支', 'desc': '宾主不投。刑在上，不利合作。'},
    76: {'name': '彼此猜忌害相随', 'type': '干支', 'desc': '互有猜忌。害随来。'},
    77: {'name': '互生俱生凡事益', 'type': '干支', 'desc': '互生俱生。事有益。'},
    78: {'name': '互旺皆旺坐谋宜', 'type': '干支', 'desc': '互旺皆旺。坐谋皆宜。'},
    79: {'name': '干支值绝凡谋决', 'type': '干支', 'desc': '干支值绝。谋事决断。'},
    80: {'name': '人宅皆死各衰羸', 'type': '干支', 'desc': '人宅皆死。各衰。'},
    81: {'name': '传墓入墓分憎爱', 'type': '结构', 'desc': '传墓入墓。分憎爱。'},
    82: {'name': '不行传者考初时', 'type': '结构', 'desc': '无传者。考初传。'},
    83: {'name': '万事喜忻三六合', 'type': '干支', 'desc': '三六合。喜事。'},
    84: {'name': '合中犯杀蜜中砒', 'type': '干支', 'desc': '合中有克。蜜中砒霜。'},
    85: {'name': '初遭夹克不由己', 'type': '干支', 'desc': '初传夹克。不由己。'},
    86: {'name': '将逢内战所谋危', 'type': '神煞', 'desc': '将逢内战。谋事危。'},
    87: {'name': '人宅坐墓甘招晦', 'type': '神煞', 'desc': '人宅坐墓。自招晦。'},
    88: {'name': '干支乘墓各昏迷', 'type': '神煞', 'desc': '干支乘墓。昏迷。'},
    89: {'name': '任信丁马须言动', 'type': '神煞', 'desc': '丁马主动。事变动。'},
    90: {'name': '来去俱空岂动宜', 'type': '神煞', 'desc': '俱空。不宜动。'},
    91: {'name': '虎临干鬼凶速速', 'type': '神煞', 'desc': '虎临干鬼。凶速。'},
    92: {'name': '龙加生气吉迟迟', 'type': '神煞', 'desc': '龙加生气。吉迟。'},
    93: {'name': '妄用三传灾福异', 'type': '结构', 'desc': '妄用三传。灾福异变。'},
    94: {'name': '喜惧空亡乃妙机', 'type': '神煞', 'desc': '空亡。妙机。'},
    95: {'name': '六爻现卦防其克', 'type': '神煞', 'desc': '六爻现卦。防克。'},
    96: {'name': '旬内空亡逐类推', 'type': '神煞', 'desc': '旬空。逐类推断。'},
    97: {'name': '所筮不入仍凭类', 'type': '结构', 'desc': '不入课。凭类推断。'},
    98: {'name': '非占现类勿言之', 'type': '结构', 'desc': '非占类。勿言。'},
    99: {'name': '常问不应逢吉象', 'type': '结构', 'desc': '常问不应。逢吉象。'},
    100: {'name': '已灾凶逃返无疑', 'type': '结构', 'desc': '已灾。凶逃返无疑。'}
}


def index_bifa(day_gan: str, day_zhi: str, si_ke: List[Dict], san_chuan: List[Dict], xun_kong: List[str]) -> List[Dict]:
    """
    毕法赋智能索引

    Args:
        day_gan: 日干
        day_zhi: 日支
        si_ke: 四课
        san_chuan: 三传
        xun_kong: 旬空地支列表

    Returns:
        List[Dict]: 匹配的毕法赋列表
    """
    matched = []

    # 日干寄宫
    gan_ji = JI_GONG[day_gan]

    # 检查各种格局
    for idx, bifa in BI_FA_FU.items():
        matched_flag = False

        # 1. 前后引从升迁吉
        if idx == 1:
            chu_zhi = san_chuan[0]['zhi']
            mo_zhi = san_chuan[2]['zhi']
            chu_idx = get_zhi_index(chu_zhi)
            mo_idx = get_zhi_index(mo_zhi)
            gan_idx = get_zhi_index(gan_ji)
            if chu_idx == gan_idx - 1 and mo_idx == gan_idx + 1:
                matched_flag = True

        # 2. 首尾相见始终宜
        elif idx == 2:
            chu_zhi = san_chuan[0]['zhi']
            mo_zhi = san_chuan[2]['zhi']
            if chu_zhi == mo_zhi or chu_zhi == LIU_HE.get(mo_zhi, ''):
                matched_flag = True

        # 5. 六阳数足须公用
        elif idx == 5:
            yang_count = sum(1 for ke in si_ke if ke['tian_pan'] in LIU_YANG)
            if yang_count == 4:
                matched_flag = True

        # 6. 六阴相继尽昏迷
        elif idx == 6:
            yin_count = sum(1 for ke in si_ke if ke['tian_pan'] in LIU_YIN)
            if yin_count == 4:
                matched_flag = True

        # 17. 进茹空亡宜退步
        elif idx == 17:
            chu_zhi = san_chuan[0]['zhi']
            zhong_zhi = san_chuan[1]['zhi']
            mo_zhi = san_chuan[2]['zhi']
            if chu_zhi in xun_kong and zhong_zhi in xun_kong and mo_zhi in xun_kong:
                matched_flag = True

        # 18. 踏脚空亡进用宜
        elif idx == 18:
            chu_zhi = san_chuan[0]['zhi']
            mo_zhi = san_chuan[2]['zhi']
            if chu_zhi not in xun_kong and mo_zhi in xun_kong:
                matched_flag = True

        # 21. 交车相合交关利
        elif idx == 21:
            ke1_tian = si_ke[0]['tian_pan']
            ke3_tian = si_ke[2]['tian_pan']
            if ke1_tian == LIU_HE.get(ke3_tian, '') or ke3_tian == LIU_HE.get(ke1_tian, ''):
                matched_flag = True

        # 25. 金日逢丁凶祸动
        elif idx == 25:
            if day_gan in ['庚', '辛']:
                for chuan in san_chuan:
                    if chuan['zhi'] == '午':  # 丁寄宫在午
                        matched_flag = True
                        break

        # 26. 水日逢丁财动之
        elif idx == 26:
            if day_gan in ['壬', '癸']:
                for chuan in san_chuan:
                    if chuan['zhi'] == '午':  # 丁寄宫在午
                        matched_flag = True
                        break

        # 31. 三传递生人举荐
        elif idx == 31:
            chu_zhi = san_chuan[0]['zhi']
            zhong_zhi = san_chuan[1]['zhi']
            mo_zhi = san_chuan[2]['zhi']
            if check_sheng(chu_zhi, zhong_zhi) and check_sheng(zhong_zhi, mo_zhi):
                matched_flag = True

        # 32. 三传互克众人欺
        elif idx == 32:
            chu_zhi = san_chuan[0]['zhi']
            zhong_zhi = san_chuan[1]['zhi']
            mo_zhi = san_chuan[2]['zhi']
            if check_ke(chu_zhi, zhong_zhi) and check_ke(zhong_zhi, mo_zhi):
                matched_flag = True

        # 36. 干支皆败事倾颓
        elif idx == 36:
            ke1_tian = si_ke[0]['tian_pan']
            ke3_tian = si_ke[2]['tian_pan']
            # 败地：水败于卯，木败于子，火败于酉，金败于午，土败于酉
            bai_di_map = {
                '水': '卯', '木': '子', '火': '酉', '金': '午', '土': '酉'
            }
            ke1_wuxing = get_wuxing(ke1_tian)
            ke3_wuxing = get_wuxing(ke3_tian)
            if ke1_tian == bai_di_map.get(ke1_wuxing) and ke3_tian == bai_di_map.get(ke3_wuxing):
                matched_flag = True

        # 74. 空空如也事休追
        elif idx == 74:
            all_empty = all(chuan['zhi'] in xun_kong for chuan in san_chuan)
            if all_empty:
                matched_flag = True

        # 77. 互生俱生凡事益
        elif idx == 77:
            ke1_tian = si_ke[0]['tian_pan']
            ke3_tian = si_ke[2]['tian_pan']
            if check_sheng(ke1_tian, ke3_tian) and check_sheng(ke3_tian, ke1_tian):
                matched_flag = True

        # 83. 万事喜忻三六合
        elif idx == 83:
            ke1_tian = si_ke[0]['tian_pan']
            ke3_tian = si_ke[2]['tian_pan']
            if ke1_tian == LIU_HE.get(ke3_tian, ''):
                matched_flag = True

        if matched_flag:
            matched.append({
                'id': idx,
                'name': bifa['name'],
                'type': bifa['type'],
                'desc': bifa['desc']
            })

    return matched


# ============================================================================
# Phase 2.5: 现代决策算法映射
# ============================================================================

def modern_decision_mapping(question_type: str, matched_bifa: List[Dict],
                           si_ke: List[Dict], san_chuan: List[Dict],
                           day_gan: str, xun_kong: List[str]) -> Dict:
    """
    现代决策算法映射

    Args:
        question_type: 问题类型（投资/合作/竞争/自我等）
        matched_bifa: 匹配的毕法赋
        si_ke: 四课
        san_chuan: 三传
        day_gan: 日干
        xun_kong: 旬空地支

    Returns:
        Dict: 决策映射结果
    """
    result = {
        'system_stability': {  # 系统稳健性（是非观）
            'signal': [],
            'mapping': '',
            'logic': '',
            'advice': ''
        },
        'long_term_compound': {  # 长期复利（护城河）
            'signal': [],
            'mapping': '',
            'logic': '',
            'advice': ''
        },
        'asymmetric_risk': {  # 非对称风险（压力测试）
            'signal': [],
            'mapping': '',
            'logic': '',
            'advice': ''
        },
        'character_duty': {  # 人品与本分（合伙/团队）
            'signal': [],
            'mapping': '',
            'logic': '',
            'advice': ''
        }
    }

    # 系统稳健性：空亡、截路、玄武内战
    all_zhi = [ke['tian_pan'] for ke in si_ke] + [chuan['zhi'] for chuan in san_chuan]
    has_empty = any(zhi in xun_kong for zhi in all_zhi)

    if has_empty:
        result['system_stability']['signal'].append('空亡')
        result['system_stability']['mapping'] = '判定为"逻辑不闭环"或"信息不对称"'
        result['system_stability']['logic'] = '不管利润多高，这件事在底层是不稳的'
        result['system_stability']['advice'] = 'Stop doing（停止行动）'

    # 长期复利：干支相生、德合、旺禄临身
    ke1_tian = si_ke[0]['tian_pan']
    ke3_tian = si_ke[2]['tian_pan']

    if check_sheng(ke1_tian, ke3_tian):
        result['long_term_compound']['signal'].append('干支相生')
        result['long_term_compound']['mapping'] = '判定为"具备安全边际"或"有复利潜力"'
        result['long_term_compound']['logic'] = '这事符合"本分"，虽然短期可能慢，但方向正确'
        result['long_term_compound']['advice'] = '守正待时（坚持正确方向，等待时机）'

    if ke1_tian == LIU_HE.get(ke3_tian, ''):
        result['long_term_compound']['signal'].append('德合')
        result['long_term_compound']['mapping'] = '判定为"具备安全边际"'
        result['long_term_compound']['logic'] = '关系和谐，合作稳固'
        result['long_term_compound']['advice'] = '坚持合作'

    # 非对称风险：鬼动、金日逢丁、三刑
    # 检查是否有日鬼
    for chuan in san_chuan:
        if check_ke(chuan['zhi'], day_gan):
            result['asymmetric_risk']['signal'].append('鬼动')
            result['asymmetric_risk']['mapping'] = '判定为"不可控的系统性风险"'
            result['asymmetric_risk']['logic'] = '一旦发生最坏情况，你是否会被清出牌桌？'
            result['asymmetric_risk']['advice'] = '寻找对冲方案或放弃'
            break

    # 检查金日逢丁
    if day_gan in ['庚', '辛']:
        for chuan in san_chuan:
            if chuan['zhi'] == '午':
                result['asymmetric_risk']['signal'].append('金日逢丁')
                result['asymmetric_risk']['mapping'] = '判定为"突发风险"'
                result['asymmetric_risk']['logic'] = '突发凶灾、官非、变动'
                result['asymmetric_risk']['advice'] = '高度警惕，准备应急预案'
                break

    # 人品与本分
    # 看日干与日支上神的关系
    if check_sheng(ke1_tian, ke3_tian):
        result['character_duty']['signal'].append('相生')
        result['character_duty']['mapping'] = '判定为"合作双赢"'
        result['character_duty']['logic'] = '双方都想一起赢'
        result['character_duty']['advice'] = '优先选择逻辑一致的人'
    elif check_ke(ke1_tian, ke3_tian):
        result['character_duty']['signal'].append('相克')
        result['character_duty']['mapping'] = '判定为"博弈结构"'
        result['character_duty']['logic'] = '对方是想赢你，还是想一起赢？'
        result['character_duty']['advice'] = '谨慎合作，明确利益分配'

    return result


# ============================================================================
# Phase 3: 宗师输出规范
# ============================================================================

def format_zongshi_output(day_gan: str, day_zhi: str, yue_jiang: str, zhan_shi: str,
                          si_ke: List[Dict], san_chuan: List[Dict], keti_name: str,
                          warning: str, xun_kong: List[str], yi_ma: str,
                          matched_bifa: List[Dict], question_type: str,
                          decision_mapping: Dict) -> str:
    """
    宗师输出规范

    Args:
        day_gan: 日干
        day_zhi: 日支
        yue_jiang: 月将
        zhan_shi: 占时
        si_ke: 四课
        san_chuan: 三传
        keti_name: 课体名
        warning: 警告信息
        xun_kong: 旬空地支
        yi_ma: 驿马
        matched_bifa: 匹配的毕法赋
        question_type: 问题类型
        decision_mapping: 决策映射

    Returns:
        str: 格式化输出
    """
    output = []

    # Step 1: 宗师排盘
    output.append("=" * 60)
    output.append("Step 1: 宗师排盘")
    output.append("=" * 60)
    output.append("")
    output.append(f"课式：{day_gan}{day_zhi}日 | {yue_jiang}将 | {zhan_shi}时")
    output.append("")
    output.append("四课：")
    for i, ke in enumerate(si_ke, 1):
        output.append(f"  {ke['name']}：{ke['di_pan']}上见{ke['tian_pan']}")
    output.append("")
    output.append("三传：")
    for chuan in san_chuan:
        output.append(f"  {chuan['name']} {chuan['zhi']}")
    output.append("")
    output.append(f"神煞：旬空 {'、'.join(xun_kong)} | 驿马 {yi_ma}")
    output.append("")
    output.append(f"课体判名：**{keti_name}**")
    if warning:
        output.append(f"  安全提示：{warning}")
    output.append("")

    # Step 2: 类神定位
    output.append("=" * 60)
    output.append("Step 2: 类神定位")
    output.append("=" * 60)
    output.append("")
    output.append(f"所问何事：{question_type}")

    # 根据问题类型确定类神
    if '财' in question_type or '投资' in question_type or '钱' in question_type:
        # 求财：看妻财爻（干克者）
        output.append("核心类神：妻财爻（干克者）")
        for chuan in san_chuan:
            if check_ke(day_gan, chuan['zhi']):
                output.append(f"  财神为{chuan['zhi']}，临初/中/末传")
    elif '官' in question_type or '工作' in question_type or '升迁' in question_type:
        # 问官运：看官鬼爻（克干者）
        output.append("核心类神：官鬼爻（克干者）")
        for chuan in san_chuan:
            if check_ke(chuan['zhi'], day_gan):
                output.append(f"  官鬼为{chuan['zhi']}，临初/中/末传")
    elif '合作' in question_type or '合伙' in question_type:
        # 合作：看六合
        output.append("核心类神：六合")
        for chuan in san_chuan:
            if chuan['zhi'] in LIU_HE.values():
                output.append(f"  合神为{chuan['zhi']}，临初/中/末传")
    else:
        output.append("核心类神：根据具体情况分析")

    output.append("")

    # Step 3: 毕法赋深度解卦
    output.append("=" * 60)
    output.append("Step 3: 毕法赋深度解卦")
    output.append("=" * 60)
    output.append("")

    if matched_bifa:
        for bifa in matched_bifa:
            output.append(f"【{bifa['name']}】")
            output.append(f"赋文解析：{bifa['desc']}")
            output.append("")
    else:
        output.append("无特殊毕法赋格局，以常规四课三传分析为主。")
        output.append("")

    # 四课态势
    output.append("四课态势：")
    ke1_tian = si_ke[0]['tian_pan']
    ke3_tian = si_ke[2]['tian_pan']

    if check_sheng(ke1_tian, ke3_tian):
        output.append("  干上神生支上神：外助内，利于合作")
    elif check_ke(ke1_tian, ke3_tian):
        output.append("  干上神克支上神：外克内，有冲突隐患")
    elif check_sheng(ke3_tian, ke1_tian):
        output.append("  支上神生干上神：内助外，得内部支持")
    elif check_ke(ke3_tian, ke1_tian):
        output.append("  支上神克干上神：内克外，有阻力")

    output.append("")

    # Step 4: 决策逻辑审计
    output.append("=" * 60)
    output.append("Step 4: 决策逻辑审计")
    output.append("=" * 60)
    output.append("")

    # 是非观
    output.append("【是非观】这事对吗？")
    if decision_mapping['system_stability']['advice']:
        output.append(f"  {decision_mapping['system_stability']['logic']}")
        output.append(f"  建议：{decision_mapping['system_stability']['advice']}")
    else:
        output.append("  符合常识和商业逻辑，无明显隐患")

    output.append("")

    # 安全边际
    output.append("【安全边际】最坏情况？")
    if decision_mapping['asymmetric_risk']['advice']:
        output.append(f"  风险信号：{', '.join(decision_mapping['asymmetric_risk']['signal'])}")
        output.append(f"  {decision_mapping['asymmetric_risk']['logic']}")
        output.append(f"  建议：{decision_mapping['asymmetric_risk']['advice']}")
    else:
        output.append("  无系统性风险，可控范围内")

    output.append("")

    # Stop-doing List
    output.append("【Stop-doing List】不做什么？")
    if decision_mapping['system_stability']['advice']:
        output.append(f"  1. {decision_mapping['system_stability']['advice']}")
    else:
        output.append("  1. 不要冲动决策，保持冷静分析")

    output.append("")

    # 本分建议
    output.append("【本分建议】如何把事情做正确？")
    if decision_mapping['long_term_compound']['advice']:
        output.append(f"  {decision_mapping['long_term_compound']['advice']}")
    if decision_mapping['character_duty']['advice']:
        output.append(f"  {decision_mapping['character_duty']['advice']}")
    if not decision_mapping['long_term_compound']['advice'] and not decision_mapping['character_duty']['advice']:
        output.append("  保持谨慎，逐步推进")

    output.append("")
    output.append("=" * 60)

    return "\n".join(output)


# ============================================================================
# 主函数：大六壬排盘
# ============================================================================

def liuren_paipan(name: str, gender: int, year: int, month: int, day: int,
                  hour: int, longitude: float = 120.0, is_solar: bool = False,
                  cal_type: str = 'gl', question_type: str = '') -> Dict:
    """
    大六壬排盘

    Args:
        name: 姓名
        gender: 性别（1=男，0=女）
        year: 年
        month: 月
        day: 日
        hour: 小时
        longitude: 经度
        is_solar: 是否使用真太阳时
        cal_type: 历法类型（'gl'=公历，'nl'=农历）
        question_type: 问题类型

    Returns:
        dict: 排盘结果
    """
    # 真太阳时修正
    if is_solar:
        import datetime
        standard_longitude = 120.0
        offset = (longitude - standard_longitude) * 4
        dt = datetime.datetime(year, month, day, hour, 0, 0)
        dt = datetime.datetime.fromtimestamp(dt.timestamp() + offset * 60)
        year, month, day, hour = dt.year, dt.month, dt.day, dt.hour

    # 创建Lunar对象
    if cal_type == 'nl':
        lunar = Lunar.fromYmdHms(year, month, day, hour, 0, 0)
    else:
        solar = Solar.fromYmdHms(year, month, day, hour, 0, 0)
        lunar = solar.getLunar()

    # 获取八字
    eight_char = lunar.getEightChar()
    eight_char.setSect(2)

    # 获取日干日支
    day_gan = get_clean_str(eight_char.getDayGan())
    day_zhi = get_clean_str(eight_char.getDayZhi())

    # 获取时支
    time_zhi = get_clean_str(eight_char.getTimeZhi())

    # 获取月将（简化：取月建）
    yue_jiang = get_clean_str(eight_char.getMonthZhi())

    # 占时：时支
    zhan_shi = time_zhi

    # === Phase 1: 起四课 ===
    si_ke = qi_si_ke(day_gan, day_zhi, yue_jiang, zhan_shi)

    # === Phase 1: 发三传 ===
    san_chuan, keti_name, warning = fa_san_chuan(day_gan, day_zhi, si_ke, yue_jiang, zhan_shi)

    # === 神煞推断 ===
    # 旬空：根据日干计算
    gan_idx = GAN.index(day_gan)
    xun_shou_idx = gan_idx // 10 * 10 + 1
    xun_wei_idx = xun_shou_idx + 9
    xun_kong = []
    if xun_shou_idx <= 10:
        xun_kong = ['戌', '亥']
    elif xun_shou_idx <= 20:
        xun_kong = ['申', '酉']
    elif xun_shou_idx <= 30:
        xun_kong = ['午', '未']
    elif xun_shou_idx <= 40:
        xun_kong = ['辰', '巳']
    elif xun_shou_idx <= 50:
        xun_kong = ['寅', '卯']
    elif xun_shou_idx <= 60:
        xun_kong = ['子', '丑']

    # 驿马
    gan_ji = JI_GONG[day_gan]
    yi_ma = YI_MA.get(gan_ji, '无')

    # === Phase 2: 毕法赋智能索引 ===
    matched_bifa = index_bifa(day_gan, day_zhi, si_ke, san_chuan, xun_kong)

    # === Phase 2.5: 现代决策算法映射 ===
    decision_mapping = modern_decision_mapping(question_type, matched_bifa, si_ke, san_chuan, day_gan, xun_kong)

    # === Phase 3: 宗师输出规范 ===
    formatted_output = format_zongshi_output(
        day_gan, day_zhi, yue_jiang, zhan_shi,
        si_ke, san_chuan, keti_name, warning,
        xun_kong, yi_ma, matched_bifa, question_type, decision_mapping
    )

    # 构建结果
    result = {
        'info': {
            'name': name,
            'gender': gender,
            'year': year,
            'month': month,
            'day': day,
            'hour': hour,
            'longitude': longitude,
            'is_solar': is_solar,
            'cal_type': cal_type,
            'question_type': question_type
        },
        'paipan': {
            'day_gan': day_gan,
            'day_zhi': day_zhi,
            'yue_jiang': yue_jiang,
            'zhan_shi': zhan_shi,
            'si_ke': si_ke,
            'san_chuan': san_chuan,
            'keti_name': keti_name,
            'warning': warning
        },
        'shensha': {
            'xun_kong': xun_kong,
            'yi_ma': yi_ma
        },
        'bifa': matched_bifa,
        'decision': decision_mapping,
        'formatted_output': formatted_output
    }

    return result


def get_clean_str(obj):
    """获取字符串表示"""
    if not obj:
        return ""
    if isinstance(obj, str):
        return obj
    if hasattr(obj, 'getName'):
        return obj.getName()
    return str(obj)


def main():
    parser = argparse.ArgumentParser(description='大六壬预测 - 宗师版')
    parser.add_argument('--name', type=str, required=True, help='姓名')
    parser.add_argument('--gender', type=int, required=True, choices=[0, 1], help='性别（1=男，0=女）')
    parser.add_argument('--year', type=int, required=True, help='出生年份')
    parser.add_argument('--month', type=int, required=True, help='出生月份')
    parser.add_argument('--day', type=int, required=True, help='出生日')
    parser.add_argument('--hour', type=int, required=True, help='出生小时')
    parser.add_argument('--longitude', type=float, default=120.0, help='出生城市经度')
    parser.add_argument('--is-solar', action='store_true', help='启用真太阳时修正')
    parser.add_argument('--cal-type', type=str, default='gl', choices=['gl', 'nl'], help='历法类型（gl=公历，nl=农历）')
    parser.add_argument('--question-type', type=str, default='', help='问题类型（如：投资、合作、升迁等）')

    args = parser.parse_args()

    # 执行大六壬排盘
    result = liuren_paipan(
        name=args.name,
        gender=args.gender,
        year=args.year,
        month=args.month,
        day=args.day,
        hour=args.hour,
        longitude=args.longitude,
        is_solar=args.is_solar,
        cal_type=args.cal_type,
        question_type=args.question_type
    )

    # 输出格式化文本
    print(result['formatted_output'])

    # 输出JSON（供程序调用）
    print("\n" + "=" * 60)
    print("JSON输出（供程序调用）：")
    print("=" * 60)
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
