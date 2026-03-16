"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { calculatePrice } from "@/lib/pricing";
import { formatCurrency } from "@/lib/utils";

const SERVICES = [
  { id: "residential", label: "Residential Cleaning", desc: "Regular home cleaning" },
  { id: "commercial", label: "Commercial / Office Cleaning", desc: "Business cleaning" },
  { id: "move-in-out", label: "Move-In / Move-Out Cleaning", desc: "Moving transitions" },
  { id: "deep", label: "Deep Cleaning", desc: "Top-to-bottom deep clean" },
  { id: "post-construction", label: "Post-Construction Cleaning", desc: "After renovations" },
];

const PROPERTY_TYPES = [
  { id: "house", label: "House" },
  { id: "apartment", label: "Apartment / Condo" },
  { id: "office", label: "Office / Commercial" },
  { id: "other", label: "Other" },
];

const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

const STEPS = ["Service", "Details", "Schedule", "Your Info", "Review"];

type FormData = {
  serviceType: string;
  propertyType: string;
  bedrooms: string;
  extras: string[];
  scheduledDate: string;
  scheduledTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  notes: string;
};

type AddonItem = { id: string; name: string; price: number };

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [addonsList, setAddonsList] = useState<AddonItem[]>([]);

  useEffect(() => {
    fetch("/api/addons")
      .then((r) => r.json())
      .then((data) => setAddonsList(data))
      .catch(() => {});
  }, []);

  const [form, setForm] = useState<FormData>({
    serviceType: searchParams.get("service") || "",
    propertyType: "",
    bedrooms: "2",
    extras: [],
    scheduledDate: "",
    scheduledTime: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    city: "Edmonton",
    notes: "",
  });

  const addonPriceMap = Object.fromEntries(addonsList.map((a) => [a.id, a.price]));
  const estimatedPrice = calculatePrice(
    form.serviceType,
    parseInt(form.bedrooms) || null,
    form.extras,
    addonPriceMap
  );

  const toggleExtra = (id: string) => {
    setForm((prev) => ({
      ...prev,
      extras: prev.extras.includes(id)
        ? prev.extras.filter((e) => e !== id)
        : [...prev.extras, id],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 0: return !!form.serviceType;
      case 1: return !!form.propertyType;
      case 2: return !!form.scheduledDate && !!form.scheduledTime;
      case 3: return !!form.customerName && !!form.customerEmail && !!form.customerPhone && !!form.address;
      default: return true;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, estimatedPrice }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push(`/booking/confirmation?id=${data.id}`);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  // Get tomorrow's date as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="min-h-screen py-10" style={{ backgroundColor: "#f1f4f4" }}>
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-sm font-semibold" style={{ backgroundColor: "#00adee1a", color: "#00adee" }}>
            <Sparkles size={15} />
            Online Booking
          </div>
          <h1 className="text-3xl font-extrabold" style={{ color: "#003d54" }}>Book Your Cleaning</h1>
          <p className="text-gray-500 mt-2 text-sm">Quick, easy, and get an instant price estimate.</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors`}
                style={{
                  backgroundColor: i < step ? "#00adee" : i === step ? "#003d54" : "#e5e7eb",
                  color: i < step || i === step ? "white" : "#9ca3af"
                }}>
                {i < step ? <CheckCircle size={15} /> : i + 1}
              </div>
              <span className={`hidden sm:block ml-2 text-xs font-medium`}
                style={{ color: i === step ? "#003d54" : "#9ca3af" }}>
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <div className="w-4 sm:w-8 h-0.5 mx-2"
                  style={{ backgroundColor: i < step ? "#00adee" : "#e5e7eb" }} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {/* Step 0: Service Type */}
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">What type of cleaning do you need?</h2>
              <div className="space-y-3">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setForm({ ...form, serviceType: s.id })}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all"
                    style={{
                      borderColor: form.serviceType === s.id ? "#00adee" : "#e5e7eb",
                      backgroundColor: form.serviceType === s.id ? "#00adee0d" : "white",
                    }}
                  >
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                      style={{
                        borderColor: form.serviceType === s.id ? "#00adee" : "#d1d5db",
                        backgroundColor: form.serviceType === s.id ? "#00adee" : "white",
                      }}>
                      {form.serviceType === s.id && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{s.label}</div>
                      <div className="text-sm text-gray-500">{s.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Property Details */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tell us about your property</h2>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Property Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {PROPERTY_TYPES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setForm({ ...form, propertyType: p.id })}
                      className="p-3 rounded-xl border-2 text-sm font-medium transition-all"
                      style={{
                        borderColor: form.propertyType === p.id ? "#00adee" : "#e5e7eb",
                        backgroundColor: form.propertyType === p.id ? "#00adee0d" : "white",
                        color: form.propertyType === p.id ? "#003d54" : "#374151",
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Bedrooms
                </label>
                <select
                  value={form.bedrooms}
                  onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5, "6+"].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "Bedroom" : "Bedrooms"}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Add-On Services (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addonsList.map((extra) => (
                    <button
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className="flex items-center justify-between p-3 rounded-xl border-2 text-left text-sm transition-all"
                    style={{
                      borderColor: form.extras.includes(extra.id) ? "#00adee" : "#e5e7eb",
                      backgroundColor: form.extras.includes(extra.id) ? "#00adee0d" : "white",
                    }}
                    >
                      <span className="font-medium" style={{ color: "#003d54" }}>{extra.name}</span>
                      <span className="font-bold" style={{ color: form.extras.includes(extra.id) ? "#00adee" : "#9ca3af" }}>
                        +${extra.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">When would you like us to come?</h2>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Date</label>
                <input
                  type="date"
                  min={minDate}
                  value={form.scheduledDate}
                  onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Time</label>
                <div className="grid grid-cols-3 gap-3">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setForm({ ...form, scheduledTime: t })}
                      className="p-3 rounded-xl border-2 text-sm font-medium transition-all"
                      style={{
                        borderColor: form.scheduledTime === t ? "#00adee" : "#e5e7eb",
                        backgroundColor: form.scheduledTime === t ? "#00adee0d" : "white",
                        color: form.scheduledTime === t ? "#003d54" : "#374151",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contact Info */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.customerEmail}
                    onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={form.customerPhone}
                    onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(587) 222-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Service Address *</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Edmonton"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Special Instructions (Optional)</label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Any special requests or access instructions..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Booking</h2>
              <div className="space-y-4">
                <ReviewRow label="Service" value={SERVICES.find(s => s.id === form.serviceType)?.label || ""} />
                <ReviewRow label="Property" value={`${PROPERTY_TYPES.find(p => p.id === form.propertyType)?.label}, ${form.bedrooms} bedrooms`} />
                <ReviewRow label="Date" value={new Date(form.scheduledDate + "T12:00:00").toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} />
                <ReviewRow label="Time" value={form.scheduledTime} />
                <ReviewRow label="Address" value={`${form.address}, ${form.city}, AB`} />
                <ReviewRow label="Name" value={form.customerName} />
                <ReviewRow label="Email" value={form.customerEmail} />
                <ReviewRow label="Phone" value={form.customerPhone} />
                {form.extras.length > 0 && (
                  <ReviewRow label="Add-ons" value={form.extras.map(id => addonsList.find(a => a.id === id)?.name ?? id).join(", ")} />
                )}

                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold" style={{ color: "#003d54" }}>Estimated Total</span>
                    <span className="text-2xl font-extrabold" style={{ color: "#00adee" }}>{formatCurrency(estimatedPrice)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Final price confirmed upon booking. Taxes may apply.</p>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Estimated Price Bar */}
          {step > 0 && step < 4 && (
            <div className="mt-6 pt-4 border-t flex items-center justify-between">
              <span className="text-sm text-gray-500">Estimated Price:</span>
              <span className="text-xl font-extrabold" style={{ color: "#00adee" }}>{formatCurrency(estimatedPrice)}</span>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 gap-4">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-full text-gray-700 font-semibold hover:bg-gray-50 transition-colors text-sm"
              >
                <ChevronLeft size={16} /> Back
              </button>
            )}
            <div className="flex-1" />
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 text-white px-8 py-3 rounded-full font-bold transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                style={{ backgroundColor: "#003d54" }}
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 text-white px-8 py-3 rounded-full font-bold transition-opacity hover:opacity-90 disabled:opacity-60 text-sm"
                style={{ backgroundColor: "#00adee" }}
              >
                <CheckCircle size={16} />
                {submitting ? "Submitting..." : "Confirm Booking"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm font-semibold text-gray-500 w-24 shrink-0">{label}</span>
      <span className="text-gray-900 text-sm">{value}</span>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BookingForm />
    </Suspense>
  );
}
