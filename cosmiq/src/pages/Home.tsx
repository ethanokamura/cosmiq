import Starfield from "@/components/starfield";
import Directories from "@/components/directories";
import * as config from "@/utils/constants";
import Rocket from "@/assets/cosmiq-rocket.svg";

export default function Home() {
  return (
    <div className="flex">
      <Directories />
      <Starfield />
      <main className="font-rubik w-full pt-40 flex flex-col items-center gap-10">
        <div className="text-center">
          <h1 className="text-9xl font-light flex justify-center items-center">
            <span className="mr-2">
              <img src={Rocket} alt="logo" width={128} height={128}/>
            </span>
            osm
            <span className="text-accent">
              iq
            </span>
          </h1>
          <p>{config.description}</p>
        </div>
      </main>
    </div>
  );
}
