# HTML格式展示页面模板

## 模板说明
本模板用于生成HTML格式的酒店投资分析展示页面，可在浏览器中直接查看并打印成PDF。

## HTML格式特点

### 1. 单文件结构
- 所有内容包含在一个HTML文件中
- CSS样式内嵌在`<style>`标签中
- 每页使用`<div class="slide">`包裹

### 2. 页面结构
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[城市名]酒店投资分析</title>
    <style>
        /* CSS样式 */
    </style>
</head>
<body>
    <div class="container">
        <!-- P1 -->
        <div class="slide">
            <h1 class="slide-title">大标题</h1>
            <div class="key-data">核心数据</div>
            <div class="table-container">
                <table>...</table>
            </div>
            <div class="slide-content">内容</div>
            <div class="insight-box">
                <p class="insight-title">洞察总结</p>
                <p class="insight-content">内容</p>
            </div>
            <p class="data-source">【来源】数据来源</p>
        </div>
        
        <!-- P2-P9... -->
    </div>
</body>
</html>
```

### 3. CSS样式规范

#### 主色调
- 主色：#667eea（紫色）
- 辅助色：#764ba2（深紫色渐变）
- 成功色：#27ae60（绿色）
- 警告色：#e74c3c（红色）
- 洞察框背景：#fff3cd（黄色）
- 洞察框文字：#856404（深黄）

#### 核心样式类
```css
.slide {
    background: white;
    margin-bottom: 50px;
    padding: 50px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
    page-break-after: always;
}

.slide-title {
    font-size: 32px;
    color: #667eea;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 4px solid #667eea;
    font-weight: bold;
}

.key-data {
    font-size: 18px;
    color: #667eea;
    font-weight: bold;
    margin: 20px 0;
}

.table-container {
    margin: 25px 0;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 15px;
}

th {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: bold;
    padding: 12px 15px;
}

td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: center;
}

tr:nth-child(even) {
    background: #f9f9f9;
}

tr:hover {
    background: #f0f4ff;
}

.slide-content {
    margin-bottom: 25px;
    font-size: 16px;
    line-height: 1.9;
    text-align: justify;
}

.insight-box {
    background: #fff3cd;
    border-left: 5px solid #ffc107;
    padding: 20px 25px;
    margin: 30px 0;
    border-radius: 5px;
}

.insight-title {
    font-weight: bold;
    color: #856404;
    margin-bottom: 10px;
    font-size: 18px;
}

.insight-content {
    color: #856404;
    line-height: 1.7;
    font-size: 17px;
}

.highlight {
    color: #e74c3c;
    font-weight: bold;
}

.positive {
    color: #27ae60;
    font-weight: bold;
}

.data-source {
    font-size: 13px;
    color: #999;
    margin-top: 25px;
    padding-top: 15px;
    border-top: 1px dashed #ddd;
}
```

#### 打印样式
```css
@media print {
    body {
        background: white;
    }
    .slide {
        box-shadow: none;
        margin-bottom: 0;
    }
}
```

## 页面结构规范

### 每页必需元素
1. `<!-- PX: 页面标题 -->`：HTML注释标记页面编号
2. `<h1 class="slide-title">`：大标题（观点性标题，15-20字）
3. `<div class="key-data">`：核心数据（可选）
4. `<div class="table-container"><table>...</table></div>`：数据表格（可选）
5. `<div class="slide-content">`：正文内容（可选）
6. `<div class="insight-box">`：洞察总结（必需）
7. `<p class="data-source">`：数据来源（必需）

### P1：城市宏观经济概况
```html
<!-- P1: 城市宏观经济概况 -->
<div class="slide">
    <h1 class="slide-title">经济稳健增长，奠定酒店市场坚实基础</h1>
    
    <div class="key-data">核心数据</div>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>指标</th>
                    <th>2024年</th>
                    <th>增速</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>GDP</td>
                    <td>XX,XXX亿元</td>
                    <td><span class="positive">+X.X%</span></td>
                </tr>
                <tr>
                    <td>人均GDP</td>
                    <td>XX,XXX元</td>
                    <td>+X.X%</td>
                </tr>
                <tr>
                    <td>第三产业占比</td>
                    <td>XX%</td>
                    <td><span class="positive">创历史新高</span></td>
                </tr>
                <tr>
                    <td>常住人口</td>
                    <td>XXX万人</td>
                    <td>城镇化率XX%</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div class="slide-content">
        <strong>产业结构优化</strong>
        <ul>
            <li>第二产业占比XX%，制造业集群优势明显</li>
            <li>第三产业首次突破XXX亿元，服务业持续扩张</li>
            <li>规模以上民营工业企业增加值增长X.X%</li>
        </ul>
    </div>
    
    <div class="insight-box">
        <p class="insight-title">洞察总结</p>
        <p class="insight-content">
            经济增速领跑全国万亿城市，民营经济与文旅产业双轮驱动酒店需求，市场基本面良好。
        </p>
    </div>
    
    <p class="data-source">【来源】XX市统计局2024年统计公报</p>
