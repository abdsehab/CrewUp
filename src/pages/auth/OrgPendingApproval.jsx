import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Clock, LogOut, CheckCircle2, Mail } from "lucide-react";
import { API_BASE } from "../../utils/api";

export default function OrgPendingApproval() {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();

    // On every page load/refresh, re-fetch the live profile to check approval status
    useEffect(() => {
        const checkStatus = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/users/profile`, { credentials: "include" });
                if (!res.ok) return;
                const profile = await res.json();
                login(profile); // update auth context with latest data
                if (profile.orgStatus === "Verified") {
                    navigate("/organizer/dashboard", { replace: true });
                }
            } catch {
                // silently ignore network errors
            }
        };
        checkStatus();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-[#101413] text-[#e0e3e1] flex items-center justify-center p-6">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#afff66]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-lg">
                {/* Top badge */}
                <div className="flex justify-center mb-8">
                    <span className="flex items-center gap-2 rounded-full border border-[#324539] bg-[#1c201f] px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#c1cab3]">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                        Pending Admin Review
                    </span>
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-[#324539] bg-[#1c201f] p-8 text-center shadow-2xl">
                    {/* Icon */}
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#324539] bg-[#24342A]">
                        <Clock size={36} className="text-amber-400 animate-pulse" />
                    </div>

                    <h1 className="mb-3 text-3xl font-bold text-[#afff66]">Application Submitted</h1>
                    <p className="mb-2 text-sm text-[#c1cab3] leading-relaxed">
                        Your organization{" "}
                        <span className="font-semibold text-white">"{user?.displayName}"</span> has been
                        registered and is currently awaiting approval from the CrewUp platform admin.
                    </p>
                    <p className="text-sm text-[#879083] leading-relaxed">
                        You will be able to access the organization dashboard once your account is verified.
                        This typically takes 24–48 hours.
                    </p>

                    {/* Steps */}
                    <div className="mt-8 space-y-3 text-left">
                        <div className="flex items-center gap-3 rounded-xl border border-[#324539] bg-[#14251d] p-4">
                            <CheckCircle2 size={18} className="shrink-0 text-[#afff66]" />
                            <div>
                                <p className="text-sm font-semibold">Registration Complete</p>
                                <p className="text-xs text-[#879083]">Your account and profile have been saved.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-900/10 p-4">
                            <Clock size={18} className="shrink-0 text-amber-400" />
                            <div>
                                <p className="text-sm font-semibold text-amber-300">Admin Review In Progress</p>
                                <p className="text-xs text-[#879083]">
                                    A platform admin will verify your organization details.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl border border-[#324539] bg-[#1c201f] p-4 opacity-50">
                            <CheckCircle2 size={18} className="shrink-0 text-[#c1cab3]" />
                            <div>
                                <p className="text-sm font-semibold text-[#c1cab3]">Dashboard Access Granted</p>
                                <p className="text-xs text-[#879083]">
                                    Once verified, you can manage events and volunteers.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact line — plain static text, not a clickable link */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#879083]">
                        <Mail size={13} />
                        <span>
                            Questions? Contact{" "}
                            <span className="text-[#afff66] select-all cursor-text">admin@crewup.org</span>
                        </span>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-[#324539] py-3 text-xs font-medium uppercase tracking-widest text-[#c1cab3] transition hover:bg-[#24342A] hover:text-[#afff66]"
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}
