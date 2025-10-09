import React from "react";
import { useSearchParams } from "react-router-dom";
import "./VerifiedPage.css"; // chứa CSS đã prefix tvl-

export default function VerifiedPage() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") === "true";
  const logoText = "https://tilab.com.vn/uploads/Tilab1.png";

  return (
    <div className="tvl-verified-wrapper">
      <div className="tvl-card">
        <div className="tvl-header">
          <img src={logoText} alt="TiLab Logo" className="tvl-logo-text" />
        </div>

        <div className="tvl-content">
          {status ? (
            <>
              <h2>Account Verified</h2>
              <p>
                <strong>Your TiLab account has been successfully activated.</strong>
              </p>
              <a href="https://tilab.com.vn/login" className="tvl-btn tvl-btn-blue">
                Go to Login
              </a>
            </>
          ) : (
            <>
              <h2 className="tvl-fail">Verification Failed</h2>
              <p>
                <strong>This verification link is invalid or has expired.</strong>
              </p>
              <a href="https://tilab.com.vn/signup" className="tvl-btn tvl-btn-blue">
                Back to Sign Up
              </a>
            </>
          )}
        </div>

        <div className="tvl-footer">
          © 2025 <span>TiLab</span> — Reduce plastic, flex your drip.
        </div>
      </div>
    </div>
  );
}
