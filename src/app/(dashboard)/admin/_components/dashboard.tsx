"use client";

import LineCharts from "@/components/common/line-chart";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const supabase = createClient();
  const [lastWeek, setLastWeek] = useState<Date | null>(null);
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
    oneWeekAgo.setHours(0, 0, 0, 0);

    setLastWeek(oneWeekAgo);
    setToday(now);
  }, []);

  const {
    data: orders,
    isLoading,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["orders-per-day", lastWeek],
    queryFn: async () => {
      if (!lastWeek) return null;

      const { data } = await supabase
        .from("orders")
        .select("created_at")
        .gte("created_at", lastWeek.toISOString())
        .order("created_at");

      const counts: Record<string, number> = {};

      (data ?? []).forEach((order) => {
        const date = new Date(order.created_at).toISOString().slice(0, 10);
        counts[date] = (counts[date] || 0) + 1;
      });

      return Object.entries(counts).map(([name, total]) => ({ name, total }));
    },
    enabled: !!lastWeek,
  });
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Order Create Per Week</CardTitle>
          <CardDescription>
            {lastWeek && today
              ? `Showing orders from ${lastWeek.toLocaleDateString()} to ${today.toLocaleDateString()}`
              : "Loading date range..."}
          </CardDescription>
        </CardHeader>
        <div className="w-full h-64 p-6">
          <LineCharts data={orders || undefined} />
        </div>
      </Card>
    </div>
  );
}
