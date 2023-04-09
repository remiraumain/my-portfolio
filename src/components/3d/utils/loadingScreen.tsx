import { useProgress } from "@react-three/drei";
import Image from "next/image";

interface Props {
  started: boolean;
  onStarted?: () => void;
}

const LoadingScreen = ({ started = false, onStarted }: Props) => {
  const { progress } = useProgress();
  //   if (progress === 100 || started) return null; //Issue when loading is too fast does not update progress
  return (
    <div
      className={`${
        progress === 100
          ? "pointer-events-none bg-white/[.5] opacity-0"
          : "fixed inset-0 flex animate-bg-gradient flex-col items-center justify-center bg-gradient-to-r from-cyan-500 via-indigo-800 to-pink-700 bg-[length:600%_600%] transition-all [animation-duration:_24s]"
      }`}
    >
      <div className="flex w-1/2 flex-col items-center justify-center">
        {started ? (
          <div className="flex flex-col items-center justify-center">
            <Image
              className="w-1/2 invert"
              src="/grogu.svg"
              alt="Baby yoda (Grogu) loader"
              width={125}
              height={125}
            />
            <div className="w-full rounded-md border border-double border-inherit p-1">
              <div
                className="h-1 animate-bg-gradient rounded-md border-double border-current bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-[length:400%_400%] transition-[width] [animation-duration:_6s]"
                style={{
                  width: `${
                    started && progress === 0 ? progress + 5 : progress
                  }%`,
                }}
              />
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-white">Ready to play ?</h1>
            <button
              className="my-8 animate-bg-gradient rounded-md from-pink-500 via-red-500 to-yellow-500 bg-[length:400%_400%] px-8 py-3 text-xl font-bold text-white ring-1 ring-white [animation-duration:_6s] hover:bg-gradient-to-r hover:ring-0"
              disabled={started}
              onClick={onStarted}
            >
              Start
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
