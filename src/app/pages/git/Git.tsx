function Git() {
  return (
    <>
      <h1 className={"text-4xl font-bold"}>Git連携</h1>
      <section>
        <h2 className={"text-xl"}>SSHキーペアを作成し公開鍵をGithubに登録する</h2>
        <div>
          <pre>
            <code>ssh-keygen -t ed25519 -C "your_email@example.com"</code>
          </pre>
          <p>コマンドを入力すると秘密鍵に名前を付けられます。そのままEnterした場合はid_ed25519がデフォルトになります。</p>
          <p>SSHエージェントを起動しパスフレーズを自動認証状態にする</p>
          <pre>
            <code>{`eval "$(ssh-agent -s)"`}</code>
            <code>{`ssh-add ~/.ssh/<キー名>`}</code>
          </pre>
        </div>
      </section>
    </>
  )
}

export default Git