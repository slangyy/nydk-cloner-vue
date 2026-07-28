# 阿里云法兰克福 OSS 与 CDN 正式部署指南

> 适用项目：南洋迪克 Vue 3 / Vite 静态网站  
> 目标用户：俄罗斯用户为主，中国大陆用户可兼容访问  
> 文档整理日期：2026-07-28

## 1. 最终推荐架构

```text
俄罗斯用户
  ↓
ru.new-nobel.com
  ↓
阿里云 CDN
加速区域：全球（不包含中国内地）
  ↓
德国（法兰克福）OSS Bucket
Region ID：eu-central-1
  ↓
Vue/Vite 构建产物 dist/
```

推荐使用两个域名：

| 用途 | 示例域名 | 指向 |
|---|---|---|
| 正式访问域名 | `ru.new-nobel.com` | CDN 提供的 CNAME |
| 源站测试域名 | `origin-ru.new-nobel.com` | 法兰克福 OSS 提供的 CNAME |

源站测试域名只用于部署检查和故障排查。正式用户统一访问 CDN 域名。

## 2. 方案说明

### 2.1 为什么使用法兰克福

阿里云 OSS 德国（法兰克福）地域的 Region ID 为：

```text
eu-central-1
```

外网 Endpoint 为：

```text
oss-eu-central-1.aliyuncs.com
```

法兰克福适合俄罗斯西部用户，例如莫斯科和圣彼得堡附近用户。俄罗斯远东地区与法兰克福距离较远，实际访问速度需要单独测试。

### 2.2 中国站账号与国际站账号

阿里云中国站与阿里云国际站是两套独立的账号、资源和账单系统，账号不能直接转换或共享资源。

阿里云中国站账号也可以购买德国（法兰克福）等海外地域资源。若当前中国站账号可以看到法兰克福 OSS，则无需为了部署重新注册国际站账号。

### 2.3 中国大陆能否访问

法兰克福 OSS 和“全球（不包含中国内地）”CDN 通常可以从中国大陆访问，但中国大陆用户会被调度至中国香港、日本、新加坡等境外节点，仍可能存在跨境延迟或丢包。

如果未来中国大陆用户也成为主要用户，应考虑单独建设中国大陆 OSS/CDN，并完成相应备案，而不是让所有用户共用法兰克福源站。

## 3. 正式部署前准备

准备以下信息：

| 项目 | 建议值 |
|---|---|
| OSS 地域 | 德国（法兰克福） |
| Region ID | `eu-central-1` |
| Bucket 名称 | 例如 `nydk-eu-web-随机字符串` |
| 已购根域名 | `new-nobel.com` |
| 正式域名 | `ru.new-nobel.com` |
| 源站测试域名 | `origin-ru.new-nobel.com` |
| CDN 加速区域 | 全球（不包含中国内地） |
| CDN 业务类型 | 图片小文件 |

正式部署前还应确认：

- 域名处于正常状态，并能够修改 DNS。
- 阿里云账号余额充足。
- 已开启费用预警。
- 网站 Bucket 是独立 Bucket，不存放敏感文件。
- 本地 Node.js 版本为 24。
- `npm run check` 能完整通过。
- 已安排俄罗斯当地网络进行访问测试。

## 4. 本地构建

### 4.1 Node.js 版本

项目根目录的 `.nvmrc` 指定：

```text
24
```

正式构建前检查：

```powershell
node -v
npm -v
```

`node -v` 应显示：

```text
v24.x.x
```

### 4.2 安装依赖并构建

在 Windows PowerShell 中执行：

```powershell
Set-Location 'D:\project\nydk-cloner-vue'
npm ci
npm run check
```

`npm run check` 会依次执行：

```text
ESLint
TypeScript / vue-tsc
Vite production build
```

全部成功后生成：

```text
D:\project\nydk-cloner-vue\dist
```

检查构建产物：

```powershell
Get-ChildItem '.\dist'
```

至少应看到：

