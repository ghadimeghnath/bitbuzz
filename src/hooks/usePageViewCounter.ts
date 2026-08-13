"use client"; // Required if using Next.js App Router

import { useState, useEffect } from "react";
import { ref, runTransaction, onValue } from "firebase/database";
import { db } from "@/lib/firebase";

export function usePageViewCounter({
  customKey = "bitvisitors",
  onlyCountUniqueVisitors = false,
}: {
  customKey?: string;
  onlyCountUniqueVisitors?: boolean;
} = {}): [number | null, boolean] {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const localVisitedKey = `visited_${customKey}`;
    const counterRef = ref(db, `counters/${customKey}`);
    const isVisited = localStorage.getItem(localVisitedKey);

    // Only increment if unique constraint is off OR user hasn't visited yet
    if (!onlyCountUniqueVisitors || !isVisited) {
      runTransaction(counterRef, (currentValue) => {
        return (currentValue || 0) + 1;
      }).catch((err) => console.error("Transaction failed: ", err));

      if (onlyCountUniqueVisitors) {
        localStorage.setItem(localVisitedKey, "true");
      }
    }

    // Realtime listener for visual updates across active clients
    const unsubscribe = onValue(counterRef, (snapshot) => {
      setCount(snapshot.val() || 0);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [customKey, onlyCountUniqueVisitors]);

  return [count, loading];
}