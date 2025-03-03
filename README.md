# react-native-printer-imin

Native Module For iMin Printer SDK Plugin

## Installation

```sh
npm install react-native-printer-imin
```

## Usage

```js
import PrinterImin from 'react-native-printer-imin';

// ...
PrinterImin.initPrinter();

PrinterImin.getPrinterStatus().then((info) => {
  console.log(info);
});

PrinterImin.printText('hello world');
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

# 更新版本号
# 编辑 package.json 文件，将 "version": "0.8.0" 更新为 "version": "0.9.0"

# 提交更改
git add .
git commit -m "Update to version 0.9.0"

# 使用 release-it 发布版本
npm run release

# 登录 npm（如果尚未登录）
npm login

# 发布到 npm
npm publish

# 验证发布
npm info react-native-printer-imin

# 清理 npm 缓存
npm cache clean --force

# 清理 yarn 缓存
yarn cache clean

# 删除 node_modules 目录和 yarn.lock 文件
rm -rf node_modules yarn.lock

# 重新安装依赖项
yarn install

# 更新 Gradle 和 Kotlin 版本
# 编辑 android/build.gradle 文件，确保 Gradle 和 Kotlin 版本是最新的

# 重新构建项目
cd android
./gradlew clean
cd ..
yarn start --reset-cache

# 如果报错，根据报错提示下载相应的库文件，如：
yarn add react-native-screens@3.29.0

# 执行完成之后再次执行指令
yarn start --reset-cache

20250303
更新版本name：react-native-printer-imin：0.10.0 已发布
