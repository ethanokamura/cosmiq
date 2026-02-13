import { BiCodeAlt, BiDownArrow, BiDownArrowAlt, BiDownload, BiSolidUser, BiUser } from "react-icons/bi";
import { BsApple, BsGithub, BsLinkedin, BsWindows } from "react-icons/bs";
import { FaLinux } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Home() {
  return  (
    <main className='pt-40'>
      <section className="pt-40  h-screen m-0">
          <div className="text-center">
            <h1 className='text-9xl my-6 font-grotesk font-black'>Cosm<span className='text-accent'>iq</span></h1>
            <h2 className='text-4xl text-text2'>Your Brain's Mission Control.</h2>
            <h2 className='text-2xl text-text3'>v 1.0.0</h2>
          </div>
          <div className="my-40 flex flex-wrap gap-4 w-full">
            <div className="card flex gap-4 items-center ring-4 ring-surface">
              <img src="/svg/app-icon.svg" alt="App Icon" width={48} height={48}/>
              <h2 className="text-2xl">Download</h2>
              <BsApple size={32} className="text-text2"/>
            </div>
            <div className="card flex gap-4 items-center ring-4 ring-surface">
              <img src="/svg/app-icon.svg" alt="App Icon" width={48} height={48}/>
              <h2 className="text-2xl">Download</h2>
              <BsWindows size={32} className="text-text2"/>
            </div>
            <div className="card flex gap-4 items-center ring-4 ring-surface">
              <img src="/svg/app-icon.svg" alt="App Icon" width={48} height={48}/>
              <h2 className="text-2xl">Download</h2>
              <FaLinux size={32} className="text-text2"/>
            </div>
          </div>
      </section>
      <section>
        <h1 className="text-center">It's <span className="text-accent">not</span> your average markdown editor 🤓</h1>
        <hr className="w-1/2 "/>
        <img src="/screenshots/main-app.webp" alt="home page" width={1024}/>
      </section>
      <section>
        <h1 className="text-center">Take notes like you always have 📝</h1>
        <hr className="w-1/2 "/>
        <img src="/screenshots/notes-demo.webp" alt="notes demo" width={1024}/>
      </section>
      <section>
        <h1 className="text-center">Review your notes with a <span className="text-accent">single click</span> 👉🏽💥</h1>
        <hr className="w-1/2 "/>
        <img src="/screenshots/summary-demo.webp" alt="summary demo" width={1024}/>
      </section>
      <section>
        <h1 className="text-center">Generate <span className="text-accent">detailed</span> quizzes in seconds 🤖</h1>
        <hr className="w-1/2 "/>
        <img src="/screenshots/quiz-demo.webp" alt="quiz demo" width={1024}/>
      </section>
      <section>
        <h1 className="text-center text-7xl m-0">Our Team</h1>
        <hr className="w-3/4 mb-6"/>
        <div className="flex flex-wrap gap-10 justify-center">
          <div className="card w-72 flex flex-col items-center gap-4 ring-4 ring-surface/50">
            <img className="rounded-full w-32 h-32 ring-4 ring-surface/50" src={"/people/ethan.webp"} alt="Ethan's Headshot" width={64} height={64} />
            <div>
              <h1 className="m-0">Ethan Okamura</h1>
              <p className="text-text2 text-2xl">Lead Engineer</p>
            </div>
            <div className="flex gap-4 items-center text-text2 my-2">
              <Link to="" className="bg-text2 p-1 text-background rounded">
                <BsGithub size={32}/>
              </Link>
              <Link to="" className="">
                <BsLinkedin size={40}/>
              </Link>
              <Link to="" className="bg-text2 p-1 text-background rounded">
                <BiSolidUser size={32}/>
              </Link>
            </div>
          </div>
          <div className="card w-72 flex flex-col items-center gap-4 ring-4 ring-surface/50">
            <div className="rounded-full bg-background ring-4 ring-surface w-32 h-32 flex items-center justify-center">
              <BiUser size={65}/>
            </div>
            <div>
              <h1 className="m-0">Alex Brenzy</h1>
              <p className="text-text2 text-2xl">Backend Developer</p>
            </div>
            <div className="flex gap-4 items-center text-text2 my-2">
              <Link to="" className="bg-text2 p-1 text-background rounded">
                <BsGithub size={32}/>
              </Link>
              <Link to="" className="">
                <BsLinkedin size={40}/>
              </Link>
              <Link to="" className="bg-text2 text-background rounded">
                <BiCodeAlt size={40}/>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}