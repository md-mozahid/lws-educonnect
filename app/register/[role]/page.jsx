import { SignUpForm } from "../_components/signup-form";

export default function RegisterPage({ params: { role } }) {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container">
        <SignUpForm role={role} />
      </div>
    </div>
  );
}
