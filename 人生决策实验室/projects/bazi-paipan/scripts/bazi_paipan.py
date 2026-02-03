#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
八字排盘计算脚本（宗师修复版）
基于lunar-python库，实现八字排盘、十神分析、五行统计、神煞推断等功能
"""

import json
import argparse
import sys

try:
    from lunar_python import Solar, Lunar
except ImportError:
    print("错误：未安装lunar-python库")
    print("请执行：pip install lunar-python")
    sys.exit(1)

# 天干列表
GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
# 地支列表
ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

# 天干对应的五行
GAN_WUXING = {
    '甲': '木', '乙': '木',
    '丙': '火', '丁': '火',
    '戊': '土', '己': '土',
    '庚': '金', '辛': '金',
    '壬': '水', '癸': '水'
}

# 地支对应的五行
ZHI_WUXING = {
    '子': '水', '丑': '土', '寅': '木', '卯': '木',
    '辰': '土', '巳': '火', '午': '火', '未': '土',
    '申': '金', '酉': '金', '戌': '土', '亥': '水'
}

# 地支藏干
HID_GAN = {
    '子': ['癸'], '丑': ['己', '癸', '辛'], '寅': ['甲', '丙', '戊'],
    '卯': ['乙'], '辰': ['戊', '乙', '癸'], '巳': ['丙', '庚', '戊'],
    '午': ['丁', '己'], '未': ['己', '丁', '乙'], '申': ['庚', '壬', '戊'],
    '酉': ['辛'], '戌': ['戊', '辛', '丁'], '亥': ['壬', '甲']
}

# 纳音
NA_YIN = {
    '甲子': '海中金', '乙丑': '海中金', '丙寅': '炉中火', '丁卯': '炉中火',
    '戊辰': '大林木', '己巳': '大林木', '庚午': '路旁土', '辛未': '路旁土',
    '壬申': '剑锋金', '癸酉': '剑锋金', '甲戌': '山头火', '乙亥': '山头火',
    '丙子': '涧下水', '丁丑': '涧下水', '戊寅': '城头土', '己卯': '城头土',
    '庚辰': '白蜡金', '辛巳': '白蜡金', '壬午': '杨柳木', '癸未': '杨柳木',
    '甲申': '泉中水', '乙酉': '泉中水', '丙戌': '屋上土', '丁亥': '屋上土',
    '戊子': '霹雳火', '己丑': '霹雳火', '庚寅': '松柏木', '辛卯': '松柏木',
    '壬辰': '长流水', '癸巳': '长流水', '甲午': '沙中金', '乙未': '沙中金',
    '丙申': '山下火', '丁酉': '山下火', '戊戌': '平地木', '己亥': '平地木',
    '庚子': '壁上土', '辛丑': '壁上土', '壬寅': '金箔金', '癸卯': '金箔金',
    '甲辰': '佛灯火', '乙巳': '佛灯火', '丙午': '天河水', '丁未': '天河水',
    '戊申': '大驿土', '己酉': '大驿土', '庚戌': '钗钏金', '辛亥': '钗钏金',
    '壬子': '桑柘木', '癸丑': '桑柘木', '甲寅': '大溪水', '乙卯': '大溪水',
    '丙辰': '沙中土', '丁巳': '沙中土', '戊午': '天上火', '己未': '天上火',
    '庚申': '石榴木', '辛酉': '石榴木', '壬戌': '大海水', '癸亥': '大海水'
}

# 十神名称
SHI_SHEN_NAME = ['比肩', '劫财', '食神', '伤官', '偏财', '正财', '七杀', '正官', '偏印', '正印']


def get_clean_str(obj):
    """获取字符串表示"""
    if not obj:
        return ""
    if isinstance(obj, str):
        return obj
    if hasattr(obj, 'getName'):
        return obj.getName()
    return str(obj)


def calc_ten_god(target_gan, day_gan):
    """计算十神（日干对目标干）

    Args:
        target_gan: 目标天干
        day_gan: 日干

    Returns:
        十神名称
    """
    if target_gan not in GAN or day_gan not in GAN:
        return "--"
    ti = GAN.index(target_gan)
    di = GAN.index(day_gan)
    return SHI_SHEN_NAME[(ti - di + 10) % 10]


def solar_time_adjust(year, month, day, hour, minute, longitude):
    """真太阳时修正

    Args:
        year: 年
        month: 月
        day: 日
        hour: 小时
        minute: 分钟
        longitude: 经度

    Returns:
        (year, month, day, hour, minute) 修正后的时间
    """
    # 标准经度（北京时间）：120°E
    standard_longitude = 120.0

    # 每差1度，时间差4分钟
    offset = (longitude - standard_longitude) * 4

    # 创建datetime对象并加上偏移
    import datetime
    dt = datetime.datetime(year, month, day, hour, minute)
    dt = datetime.datetime.fromtimestamp(dt.timestamp() + offset * 60)

    return dt.year, dt.month, dt.day, dt.hour, dt.minute


def run_energy_audit(pillar_data, day_gan):
    """能量审计（五行统计、喜神用神判断）

    Args:
        pillar_data: 四柱数据列表 [{g:天干, z:地支}, ...]
        day_gan: 日干

    Returns:
        dict: 能量审计结果
    """
    scores = {'木': 0, '火': 0, '土': 0, '金': 0, '水': 0}

    # 日干五行
    dm_wx = GAN_WUXING[day_gan]

    # 统计各五行得分
    for idx, pillar in enumerate(pillar_data):
        # 天干得分：月柱20分，其他10分
        scores[GAN_WUXING[pillar['g']]] += 20 if idx == 1 else 10
        # 地支得分：月柱40分，其他10分
        scores[ZHI_WUXING[pillar['z']]] += 40 if idx == 1 else 10

    # 五行生克关系
    rel = {
        '木': {'good': ['木', '水'], 'bad': ['金', '火', '土']},
        '火': {'good': ['火', '木'], 'bad': ['水', '土', '金']},
        '土': {'good': ['土', '火'], 'bad': ['木', '金', '水']},
        '金': {'good': ['金', '土'], 'bad': ['火', '木', '水']},
        '水': {'good': ['水', '金'], 'bad': ['土', '火', '木']}
    }

    # 计算总得分
    power = 0
    for wx in rel[dm_wx]['good']:
        power += scores[wx]

    # 判断日主强弱（55分为分界线）
    is_strong = power > 55

    # 计算喜神、用神、忌神
    if is_strong:
        # 日主偏旺，克泄耗
        xi = rel[dm_wx]['bad'][0]  # 最先克我的
        yong = rel[dm_wx]['bad'][2]  # 最后被克的
        ji = rel[dm_wx]['good'][0]  # 同类
    else:
        # 日主偏弱，生扶
        xi = rel[dm_wx]['good'][1]  # 次要帮扶
        yong = rel[dm_wx]['good'][0]  # 主要帮扶
        ji = rel[dm_wx]['bad'][0]  # 克我的

    return {
        'dm_wx': dm_wx,
        'is_strong': is_strong,
        'power': power,
        'scores': scores,
        'xi': xi,
        'yong': yong,
        'ji': ji
    }


def get_shen_sha_audit(pillar, all_pillars, pillar_idx, day_gan):
    """神煞审计

    Args:
        pillar: 当前柱 {g:天干, z:地支}
        all_pillars: 所有四柱
        pillar_idx: 当前柱索引（0=年,1=月,2=日,3=时）
        day_gan: 日干

    Returns:
        list: 神煞列表 [{n:名称, t:类型(vip/normal/danger)}]
    """
    res = []
    z = pillar['z']
    g = pillar['g']
    pillar_str = g + z

    yz = all_pillars[0]['z']  # 年支
    mz = all_pillars[1]['z']  # 月支
    dz = all_pillars[2]['z']  # 日支

    # 天干神煞
    stem_map = {
        '天乙贵人': {'甲': ['未', '丑'], '戊': ['未', '丑'], '庚': ['未', '丑'],
                     '乙': ['申', '子'], '己': ['申', '子'], '丙': ['酉', '亥'],
                     '丁': ['酉', '亥'], '壬': ['卯', '巳'], '癸': ['卯', '巳'],
                     '辛': ['午', '寅']},
        '禄神': {'甲': '寅', '乙': '卯', '丙': '巳', '丁': '午', '戊': '巳',
                 '己': '午', '庚': '申', '辛': '酉', '壬': '亥', '癸': '子'},
        '文昌': {'甲': '巳', '乙': '午', '丙': '申', '丁': '酉', '戊': '申',
                 '己': '酉', '庚': '亥', '辛': '子', '壬': '寅', '癸': '卯'},
        '羊刃': {'甲': '卯', '乙': '辰', '丙': '午', '丁': '未', '戊': '午',
                 '己': '未', '庚': '酉', '辛': '戌', '壬': '子', '癸': '丑'},
        '红艳': {'甲': '午', '乙': '午', '丙': '寅', '丁': '未', '戊': '辰',
                 '己': '辰', '庚': '戌', '辛': '酉', '壬': '子', '癸': '申'},
        '金舆': {'甲': '辰', '乙': '巳', '丙': '未', '丁': '申', '戊': '未',
                 '己': '申', '庚': '戌', '辛': '亥', '壬': '丑', '癸': '寅'}
    }

    for k in stem_map:
        match = stem_map[k].get(day_gan)
        if match:
            if isinstance(match, list):
                if z in match:
                    res.append({'n': k, 't': 'vip'})
            else:
                if z == match:
                    res.append({'n': k, 't': 'vip'})

    # 地支神煞
    branch_map = {
        '驿马': {'申': '寅', '子': '寅', '辰': '寅', '寅': '申', '午': '申', '戌': '申',
                 '巳': '亥', '酉': '亥', '丑': '亥', '亥': '巳', '卯': '巳', '未': '巳'},
        '华盖': {'申': '辰', '子': '辰', '辰': '辰', '寅': '戌', '午': '戌', '戌': '戌',
                 '巳': '丑', '酉': '丑', '丑': '丑', '亥': '未', '卯': '未', '未': '未'},
        '桃花': {'申': '酉', '子': '酉', '辰': '酉', '寅': '卯', '午': '卯', '戌': '卯',
                 '巳': '午', '酉': '午', '丑': '午', '亥': '子', '卯': '子', '未': '子'},
        '劫煞': {'申': '巳', '子': '巳', '辰': '巳', '寅': '亥', '午': '亥', '戌': '亥',
                 '巳': '寅', '酉': '寅', '丑': '寅', '亥': '申', '卯': '申', '未': '申'},
        '亡神': {'申': '亥', '子': '亥', '辰': '亥', '寅': '巳', '午': '巳', '戌': '巳',
                 '巳': '申', '酉': '申', '丑': '申', '亥': '寅', '卯': '寅', '未': '寅'},
        '将星': {'申': '子', '子': '子', '辰': '子', '寅': '午', '午': '午', '戌': '午',
                 '巳': '酉', '酉': '酉', '丑': '酉', '亥': '卯', '卯': '卯', '未': '卯'}
    }

    for k in branch_map:
        if branch_map[k].get(yz) == z:
            res.append({'n': f'{k}(年)', 't': 'normal'})
        if branch_map[k].get(dz) == z:
            res.append({'n': f'{k}(日)', 't': 'normal'})

    # 天德贵人、月德贵人、天医
    td = {'寅': '丁', '卯': '申', '辰': '壬', '巳': '辛', '午': '亥', '未': '甲',
          '申': '癸', '酉': '寅', '戌': '丙', '亥': '乙', '子': '巳', '丑': '庚'}
    yd = {'寅': '丙', '午': '丙', '戌': '丙', '申': '壬', '子': '壬', '辰': '壬',
          '亥': '甲', '卯': '甲', '未': '甲', '巳': '庚', '酉': '庚', '丑': '庚'}
    ty = {'寅': '丑', '卯': '寅', '辰': '卯', '巳': '辰', '午': '巳', '未': '午',
          '申': '未', '酉': '申', '戌': '酉', '亥': '戌', '子': '亥', '丑': '子'}

    if td.get(mz) == g or td.get(mz) == z:
        res.append({'n': '天德贵人', 't': 'vip'})
    if yd.get(mz) == g:
        res.append({'n': '月德贵人', 't': 'vip'})
    if ty.get(mz) == z:
        res.append({'n': '天医', 't': 'normal'})

    # 魁罡、十恶大败、十灵日、阴阳差错（日柱）
    if pillar_idx == 2:
        if pillar_str in ['壬辰', '庚戌', '庚辰', '戊戌']:
            res.append({'n': '魁罡', 't': 'danger'})
        if pillar_str in ['甲辰', '乙巳', '壬申', '丙申', '丁亥', '庚辰', '戊戌', '癸亥', '辛巳', '乙丑']:
            res.append({'n': '十恶大败', 't': 'danger'})
        if pillar_str in ['甲辰', '乙亥', '丙辰', '丁酉', '庚戌', '壬午', '戊午', '辛亥', '癸卯', '丁卯']:
            res.append({'n': '十灵日', 't': 'normal'})
        if pillar_str in ['丙午', '丁未', '壬子', '癸丑']:
            res.append({'n': '阴阳差错', 't': 'danger'})

    return res


def do_paipan(name, gender, year, month, day, hour, longitude=120.0, is_solar=False, cal_type='gl'):
    """执行八字排盘

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

    Returns:
        dict: 排盘结果
    """
    # 真太阳时修正
    if is_solar:
        year, month, day, hour, _ = solar_time_adjust(year, month, day, hour, 0, longitude)

    # 创建Lunar对象
    if cal_type == 'nl':
        lunar = Lunar.fromYmdHms(year, month, day, hour, 0, 0)
    else:
        solar = Solar.fromYmdHms(year, month, day, hour, 0, 0)
        lunar = solar.getLunar()

    # 设置流派（2=流派2，更准确）
    eight_char = lunar.getEightChar()
    eight_char.setSect(2)

    # 获取四柱
    pillars = [
        {'g': get_clean_str(eight_char.getYearGan()), 'z': get_clean_str(eight_char.getYearZhi())},
        {'g': get_clean_str(eight_char.getMonthGan()), 'z': get_clean_str(eight_char.getMonthZhi())},
        {'g': get_clean_str(eight_char.getDayGan()), 'z': get_clean_str(eight_char.getDayZhi())},
        {'g': get_clean_str(eight_char.getTimeGan()), 'z': get_clean_str(eight_char.getTimeZhi())},
    ]

    # 日干
    day_gan = pillars[2]['g']

    # 能量审计
    energy = run_energy_audit(pillars, day_gan)

    # 计算每个柱的详细信息
    pillar_details = []
    for idx, pillar in enumerate(pillars):
        # 主星（十神）
        if idx == 2:
            # 日柱显示"元男"或"元女"
            zhuxing = '元男' if gender == 1 else '元女'
        else:
            zhuxing = calc_ten_god(pillar['g'], day_gan)

        # 藏干
        canggan = []
        for cg in HID_GAN.get(pillar['z'], []):
            canggan.append({
                'g': cg,
                'wx': GAN_WUXING[cg],
                'ss': calc_ten_god(cg, day_gan)
            })

        # 纳音
        nayin = NA_YIN.get(pillar['g'] + pillar['z'], '--')

        # 神煞
        shensha = get_shen_sha_audit(pillar, pillars, idx, day_gan)

        pillar_details.append({
            'index': idx,
            'name': ['年柱', '月柱', '日柱', '时柱'][idx],
            'zhuxing': zhuxing,
            'gan': pillar['g'],
            'gan_wx': GAN_WUXING[pillar['g']],
            'zhi': pillar['z'],
            'zhi_wx': ZHI_WUXING[pillar['z']],
            'canggan': canggan,
            'nayin': nayin,
            'shensha': shensha
        })

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
            'cal_type': cal_type
        },
        'pillars': pillar_details,
        'energy': energy,
        'day_gan': day_gan
    }

    return result


def main():
    parser = argparse.ArgumentParser(description='八字排盘计算（宗师修复版）')
    parser.add_argument('--name', type=str, required=True, help='姓名')
    parser.add_argument('--gender', type=int, required=True, choices=[0, 1], help='性别（1=男，0=女）')
    parser.add_argument('--year', type=int, required=True, help='出生年份')
    parser.add_argument('--month', type=int, required=True, help='出生月份')
    parser.add_argument('--day', type=int, required=True, help='出生日')
    parser.add_argument('--hour', type=int, required=True, help='出生小时')
    parser.add_argument('--longitude', type=float, default=120.0, help='出生城市经度')
    parser.add_argument('--is-solar', action='store_true', help='启用真太阳时修正')
    parser.add_argument('--cal-type', type=str, default='gl', choices=['gl', 'nl'], help='历法类型（gl=公历，nl=农历）')

    args = parser.parse_args()

    # 执行排盘
    result = do_paipan(
        name=args.name,
        gender=args.gender,
        year=args.year,
        month=args.month,
        day=args.day,
        hour=args.hour,
        longitude=args.longitude,
        is_solar=args.is_solar,
        cal_type=args.cal_type
    )

    # 输出JSON
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
