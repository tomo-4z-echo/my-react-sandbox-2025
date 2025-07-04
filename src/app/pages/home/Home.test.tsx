import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Home from "./Home"

describe("Home Component", () => {

  // itで個別のテストケースを定義
  it("初期表示でカウントが100になっていることを確認", () => {
    // コンポーネントをレンダリング
    render(<Home />);

    // 画面上に100というテキストが表示されていることを確認
    // init関数でinitialCount(0)に100を足しているので初期表示は100になる
    expect(screen.getByTestId("count-display")).toHaveTextContent("100");
  });

  it("[+]ボタンをクリックするとカウントが増加することを確認", () => {
    render(<Home />);
    const incrementButton = screen.getByRole("button", {name: "+"});
    const countDisplay = screen.getByTestId("count-display");
    // optional: 初期値確認
    expect(countDisplay).toHaveTextContent(/^100$/);
    // [+]ボタンをクリック
    fireEvent.click(incrementButton);
    // カウントが101になっていることを確認
    expect(countDisplay).toHaveTextContent(/^101$/);
  });

  it("[-]ボタンをクリックするとカウントが減少することを確認", () => {
    render(<Home />);
    const decrementButton = screen.getByRole("button", {name: "-"});
    const countDisplay = screen.getByTestId("count-display");
    // optional: 初期値確認
    expect(countDisplay).toHaveTextContent(/^100$/);
    // [-]ボタンをクリック
    fireEvent.click(decrementButton);
    // カウントが99になっていることを確認
    expect(countDisplay).toHaveTextContent(/^99$/);
  });

  it("[RESET]ボタンをクリックするとカウントが100になることを確認", () => {
    render(<Home />);
    const incrementButton = screen.getByRole("button", {name: "+"});
    const resetButton = screen.getByRole("button", {name: "RESET"});
    const countDisplay = screen.getByTestId("count-display");
    // カウントを一度増やす
    fireEvent.click(incrementButton); // カウントが101になる
    expect(countDisplay).toHaveTextContent(/^101$/);
    // [RESET]ボタンをクリック
    fireEvent.click(resetButton); // カウントが100になる
    expect(countDisplay).toHaveTextContent(/^100$/);
  });
})