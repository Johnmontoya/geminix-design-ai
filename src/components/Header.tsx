import { useContext, useEffect, type CSSProperties } from "react";
import { assets } from "../assets/assets";
import { Context } from "../context/Context";
import { FaCompass, FaPlay } from "react-icons/fa";
import { TiLightbulb } from "react-icons/ti";
import { GoComment } from "react-icons/go";
import { IoCodeSlashOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { BounceLoader } from "react-spinners";

const Header = () => {
  const {
    input,
    setInput,
    onSent,
    showResult,
    recentPrompt,
    resultData,
    loading,
  } = useContext(Context);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const trip = async() => {
    await onSent("Sugiere un lugar hermoso para viajar")
  }

  const resument = async() => {
    await onSent("Resume brevemente este concepto: viaje por carretera de planificación urbana")
  }

  const actividades = async() => {
    await onSent("Lluvia de ideas sobre actividades para fortalecer el trabajo en equipo")
  }

  const code = async() => {
    await onSent("Mejorar la legibilidad del siguiente código completo en la web")
  }

  useEffect(() => {}, [loading]);

  return (
    <div className="w-full flex flex-col px-20 py-8">
      <nav className="flex justify-between items-center p-6 relative z-10">
        <div className="flex items-center gap-3 text-2xl font-semibold">
          <div className="flex items-center justify-center font-bold text-2xl">
            <img src={assets.logo_icon} className="w-20 h-18" />
          </div>
          <span>Geminix</span>
        </div>
        <ul className="nav-links flex gap-10 list-none hover:transition-colors decoration-0">
          <li className="hover:text-blue-400">
            <a href="#features">Características</a>
          </li>
          <li className="hover:text-blue-400">
            <a href="#pricing">Precios</a>
          </li>
          <li className="hover:text-blue-400">
            <a href="#resources">Recursos</a>
          </li>
          <li className="hover:text-blue-400">
            <a href="#about">Nosotros</a>
          </li>
        </ul>
        <img src={assets.user_icon} alt="" className="w-16 rounded-full" />
      </nav>

      <div className="w-full h-full flex flex-col justify-between">
        {showResult ? (
          <div className="w-full h-full flex flex-col pt-2">
            <section className="text-center p-16 relative">
              <h1 className="text-7xl font-semibold m-5 bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text">
                Tu <span className="text-blue-400">asistente de IA</span> para
                <br />
                una productividad más inteligente.
              </h1>
              <p className="subtitle">
                Aproveche el poder de la IA para automatizar tareas, optimizar
                flujos de trabajo y aumentar la eficiencia de su equipo, todo en
                una plataforma sencilla.
              </p>
            </section>

            <div className="w-full flex flex-row justify-center">
              <div className="max-w-7xl flex md:flex-row flex-col gap-6">
                <div onClick={trip} className="bg-slate-100/5 p-8 flex flex-col w-full md:w-72 h-56 backdrop-blur m-auto z-20 border border-slate-100/5 hover:bg-slate-800/60 hover:border-blue-400 hover:-translate-y-1.5 transition duration-700 cursor-pointer rounded-2xl">
                  <p className="text-gray-400 text-xl">
                    Sugiere lugares hermosos para ver en un próximo viaje por
                    carretera
                  </p>
                  <div className="w-full relative h-4">
                    <FaCompass
                      size={30}
                      className="absolute -right-4 -bottom-12"
                    />
                  </div>
                </div>
                <div onClick={resument} className="bg-slate-100/5 p-8 flex flex-col w-full md:w-72 h-56 backdrop-blur m-auto z-20 border border-slate-100/5 hover:bg-slate-800/60 hover:border-blue-400 hover:-translate-y-1.5 transition duration-700 cursor-pointer rounded-2xl">
                  <p className="text-gray-400 text-xl">
                    Resume brevemente este concepto: viaje por carretera de
                    planificación urbana
                  </p>
                  <div className="w-full relative h-4">
                    <TiLightbulb
                      size={30}
                      className="absolute -right-4 -bottom-12"
                    />
                  </div>
                </div>
                <div onClick={actividades} className="bg-slate-100/5 p-8 flex flex-col w-full md:w-72 h-56 backdrop-blur m-auto z-20 border border-slate-100/5 hover:bg-slate-800/60 hover:border-blue-400 hover:-translate-y-1.5 transition duration-700 cursor-pointer rounded-2xl">
                  <p className="text-gray-400 text-xl">
                    Lluvia de ideas sobre actividades para fortalecer el trabajo
                    en equipo
                  </p>
                  <div className="w-full relative h-4">
                    <GoComment
                      size={30}
                      className="absolute -right-4 -bottom-12"
                    />
                  </div>
                </div>
                <div onClick={code} className="bg-slate-100/5 p-8 flex flex-col w-full md:w-72 h-56 backdrop-blur m-auto z-20 border border-slate-100/5 hover:bg-slate-800/60 hover:border-blue-400 hover:-translate-y-1.5 transition duration-700 cursor-pointer rounded-2xl">
                  <p className="text-gray-400 text-xl">
                    Mejorar la legibilidad del siguiente código completo en la
                    web
                  </p>
                  <div className="w-full relative h-4">
                    <IoCodeSlashOutline
                      size={30}
                      className="absolute -right-4 -bottom-18"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-20 h-[540px] overflow-y-auto">
            <div className="flex flex-row gap-2 items-center">
              <img className="w-20 rounded-2xl" src={assets.user_icon} alt="" />
              <p className="text-2xl font-bold">{recentPrompt}</p>
            </div>
            <div className="flex flex-row gap-2 w-full mt-16 min-h-[400px]">
              <img className="w-10 h-10" src={assets.gemini_icon} alt="" />
              {loading ? (
                <BounceLoader
                  color={"#0e7490"}
                  loading={loading}
                  cssOverride={override}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <section>
                  <p
                    className="font-light w-full px-10"
                    dangerouslySetInnerHTML={{ __html: resultData }}
                  ></p>
                </section>
              )}
            </div>
          </div>
        )}
        <div className="w-full h-44 flex flex-col mt-10 bottom-0">
          <div className="w-8/12 flex flex-row h-fit bottom-10 justify-between p-4 px-5 bg-slate-100/5 backdrop-blur m-auto z-20 border border-slate-100/5 hover:bg-slate-800/60 hover:border-blue-400 hover:-translate-y-1.5 transition duration-700 cursor-pointer rounded-2xl">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Ingresa tu prompt aquí"
              className="text-xl w-full focus:outline-0 bg-transparent"
            />
            <div className="flex flex-row gap-3 items-center">
              <CiImageOn size={30} className="ml-4" />
              <MdOutlineKeyboardVoice size={30} />
              {input ? (
                <FaPlay
                  onClick={() => onSent(input)}
                  size={30}
                  className="w-7 cursor-pointer hover:text-blue-500"
                />
              ) : null}
            </div>
          </div>
          <p className="my-2 flex h-fit justify-center bottom-0">
            Geminix puede mostrar información incorrecta, incluida información
            sobre personas, así que verifica sus respuestas. Tu privacidad y las
            aplicaciones de Geminix.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