```text
index.html
assets
```

不要将以下内容上传到 OSS：

```text
src/
node_modules/
package.json
package-lock.json
整个项目源码
```

只上传 `dist` 内的构建产物。

### 4.3 npm 常见错误

#### EBADENGINE

示例：

```text
Unsupported engine
current: node v22.11.0
```

处理方法：升级至 Node.js 24 LTS，关闭并重新打开终端，然后重新检查 `node -v`。

#### EPERM unlink

示例：

```text
EPERM: operation not permitted, unlink
lightningcss.win32-x64-msvc.node
```

一般是 Vite、Node 进程或安全软件正在占用原生模块。

处理步骤：

1. 关闭所有运行 `npm run dev`、`npm run preview` 或 Vite 的终端。
2. 重启 Windows。
3. 重启后先不要打开开发服务器。
4. 执行：

```powershell
Set-Location 'D:\project\nydk-cloner-vue'
Remove-Item -LiteralPath '.\node_modules' -Recurse -Force
npm ci
npm run check
```

不要删除 `package-lock.json`，也不要使用 `npm install --force` 规避问题。

## 5. 创建法兰克福 OSS Bucket

进入：

```text
阿里云控制台
→ 对象存储 OSS
→ Bucket 列表
→ 创建 Bucket
```

建议配置：

| 配置项 | 建议值 |
|---|---|
| Bucket 名称 | `nydk-eu-web-随机字符串` |
| 地域 | 德国（法兰克福） |
| Region ID | `eu-central-1` |
| 存储类型 | 标准存储 |
| 冗余类型 | 本地冗余 |
| 版本控制 | 测试阶段关闭；正式发布可按需开启 |
| 读写权限 | 先设置为私有 |
| 阻止公共访问 | 创建时先保持开启 |

Bucket 创建后不能修改地域。北京 Bucket 不能直接转换成法兰克福 Bucket，必须重新创建。

## 6. 上传网站文件

进入：

```text
法兰克福 Bucket
→ 文件管理/对象管理
→ 文件列表
→ 上传文件
```

操作步骤：

1. 上传位置选择 Bucket 根目录。
2. 打开本地 `D:\project\nydk-cloner-vue\dist`。
3. 选择 `dist` 里面的全部文件和文件夹。
4. 拖入 OSS 上传区域。
5. 文件 ACL 选择“继承 Bucket”。
6. 等待全部上传成功。

上传后的 Bucket 根目录必须直接包含：

```text
index.html
assets/
```

不能出现多余的 `dist/` 目录：

```text
dist/index.html
dist/assets/
```

OSS 不会自动解压 ZIP，因此不要只上传 `dist.zip`。

## 7. 配置 Vue SPA 静态网站

本项目使用 Vue Router history 模式。若未配置错误页回退，直接访问或刷新 `/design.html` 等页面会出现 404。

进入：

```text
法兰克福 Bucket
→ 数据管理
→ 静态页面
→ 设置
```

填写：

| 配置项 | 设置值 |
|---|---|
| 默认首页 | `index.html` |
| 子目录首页 | 不开通 |
| 默认 404 页 | `index.html` |
| 错误文档响应码 | `200` |

保存后，所有不存在的静态路径会返回 `index.html`，再由 Vue Router 处理路由。

## 8. 配置网站读取权限

### 8.1 当前推荐做法

为了先保证 OSS 静态网站和 SPA 路由正常工作，使用专用网站 Bucket，并设置：

```text
Bucket ACL：公共读
```

不要设置成“公共读写”。

操作路径：

```text
法兰克福 Bucket
→ 权限控制
→ 阻止公共访问
→ 关闭当前 Bucket 的阻止公共访问
```

然后：

```text
权限控制
→ 读写权限
→ 设置
→ 公共读
```

重要：

- 此 Bucket 只能存放公开网站文件。
- 不要存放 AccessKey、证书私钥、客户资料、源代码或备份文件。
- 如果账号级“全局阻止公共访问”开启，需先评估其他 Bucket，再决定是否调整。

