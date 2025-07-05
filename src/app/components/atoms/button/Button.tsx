import { type ButtonHTMLAttributes } from "react"

type Mold = "confirm" | "back" | undefined

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  mold?: Mold
  example?: string
}

// ボタンのベースクラス
const baseButtonClasses: string[] = ["py-2", "px-4", "rounded-md", "font-normal", "border-none", "cursor-pointer", "transition-colors", "duration-300"]

// moldによるボタン設定の更新
const updateMoldStyle = (mold: Mold): string[] => {
  switch (mold) {
    case "confirm":
      return ["min-w-[40px]", "bg-blue-500", "text-white", "hover:bg-blue-600"]
    case "back":
      return ["min-w-[40px]", "bg-gray-300", "text-gray-800", "hover:bg-gray-400"]
    default:
      return []
  }
}

function Button({ children, className, mold, type, ...rest}: ButtonProps) {

  // タイプ設定
  const buttonType = type ?? "button"

  // クラス情報を配列化する
  const preClasses = className?.split(" ") ?? []
  // moldを確認して追加要素を格納
  const classes = [...baseButtonClasses, ...updateMoldStyle(mold), ...preClasses]

  return (
    <>
      <button
        type={buttonType}
        className={classes.filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </button>
    </>
  )
}

export default Button