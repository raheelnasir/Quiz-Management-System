import Image from "next/image";
import HomeHeader from "./homecomponents/StateReloader";
import AdminLayout from "./layouts/AdminLayout";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HomeHeader />
      <div className="flex flex-wrap  bg-white">
        <div style={{ flex: "1 0 400px" }}>
          <h1 style={{ fontSize: "40px", fontWeight: "bold", fontFamily: "cursive" }}>
            Journey Through Knowledge
          </h1>
          <p style={{ fontSize: "15px" }}>
            Welcome to "Journey Through Knowledge," an interactive quiz designed
            to entertain and educate you on a variety of fascinating topics.
            This quiz isn't just about testing your knowledge; it's about
            embarking on a journey of discovery and learning. Whether you're a
            seasoned scholar or a curious beginner, there's something here for
            everyone. So, let's dive in and explore the realms of knowledge
            together!
          </p>
          <div className="mt-3">
            <Link href={"/quiz"} className="btn purple">Start Quiz</Link>

            <Link href="/auth" className=" btn outline-button" style={{ borderRadius: "7px", }}>
              Create Account
            </Link>
          </div>
        </div>
        <div style={{ flex: "1 0 400px" }}>
          <img src="/5834.jpg" alt="" />
        </div>
      </div>
    </main>
  );
}
