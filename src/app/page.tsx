"use client"

import Image from "next/image";
import Form from "./components/Form";


export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            CONTRACT MAKER
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
          Preencha o formulario abaixo para gerar o contrato
        </p>
      </div>
      
      <Form />
    </div>
  );
}
