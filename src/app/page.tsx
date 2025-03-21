"use client";

import Form from "@/app/components/Form";
import { FaRegFileAlt, FaBalanceScale } from "react-icons/fa";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Contract
          </span>{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Filler
          </span>
        </h1>

        <div className="mx-auto mt-4 max-w-3xl">
          <p className="font-source-serif px-2 text-2xl text-gray-600 dark:text-gray-300">
            Preencha o formulário abaixo para gerar o contrato
            <span className="mx-2 hidden text-blue-500 lg:inline">·</span>
            <span className="hidden text-gray-400 lg:inline">
              Preenchimento simples
            </span>
          </p>

          <div className="mt-6 flex items-center justify-center space-x-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
            <FaBalanceScale className="h-8 w-8 animate-pulse text-blue-500" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
          </div>
        </div>
      </div>

      <Form />
    </div>
  );
}
