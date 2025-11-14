"use client";
import { Suspense } from "react";

export default function ErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg p-6 space-y-4 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-500 text-3xl">
            !
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">ページを表示できません</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            予期しないエラーでページの読み込みに失敗しました。しばらく待ってから再度お試しください。
          </p>
          <p className="text-xs text-gray-500">
            問題が解決しない場合は、ホームに戻るか運営までご連絡ください。
          </p>
        </div>
      </div>
    </Suspense>
  );
}