### 8.2 检查 Object ACL

进入 `index.html` 详情，确认文件 ACL 为：

```text
继承 Bucket
```

Object ACL 的优先级高于 Bucket ACL。若 `index.html` 被单独设置为私有，仍可能出现 `AccessDenied`。

## 9. 配置源站测试域名

建议先使用：

```text
origin-ru.new-nobel.com
```

进入：

```text
法兰克福 Bucket
→ Bucket 配置
→ 域名管理
→ 绑定域名
```

绑定：

```text
origin-ru.new-nobel.com
```

必须先在 OSS Bucket 中绑定自定义域名，再配置 DNS CNAME。

在 DNS 中添加：

| 配置项 | 设置值 |
|---|---|
| 记录类型 | CNAME |
| 主机记录 | `origin-ru` |
| 记录值 | OSS 域名管理页面生成的 CNAME |
| TTL | 10 分钟 |

不要自行猜测 CNAME，始终复制 OSS 控制台显示的值。

等待域名管理状态显示“已生效”后测试：

```text
http://origin-ru.new-nobel.com/
http://origin-ru.new-nobel.com/index.html
http://origin-ru.new-nobel.com/design.html
http://origin-ru.new-nobel.com/material.html
```

每个子页面都应在浏览器中刷新一次。

## 10. 配置 CDN

进入：

```text
阿里云控制台
→ CDN
→ 域名管理
→ 添加域名
```

填写：

| 配置项 | 设置值 |
|---|---|
| 加速区域 | 全球（不包含中国内地） |
| 加速域名 | `ru.new-nobel.com` |
| 业务类型 | 图片小文件 |
| 源站类型 | OSS 域名 |
| 源站 | 选择法兰克福 Bucket |
| 优先级 | 主 |
| 权重 | 默认 |
| 回源端口 | 初次测试可使用默认值 |

若无法从下拉框选择 Bucket，手工填写：

```text
<Bucket名称>.oss-eu-central-1.aliyuncs.com
```

不要将 `ru.new-nobel.com` 填为源站，否则 CDN 会回源到自身，形成循环。

### 10.1 域名归属权验证

首次在 CDN 中添加 `new-nobel.com` 下的域名时，可能需要添加 TXT 记录。

按照 CDN 控制台提供的主机记录和值，在 DNS 中添加 TXT 记录。验证通过后再继续。

### 10.2 配置 CDN CNAME

CDN 域名添加成功后会提供类似：

```text
ru.new-nobel.com.w.kunlun*.com
```

在 DNS 中添加或修改：

| 配置项 | 设置值 |
|---|---|
| 记录类型 | CNAME |
| 主机记录 | `ru` |
| 记录值 | CDN 控制台提供的 CNAME |
| TTL | 10 分钟 |
| 状态 | 启用 |

如果 `ru` 已指向 OSS，不要创建第二条同名 CNAME，直接将原记录修改为 CDN CNAME。

## 11. CDN 缓存配置

进入：

```text
CDN
→ 域名管理
→ ru.new-nobel.com
→ 管理
→ 缓存配置
→ 缓存过期时间
```

建议规则：

| 匹配类型 | 匹配内容 | 缓存时间 |
|---|---|---|
| 文件路径 | `/index.html` | 0 秒/不缓存 |
| 文件后缀 | `html` | 5 分钟 |
| 文件后缀 | `js,css` | 7 天 |
| 文件后缀 | `jpg,jpeg,png,gif,webp,avif,svg,ico` | 30 天 |
| 文件后缀 | `woff,woff2,ttf` | 30 天 |
| 文件后缀 | `mp4` | 30 天 |

`index.html` 不应长时间缓存，否则新版本上线后可能出现旧 HTML 引用新旧资源不一致，造成白屏。

## 12. HTTPS 方案

### 12.1 测试阶段

测试阶段可以暂时使用：

