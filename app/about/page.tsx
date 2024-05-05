
'use client'

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pl-24 pr-24">
      <div className="text-4xl text-red-400">About</div>
      <div className="flex text-sm text-white"> this project is inspired by <div className="ml-1 text-blue-500 underline cursor-pointer text-sm" onClick={
        () => {
          window.open("https://www.kaggle.com/datasets/sachchitkunichetty/rvf10k", "_blank");
        }
      }>here</div> </div>
    </main>
  );
}
