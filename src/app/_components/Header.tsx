"use client";

export default function Header() {
  const handleClickLogo = () => {
    window.location.reload();
  };
  return (
    <div className="w-screen h-14 border">
      <div
        className="cursor-pointer sticky top-0 text-black font-sans text-base font-semibold leading-6 tracking-normal py-4 px-14"
        onClick={handleClickLogo}
      >
        Munkhbayar&apos;s AI tools
      </div>
    </div>
  );
}
