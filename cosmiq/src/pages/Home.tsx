import Starfield from "@/components/starfield";
import Directories from "@/components/directories";
import * as config from "@/utils/constants";
import Rocket from "@/assets/cosmiq-rocket.svg";

export default function Home() {
  return (
    <div className="flex">
      <Directories />
      <Starfield />
      <main className="h-screen w-full flex flex-col justify-center items-center relative">
        <img src={Rocket} alt="logo" width={420} height={420} className="absolute"/>
        <div className="text-center">
          <div className="mb-4">
            <h1 className="text-7xl flex items-end font-bold">
              cosm
              <span className="text-accent">
                iq
              </span>
            </h1>
          </div>
          <p>{config.description}</p>
        </div>
      </main>
    </div>
  );
}