</div>
```

### P2：旅游市场分析
```html
<!-- P2: 旅游市场分析 -->
<div class="slide">
    <h1 class="slide-title">文旅消费复苏强劲，客流引领增长</h1>
    
    <div class="key-data">核心数据</div>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>指标</th>
                    <th>2024年</th>
                    <th>增速</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>游客接待量</td>
                    <td>XX,XXX万人次</td>
                    <td><span class="positive">+X.X%</span></td>
                </tr>
                <tr>
                    <td>旅游收入</td>
                    <td>XXX亿元</td>
                    <td><span class="positive">+X.X%</span></td>
                </tr>
                <tr>
                    <td>人均消费</td>
                    <td>XXX元</td>
                    <td>+X.X%</td>
                </tr>
                <tr>
                    <td>过夜游客占比</td>
                    <td>XX%</td>
                    <td>同比提升</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div class="slide-content">
        <strong>流量热点TOP3</strong>
        <ul>
            <li>景点A：网络传播量超XXX亿，日均客流X万+</li>
            <li>景点B：日均客流XX万+，节假日高峰超XX万</li>
            <li>景点C：年接待游客超XXX万人次</li>
        </ul>
    </div>
    
    <div class="insight-box">
        <p class="insight-title">洞察总结</p>
        <p class="insight-content">
            世遗效应持续释放，游客量创历史新高，旅游市场增长潜力显著，中档酒店需求旺盛。
        </p>
    </div>
    
    <p class="data-source">【来源】XX市文化和旅游局2024年旅游数据</p>
</div>
```

### P9：综合投资建议
```html
<!-- P9: 综合投资建议 -->
<div class="slide">
    <h1 class="slide-title">XX市投资价值凸显，把握三大投资机遇</h1>
    
    <div class="slide-content">
        <strong>三大投资机遇</strong>
        <ol>
            <li>
                <strong>卡位流量入口</strong>
                <p>优先布局文旅流量、特色产业，重点在[商圈A]、[商圈B]商圈</p>
            </li>
            <li>
                <strong>中档升级窗口</strong>
                <p>[类型][改造/升级]中档，把握城市商圈升级投资风口</p>
            </li>
            <li>
                <strong>老店翻红档口</strong>
                <p>2-4万/间改造，可以大幅提升卖价，商业模型最优</p>
            </li>
        </ol>
    </div>
    
    <div class="slide-content">
        <strong>执行路径</strong>
        <ul>
            <li>第1-2年：核心商圈布局[X]家中高端酒店</li>
            <li>第3-4年：机会商圈布局[X]家中端酒店</li>
            <li>第5年：交通枢纽布局[X]家商务快捷酒店</li>
        </ul>
    </div>
    
    <div class="insight-box">
        <p class="insight-title">洞察总结</p>
        <p class="insight-content">
            流量入口+中档升级+老店翻红，三管齐下把握XX市投资红利。
        </p>
    </div>
    
    <p class="data-source">【来源】综合分析结论</p>
</div>
```

## HTML格式要求

### 1. 代码规范
- 使用UTF-8编码
- HTML5 DOCTYPE声明
- 语义化标签（h1, div, p, ul, ol, li等）
- CSS类名统一（slide, slide-title, key-data, table-container等）

### 2. 内容规范
- 大标题：观点性标题，15-20字，使用`.slide-title`
- 核心数据：使用`.key-data`标注
- 表格：使用`.table-container`包裹，表格用`<table>`
- 正文内容：使用`.slide-content`
- 洞察总结：使用`.insight-box`，包含`.insight-title`和`.insight-content`
- 数据来源：使用`.data-source`，灰色小字，放在页面底部

### 3. 数据标注
- 正数增长：使用`<span class="positive">+X.X%</span>`
- 负数下降：使用`<span class="highlight">-X.X%</span>`
- 强调数据：使用`<span class="positive">`或`<span class="highlight">`

### 4. 页面数量
- 一线城市：12页（P1-P9，其中P6/P7/P8各分2页）
- 新一线+二三线城市：12页（P1-P9，其中P6/P7/P8各分2页）

### 5. 文件命名
- 文件名格式：[城市名]中档酒店投资分析.html
- 示例：泉州中档酒店投资分析.html

## HTML格式优势

1. **易于分享**：单个HTML文件，可直接通过邮件、微信等分享
2. **跨平台**：可在任何现代浏览器中打开
3. **可打印**：支持打印成PDF，适合归档和汇报
4. **响应式**：支持移动设备查看
5. **视觉效果好**：CSS样式支持渐变、阴影、动画等效果
6. **易于维护**：文本格式，易于编辑和修改

## 与PPT格式的区别

| 特性 | HTML格式 | PPT格式 |
|------|---------|---------|
| 文件大小 | 小（<500KB） | 大（5-20MB） |
| 打印 | 原生支持 | 需导出 |
| 分享 | 邮件/链接 | 需附件 |
| 编辑 | 文本编辑器 | 需PPT软件 |
| 兼容性 | 任何浏览器 | 需特定软件 |
| 动画效果 | 有限 | 丰富 |
| 表现力 | 中等 | 高 |

## 使用建议

1. **生成HTML**：智能体生成完整的HTML代码
2. **查看效果**：在浏览器中打开HTML文件查看效果
3. **打印PDF**：使用浏览器的打印功能，选择"另存为PDF"
4. **分享**：直接分享HTML文件或导出的PDF

## 参考示例

完整的HTML示例请参考：`assets/泉州中档酒店投资分析PPT-22c3c9a3fb.html`

该示例包含：
- 完整的CSS样式
- 12页酒店投资分析内容
- 数据表格、洞察总结、数据来源标注
- 打印样式支持