```text
http://ru.new-nobel.com
```

网站静态页面、图片、视频和 Vue 路由均可工作。

### 12.2 正式环境

正式面向俄罗斯用户时应启用 HTTPS，避免：

- 浏览器显示“不安全”。
- 跨境链路中的内容被窃听或篡改。
- 部分浏览器功能无法使用。
- 搜索引擎和用户信任受到影响。

如果已经启用 CDN，证书应配置在：

```text
CDN 控制台
→ ru.new-nobel.com
→ HTTPS 配置
```

不要只在 OSS 域名管理中配置证书，因为用户请求首先到达 CDN。

### 12.3 阿里云个人测试证书

阿里云“个人测试证书（免费版）”可用于部署测试：

- 费用：0 元。
- 有效期：90 天。
- 类型：DV。
- 每张只保护一个域名。
- 每个实名认证主体每个自然年最多领取 20 张。
- 到期后需要重新申请和部署。

测试证书绑定域名：

```text
ru.new-nobel.com
```

正式业务建议使用可托管和自动更新的证书方案。

### 12.4 Certbot / Let's Encrypt

Certbot 可以通过 Let's Encrypt 为 `ru.new-nobel.com` 申请证书，但需要注意：

- Certbot 已停止原生 Windows 支持。
- Windows 环境应通过 WSL、Linux 服务器或其他受支持环境运行。
- OSS 本身不能运行 Certbot。
- 对 OSS/CDN 域名应优先使用 DNS-01 验证。
- 手工 DNS 验证不能自动续期，除非编写 DNS API 验证钩子。
- 续期后仍需把新证书重新部署到 CDN。

DNS-01 验证记录一般为：

```text
_acme-challenge.ru.new-nobel.com
```

证书签发后通常使用：

```text
fullchain.pem
privkey.pem
```

私钥 `privkey.pem` 属于敏感信息，禁止通过聊天、邮件或公开仓库传输。

### 12.5 CDN 强制 HTTPS

证书部署成功并验证 HTTPS 正常后，在 CDN 中开启：

```text
HTTP → HTTPS 强制跳转
```

不要在证书未生效前开启强制跳转，以免整个站点无法访问。

## 13. 正式发布与更新流程

每次发布执行：

### 13.1 本地检查

```powershell
Set-Location 'D:\project\nydk-cloner-vue'
npm ci
npm run check
```

确认构建成功。

### 13.2 上传顺序

建议：

1. 先上传 `dist/assets/` 和其他静态资源。
2. 确认资源上传成功。
3. 最后覆盖根目录 `index.html`。

这样可以降低发布过程中 HTML 已更新但资源尚未上传导致的白屏概率。

### 13.3 刷新 CDN

上传完成后进入：

```text
CDN
→ 刷新预热
→ URL 刷新
```

至少刷新：

```text
https://ru.new-nobel.com/index.html
```

如果 HTML 页面较多，可根据实际变更刷新对应 URL。Vite 生成的带哈希静态资源一般不需要刷新，因为文件名变化后会形成新的缓存键。

### 13.4 发布验证

依次验证：

```text
https://ru.new-nobel.com/
https://ru.new-nobel.com/design.html
https://ru.new-nobel.com/ExtremeSystem.html
https://ru.new-nobel.com/material.html
```

检查：

- 首页正常显示。
- 子页面直接访问正常。
- 子页面刷新后不出现 404。
- 图片正常加载。
- 视频可以播放。
- 移动端菜单和轮播正常。
- 浏览器无证书错误。
- 控制台无明显 JavaScript 错误。

## 14. 验证 CDN 是否生效

打开浏览器开发者工具：

```text
F12
→ Network
→ 选择图片、CSS 或 JavaScript 请求
→ Response Headers
```

检查：

```text
X-Cache: MISS
```

表示首次请求未命中缓存，CDN 已回源获取。

再次刷新后检查：

```text
X-Cache: HIT
```

表示请求已命中 CDN 缓存。

