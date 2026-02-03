#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
八字排盘计算脚本
使用sxtwl库进行历法计算，实现八字排盘、十神分析、五行统计等功能
"""

import json
import argparse
import sxtwl

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

# 十神关系（日干对其他干）
# 格式：{日干: {目标干: 十神}}
SHI_SHEN = {
    '甲': {'甲': '比肩', '乙': '劫财', '丙': '食神', '丁': '伤官', '戊': '偏财', '己': '正财', '庚': '七杀', '辛': '正官', '壬': '偏印', '癸': '正印'},
    '乙': {'乙': '比肩', '甲': '劫财', '丁': '食神', '丙': '伤官', '己': '偏财', '戊': '正财', '辛': '七杀', '庚': '正官', '癸': '偏印', '壬': '正印'},
    '丙': {'丙': '比肩', '丁': '劫财', '戊': '食神', '己': '伤官', '庚': '偏财', '辛': '正财', '壬': '七杀', '癸': '正官', '甲': '偏印', '乙': '正印'},
    '丁': {'丁': '比肩', '丙': '劫财', '己': '食神', '戊': '伤官', '辛': '偏财', '庚': '正财', '癸': '七杀', '壬': '正官', '乙': '偏印', '甲': '正印'},
    '戊': {'戊': '比肩', '己': '劫财', '庚': '食神', '辛': '伤官', '壬': '偏财', '癸': '正财', '甲': '七杀', '乙': '正官', '丙': '偏印', '丁': '正印'},
    '己': {'己': '比肩', '戊': '劫财', '辛': '食神', '庚': '伤官', '癸': '偏财', '壬': '正财', '乙': '七杀', '甲': '正官', '丁': '偏印', '丙': '正印'},
    '庚': {'庚': '比肩', '辛': '劫财', '壬': '食神', '癸': '伤官', '甲': '偏财', '乙': '正财', '丙': '七杀', '丁': '正官', '戊': '偏印', '己': '正印'},
    '辛': {'辛': '比肩', '庚': '劫财', '癸': '食神', '壬': '伤官', '乙': '偏财', '甲': '正财', '丁': '七杀', '丙': '正官', '己': '偏印', '戊': '正印'},
    '壬': {'壬': '比肩', '癸': '劫财', '甲': '食神', '乙': '伤官', '丙': '偏财', '丁': '正财', '戊': '七杀', '己': '正官', '庚': '偏印', '辛': '正印'},
    '癸': {'癸': '比肩', '壬': '劫财', '乙': '食神', '甲': '伤官', '丁': '偏财', '丙': '正财', '己': '七杀', '戊': '正官', '辛': '偏印', '庚': '正印'},
}

# 五行生克关系
WUXING_SHENG = {
    '木': {'我生': '火', '生我': '水'},
    '火': {'我生': '土', '生我': '木'},
    '土': {'我生': '金', '生我': '火'},
    '金': {'我生': '水', '生我': '土'},
    '水': {'我生': '木', '生我': '金'},
}


def get_gan_by_index(idx):
    """根据索引获取天干"""
    return GAN[idx]


def get_zhi_by_index(idx):
    """根据索引获取地支"""
    return ZHI[idx]


def get_gan_wuxing(gan):
    """获取天干的五行"""
    return GAN_WUXING.get(gan, '未知')


def get_zhi_wuxing(zhi):
    """获取地支的五行"""
    return ZHI_WUXING.get(zhi, '未知')


def get_shi_shen(day_gan, target_gan):
    """计算十神（日干对目标干）"""
    return SHI_SHEN.get(day_gan, {}).get(target_gan, '未知')


def hour_to_shichen(hour):
    """将小时数转换为时辰索引（0-11）"""
    # 子时：23-1点，丑时：1-3点，依此类推
    # 时辰索引：0=子, 1=丑, 2=寅, 3=卯, 4=辰, 5=巳, 6=午, 7=未, 8=申, 9=酉, 10=戌, 11=亥
    if hour == 23 or hour == 0:
        return 0  # 子时
    elif 1 <= hour < 3:
        return 1  # 丑时
    elif 3 <= hour < 5:
        return 2  # 寅时
    elif 5 <= hour < 7:
        return 3  # 卯时
    elif 7 <= hour < 9:
        return 4  # 辰时
    elif 9 <= hour < 11:
        return 5  # 巳时
    elif 11 <= hour < 13:
        return 6  # 午时
    elif 13 <= hour < 15:
        return 7  # 未时
    elif 15 <= hour < 17:
        return 8  # 申时
    elif 17 <= hour < 19:
        return 9  # 酉时
    elif 19 <= hour < 21:
        return 10  # 戌时
    else:  # 21 <= hour < 23
        return 11  # 亥时


def solar_time_adjust(hour, longitude):
    """真太阳时修正
    
    Args:
        hour: 原始小时数
        longitude: 经度（东经为正）
    
    Returns:
        修正后的小时数（0-24范围）
    """
    # 标准经度（北京时间）：120°E
    standard_longitude = 120.0
    
    # 每差1度，时间差4分钟
    time_diff = (longitude - standard_longitude) * 4 / 60.0
    
    # 修正时间
    adjusted_hour = hour + time_diff
    
    # 确保在0-24范围内
    if adjusted_hour < 0:
        adjusted_hour += 24
    elif adjusted_hour >= 24:
        adjusted_hour -= 24
    
    return adjusted_hour


def get_wang_xiang_xiu_kun_si(month_zhi_wuxing):
    """计算五行旺相休囚死
    
    Args:
        month_zhi_wuxing: 月支的五行
    
    Returns:
        dict: 各五行的状态
    """
    wx_list = ['金', '木', '水', '火', '土']
    
    # 旺：与月令五行相同
    # 相：生月令的五行
    # 休：月令生的五行
    # 囚：克月令的五行
    # 死：被月令克的五行
    
    sheng_wo = WUXING_SHENG[month_zhi_wuxing]['生我']  # 生我者
    wo_sheng = WUXING_SHENG[month_zhi_wuxing]['我生']  # 我生者
    
    result = {}
    for wx in wx_list:
        if wx == month_zhi_wuxing:
            result[wx] = '旺'
        elif wx == sheng_wo:
            result[wx] = '相'
        elif wx == wo_sheng:
            result[wx] = '休'
        elif wx == sheng_wo:
            result[wx] = '休'
        elif wx == wo_sheng:
            result[wx] = '休'
        else:
            # 判断克我、我克的关系
            if wx in WUXING_SHENG.values():
                if WUXING_SHENG[wx]['我生'] == month_zhi_wuxing:
                    result[wx] = '相'  # 生月令的是相
                elif WUXING_SHENG[wx]['生我'] == month_zhi_wuxing:
                    result[wx] = '囚'  # 克月令的是囚
                elif WUXING_SHENG[month_zhi_wuxing]['我生'] == wx:
                    result[wx] = '死'  # 被月令克的是死
                else:
                    result[wx] = '休'
    
    # 补全判断
    for wx in wx_list:
        if wx not in result:
            # 手动判断
            if wx == month_zhi_wuxing:
                result[wx] = '旺'
            elif WUXING_SHENG.get(wx, {}).get('我生') == month_zhi_wuxing:
                result[wx] = '相'
            elif WUXING_SHENG.get(wx, {}).get('生我') == month_zhi_wuxing:
                result[wx] = '囚'
            elif WUXING_SHENG.get(month_zhi_wuxing, {}).get('我生') == wx:
                result[wx] = '死'
            else:
                result[wx] = '休'
    
    return result


def calculate_bazi(name, gender, year, month, day, hour, longitude=120.0, is_solar=False):
    """计算八字排盘
    
    Args:
        name: 姓名
        gender: 性别（1=男，0=女）
        year: 出生年份
        month: 出生月份
        day: 出生日
        hour: 出生小时
        longitude: 经度（东经为正）
        is_solar: 是否使用真太阳时
    
    Returns:
        dict: 完整的八字排盘数据
    """
    # 真太阳时修正
    if is_solar:
        adjusted_hour = solar_time_adjust(hour, longitude)
    else:
        adjusted_hour = hour
    
    # 获取日对象
    day_obj = sxtwl.fromSolar(year, month, day)
    
    # 获取四柱
    year_gz = day_obj.getYearGZ()
    month_gz = day_obj.getMonthGZ()
    date_gz = day_obj.getDayGZ()
    
    # 转换为干支
    year_gan = get_gan_by_index(year_gz.tg)
    year_zhi = get_zhi_by_index(year_gz.dz)
    month_gan = get_gan_by_index(month_gz.tg)
    month_zhi = get_zhi_by_index(month_gz.dz)
    date_gan = get_gan_by_index(date_gz.tg)
    date_zhi = get_zhi_by_index(date_gz.dz)
    
    # 时柱
    shichen_idx = hour_to_shichen(adjusted_hour)
    shi_gz = sxtwl.getShiGz(date_gz.tg, shichen_idx)
    hour_gan = get_gan_by_index(shi_gz.tg)
    hour_zhi = get_zhi_by_index(shi_gz.dz)
    
    # 日主
    day_master = date_gan
    
    # 四柱数据
    si_zhu = {
        '年柱': f'{year_gan}{year_zhi}',
        '月柱': f'{month_gan}{month_zhi}',
        '日柱': f'{date_gan}{date_zhi}',
        '时柱': f'{hour_gan}{hour_zhi}'
    }
    
    # 四柱五行
    si_zhu_wuxing = {
        '年柱': {'天干': get_gan_wuxing(year_gan), '地支': get_zhi_wuxing(year_zhi)},
        '月柱': {'天干': get_gan_wuxing(month_gan), '地支': get_zhi_wuxing(month_zhi)},
        '日柱': {'天干': get_gan_wuxing(date_gan), '地支': get_zhi_wuxing(date_zhi)},
        '时柱': {'天干': get_gan_wuxing(hour_gan), '地支': get_zhi_wuxing(hour_zhi)}
    }
    
    # 十神分析
    shi_shen_data = {
        '年柱': {'天干': get_shi_shen(day_master, year_gan)},
        '月柱': {'天干': get_shi_shen(day_master, month_gan)},
        '日柱': {'天干': '日主'},
        '时柱': {'天干': get_shi_shen(day_master, hour_gan)}
    }
    
    # 五行统计
    wuxing_count = {'金': 0, '木': 0, '水': 0, '火': 0, '土': 0}
    for pillar, wx_data in si_zhu_wuxing.items():
        wuxing_count[wx_data['天干']] += 1
        wuxing_count[wx_data['地支']] += 1
    
    # 五行旺相休囚死
    month_zhi_wx = get_zhi_wuxing(month_zhi)
    wuxing_state = get_wang_xiang_xiu_kun_si(month_zhi_wx)
    
    # 流年（近10年）
    liu_nian = []
    current_year = year
    for i in range(10):
        ly_year = current_year + i
        ly_day = sxtwl.fromSolar(ly_year, month, day)
        ly_gz = ly_day.getYearGZ()
        ly_gan = get_gan_by_index(ly_gz.tg)
        ly_zhi = get_zhi_by_index(ly_gz.dz)
        liu_nian.append({
            '年份': ly_year,
            '干支': f'{ly_gan}{ly_zhi}',
            '天干': ly_gan,
            '地支': ly_zhi,
            '天干五行': get_gan_wuxing(ly_gan),
            '地支五行': get_zhi_wuxing(ly_zhi),
            '天干十神': get_shi_shen(day_master, ly_gan)
        })
    
    # 流月（当年12个月）
    liu_yue = []
    current_day = sxtwl.fromSolar(current_year, month, day)
    for m in range(1, 13):
        ly_day = sxtwl.fromSolar(current_year, m, 15)
        ly_gz = ly_day.getMonthGZ()
        ly_gan = get_gan_by_index(ly_gz.tg)
        ly_zhi = get_zhi_by_index(ly_gz.dz)
        liu_yue.append({
            '月份': m,
            '干支': f'{ly_gan}{ly_zhi}',
            '天干': ly_gan,
            '地支': ly_zhi,
            '天干五行': get_gan_wuxing(ly_gan),
            '地支五行': get_zhi_wuxing(ly_zhi),
            '天干十神': get_shi_shen(day_master, ly_gan)
        })
    
    # 组装结果
    result = {
        '基本信息': {
            '姓名': name,
            '性别': '男' if gender == 1 else '女',
            '出生时间': f'{year}-{month:02d}-{day:02d} {hour:02d}:00',
            '出生经度': f'{longitude}°E',
            '真太阳时': is_solar
        },
        '四柱八字': si_zhu,
        '四柱五行': si_zhu_wuxing,
        '十神分析': shi_shen_data,
        '五行统计': wuxing_count,
        '时令能量': {
            '月令': month_zhi,
            '月令五行': month_zhi_wx,
            '五行状态': wuxing_state
        },
        '流年运势': liu_nian,
        '流月运势': liu_yue
    }
    
    return result


def main():
    parser = argparse.ArgumentParser(description='八字排盘计算')
    parser.add_argument('--name', type=str, default='', help='姓名')
    parser.add_argument('--gender', type=int, required=True, choices=[0, 1], help='性别（1=男，0=女）')
    parser.add_argument('--year', type=int, required=True, help='出生年份')
    parser.add_argument('--month', type=int, required=True, help='出生月份')
    parser.add_argument('--day', type=int, required=True, help='出生日')
    parser.add_argument('--hour', type=int, required=True, help='出生小时（0-23）')
    parser.add_argument('--longitude', type=float, default=120.0, help='经度（东经为正，默认120.0）')
    parser.add_argument('--is-solar', action='store_true', help='启用真太阳时修正')
    
    args = parser.parse_args()
    
    # 计算八字
    result = calculate_bazi(
        name=args.name,
        gender=args.gender,
        year=args.year,
        month=args.month,
        day=args.day,
        hour=args.hour,
        longitude=args.longitude,
        is_solar=args.is_solar
    )
    
    # 输出JSON格式结果
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
