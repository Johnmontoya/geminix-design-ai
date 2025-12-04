import { useContext, useState } from "react";
import { Context } from "../context/Context";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { IoAddOutline } from "react-icons/io5";
import { CiCircleInfo, CiSettings, CiTimer } from "react-icons/ci";
import { TiMessages } from "react-icons/ti";

const Sidebar = () => {
  const [extended, setExtended] = useState<boolean>(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt: string) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  } 

  return (
    <div className="w-fit h-screen flex flex-col justify-between px-4 pt-6 backdrop-blur-2xl">
      <div className="flex flex-col gap-4">
        <FaArrowDownWideShort onClick={() => setExtended((prev) => !prev)} size={30} className="text-slate-200 cursor-pointer"/>
        <div onClick={() => newChat()} className="flex flex-row gap-2 justify-center items-center rounded-2xl bg-slate-300 px-1 py-1 cursor-pointer">
          <IoAddOutline size={28} className="text-slate-900"/>
          {extended ? <p>Nuevo Chat</p> : null}
        </div>
        {extended ? (
          <div className="w-44 flex flex-col gap-4">
            <p>Reciente</p>
            {prevPrompts.map((item, index: number) => {
              return (
                <div key={index} onClick={() => loadPrompt} className="flex flex-row gap-2 justify-center items-center hover:bg-slate-400 px-4 py-2 rounded-2xl cursor-pointer">
                  <TiMessages size={30} />
                  <p>{item.slice(0, 18)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-3 mb-10">
        <div className="flex flex-row gap-1 justify-start items-center hover:bg-slate-400 px-4 py-2 rounded-2xl cursor-pointer">
          <CiCircleInfo size={28} className="text-slate-200" />
          {extended ? <p>Ayuda</p> : null}
        </div>
        <div className="flex flex-row gap-1 justify-start items-center hover:bg-slate-400 px-4 py-2 rounded-2xl cursor-pointer">
          <CiTimer size={28} className="text-slate-200"/>
          {extended ? <p>Actividades</p> : null}
        </div>
        <div className="flex flex-row gap-1 justify-start items-center hover:bg-slate-400 px-4 py-2 rounded-2xl cursor-pointer">
          <CiSettings size={28} className="text-slate-200" />
          {extended ? <p>Configuración</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