首次请求速度可能与源站相近，应在缓存命中后再次测试。

## 15. 俄罗斯当地测试

至少安排俄罗斯当地用户使用以下网络测试：

- 家庭宽带。
- 手机蜂窝网络。
- 不同运营商。
- 莫斯科或圣彼得堡等俄罗斯西部城市。
- 若业务涉及远东地区，再增加海参崴等地区测试。

重点记录：

- DNS 解析是否成功。
- 首屏加载时间。
- 图片是否丢失。
- 视频开始播放时间。
- 页面刷新是否 404。
- 高峰时段是否出现超时。
- HTTP 与 HTTPS 是否都可访问。

法兰克福不是俄罗斯境内地域，阿里云公开资料也未保证一定命中俄罗斯境内 CDN 节点，因此最终效果必须以俄罗斯当地实测为准。

## 16. 费用与安全保护

正式开放前配置：

- OSS 费用预警。
- CDN 费用预警。
- CDN 带宽封顶。
- CDN 请求量监控。
- OSS 外网流出流量监控。
- CDN Referer 防盗链。
- OSS 或 CDN 访问日志。
- 证书到期提醒。

防盗链白名单可先配置：

```text
*.new-nobel.com
new-nobel.com
```

初次上线建议允许空 Referer，避免用户直接输入网址或部分浏览器不发送 Referer 时被误拦截。稳定后再根据日志收紧策略。

不要把前端公开 Bucket 设置为公共读写。

## 17. 常见错误排查

### 17.1 AccessDenied

错误示例：

```xml
<Code>AccessDenied</Code>
<Message>Anonymous access is forbidden for this operation.</Message>
```

原因：

- Bucket 仍为私有。
- Bucket 的阻止公共访问仍开启。
- 账号级阻止公共访问仍开启。
- `index.html` Object ACL 被单独设置为私有。
- Bucket Policy 存在显式拒绝规则。

检查顺序：

1. 测试 `/index.html`。
2. 检查 Bucket 根目录是否存在 `index.html`。
3. 检查 Bucket ACL。
4. 检查阻止公共访问。
5. 检查 `index.html` Object ACL。
6. 检查 Bucket Policy。

### 17.2 InvalidBucketName

错误示例：

```xml
<Code>InvalidBucketName</Code>
<BucketName>index.html</BucketName>
```

若 `BucketName` 错误地显示为 `index.html`，通常不是实际 Bucket 名称有问题，而是：

- DNS 已配置 CNAME。
- 但实际访问域名没有在 OSS Bucket 中绑定。
- OSS 无法根据请求的 Host 找到 Bucket。

解决方法：

1. 在 OSS Bucket 的“域名管理”中绑定实际访问域名。
2. 等待绑定状态变为“已生效”。
3. 再配置或检查 DNS CNAME。

不能只让域名 B CNAME 到已绑定的域名 A。实际访问的每一个自定义域名都必须在 Bucket 中单独绑定。

### 17.3 NoSuchKey

原因通常是：

- `index.html` 不在根目录。
- 错误上传成了 `dist/index.html`。
- 请求路径对应文件不存在。
- SPA 默认 404 页没有配置为 `index.html`。

### 17.4 浏览器下载 HTML

使用 OSS 默认 Bucket 域名访问 HTML 时，浏览器可能强制下载而不是展示。

解决方法：

- 使用已绑定的 OSS 自定义域名。
- 或使用 CDN 加速域名。

### 17.5 子页面刷新 404

检查静态页面配置：

```text
默认首页：index.html
子目录首页：不开通
默认404页：index.html
错误文档响应码：200
```

### 17.6 CDN 页面仍是旧版本

处理方法：

1. 确认 OSS 中 `index.html` 已更新。
2. 刷新 CDN 的 `/index.html`。
3. 使用无痕窗口重新访问。
4. 检查浏览器缓存。
5. 检查 `X-Cache` 响应头。

