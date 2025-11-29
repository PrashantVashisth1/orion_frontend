// src/contexts/StudentProfileContext.tsx
import  { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios"; 
import type { ReactNode } from "react";

type ProfileData = any; // tighten later if you have profile types

interface StudentProfileContextType {
  profile?: ProfileData;
  isLoading: boolean;
  refetchProfile: () => void;
  handleFinalProfileSubmit: () => Promise<void>;
}

const StudentProfileContext = createContext<StudentProfileContextType | null>(null);

export function StudentProfileProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["student-profile"],
    queryFn: async () => {
      const res = await axios.get("/api/student/profile");
      // controller returns { success, data, ... } in your controllers — adapt if needed
      return res.data?.data ?? res.data;
    },
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      // backend had optional submit-for-review — if you don't have it, this can be removed
      await axios.post("/api/student/profile/submit-for-review");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["student-profile"] });
    },
  });

  const handleFinalProfileSubmit = async () => {
    await submitMutation.mutateAsync();
  };

  return (
    <StudentProfileContext.Provider
      value={{
        profile: data,
        isLoading,
        refetchProfile: refetch,
        handleFinalProfileSubmit,
      }}
    >
      {children}
    </StudentProfileContext.Provider>
  );
}

export const useStudentProfileContext = () => {
  const ctx = useContext(StudentProfileContext);
  if (!ctx) throw new Error("useStudentProfileContext must be used inside StudentProfileProvider");
  return ctx;
};
