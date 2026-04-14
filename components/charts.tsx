"use client";

import { AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";
import { formatCurrency } from "@/lib/utils";

export function FinanceAreaChart({ data }: { data: Array<{ month: string; ingresos: number; egresos: number }> }) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#22305c" />
          <XAxis dataKey="month" stroke="#9bb0e8" />
          <YAxis stroke="#9bb0e8" tickFormatter={(value) => `$${value / 1000}k`} />
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Area type="monotone" dataKey="ingresos" stroke="#4b83ff" fill="#4b83ff33" />
          <Area type="monotone" dataKey="egresos" stroke="#8eb4ff" fill="#8eb4ff1f" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function InvoiceBarChart({ data }: { data: Array<{ name: string; value: number }> }) {
  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#22305c" />
          <XAxis dataKey="name" stroke="#9bb0e8" />
          <YAxis stroke="#9bb0e8" />
          <Tooltip />
          <Bar dataKey="value" fill="#4b83ff" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
