import React from "react";
import { useSearchParams } from "react-router-dom";
import "./VerifiedPage.css";

export default function VerifiedPage() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") === "true";
  const logoText = "https://tilab.com.vn/uploads/Tilab1.png";

  return (
    <div className="verified-wrapper">
      <div className="card">
        <div className="header">
          <img src={logoText} alt="TiLab Logo" className="logo-text" />
        </div>

        <div className="content">
          {status ? (
            <>
              <h2>Account Verified</h2>
              <p>
                <strong>Your TiLab account has been successfully activated.</strong>
              </p>
              <a href="https://tilab.com.vn/login" className="btn btn-blue">
                Go to Login
              </a>
            </>
          ) : (
            <>
              <h2 className="fail">Verification Failed</h2>
              <p>
                <strong>This verification link is invalid or has expired.</strong>
              </p>
              <a href="https://tilab.com.vn/signup" className="btn btn-blue">
                Back to Sign Up
              </a>
            </>
          )}
        </div>

        <div className="footer">
          © 2025 <span>TiLab</span> — Recreate for a Greener Planet
        </div>
      </div>
    </div>
  );
}