### 17.7 HTTPS 证书不生效

检查：

- 证书是否包含 `ru.new-nobel.com`。
- 证书是否已签发且在有效期内。
- 使用 CDN 时，证书是否配置在 CDN 而不是只配置在 OSS。
- DNS 是否已指向 CDN CNAME。
- 是否过早开启强制 HTTPS。

## 18. 上线当日检查清单

### 构建

- [ ] Node.js 为 24.x。
- [ ] `npm ci` 成功。
- [ ] `npm run check` 成功。
- [ ] `dist/index.html` 存在。
- [ ] `dist/assets/` 存在。

### OSS

- [ ] Bucket 地域为德国（法兰克福）。
- [ ] Region ID 为 `eu-central-1`。
- [ ] 网站文件上传至 Bucket 根目录。
- [ ] 没有多余的 `dist/` 目录层级。
- [ ] 默认首页为 `index.html`。
- [ ] 默认 404 页为 `index.html`。
- [ ] 错误响应码为 200。
- [ ] Bucket 只包含公开网站资源。

### 域名

- [ ] 源站测试域名已绑定到 OSS。
- [ ] 正式域名已添加到 CDN。
- [ ] DNS CNAME 与控制台提供的值一致。
- [ ] 不存在同名 A/CNAME 冲突。

### CDN

- [ ] 加速区域为全球（不包含中国内地）。
- [ ] 业务类型为图片小文件。
- [ ] 源站为法兰克福 OSS Bucket 域名。
- [ ] 源站没有填写成 CDN 自身域名。
- [ ] `/index.html` 不长时间缓存。
- [ ] 静态资源缓存规则已设置。
- [ ] 带宽封顶和费用预警已设置。

### HTTPS

- [ ] 正式域名证书已签发。
- [ ] 证书已配置到 CDN。
- [ ] HTTPS 页面无证书告警。
- [ ] HTTPS 正常后再开启 HTTP → HTTPS 跳转。
- [ ] 已设置证书到期提醒或自动续期方案。

### 验证

- [ ] 首页正常。
- [ ] 子页面直接访问正常。
- [ ] 子页面刷新正常。
- [ ] 图片正常。
- [ ] 视频正常。
- [ ] 移动端正常。
- [ ] CDN 第二次请求可看到缓存命中。
- [ ] 已完成俄罗斯当地网络测试。

## 19. 官方参考资料

- [OSS 地域和 Endpoint](https://help.aliyun.com/zh/oss/user-guide/regions-and-endpoints)
- [阿里云中国站与国际站的区别](https://help.aliyun.com/zh/account/aliyun-vs-alibaba-cloud)
- [OSS 静态网站托管](https://help.aliyun.com/zh/oss/user-guide/hosting-static-websites)
- [通过自定义域名访问 OSS](https://help.aliyun.com/zh/oss/user-guide/access-buckets-via-custom-domain-names)
- [OSS 权限与访问控制](https://help.aliyun.com/zh/oss/user-guide/permissions-and-access-control-overview)
- [通过 HTTPS 访问 OSS](https://help.aliyun.com/zh/oss/user-guide/access-oss-by-https-protocol)
- [通过 CDN 加速访问 OSS](https://help.aliyun.com/zh/oss/user-guide/cdn-acceleration)
- [添加 CDN 加速域名](https://help.aliyun.com/zh/cdn/add-a-domain-name)
- [选择 CDN 加速区域](https://help.aliyun.com/zh/cdn/user-guide/change-the-accelerated-region)
- [配置 CDN 缓存过期时间](https://help.aliyun.com/zh/cdn/user-guide/configure-the-cdn-cache-expiration-time)
- [阿里云个人测试证书](https://help.aliyun.com/zh/ssl-certificate/purchase-an-individual-test-certificate)
- [Let’s Encrypt DNS-01 验证](https://letsencrypt.org/docs/challenge-types/)
- [Certbot 官方安装说明](https://certbot.eff.org/instructions)
