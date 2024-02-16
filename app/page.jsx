"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import PageTransition from "../components/PageTransition";

const Timer3 = () => {
  const router = useRouter();
  const [countDownTime, setCountDownTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const getTimeDifference = (countDownTime) => {
    const currentTime = new Date().getTime();
    const timeDifference = countDownTime - currentTime;

    if (timeDifference < 0) {
      setCountDownTime({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      });
      clearInterval(intervalIdRef.current);
      console.log("first");
      router.push("/birthday");
    } else {
      let days =
        Math.floor(timeDifference / (24 * 60 * 60 * 1000)) >= 10
          ? Math.floor(timeDifference / (24 * 60 * 60 * 1000))
          : `0${Math.floor(timeDifference / (24 * 60 * 60 * 1000))}`;
      const hours =
        Math.floor(
          (timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
        ) >= 10
          ? Math.floor(
              (timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
            )
          : `0${Math.floor(
              (timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
            )}`;
      const minutes =
        Math.floor((timeDifference % (60 * 60 * 1000)) / (1000 * 60)) >= 10
          ? Math.floor((timeDifference % (60 * 60 * 1000)) / (1000 * 60))
          : `0${Math.floor((timeDifference % (60 * 60 * 1000)) / (1000 * 60))}`;
      const seconds =
        Math.floor((timeDifference % (60 * 1000)) / 1000) >= 10
          ? Math.floor((timeDifference % (60 * 1000)) / 1000)
          : `0${Math.floor((timeDifference % (60 * 1000)) / 1000)}`;

      setCountDownTime({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    }
  };

  const startCountDown = useCallback(() => {
    const customDate = new Date();
    const countDownDate = new Date(2024, 1, 16, 23, 59, 59);

    // Set up the interval and store its reference
    const intervalId = setInterval(() => {
      getTimeDifference(countDownDate.getTime());
    }, 1000);

    // Store the interval reference in a ref so that it can be accessed outside the useEffect
    intervalIdRef.current = intervalId;

    // Clean up the interval when the component unmounts or as needed
    return () => clearInterval(intervalId);
  }, [getTimeDifference]);

  const intervalIdRef = useRef(null);

  useEffect(() => {
    startCountDown();

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalIdRef.current);
  }, [startCountDown]);

  const neonTextStyle = {
    color: "#fff", // Warna neon, dapat diubah sesuai keinginan
    textShadow: "0 0 5px #FC22F4, 0 0 10px #FC22F4, 0 0 15px #FC22F4", // Efek bayangan neon
  };

  return (
    <PageTransition>
      <div className="bg-[#191A24] h-screen bg-[url('/bg.jpg')] bg-cover">
        <div className="flex flex-col items-center justify-center w-full h-full gap-8 sm:gap-16">
          <div className="flex flex-col gap-6 sm:p-6 p-4 mx-2 bg-brown-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 ">
            <span
              style={neonTextStyle}
              className="text-3xl neon-text sm:text-6xl font-semibold text-white text-center tracking-widest px-4"
            >
              Sindi Belindawati Birthday
            </span>
            <div className="flex justify-center gap-3 sm:gap-8">
              <div className="flex flex-col gap-5 relative">
                <div className="h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-[#343650] rounded-lg">
                  <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
                  <span className="lg:text-7xl sm:text-6xl text-3xl font-semibold text-[#a5b4fc]">
                    {countDownTime?.days}
                  </span>
                  <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
                </div>
                <span className="text-[#8486A9] font-semibold text-xs sm:text-2xl text-center capitalize">
                  {countDownTime?.days == 1 ? "Day" : "Days"}
                </span>
              </div>
              <div className="flex flex-col gap-5 relative">
                <div className="h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-[#343650] rounded-lg">
                  <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
                  <span className="lg:text-7xl sm:text-6xl text-3xl font-semibold text-[#a5b4fc]">
                    {countDownTime?.hours}
                  </span>
                  <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
                </div>
                <span className="text-[#8486A9] text-xs sm:text-2xl text-center font-medium">
                  {countDownTime?.hours == 1 ? "Hour" : "Hours"}
                </span>
              </div>
              <div className="flex flex-col gap-5 relative">
                <div className="h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-[#343650] rounded-lg">
                  <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
                  <span className="lg:text-7xl sm:text-6xl text-3xl font-semibold text-[#a5b4fc]">
                    {countDownTime?.minutes}
                  </span>
                  <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
                </div>
                <span className="text-[#8486A9] font-semibold text-xs sm:text-2xl text-center capitalize">
                  {countDownTime?.minutes == 1 ? "Minute" : "Minutes"}
                </span>
              </div>
              <div className="flex flex-col gap-5 relative">
                <div className="h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-[#343650] rounded-lg">
                  <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
                  <span className="lg:text-7xl sm:text-6xl text-3xl font-semibold text-[#a5b4fc]">
                    {countDownTime?.seconds}
                  </span>
                  <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
                </div>
                <span className="text-[#8486A9] font-semibold text-xs sm:text-2xl text-center capitalize">
                  {countDownTime?.seconds == 1 ? "Second" : "Seconds"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
export default Timer3;
