# avmoo的图片服务器api解析


这是一个在获取小电影封面的时候遇到的问题，avmoo的图片服务器会在番号前加一些前缀，猜不透其中规律，所以检索了5600多个番号，序列号-前缀的关系爬了下来，保存在
<a href='./output/prefix_table.json'>这里</a>

# 具体说明

```
<ambg> = <prefix><bangou>
```
其中`<bangou>`是小写字母系列名加五位数字，高位补0

举例如ABC-137，对应格式为`abc00137`

`<prefix>`是特定前缀，如`stars`系列的前缀为`1`

以stars-123为例，
`<ambg> = 1stars00123` 
## 封面图
```
jp.netcdn.space/digital/video/<ambg>/<ambg>pl.jpg
```
## 封面小图
```
jp.netcdn.space/digital/video/<ambg>/<ambg>ps.jpg
```
## 预览图
```
jp.netcdn.space/digital/video/<ambg>/<ambg>-<index>.jpg
```
`<index>`为序号，有的小电影没有预览图
