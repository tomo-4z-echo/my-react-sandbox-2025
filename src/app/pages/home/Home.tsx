import { useReducer } from "react"
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CodeUseReducer } from "../../codes/codes"

// 環境確認
const isProd = import.meta.env.PROD

// 型定義
type CountState = {count: number}
type CountAction = {type: "increment"} | {type: "decrement"} | {type: "reset", payload: number}
type FuncCounterReducer = (state: CountState, action: CountAction) => CountState

// コード内のカスタムスタイル
// const customStyle = {
//   backgroundColor: "#1a202c",
//   fontSize: "0.875rem",
//   color: "#fff",
//   marginTop: "2rem",
//   padding: "1rem",
//   borderRadius: "0.5rem",
//   whiteSpace: "pre-wrap",
//   // overflowX: "auto"
// }

// アクションクリエイター（各アクションタイプに対応するメソッドを設定しオブジェクトを返す）
const ActionCreators = {
  increment: () => ({type: "increment"} as const),
  decrement: () => ({type: "decrement"} as const),
  reset: (payload: number) => ({type: "reset", payload} as const),
}

// カウンター還元器
const counterReducer: FuncCounterReducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return {count: state.count + 1};
    case "decrement":
      return {count: state.count - 1};
    case "reset":
      return {count: action.payload };
    default:
      throw new Error(`Unknown action type: ${(action as {type: string}).type}`);
  }
}

// 初期化遅延関数
const init = (initialCount: {count: number}): CountState => {
  // initialCountを受け取り複雑な計算を行う
  return {count: initialCount.count + 100};
}

// テストIDの設定関数
const setTestId = (idName: string): {"data-testid": string} | undefined => {
  if (!isProd) {
    return {"data-testid": idName}
  }
  return undefined
}

function Home() {

  // 減速器の初期値
  const initialCount = {count: 0};

  // useReducerの呼び出し
  // 第一引数：reducer --- callback(state, action)
  // 第二引数：initialState(or initialArg)
  // 第三引数：init(optional)
  const [state, dispatch] = useReducer(counterReducer, initialCount, init)

  return (
    <>
      <h1 className={"text-4xl font-bold"}>Home</h1>
      <section>
        <h2 className={"text-xl"}>useReducerを使用したカウンターについて</h2>
        <div className={"mt-4 p-4 border border-green-700 rounded-xl"}>
          <div className={"w-sm p-4 text-center bg-green-200 rounded-xl"} {...setTestId("count-display")}>{state.count}</div>
          <div className={"mt-2"}>
            <button type={"button"} onClick={() => dispatch(ActionCreators.reset(100))}>RESET</button>
            <button type={"button"} onClick={() => dispatch(ActionCreators.decrement())}>-</button>
            <button type={"button"} onClick={() => dispatch(ActionCreators.increment())}>+</button>
          </div>
        </div>
        <p className={"mt-8 text-xs"}>
          Reducerとは、英語の意味としては「減らす」「縮小する」という意味ですが、プログラミング的に言えば、特定のルールに基づいて、より小さなもの（あるいは新しいもの）に還元していく関数を指します。<br />
          ここでいう状態の還元とは、現在のStateとAction（何を変えたいか）の情報を受け取り、新しいStateを返すというを表します。<br />
          → Reactの流れとして関数型によるデータの取り扱いを推奨しているためステートは変更するものではなく新しく生成（イミュータビリティ：不変性の原則）していることに注意します。
        </p>
        {/* <SyntaxHighlighter language={'javascript'} style={docco} customStyle={customStyle}>
          {CodeUseReducer}
        </SyntaxHighlighter> */}
        <pre className={"w-auto bg-black text-sm text-green-500 mt-8 p-4 rounded-lg whitespace-pre-wrap"}>
          <code className={'block w-auto'}>{CodeUseReducer}</code>
        </pre>
      </section>
    </>
  )
}

export default Home