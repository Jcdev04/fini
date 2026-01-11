"use client";

import { useState } from "react";

const CATEGORIAS = [
  { id: "comida", label: "🍔 Comida", color: "#ff8c42" },
  { id: "transporte", label: "🚗 Transporte", color: "#4a90e2" },
  { id: "casa", label: "🏠 Casa", color: "#50c878" },
  { id: "entretenimiento", label: "🎮 Entretenimiento", color: "#9b8dd8" },
  { id: "salud", label: "💊 Salud", color: "#e74c3c" },
  { id: "otros", label: "📦 Otros", color: "#95a5a6" },
];

const MEDIOS_PAGO = [
  { value: "billetera digital", label: "💳 Billetera digital" },
  { value: "efectivo", label: "💵 Efectivo" },
  { value: "transferencia", label: "🏦 Transferencia" },
];

export default function Home() {
  const [tipo, setTipo] = useState<"gasto" | "ingreso">("gasto");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [concepto, setConcepto] = useState("");
  const [medioPago, setMedioPago] = useState("billetera digital");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Preparar los datos para enviar a Google Sheets
      const formData = {
        fecha,
        tipo,
        categoria,
        concepto: concepto || "-", // Si está vacío, enviar un guión
        medioPago,
        monto: parseFloat(monto),
      };

      console.log("Enviando datos:", formData);

      // Enviar a nuestra API Route (que luego envía a Google Sheets)
      const response = await fetch("/api/sheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.result === "success") {
        alert(`✅ ${tipo === "gasto" ? "Gasto" : "Ingreso"} registrado exitosamente: S/ ${monto}`);
        
        // Reset form
        setMonto("");
        setCategoria("");
        setConcepto("");
      } else {
        throw new Error(result.error || "Error desconocido");
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      alert("❌ Error al registrar el movimiento. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      {/* Background subtle effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#cfd73f]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9b8dd8]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Mobile-first container */}
      <div className="relative min-h-screen w-full md:flex md:items-center md:justify-center md:p-6">
        <div className="w-full md:max-w-md md:mx-auto">
          {/* Header - Mobile status bar style with glassmorphism */}
          <div className="relative px-6 pt-6 pb-6 mb-6 overflow-hidden rounded-b-3xl bg-neutral-900">
            {/* Glassmorphism background with gradient circle */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-b-3xl" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#cfd73f] to-[#cfd73f] opacity-30 rounded-full blur-3xl" />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Title section */}
              <div className="flex items-baseline gap-3 flex-col">
                <h1 className="text-3xl font-bold text-[#cfd73f] ">
                  Fini
                </h1>
                <p className="text-base font-medium text-white/70">
                  Registra tus movimientos al instante    
                </p>
              </div>
            </div>
          </div>

          {/* Form Container - Mobile full width, Desktop card */}
          <div className="px-6 pb-6 md:bg-[#1a1a1a]/80 md:backdrop-blur-xl md:rounded-3xl md:shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Toggle Tipo (Gasto/Ingreso) */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-white/60">
                  Tipo de Movimiento
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setTipo("gasto")}
                    className={`flex-1 py-4 px-4 rounded-2xl font-semibold transition-all duration-300 border-2 ${
                      tipo === "gasto"
                        ? "border-[#e74c3c] text-[#e74c3c] bg-[#e74c3c]/10"
                        : "border-white/10 text-white/40 hover:border-white/20"
                    }`}
                  >
                    💸 Gasto
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipo("ingreso")}
                    className={`flex-1 py-4 px-4 rounded-2xl font-semibold transition-all duration-300 border-2 ${
                      tipo === "ingreso"
                        ? "border-[#50c878] text-[#50c878] bg-[#50c878]/10"
                        : "border-white/10 text-white/40 hover:border-white/20"
                    }`}
                  >
                    💰 Ingreso
                  </button>
                </div>
              </div>

              {/* Monto - Hero input */}
              <div className="space-y-4">
                <label htmlFor="monto" className="text-sm font-medium text-white/60">
                  Monto *
                </label>
                <div className="relative">
                  <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
                    <div className="relative flex items-center px-5 py-5">
                      {/* Ícono de soles en absolute */}
                      <span className="absolute left-5 text-2xl font-bold text-[#cfd73f]">
                        S/
                      </span>
                      <input
                        id="monto"
                        type="number"
                        step="0.01"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                        placeholder="0.00"
                        autoFocus
                        required
                        className="flex-1 bg-transparent text-4xl font-bold text-white placeholder:text-white/20 outline-none pl-12"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Categoría - Chips con bordes de colores */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-white/60">
                  Categoría *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {CATEGORIAS.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategoria(cat.id)}
                      className={`py-4 px-4 rounded-2xl font-medium transition-all duration-300 border-2 ${
                        categoria === cat.id
                          ? "scale-[1.02]"
                          : "border-white/10 text-white/50 hover:border-white/20"
                      }`}
                      style={
                        categoria === cat.id
                          ? { 
                              borderColor: cat.color,
                              color: cat.color,
                              backgroundColor: `${cat.color}15` // 15 en hex = ~8% opacity
                            }
                          : undefined
                      }
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Concepto */}
              <div className="space-y-4">
                <label htmlFor="concepto" className="text-sm font-medium text-white/60">
                  Concepto <span className="text-white/30">(opcional)</span>
                </label>
                <input
                  id="concepto"
                  type="text"
                  value={concepto}
                  onChange={(e) => setConcepto(e.target.value)}
                  placeholder='Ej: "Taxi al centro"'
                  className="w-full px-5 py-4 rounded-2xl bg-[#1a1a1a] text-white placeholder:text-white/30 focus:bg-[#222] outline-none transition-all"
                />
              </div>

              {/* Medio de Pago */}
              <div className="space-y-4">
                <label htmlFor="medioPago" className="text-sm font-medium text-white/60">
                  Medio de Pago
                </label>
                <select
                  id="medioPago"
                  value={medioPago}
                  onChange={(e) => setMedioPago(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-[#1a1a1a] text-white focus:bg-[#222] outline-none transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.4)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1.5em 1.5em",
                  }}
                >
                  {MEDIOS_PAGO.map((medio) => (
                    <option key={medio.value} value={medio.value} className="bg-[#1a1a1a]">
                      {medio.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fecha */}
              <div className="space-y-4">
                <label htmlFor="fecha" className="text-sm font-medium text-white/60">
                  Fecha
                </label>
                <input
                  id="fecha"
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-[#1a1a1a] text-white focus:bg-[#222] outline-none transition-all"
                  style={{
                    colorScheme: "dark",
                  }}
                />
              </div>

              {/* Botón Submit */}
              <button
                type="submit"
                disabled={!monto || !categoria || isSubmitting}
                className="w-full py-5 rounded-2xl font-bold text-lg text-black disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all mt-8"
                style={{
                  backgroundColor: (!monto || !categoria || isSubmitting) ? "#2a2a2a" : "#cfd73f",
                }}
              >
                {isSubmitting 
                  ? "⏳ Guardando..." 
                  : tipo === "gasto" 
                    ? "💸 Registrar Gasto" 
                    : "💰 Registrar Ingreso"
                }
              </button>
            </form>

            {/* Tip */}
            <div className="mt-6 text-center">
              <p className="text-white/30 text-sm">
                ⚡ Solo monto y categoría son obligatorios
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
