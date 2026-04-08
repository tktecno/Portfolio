import { Link } from "react-router-dom";
import Seo from "./Seo";

export default function Success() {
  return (
    <>
      <Seo
        title="Message Sent | Tapash Roy"
        description="Confirmation page after sending a message to Tapash Roy."
        path="/success"
        robots="noindex,nofollow"
        type="website"
      />
      <div className="min-h-screen bg-[#f6f0e7] px-6 py-20 text-center text-slate-900">
        <div className="mx-auto max-w-xl rounded-[32px] border border-slate-900/10 bg-white/80 p-10 shadow-[0_24px_70px_rgba(82,65,43,0.12)] backdrop-blur-xl">
          <p className="section-kicker text-slate-500">Contact</p>
          <h1 className="display-font mt-4 text-4xl font-semibold">Message saved successfully.</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Thanks for reaching out. Your message is now stored in my portfolio inbox,
            and I&apos;ll get back to you as soon as I can.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    </>
  );
}
