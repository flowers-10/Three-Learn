# 14. Go Live 上线
## 介绍
在您像旅程式学习的这个阶段，您可能想要分享您所构建的内容。屏幕截图或视频是一个好的开始，但您的朋友和家人会更喜欢互动版本。是时候让那些 WebGL 体验上线到互联网了。
## 解决方案 
多年前，我们没有那么多解决方案来让网站上线。现在，它变得有点复杂，但我们也可以使用许多方便的解决方案。
## 传统方案
在下一节中，我们将使用一种解决方案，它不需要您订阅“传统”解决方案，例如 OVH、1and1 或 Gandhi，您必须使用 FTP 客户端手动上传文件。然而，你们中的一些人可能已经拥有像其中一个这样的云服务器主机，而您只想获取您应该上传的那些文件。
你不能简单地将整个项目连同`node_modules/`文件夹和 Vite 配置放在主机上。首先，您需要在该 webpack 配置中“build”您的项目，以便创建浏览器可以解释的 HTML、CSS、JS 和static文件。
要构建您的项目，请`npm run build`在终端中运行。
`/package.json`此命令将运行位于属性文件中的脚本`scripts > build`。
等待几秒钟，文件应该在执行`/dist/`时创建的文件夹中可用`build`。然后，您可以使用您最喜欢的 FTP 客户端将这些文件放到网上。
每当您想上传新版本时，`npm run build`即使该`/dist/`文件夹已经存在，也要再次运行而且覆盖掉。
我们不会介绍这些“传统”托管解决方案之一的设置，因为我们将在下一节中使用更合适的解决方案。
## [Vercel](https://vercel.com/)
[Vercel](https://vercel.com/)是那些“现代”托管解决方案之一，具有持续集成（测试、部署和其他类似开发步骤的自动化）。它对开发人员非常友好且易于设置。
您可以将它用于复杂的项目，也可以用于非常简单的“单页”网站，例如我们在本课程中创建的网站。
在继续之前，请注意我 和 Vercel 之间没有合作关系（没给我打钱）。我只是喜欢将它用于我的小创意体验。
此外，我们还应该提及其他不错的替代方案，例如[Netlify](https://www.netlify.com/)和[GitHub Pages](https://pages.github.com/)。
另请注意，您可能会发现本课程的其余部分与您自己使用 Vercel 的体验之间存在细微差别。这是一个全新的解决方案，开发人员不断改进服务。
### 创建一个帐户
首先，转到[vercel.com](https://vercel.com/)并创建一个帐户。
您可以选择不同的登录方法，例如GitHub连接、GitLab连接、Bitbucket连接或经典电子邮件访问。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655844561-79255c31-246a-4612-9db1-9efd4a2ca737.png#averageHue=%23f8f8f8&clientId=u815992b1-3e00-4&from=paste&id=ue3b52217&originHeight=1110&originWidth=1448&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=udb2a1b70-8055-46fe-8ccf-3797e4065ac&title=)
“连接”选项可能是不错的选择，因为 Vercel 的一个重要特性是它允许持续集成作为版本控制解决方案。如果您不知道[GitHub](https://github.com/)、[GitLab](https://about.gitlab.com/)和[Bitbucket](https://bitbucket.org/)是什么，它们是您的 Git 存储库的托管解决方案。换句话说，这是大多数开发人员保存代码的地方。
如果你熟悉他们，你完全可以去做。这将简化流程，Vercel 将自动获取您的存储库，帮助您设置实时版本并在您将新版本推送到存储库时自动更新它。您甚至可以选择一个特定的分支。
对于那些不熟悉 Git 托管解决方案的人，请不要担心，我们将让大多数学生都能访问这节课，并选择电子邮件解决方案。即使您当前正在使用 Git，此解决方案仍然可以正常工作。单击电子邮件链接：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655844672-944417ef-d005-4cb3-8155-55c9921195c6.png#averageHue=%23fefefe&clientId=u815992b1-3e00-4&from=paste&id=u767082e2&originHeight=194&originWidth=932&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1666b9ca-5d1f-48ec-8ef8-36a3ab6cf8e&title=)
然后输入您的电子邮件地址并按照以下步骤创建您的帐户：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655844533-2a621b56-71d5-480e-a2e0-d5bf56d2102b.png#averageHue=%23bbd7f9&clientId=u815992b1-3e00-4&from=paste&id=ubae8a294&originHeight=300&originWidth=872&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u00bcb654-d3bf-4b0f-9222-a8b921271b5&title=)
Vercel 将向您发送一封带有链接的确认电子邮件，以便您可以登录。单击该链接后，您应该已连接。
### 将 Vercel 添加到您的项目
Vercel 可作为[NPM 模块](https://www.npmjs.com/package/vercel)使用，您可以将其全局安装在您的计算机上或作为项目的依赖项。我们将把它添加到项目中，这样，如果我们想在另一台计算机上设置项目或者我们想与其他开发人员共享它，我们就不必在那台计算机上安装任何东西。
在项目的终端中，运行`npm install vercel.` 片刻之后，安装将完成，但您可能会注意到存在一些漏洞。终端将指示您运行审核以修复它们。您通常可以忽略这些警告，因为它们可能是误报。
尽管我们将 Vercel 添加为项目依赖项，而不是全局依赖项，但它在终端中仍然不可用。您的 NPM 脚本可以访问它，但您首先需要进行以下更改。
在 中`package.json`，在`"scripts"`属性中，添加一个名为的新脚本`"deploy"`并写`"vercel --prod"`为值（不要忘记在脚本,之后`"dev"`）：

```javascript
{
  "scripts": {
    // ...
    "deploy": "vercel --prod"
  },
}
```
如果您使用`"vercel"`不带 的命令`—-prod`，代码将发布在预览 URL 上，以便您可以在投入生产之前对其进行测试。虽然这是一个有趣的功能，但我们不需要预览版。
从现在开始，如果你想在线部署你的项目，你只需`npm run deploy`在终端中运行即可。
### 首次部署
第一次部署项目时，Vercel 会要求您提供一些信息，以便连接到您的帐户并设置项目。
在终端中，运行`npm run deploy`
如果之前，您选择使用电子邮件连接，请使用向上和向下箭头选择`Continue with Email`并按`Enter`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655844456-67de9497-07f7-4410-bfc6-8d333ac26f1b.png#averageHue=%232d3242&clientId=u815992b1-3e00-4&from=paste&id=u48828f5d&originHeight=616&originWidth=1084&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua94fb7de-efd6-4f8c-ae1d-cb08fbf5fab&title=)
然后写你的电子邮件：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655844489-d999caae-1ad3-4115-9182-1858a5e2cee8.png#averageHue=%232e3243&clientId=u815992b1-3e00-4&from=paste&id=u1cc9e91d&originHeight=236&originWidth=1200&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u82936eda-4907-45e5-a24a-f0d769d4b06&title=)
Vercel 会像之前一样向您发送电子邮件。单击该电子邮件中的可用链接，终端应自动继续下一步：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655847104-2e44777e-1597-4855-ab47-9f6a341acccc.png#averageHue=%23323747&clientId=u815992b1-3e00-4&from=paste&id=u4488c756&originHeight=128&originWidth=1902&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u48275867-5c74-4384-98cc-f68e60a9cee&title=)
此时，系统会提示您确认设置和部署当前文件夹。选择`Y`并按下`Enter`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655847133-b909e6d9-6338-47a8-87c2-5117bbc66ab9.png#averageHue=%23394458&clientId=u815992b1-3e00-4&from=paste&id=ub73b18aa&originHeight=56&originWidth=1400&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf1537fd6-4f8c-4706-959f-70303969039&title=)
您的账户可以关联多个范围和团队。如果您刚刚创建帐户，则应该只有一个。按下选择它`Enter`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655848739-d92b3c44-6a70-466d-9765-c51b267f922f.png#averageHue=%23333c4e&clientId=u815992b1-3e00-4&from=paste&id=u54932bb8&originHeight=90&originWidth=818&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0fc5595e-885c-48cd-ba5a-bcb4f450b35&title=)
在我们的例子中，我们正在创建一个新项目，我们不想将我们的代码与现有项目相关联。写下`n`并按下`Enter`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655848714-ac44816e-d40c-41f9-869f-533e48f8cad8.png#averageHue=%232f3344&clientId=u815992b1-3e00-4&from=paste&id=ue7698da6&originHeight=46&originWidth=780&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u4266ff35-3027-460b-bf11-06b71550ddb&title=)
Vercel 将尝试猜测项目名称，但您可以将其更改为任何您想要的名称。您可以使用小写字母、数字和破折号。按`Enter`:
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655848692-c4fa7d8f-50b5-4bb2-90ea-73bcb3b73368.png#averageHue=%23323646&clientId=u815992b1-3e00-4&from=paste&id=ue161cc4d&originHeight=42&originWidth=1156&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u2576400e-ac2e-467a-9cbd-5078f7d5074&title=)
如果您在项目文件夹的根目录下执行该代码，您可以保留`./`并按下`Enter`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655849825-dced2528-9a05-4698-9892-ab0268d9d82e.png#averageHue=%23323646&clientId=u815992b1-3e00-4&from=paste&id=u72ade627&originHeight=42&originWidth=942&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9c6c90bb-8a50-4d6f-8bf9-cdc34b5617a&title=)
Vercel 对构建命令或捆绑目标文件夹等内容具有默认设置。我们需要覆盖那些。写下`y`并按下`Enter`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655850112-e7d6b8d3-2075-4888-86cc-a2f20dc8e52b.png#averageHue=%23323646&clientId=u815992b1-3e00-4&from=paste&id=u9f380535&originHeight=214&originWidth=1230&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1e5a68f4-3c59-4545-93d1-802ff062c7f&title=)
Vercel默认`Build Command`是`npm run build`，我们也一样。但是 Vercel 的默认值`Output Directory`是，`public`而我们的是`dist`.
使用向上和向下箭头移动光标`Output Directory`并按下`Space`以检查它。然后，按`Enter`进入下一步：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655851657-d88b10f1-4f7a-4ad9-a755-3287a4755786.png#averageHue=%232f3648&clientId=u815992b1-3e00-4&from=paste&id=u6e2e8211&originHeight=170&originWidth=1304&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uaff8c6ea-72e5-43d9-8321-1994aed4917&title=)
写下`dist`并按下`Enter`：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655851609-26c5fcc3-ebb9-46ad-8c4f-9c66da67492f.png#averageHue=%23303444&clientId=u815992b1-3e00-4&from=paste&id=uad41123a&originHeight=54&originWidth=770&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ubdf497f0-ae97-40b8-8601-f3b51d94e89&title=)
就是这样，您的网站应该开始在 Vercel 上部署。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655851627-e15337e7-b731-4c63-9fc7-59f931f00d29.png#averageHue=%232f3344&clientId=u815992b1-3e00-4&from=paste&id=u66b60f14&originHeight=168&originWidth=1874&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ucaa557f4-7bc8-4f0a-b6fd-e709fac54fa&title=)
等一两分钟，Vercel 会提示您提供实时版本的 URL。
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655853225-8b04d8db-a50e-4f80-985f-8dbd56d55c68.png#averageHue=%233a3f53&clientId=u815992b1-3e00-4&from=paste&id=ue18665cf&originHeight=38&originWidth=1756&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u09192767-d379-40d6-9798-4eb63edbda6&title=)
Vercel 应该会自动将该 URL 复制到您的剪贴板。您可以将其粘贴到您最喜欢的浏览器中并测试实时版本。
## 进一步设置 
前往[vercel.com](https://vercel.com/)并确保您已登录。
您应该有权访问[仪表板](https://vercel.com/dashboard)并查看您的项目：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655853186-30a9ac4b-294c-4398-8cca-dc8a7ed68325.png#averageHue=%23f8f8f8&clientId=u815992b1-3e00-4&from=paste&id=ub53bf90a&originHeight=842&originWidth=1112&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=udefa4ed3-fb95-47dd-acc2-da31ec5a753&title=)
单击您的项目。这是您接下来应该看到的屏幕：
![](https://cdn.nlark.com/yuque/0/2023/png/35159616/1684655854879-959b3f0c-849a-4352-97a2-999b3418d750.png#averageHue=%23d5d4d4&clientId=u815992b1-3e00-4&from=paste&id=ua2dcafeb&originHeight=1668&originWidth=2106&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u02a0b573-fabe-454d-8243-6e434c12c2c&title=)
在这里，您可以查看项目预览、获取有关最新构建的信息、更改部署首选项、查看潜在错误等。
您甚至可以添加自定义域，但我们不会在本课中介绍。
## 价钱
但是等等，一切都是免费的吗？
是和不是。如果你只是想与世界分享你正在构建的那些很酷的 WebGL 体验而没有商业意图，那么免费计划（名为Hobby）应该绰绰有余。您可以使用我们刚刚看到的所有功能创建任意数量的项目。
但是，如果您有商业意图，或者想要使用特定功能，例如团队、预览密码保护、防火墙等，您可能需要使用付费计划。
此外，Hobby计划有带宽和构建时间限制。这意味着如果您的网站受到很多关注或者您部署了太多次，您将不得不切换到付费计划。
计划和定价可在此处找到：[vercel.com/pricing](https://vercel.com/pricing)
## 分享！
现在没有借口了。与全世界分享您的作品，不要忘记`#threejsJourney`在 Twitter 上使用主题标签。

