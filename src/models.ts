import { RiLockPasswordFill } from "react-icons/ri";
import { IoMailSharp } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";

type UserInfo = {
  fullName: string;
  age: number;
  gender: string;
  bodyWeight: number;
  regData: string;
};

interface BodyMeasurements {
  quadLeft: number[];
  chest: number[];
  calfRight: number[];
  quadRight: number[];
  bodyWeight: number[];
  forearmRight: number[];
  waistline: number[];
  forearmLeft: number[];
  armRight: number[];
  calfLeft: number[];
  armLeft: number[];
  neck: number[];
}

type TrainingMeasurements = Omit<BodyMeasurements, "bodyWeight">;
interface MedicalInfo {
  [date: string]: string;
}
export type User = {
  info: UserInfo;
  userBody: BodyMeasurements;
  training: TrainingMeasurements;
  medicalInfo: MedicalInfo;
};

export interface UsersData {
  [userId: string]: User;
}
export type Users = Record<string, User>;

export const IoMdSettingsIco = IoMdSettings as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;

export const IoMailSharpIco = IoMailSharp as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;
export const RiLockPasswordFillIco = RiLockPasswordFill as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;
export const IoMdEyeOffIco = IoMdEyeOff as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;
export const IoEyeIco = IoEye as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;
export const FcGoogleIco = FcGoogle as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;

export const BsFacebookIco = BsFacebook as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;
