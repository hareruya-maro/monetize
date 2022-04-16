# React Native Admob & RevenueCat Samples

このリポジトリは React Native で作成した Admob と RevenueCat のサンプルアプリケーションです。<br/>
以下の Zenn Book と合わせて参照いただけるように作成しました。

[React Native で作ったスマホアプリに Admob（広告）と Revenue Cat（課金）を使ってマネタイズする](https://zenn.dev/hal1986/books/react-native-monetize)

当リポジトリだけでも参考になると思いますが、こちらの本も参考にしていただけるとよりわかりやすいと思います。<br/>
（有料で恐縮ですが・・・）

# 起動方法

以下の手順で概ね起動すると思います。<br/>
React Native のプロジェクト（Expo Bare Workflow）ですので、通常の React Native プロジェクト同様に起動してください。

```sh
git clone https://github.com/hareruya-maro/monetize.git
cd monetize
yarn install
yarn run start

# iOSの場合は以下も実行
npx pod-install

# 以下いずれか
yarn run ios
yarn run android
```

なお、iOS のビルドがうまくいかない場合があります。
その場合、Xcode を開いて[Product]->[Clean]を実行することで解消することがあります。

# 不具合など

うまくいかない・動かないなどありましたら、Issue を作成していただければと思います。<br/>
または、[Twitter](https://twitter.com/HAL1986____)等でご連絡ください。
