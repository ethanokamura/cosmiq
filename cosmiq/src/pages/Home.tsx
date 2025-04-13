import Starfield from "@/components/starfield";
import Directories from "@/components/directories";
import * as config from "@/utils/constants";
import { PiPlanetBold } from "react-icons/pi";
export default function Home() {
  return (
    <div className="flex">
      <Directories />
      <Starfield />
      <main className="w-full pt-40 flex flex-col items-center gap-10">
        <div className="text-center">
          <div className="">
            <h1 className="text-9xl flex items-end">
              c
              <span>
                <PiPlanetBold size={100} />
              </span>
              sm
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
