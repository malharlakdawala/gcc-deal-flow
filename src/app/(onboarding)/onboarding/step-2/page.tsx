"use client";

import { useEffect } from "react";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { StepFooter } from "@/components/onboarding/step-footer";
import { GCC_COUNTRIES, SECTORS } from "@/lib/constants";

const countryOptions = GCC_COUNTRIES.map((c) => ({ label: c, value: c }));
const sectorOptions = SECTORS.map((s) => ({ label: s, value: s }));

export default function Step2Page() {
  const { businessDetails, updateBusinessDetails, setStep } =
    useOnboardingStore();

  useEffect(() => {
    setStep(2);
  }, [setStep]);

  const isValid =
    businessDetails.company_name.trim() !== "" &&
    businessDetails.trade_license.trim() !== "" &&
    businessDetails.sector !== "" &&
    businessDetails.country !== "";

  return (
    <>
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-2">
          Business Details
        </h1>
        <p className="text-on-surface-variant text-sm">
          Please provide the structural details for the legal entity.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Form */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Company Name */}
          <div className="bg-surface-container-low rounded-xl p-6">
            <Input
              label="Company Name"
              placeholder="Legal name as stated on the trade license"
              value={businessDetails.company_name}
              onChange={(e) =>
                updateBusinessDetails({ company_name: e.target.value })
              }
            />
          </div>

          {/* Two column row: License & Years */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-surface-container-low rounded-xl p-6 hover:bg-surface-container transition-all">
              <Input
                label="Trade License Number"
                placeholder="e.g. 123456/A"
                className="font-mono"
                value={businessDetails.trade_license}
                onChange={(e) =>
                  updateBusinessDetails({ trade_license: e.target.value })
                }
              />
            </div>
            <div className="bg-surface-container-low rounded-xl p-6 hover:bg-surface-container transition-all">
              <Input
                label="Years in Operation"
                type="number"
                placeholder="e.g. 8"
                value={
                  businessDetails.years_in_operation?.toString() ?? ""
                }
                onChange={(e) =>
                  updateBusinessDetails({
                    years_in_operation: e.target.value
                      ? parseInt(e.target.value, 10)
                      : null,
                  })
                }
              />
            </div>
          </div>

          {/* Two column row: Country & Sector */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-surface-container-low rounded-xl p-6 hover:bg-surface-container transition-all">
              <Select
                label="Country of Operation"
                placeholder="Select a GCC country"
                options={countryOptions}
                value={businessDetails.country}
                onChange={(e) =>
                  updateBusinessDetails({ country: e.target.value })
                }
              />
            </div>
            <div className="bg-surface-container-low rounded-xl p-6 hover:bg-surface-container transition-all">
              <Select
                label="Sector"
                placeholder="Select your sector"
                options={sectorOptions}
                value={businessDetails.sector}
                onChange={(e) =>
                  updateBusinessDetails({ sector: e.target.value })
                }
              />
            </div>
          </div>

          {/* Two column row: Revenue & Employees */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-surface-container-low rounded-xl p-6 hover:bg-surface-container transition-all">
              <Input
                label="Annual Revenue (AED)"
                variant="currency"
                currencyPrefix="AED"
                placeholder="e.g. 5,000,000"
                value={
                  businessDetails.annual_revenue?.toString() ?? ""
                }
                onChange={(e) =>
                  updateBusinessDetails({
                    annual_revenue: e.target.value
                      ? parseFloat(e.target.value.replace(/,/g, ""))
                      : null,
                  })
                }
              />
            </div>
            <div className="bg-surface-container-low rounded-xl p-6 hover:bg-surface-container transition-all">
              <Input
                label="Number of Employees"
                type="number"
                placeholder="e.g. 50"
                value={
                  businessDetails.employee_count?.toString() ?? ""
                }
                onChange={(e) =>
                  updateBusinessDetails({
                    employee_count: e.target.value
                      ? parseInt(e.target.value, 10)
                      : null,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* AI Insights Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-surface-container-low rounded-xl border-s-4 border-secondary p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <span className="material-symbols-outlined text-6xl">
                auto_awesome
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary text-sm">
                auto_awesome
              </span>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                AI Intelligence
              </span>
            </div>
            <h4 className="text-sm font-semibold text-white mb-2">
              Compliance Forecasting
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Based on your sector selection, the UBO Declaration (Step 3) will
              require specific AML documentation from the Dubai Financial
              Services Authority.
            </p>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">
                Readiness Score
              </span>
              <span className="text-secondary font-mono text-xs font-bold">
                88%
              </span>
            </div>
          </div>
        </div>
      </div>

      <StepFooter currentStep={2} nextDisabled={!isValid} />
    </>
  );
}
