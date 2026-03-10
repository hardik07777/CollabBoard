import { useNavigate } from "react-router-dom";

export default function JoinTeamSarcastic() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg text-center">

        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Wow. Impressive.
        </h1>

        <p className="text-slate-500 mb-8">
          Either it expired, was revoked, or someone just didn’t want you on the team.
          (Just kidding.. probably 😢)
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-slate-800 text-white px-5 py-2 rounded-lg hover:bg-slate-700"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border border-slate-300 px-5 py-2 rounded-lg hover:bg-slate-50"
          >
            Try Logging In
          </button>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          If this was supposed to work, maybe ask the person who sent it.
        </p>

      </div>
    </div>
  );
}