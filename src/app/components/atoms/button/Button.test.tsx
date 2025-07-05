import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import Button from "./Button"

describe("Button Component", () => {

  // 1: レンダリングとコンテンツの確認
  it("ボタンがテキストを正しく表示すること", () => {
    render(<Button>{`決定`}</Button>)
    // screen.getByRoleはアクセシビリティに基づいて要素を探すので推奨
    expect(screen.getByRole("button", {name: "決定"})).toBeInTheDocument()
  })

  it("ボタンがchildrenとして渡された要素を正しく表示すること", () => {
    render(<Button><span>送信アイコン</span></Button>)
    expect(screen.getByText("送信アイコン")).toBeInTheDocument()
  })

  // 2: イベントハンドリングの確認
  it("ボタンがクリックされたときにonClickハンドラが呼び出されること", () => {
    const handleClick = vi.fn() // vi.fn()でモック関数を作成
    render(<Button onClick={handleClick}>Click Me</Button>)
    // ボタンをクリック
    fireEvent.click(screen.getByRole("button", {name: "Click Me"}))
    // handleClick関数が1回呼び出されたことを確認
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})