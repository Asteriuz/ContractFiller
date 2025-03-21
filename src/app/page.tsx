"use client";

import Image from "next/image";
import Form from "@/app/components/Form";
import { FaFileSignature } from "react-icons/fa";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <div className="flex items-center justify-center gap-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            <p>CONTRACT MAKER</p>
          </div>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
          Preencha o formulario abaixo para gerar o contrato
        </p>
      </div>

      <Form />
    </div>
  );
}
