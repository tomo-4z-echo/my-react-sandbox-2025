export const CodeUseReducer = `
import { useReducer } from 'react';

// 型定義
type CountState = {count: number};
type CountAction = {type: "increment"} | {type: "decrement"} | {type: "reset", payload: number};
type FuncCounterReducer = (state: CountState, action: CountAction) => CountState;

// アクションクリエイター
const actionCreator = {
  increment: () => ({type: "increment"} as const),
  decrement: () => ({type: "decrement"} as const),
  reset: (payload: number) => ({type: "reset", payload} as const),
};

// カウンター還元器
const counterReducer: FuncCounterReducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return {count: state.count + 1};
    case "decrement":
      return {count: state.count - 1};
    case "reset":
      return {count: action.payload};
    default:
      throw new Error(\`Unknown action type: \${(action as {type: string}).type}\`);
  }
};

// 初期化遅延関数
const init = (initialCount: {count: number}): CountState => {
  return {count: initialCount + 100};
};

function Home() {

  const initialCount = {count: 0};
  const [state, dispatch] = useReducer(reducer, initialArg, init);

  return (
    <>
      <h1>TITLE</h1>
      <section>
        <div>{state.count}</div>
        <div>
          <button type={'button'} onClick={() => dispatch(actionCreator.reset(0))}>RESET</button>
          <button type={'button'} onClick={() => dispatch(actionCreator.decrement())}>-</button>
          <button type={'button'} onClick={() => dispatch(actionCreator.increment())}>+</button>
        </div>
      </section>
    </>
  )
}`;