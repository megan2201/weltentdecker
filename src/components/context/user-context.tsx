import type { Experience } from "@/assets/data/experiences";
import type { Stay } from "@/assets/data/stays";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type User = {
  isLoggedIn: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  stayBookings: stayBooking[];
  experienceBookings: ExperienceBooking[];
};

export type stayBooking = {
  uid: string;
  stay: Stay;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
};

export type ExperienceBooking = {
  uid: string;
  experience: Experience;
  date: Date;
  guests: number;
  totalPrice: number;
};

type UserContextType = {
  user: User;
  setIsLoggedIn: (value: boolean) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  addStayBooking: (value: stayBooking) => void;
  addExperienceBooking: (value: ExperienceBooking) => void;
  updateUser: (values: Partial<User>) => void;
  logout: () => void;
};

const defaultUser: User = {
  isLoggedIn: false,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  stayBookings: [],
  experienceBookings: [],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    try {
      const saved = sessionStorage.getItem("weltentdecken-user");
      if (!saved) return defaultUser;

      const parsed: User = JSON.parse(saved);
      return {
        isLoggedIn: parsed.isLoggedIn ?? false,
        firstName: parsed.firstName ?? "",
        lastName: parsed.lastName ?? "",
        email: parsed.email ?? "",
        password: parsed.password ?? "",
        stayBookings: Array.isArray(parsed.stayBookings)
          ? parsed.stayBookings.map((b: any) => ({
              ...b,
              checkIn: new Date(b.checkIn),
              checkOut: new Date(b.checkOut),
            }))
          : [],

        experienceBookings: Array.isArray(parsed.experienceBookings)
          ? parsed.experienceBookings.map((b: any) => ({
              ...b,
              date: new Date(b.checkIn),
            }))
          : [],
      };
    } catch {
      return defaultUser;
    }
  });

  useEffect(() => {
    sessionStorage.setItem("weltentdecken-user", JSON.stringify(user));
  }, [user]);

  function updateUser(values: Partial<User>) {
    setUser((current) => ({
      ...current,
      ...values,
    }));
  }

  function setIsLoggedIn(value: boolean) {
    updateUser({ isLoggedIn: value });
  }

  function setFirstName(value: string) {
    updateUser({ firstName: value });
  }

  function setLastName(value: string) {
    updateUser({ lastName: value });
  }

  function setEmail(value: string) {
    updateUser({ email: value });
  }

  function setPassword(value: string) {
    updateUser({ password: value });
  }

  function addStayBooking(value: stayBooking) {
    setUser((current) => ({
      ...current,
      stayBookings: [...current.stayBookings, value],
    }));
  }

  function addExperienceBooking(value: ExperienceBooking) {
    setUser((current) => ({
      ...current,
      experienceBookings: [...current.experienceBookings, value],
    }));
  }

  function logout() {
    setUser(defaultUser);
    sessionStorage.removeItem("weltentdecken-user");
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setIsLoggedIn,
        setFirstName,
        setLastName,
        setEmail,
        setPassword,
        addStayBooking,
        addExperienceBooking,
        updateUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}
